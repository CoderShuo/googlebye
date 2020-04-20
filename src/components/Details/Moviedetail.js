import React, {Component} from 'react';
import * as firebase from 'firebase'
import '../../assets/css/Moviedetail.css'
import {firestore} from '../../config/firebase'
import {FetchDetail} from "../../api/fetch";
import StarMarking from '../StarMarking'
import Loader from 'react-loader-spinner'

const hctext = " No hotcomment yet, try to be the first one. :)"
const ctext = "No user comments available, feel free to comment"

class Moviedetail extends Component {
   constructor(props){
     super(props);
     this.state={
       movie: [],
       loading:true,
     }
}
  render(){
    var tartId = window.location.href.split("/").pop()
    var movie = this.state.movie
    if(this.state.loading)
      return(
        <div>
      <Loader
        type="Puff"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={3000} //3 secs
     />
     <span>The movie is on the way...</span>
     </div>
     )
    if(movie){
    return(
      <div>
          <h1 className="title">{movie.title}</h1>
          <div className="header">
              <div className="Mainpic">
                <img src={movie.img} alt={movie.title}></img>
              </div>
              <div className="movie-info">
                    <span> <b>Score:</b> {movie.score}</span>
                    <br/>
                    <span> <b>Description:</b> {movie.description}</span>
                    <br/>
                    <span> <b>Hot comment:</b>{movie.hotcomment? movie.hotcomment:hctext}</span>
                    <br/>
                    <span> <b>Release date:</b>{movie.releasedate}</span>
                    <br/>
                    <span> <b>Duration:</b>{movie.duration}</span>
                    <br/>
                    <span> <b>Actors:</b>{movie.actors}</span>
              </div>
              <div class="clearfloat"></div>
          </div>

          <div class="under">
            <div className="display-comments"> 
                  <span><b>Comments: </b> 
                  {this.state.comments? this.commentsrender(this.state.comments.comments):ctext}</span>
            </div>
              <div className="user-comment">
                <div className="editcomment"><span><b>Leave your own comments here: </b> </span></div>
                <textarea id="comment" className="commentbox" placeholder="Say something..." cols="80"></textarea>
                <div class="starmark">
                  <div className="ratetip"><span><b>Rate the movie:</b>{'    '}</span></div>
                  <StarMarking 
                    getScore={(item)=>this.getScore(item)}/>
                </div>
            </div>
                <a className="myButton" onClick={()=>this.inset_db(tartId)}>submit</a>
          </div>
        </div>

    )
  }
  else{
    return(
    <div>
    movie details
    </div>)
  }
  }
  
  componentWillMount(){
    this.gotoPage();
  }

  getScore(score){
    console.log(score)
    return score
  }

  gotoPage(){
    var tartId = window.location.href.split("/").pop()
    this.setState({loading:true})
    FetchDetail(tartId)
    .then(data=>this.setState({movie:data}))
    // var first = firestore.collection("movies").doc(tartId)
    // first.get().then(documentSnapshot=>{
    //   var data = documentSnapshot.data()
    //   this.setState({movie:data})
    // })

    //Get comment
    var first = firestore.collection("moviesextra").doc(tartId)
    first.get().then(documentSnapshot=>{
      var data = documentSnapshot.data()
      this.setState({comments: data, loading:false})
    })
  }

  format_comments(){
    var myDate = new Date();
    var createtime = myDate.toLocaleString( );  
    var textarea = document.getElementById("comment")
    var rvalue = document.getElementsByClassName('light').length
    var currentUser = firebase.auth().currentUser
    if(!currentUser){
      alert("Please login before making a comment")
      return 
    }
    var user = {
      "id": currentUser.uid,
      "screen_name":currentUser.displayName,
      "profile_url":currentUser.photoURL,
      "providerData": currentUser.providerData,
  }
    var comment={
      "cid":123456,
      "text": textarea.value,
      "rate":rvalue,
      "like_count":0,
      "liked":false,
      "created_at":createtime,
      "user":user,
    }
 
    return comment
  }

  inset_db(docid){
    var movieRef = firestore.collection("moviesextra").doc(docid);
    var updatedcomments = this.state.comments ? this.state.comments.comments:[]
    if(!this.format_comments())
        return 
    updatedcomments.push(this.format_comments())
    movieRef.set({
      comments: updatedcomments
      })
      .then(function() {
        console.log("Document successfully updated!");
        window.location.reload()
      })
      .catch(function(error) {
        console.error("Error updating document: ", error);
      });
      alert("Thanks for your comments")

    }
  
  commentsrender(comments){
    console.log(comments)
    return (
      comments.map(comment=>{
        return (
        <div className="usercomments">
          <div className="commentinfo">
            <img className="profile" src={comment.user.profile_url}
                  width="30" height="30"/>
            <div className="wrap-comment">
            <div className="wrap">
              <div className="indexinfo">
              <span>
              <b>{comment.user.screen_name}</b>:
              commented at {comment.created_at}</span>
            </div>
            <div className="contentdetail">
              <div className="maincontent">{comment.text}</div>
              <div className="rate">{comment.rate} star</div>
            </div>
          <div className="likecount"><div className="likedetail"><i class='lite-icon'></i>{'   '}{comment.like_count}{'   '}like</div></div>
        </div>
        </div>
        </div>
        </div>)
      })

    )
  }
          
}
export default Moviedetail
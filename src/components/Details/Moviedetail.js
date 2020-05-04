import React, {Component} from 'react';
import * as firebase from 'firebase'
import '../../assets/css/Moviedetail.css'
import {firestore} from '../../config/firebase'
import {FetchDetail} from "../../api/fetch";
import StarMarking from '../StarMarking'
import Loader from 'react-loader-spinner'
import Navigator from '../Mainpage/Navigator'
import { Movie } from './Movie';

const ctext = "No user comments available, feel free to comment"

class Moviedetail extends Component {
   constructor(props){
     super(props);
     this.state={
       movie: [],
       loading:true,
       tartId : window.location.href.split("/").pop(),
       comments: [],
     }
}
  render(){
    var movie = this.state.movie
    if(this.state.loading)
      return(
      <div>
      <div>
      <Navigator/> 
      </div>
      <div className="loading">
      <Loader
        type="Puff"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={3000} //3 secs
     />
     <span>The movie is on the way...</span>
     </div>
     </div>
     )
    if(movie){
    return(
      <div>
          <Navigator/>
          <div className="detailpage">
          {Movie(movie)}
          <div class="under">
            <div className="display-comments"> 
                  <span><b>Comments: </b> 
                  {this.state.comments? this.commentsrender(this.state.comments):ctext}</span>
            </div>
              <div className="user-comment">
                <div className="editcomment"><span><b>Leave your own comments here: </b> </span></div>
                <textarea id="comment" className="commentbox" placeholder="Say something..." cols="80"></textarea>
                <div class="starmark">
                  <div className="ratetip"><span><b>Rate the movie:</b>{'    '}</span></div>
                  <StarMarking 
                    getScore={(item)=>this.getScore(item)}/>
                </div>
                <a className="myButton" onClick={()=>this.inset_db(this.state.tartId)}>submit</a>
       
            </div>
           </div>
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
      this.setState({comments: data? data.comments:[], loading:false})
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
      window.location.assign('/login')
      return 
    }
    var user = {
      "id": currentUser.uid,
      "screen_name":currentUser.displayName,
      "profile_url":currentUser.photoURL,
      "providerData": currentUser.providerData,
  }
    var comment={
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
    var updatedcomments = this.state.comments ? this.state.comments:[]
    if(!this.format_comments())
        return 
    updatedcomments.push(this.format_comments())
    this.setState({comments:updatedcomments})
    this.updatedb(docid, updatedcomments)
    var textarea = document.getElementById("comment")
    textarea.value=""
    alert("Thanks for your comments")
    }

  updatedb(docid, updatedcomments){
    var movieRef = firestore.collection("moviesextra").doc(docid);
    movieRef.set({
      comments: updatedcomments
      })
      .then(function() {
        console.log("Document successfully updated!");
      })
      .catch(function(error) {
        console.error("Error updating document: ", error);
      });
  }

  ondelete(docid,index){
    var movieRef = firestore.collection("moviesextra").doc(docid);
    var updatedcomments = this.state.comments ? this.state.comments:[]

    updatedcomments.splice(index,1)
    this.setState({
      comments: updatedcomments})
    movieRef.set({
      comments: updatedcomments
      })
      .then(function() {
        console.log("Document successfully deleted!");
      })
      .catch(function(error) {
        console.error("Error deleting document: ", error);
      });
  }


  commentsrender(comments){
    console.log(comments)
    var updatedcomments = this.state.comments ? this.state.comments:[]
    var currentUser = firebase.auth().currentUser

    return (
      comments.map((comment, index)=>{
        var deleteclassName = "vanish"
        var starclassName = "rate"+ comment.rate
        if(currentUser){
          var deleteclassName = currentUser.uid==updatedcomments[index].user.id? "delete": "delete vanish"
        }
        return (
        <div className="usercomments" id={index}>
          <div className="commentinfo">
            <img className="profile" src={comment.user.profile_url}
                  width="30" height="30"/>
            <div className="wrap-comment">
            <div className="wrap">
              <div className="indexinfo">
              <span>
              <b>{comment.user.screen_name}</b>:
              commented at {comment.created_at}</span>
              <span className={"allstarrating"+" "+starclassName}></span>
              <a className={deleteclassName}
                id="deletecomment" 
                onClick={()=>this.ondelete(this.state.tartId,index)}>delete</a>
            </div>
            <div className="contentdetail">
              <div className="maincontent">{comment.text}</div>
            </div>
          <div className="likecount"><div className="likedetail"><i class='lite-icon' onClick={()=>{
                      comments[index].like_count=comments[index].like_count+1
                      this.setState({comments:comments})
                      this.updatedb(this.state.tartId, updatedcomments)
                    }
                      }></i>{'   '}{comment.like_count}{'   '}like</div></div>
        </div>
        </div>
        </div>
        </div>)
      })
    )
  }
          
}
export default Moviedetail
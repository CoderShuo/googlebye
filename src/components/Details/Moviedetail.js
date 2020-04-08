import React, {Component} from 'react';
import * as firebase from 'firebase'
import '../../assets/css/Moviedetail.css'
import {firestore} from '../../config/firebase'

const hctext = " No hotcomment yet, try to be the first one. :)"
const ctext = "No user comments available, feel free to comment"

class Moviedetail extends Component {
   constructor(props){
     super(props);
     this.state={
       movie: [],
     }
}
  render(){
    var tartId = window.location.href.split("/").pop()
    var movie = this.state.movie
    if(movie){
    return(
      <div>
        <div>
          movie details
          </div>
        <div style={{width:"50%"}}>
            <div className='item'>
            <img src={movie.img} alt={movie.title} width='150'></img>
            <p><b>{movie.title}</b></p>
            <div className="movie-detail">
              <p> <b>Score:</b> {movie.score}</p>
              <p> <b>Description:</b> {movie.description}</p>
              <p> <b>Hot comment:</b>{movie.hotcomment? movie.hotcomment:hctext}</p>
              <p> <b>Release date:</b>{movie.releasedate}</p>
              <p> <b>Comments: </b>{movie.comments? this.commentsrender(movie.comments):ctext}</p>
              <div className="user-comment">
              <textarea id="comment" placeholder="Leave your comments here..." rows="6" cols="40"></textarea>
              <select id="rate">
                <option>Please rate the movie</option>
                <option>1(very bad)</option>
                <option>2(unsatisfied)</option>
                <option>3(good)</option>
                <option>4(recommend)</option>
                <option>5(highly recommend)</option>
              </select>
              </div>
             <button id="submit" onClick={()=>this.inset_db(tartId)}>submit</button>
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
    var first = firestore.collection("movies").doc(tartId)
    first.get().then(documentSnapshot=>{
      var data = documentSnapshot.data()
      this.setState({movie:data})
    })
    
  }

  format_comments(){
    var myDate = new Date();
    var createtime = myDate.toLocaleString( );  
    var textarea = document.getElementById("comment")
    var rate = document.getElementById("rate")
    var rvalue = 5
    if (rate.value[0]=="P"){
      alert("Please rate!")
      return 
    }
    else{
      rvalue = parseInt(rate.value[0])
    }
    var currentUser = firebase.auth().currentUser
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
    var movieRef = firestore.collection("movies").doc(docid);
    var updatedcomments = this.state.movie.comments ? this.state.movie.comments:[]
    if(!this.format_comments())
        return 
    updatedcomments.push(this.format_comments())
    // Set the "capital" field of the city 'DC'
    movieRef.update({
      comments: updatedcomments
      })
      .then(function() {
        console.log("Document successfully updated!");
      })
      .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
      alert("Thanks for your comments")
      }
  
  commentsrender(comments){
    console.log(comments)
    return (
      comments.map(comment=>{
        return (<li>
          {comment.created_at}, <br/>
          <img src={comment.user.profile_url}
                width="20" height="20"/>
          {comment.user.screen_name}:
          {comment.text},
          liked:{comment.like_count},
          star: {comment.rate}
          </li>)
      })

    )
  }
          
}
export default Moviedetail
import React, {Component} from 'react';
import * as firebase from 'firebase'
import '../../assets/css/Moviedetail.css'

import StarMarking from '../StarMarking'
import Loader from 'react-loader-spinner'
import Navigator from '../Mainpage/Navigator'
import { Movie } from './Movie';

const ctext = "No user comments available, feel free to comment"
const defaultimg = "https://www.palmkvistmaleri.se/wp-content/uploads/2018/02/default.jpg"
class Moviedetail extends Component {

  render(){
    var movie = this.props.movie
    if(this.props.loading)
      return(
      <div>
      <div>
      <Navigator/> 
      </div>
      <div className="loading">
      <Loader
        type="Puff"
        color="#cc4e87"
        height={100}
        width={100}
        timeout={10000} //3 secs
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
          {Movie(movie,this.props.hotcomment)}
          <div className="under">
            <div className="display-comments"> 
                  <span><b>Comments: </b> 
                  {this.props.comments? this.commentsrender(this.props.comments):ctext}</span>
            </div>
              <div className="user-comment">
                <div className="editcomment"><span><b>Leave your own comments here: </b> </span></div>
                <textarea id="comment" className="commentbox" placeholder="Say something..." cols="80"></textarea>
                <div className="starmark">
                  <div className="ratetip"><span><b>Rate the movie:</b>{'    '}</span></div>
                  <StarMarking 
                    getScore={(item)=>this.getScore(item)}/>
                </div>
                <a className="myButton" onClick={()=>this.props.inset_db()}>submit</a>
       
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
  
 
  commentsrender(comments){
    var updatedcomments = this.props.comments ? this.props.comments:[]
    var currentUser = firebase.auth().currentUser

    return (
      comments.map((comment, index)=>{
        var deleteclassName = "vanish"
        var starclassName = "rate"+ comment.rate
        if(currentUser){
          var deleteclassName = currentUser.uid==updatedcomments[index].user.id? "delete": "delete vanish"
          var likeclassName = comments[index].liked_by.indexOf(currentUser.uid)>-1 ? "likedetail liked_cliked" : "likedetail liked_uncliked"
        }
        return (
        <div className="usercomments" id={index} key={index}>
          <div className="commentinfo">
            <img className="profile" src={comment.user.profile_url?comment.user.profile_url:defaultimg}
                  width="30" height="30"/>
            <div className="wrap-comment">
            <div className="wrap">
              <div className="indexinfo">
              <span>
              <b>{comment.user.screen_name?comment.user.screen_name:"Anonymous"}</b>:
              commented at {comment.created_at}</span>
              <span className={"allstarrating"+" "+starclassName}></span>
              <a className={deleteclassName}
                id="deletecomment" 
                onClick={()=>this.props.ondelete(index)}
                style = {{"color":"red","textDecoration":"underline"}}
                >delete</a>
            </div>
            <div className="contentdetail">
              <div className="maincontent">{comment.text}</div>
            </div>
          <div className="likecount"><div className={likeclassName}><i className='lite-icon' onClick={()=>{
                      this.props.likefun(index,comments)
                    }
                      }></i>{'   '}{comment.liked_by.length}{'   '}like</div></div>
        </div>
        </div>
        </div>
        </div>)
      })
    )
  }
          
}
export default Moviedetail
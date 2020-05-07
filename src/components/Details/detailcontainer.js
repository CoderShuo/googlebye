

import React, {Component} from 'react';
import Moviedetail from './Moviedetail'
import {firestore} from '../../config/firebase'
import {FetchDetail} from "../../api/fetch";
import * as firebase from 'firebase'
class DetailContainer extends Component {

    constructor(props){
        super(props);
        this.state={
          movie: [],
          loading:true,
          tartId : window.location.href.split("/").pop(),
          comments: [],
          clicktimes:0,
        }
   }

    render(){
        return(
            <Moviedetail movie={this.state.movie} hotcomment={this.state.hotcomment}
            comments={this.state.comments} loading={this.state.loading}
            ondelete={(index)=>this.ondelete(this.state.tartId,index)}
            inset_db={()=>this.inset_db(this.state.tartId)}
            likefun={(index,comments)=>this.likefun(index,comments)}
            />
        )
    }

    likefun(index,comments){
        if(this.state.clicktimes>5){
            alert('Too frequent request!')
            return }
        if(!firebase.auth().currentUser){
            alert("Please login before making a like")
            window.location.assign('/login')
        }
        comments[index].like_count=comments[index].like_count+1
        this.setState({comments:comments,clicktimes:this.state.clicktimes+1})
        this.updatedb(this.state.tartId, comments)
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
          if(!data)
            this.setState({comments:[], loading:false})
          else{
            var most=-1
            var hcomment
    
            data.comments.map(c=>{
              if(c.like_count>most){
                hcomment = c
                most = c.like_count
              }
            })
            this.setState({comments: data.comments, hotcomment:hcomment?hcomment.text:'', loading:false})
          }
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
        if(rvalue==0 || !textarea.value){
        alert('Plz rate and comment before submitting.')
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
        })
        .catch(function(error) {
            console.error("Error deleting document: ", error);
        });
    }
}

export default DetailContainer
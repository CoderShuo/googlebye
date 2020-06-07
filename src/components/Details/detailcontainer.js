

import React, {Component} from 'react';
import Moviedetail from './Moviedetail'
import {firestore} from '../../config/firebase'
import {FetchDetail} from "../../api/fetch";
import * as firebase from 'firebase'
import {ModalTip} from '../Modal'

class DetailContainer extends Component {

    constructor(props){
        super(props);
        this.state={
          movie: [],
          loading:true,
          tartId : window.location.href.split("/").pop(),
          comments: [],
          showModal:false,
        }
   }

    render(){

        return(
          <>
            <Moviedetail movie={this.state.movie} hotcomment={this.state.hotcomment}
            comments={this.state.comments} loading={this.state.loading}
            ondelete={(index)=>this.ondelete(this.state.tartId,index)}
            inset_db={()=>this.inset_db(this.state.tartId)}
            likefun={(index,comments)=>this.likefun(index,comments)}
            />
            {ModalTip(this.state.showModal,this.state.fun,this.state.title,this.state.body)}
          </>
        )
    }

    likefun(index,comments){
        var currentUser = firebase.auth().currentUser
        if(!currentUser){
            this.setState({showModal:true, fun:()=>window.location.assign('/login'),title:'',body:"Please login before making a like"})
            return
        }
        var like_index = comments[index].liked_by.indexOf(currentUser.uid)
        if(like_index>-1){
          comments[index].liked_by.splice(like_index,1)
        }
        else
          comments[index].liked_by.push(currentUser.uid)

        this.setState({comments:comments})
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
          this.setState({showModal:true, fun:()=>window.location.assign('/login'),title:'',body:"Please login before making a comment"})
          return 
        }
        if(rvalue==0 || !textarea.value){
          this.setState({showModal:true, fun:()=>this.setState({showModal:false}),title:'',body:'Plz rate and comment before submitting.'})
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
        "liked_by":[],
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
        this.setState({showModal:true,fun:()=>this.setState({showModal:false}), title:'',body:'Submit your comment'})
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
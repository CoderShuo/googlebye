
import React, {Component} from 'react';
import * as firebase from 'firebase'
import {ModalTip, ModalConfirm} from '../Modal'
import {ChangeSort, ChangeQuery} from './actions'
import { connect } from "react-redux"


const defaultimg = "https://www.palmkvistmaleri.se/wp-content/uploads/2018/02/default.jpg"

class Navigator extends Component {
    constructor(props){
      super(props)
      this.state=
      {
        displayName: sessionStorage.getItem("displayName"),
        displayimg:sessionStorage.getItem("displayimg"),
        showModal:false,
        fun: ()=>{
          this.setState({showModal:false})
          Loginout()
        }
      }
    }
    render(){
      var tartId = window.location.href.split("/").pop()
      var cn = (tartId!=='index')? 'vanish':''
      var searchcn = "searchbox" +' '+cn
      if(this.state.displayName==="unlogin"|| !this.state.displayName)
      {
        return(
        <header>
        <center>
          <ul>
            <li className="searchpage" onClick={()=>Backtosearch()}><b>GoogleBye</b></li>
            <li className={cn}>
            <a style={{"color":"#fff", "fontWeight":"bold"}}>Sort</a>
            <div className="options">
              <ul>
              <li onClick={()=>this.props.ChangeSort('vote_count.desc')}>Old</li>
               <li onClick={()=>this.props.ChangeSort('popularity.desc')}>Popular</li>
               <li onClick={()=>this.props.ChangeSort('primary_release_date.asc')}>Vote Count</li>
             </ul>
              </div>
            </li>
          </ul>
          <div className= {searchcn}>
          <input className="searchedit" id="searchbox" placeholder="Search movies"></input>
          <button className= 'searchbutton' id="searchbtn" onClick={()=>this.props.ChangeQuery()}>Search</button>
          </div>
          <div className="userinfo">
          <a href="/login" style={{"color":"#fff","fontWeight":"bold"}}>Login</a>
          </div>
        </center>
      </header>
        )
      }
      else{
      return(
        <>
        <header>
        <center>
          <ul>
            <li className="searchpage" onClick={()=>Backtosearch()}><b>GoogleBye</b></li>
            <li className={cn}>
            <a style={{"color":"#fff", "fontWeight":"bold"}}>Sort</a>
            <div className="options">
              <ul><li onClick={()=>this.props.ChangeSort('primary_release_date.asc')}>Old</li>
              <li onClick={()=>this.props.ChangeSort('popularity.desc')}>Popular</li>
              <li onClick={()=>this.props.ChangeSort('vote_count.desc')}>Vote Count</li>
              </ul>
              </div>
            </li>
              <li onClick={()=>{
                this.setState({showModal:true})}}>
                <a style={{"color":"#fff", "fontWeight":"bold"}}>Logout</a></li>
          </ul>
          <div className= {searchcn}>
          <input className="searchedit" id="searchbox" placeholder="Search movies"></input>
          <button 
              className= 'searchbutton' 
              id="searchbtn" 
              onClick={()=>this.props.ChangeQuery()}>Search</button>
          </div>
          <div className="userinfo">
          <img className = "userimg" src={this.state.displayimg} width="40px"/>
          <span className = "username">{this.state.displayName}</span>
          </div>
        </center>
      </header>
      {ModalTip(this.state.showModal,this.state.fun,"Log Out","You've signed off")}
      </>
      )
      }
    }

    componentDidMount(){
      var searchbtn = document.getElementById("searchbtn")
      // searchbtn.addEventListener('click',()=>{
      //   var query = document.getElementById("searchbox").value
      //   this.props.funsearch(query,1)
      // })

      var searchbox = document.getElementById("searchbox")
      searchbox.addEventListener("keyup", function(event) {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
          // Cancel the default action, if needed
          event.preventDefault();
          // Trigger the button element with a click
          searchbtn.click();
        }
      });

      firebase.auth().onAuthStateChanged(firebaseUser=>{
        if(firebaseUser){
          if(!firebaseUser.displayName){
            this.setState({displayName:"Anonymous", displayimg:defaultimg})
            sessionStorage.setItem('displayName',"Anonymous")
            sessionStorage.setItem('displayimg',defaultimg)
          }
          else {
          this.setState({displayName:firebaseUser.displayName, displayimg:firebaseUser.photoURL})
          sessionStorage.setItem('displayName',firebaseUser.displayName)
          sessionStorage.setItem('displayimg',firebaseUser.photoURL)
          }
        }
      })
    }
}

const Loginout= ()=>{
    var auth = firebase.auth().signOut().then(function() {
      sessionStorage.setItem('displayName',"unlogin")
      sessionStorage.setItem('displayimg',"")
      window.location.assign("/login")
    }, function(error) {
      console.log("Failed to sign out:", error)
    });
    
  }

const Backtosearch=()=>{
  window.location.assign("/index")
}

const mapDispatchToProps = dispatch => ({
  ChangeSort: sort => dispatch(ChangeSort(sort)),
  ChangeQuery: () => {
    var q = document.getElementById("searchbox").value
    dispatch(ChangeQuery(q))}
})


export default connect(
  null,
  mapDispatchToProps
)(Navigator)
  

import React, {Component} from 'react';
import * as firebase from 'firebase'

class Navigator extends Component {
    constructor(props){
      super(props)
      this.state=
      {
        displayName: "",
        displayimg:null,
      }
    }
    render(){
        return(
        <header>
        <center>
          <ul>
            <li className="searchpage" onClick={()=>Backtosearch()}><b>GoogleBye</b></li>
            <li><a href="#">Movies</a>
              <ul><li><a href="#">Recently</a></li><li></li></ul>
              <ul><li><a href="#">Popular</a></li><li></li></ul>
            </li>
            <li><a href="#">My Page</a>
              <ul><li><a href="#" onClick={()=>Loginout()}>Logout</a></li><li></li></ul>
            </li>
          </ul>
          <div className="searchbox">
          <input className="searchedit" id="searchbox" placeholder="Search movies"></input>
          <button className="searchbutton" id="searchbtn">Search</button>
          </div>
          <div className="userinfo">
          <img className = "userimg" src={this.state.displayimg} width="40px"/>
          <span className = "username">{this.state.displayName}</span>
          </div>
        </center>
      </header>)
    }

    componentDidMount(){
      var searchbtn = document.getElementById("searchbtn")
      searchbtn.addEventListener('click',()=>{
        var query = document.getElementById("searchbox").value
        this.props.funsearch(query,1)
      })
      firebase.auth().onAuthStateChanged(firebaseUser=>{
        if(firebaseUser){
          this.setState({displayName:firebaseUser.displayName, displayimg:firebaseUser.photoURL})
        }
      })
    }
}

const Loginout= ()=>{
    var auth = firebase.auth().signOut().then(function() {
      alert("You've signed out")
      window.location.assign("/login")
    }, function(error) {
      console.log("Failed to sign out:", error)
    });
    console.log(auth)
  }

const Backtosearch=()=>{
  window.location.assign("/index")
}
// export const query = document.getElementById("searchbox").value
// export const searchbtn = document.getElementById("searchbtn")
  
export default Navigator
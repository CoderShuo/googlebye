
import React, {Component} from 'react';
import * as firebase from 'firebase'

class Navigator extends Component {
 
    render(){
        return(
        <header>
        <center>
          <ul>
            <li><b>GoogleBye</b></li>
            <li><a href="#">My Page</a>
              <ul><li><a href="#" onClick={()=>Loginout()}>Logout</a></li><li></li></ul>
            </li>
              <textarea className="searchedit" cols="30" placeholder="Search movies"></textarea>
              <button className="searchbutton">Search</button>
          </ul>
        </center>
      </header>)
    }
}

const Loginout= ()=>{
    var auth = firebase.auth().signOut().then(function() {
      alert("You've signed out")
      window.location.assign("/login")
    }, function(error) {
      console.log("Failed to sign out")
    });
    console.log(auth)
  }

  
export default Navigator
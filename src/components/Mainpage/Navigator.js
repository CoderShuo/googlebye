
import React, {Component} from 'react';
import * as firebase from 'firebase'

class Navigator extends Component {
 
    render(){
        return(
        <header>
        <center>
          <ul>
            <li><b>GoogleBye</b></li>
            <li><a href="#">Movie</a>
              <ul><li><a href="#">Best Movies</a></li><li><a href="#">Latest</a></li></ul>
            </li>
            <li><a href="#">Comments</a>
              <ul><li><a href="#">Highest Rated</a></li><li><a href="#">Watched Most</a></li></ul>
            </li>
            <li><a href="#">My Page</a>
              <ul><li><a href="#" onClick={()=>Loginout()}>Logout</a></li><li></li></ul>
            </li>
            <li>
              <textarea rows="1" cols="30">Search Movie</textarea>
              <button class="searchbutton">Search</button>
            </li>
            <li>
              <p>Sort by</p>
            </li>
            <li>
              <select>
                <option value="score">Score</option>
                <option value="time">Time</option>
              </select>
            </li>
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
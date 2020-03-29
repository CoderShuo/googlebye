import React, {Component} from 'react';
import {auth} from '../config/firebase';
import * as firebase from 'firebase'
import './style_MainPage.css'

class MainPage extends Component {

  render(){
    return (
      <div class="container">
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
                <ul><li><a href="#">Login</a></li><li><a href="#">Register</a></li></ul>
              </li>
            </ul>
          </center>
        </header>

        <div class="masonry">

          <div class="item">
            <b>The first Item</b>
          </div>
          <div class="item">
            <b>The second Item</b>
          </div>
          <div class="item">
            <b>The third Item</b>
          </div>
        </div>

        <footer>
          <div>The first element</div>
        </footer>
      </div>
    )
  }
  
}

export default MainPage
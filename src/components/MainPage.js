import React, {Component} from 'react';
import {auth} from '../config/firebase';
import * as firebase from 'firebase'
import './style_MainPage.css'
import {firestore} from '../config/firebase'

class MainPage extends Component {
  constructor(props){
    super(props);
    this.state={
      page: 1,
      limit: 10,
      movies: [],
    }
  }
  render(){
    console.log("current state = ", this.state.page)
    console.log(this.state.movies)
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
          {this.getMovieDiv(this.state.movies[0])}
          {this.getMovieDiv(this.state.movies[1])}
          {this.getMovieDiv(this.state.movies[2])}
          {this.getMovieDiv(this.state.movies[3])}
          {this.getMovieDiv(this.state.movies[4])}
          {this.getMovieDiv(this.state.movies[5])}
          {this.getMovieDiv(this.state.movies[6])}
          {this.getMovieDiv(this.state.movies[7])}
          {this.getMovieDiv(this.state.movies[8])}
          {this.getMovieDiv(this.state.movies[9])}
        </div>

        <div id="page">
          <button id="pre" disabled={this.state.page==1}>pre</button>
          <button id="1">1</button>
          <button id="2">2</button>
          <button id="3">3</button>
          <button id="4">4</button>
          <button id="5">5</button>
          <button id="6">6</button>
          <button id="7">7</button>
          <button id="8">8</button>
          <button id="9">9</button>
          <button id="next">next</button>
        </div>
        <footer>
          <div>The first element</div>
        </footer>
      </div>
    )
  }

 
  componentWillMount(){
    this.gotoPage(this.state.page)
  }

  gotoPage(page){
    var tartId = 123456 + this.state.limit * (page-1)
    var first = firestore.collection("movies")
        .orderBy(firebase.firestore.FieldPath.documentId())
        .startAt(String(tartId))
        .limit(this.state.limit);
    first.get().then( (documentSnapshots) =>{
      var movie = []
      documentSnapshots.forEach(function(doc) {
        var data = doc.data()
        data['id']= doc.id
        movie.push(data)
    })
    this.setState({movies:movie})
  })
  }

  componentDidMount(){
    var pageControl = document.getElementById("page")
    pageControl.addEventListener("click", (event)=>{
      var page = event.target.closest("button").id
      var jumpto
      if (page=="pre"){
        jumpto = this.state.page-1
      }
      else if(page =="next"){
        jumpto = this.state.page + 1
      }
      else{
        jumpto = parseInt(page)
      }
      setTimeout(() => {
        this.setState({
          page:jumpto
        })
        this.gotoPage(this.state.page)
      }, 500)
    })
  }

  getMovieDiv(movie){
    if(movie){
      return(
        <div class="item">
          <div class="horizontal">
            <img src={movie.img} alt={movie.title} width='150'></img>
            <div>
              <b>{movie.title}</b> <br />
              <b>{movie.actors}</b> <br />
              <b>Release Date: {movie.releasedate}</b> <br />
              <b>{movie.duration}</b>
            </div>
          </div>
          
          <div>
            <b>{movie.description}</b><br />
            <b>Hot Comment: {movie.hotcomment}</b>
          </div>
        </div>
      )
    }
  }
}
export default MainPage
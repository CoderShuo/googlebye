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
      limit: 15,
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
          {this.getMovieDiv(this.state.movies[10])}
          {this.getMovieDiv(this.state.movies[11])}
          {this.getMovieDiv(this.state.movies[12])}
          {this.getMovieDiv(this.state.movies[13])}
          {this.getMovieDiv(this.state.movies[14])}
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
          <div>About us</div>
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

  // getMovieSlide(movie){
  //   if(movie){
  //     return(
  //       <div>
  //         <div class="slideshow-container">
  //           <div class="mySlides fade">
  //             <div class="numbertext">1 / 3</div>
  //             <img src={movie[0].img} style="width:100%"></img>
  //             <div class="text">{movie[0].title}</div>
  //           </div>
           
  //           <div class="mySlides fade">
  //             <div class="numbertext">2 / 3</div>
  //             <img src={movie[0].img} style="width:100%"></img>
  //             <div class="text">{movie[0].title}</div>
  //           </div>
           
  //           <div class="mySlides fade">
  //             <div class="numbertext">3 / 3</div>
  //             <img src={movie[0].img} style="width:100%"></img>
  //             <div class="text">{movie[0].title}</div>
  //           </div>
           
  //           <a class="prev" onclick="plusSlides(-1)">❮</a>
  //           <a class="next" onclick="plusSlides(1)">❯</a>
  //         </div>
  //         <br />
           
  //         <div style="text-align:center">
  //           <span class="dot" onclick="currentSlide(1)"></span> 
  //           <span class="dot" onclick="currentSlide(2)"></span> 
  //           <span class="dot" onclick="currentSlide(3)"></span> 
  //         </div>
  //       </div>
  //     )
  //   }
  // }

  // this.slideIndex = 1;
  // showSlides(slideIndex);
   
  // function plusSlides(n) {
  //   showSlides(slideIndex += n);
  // }
   
  // function currentSlide(n) {
  //   showSlides(slideIndex = n);
  // }
   
  // function showSlides(n) {
  //   var i;
  //   var slides = document.getElementsByClassName("mySlides");
  //   var dots = document.getElementsByClassName("dot");
  //   if (n > slides.length) {slideIndex = 1} 
  //   if (n < 1) {slideIndex = slides.length}
  //   for (i = 0; i < slides.length; i++) {
  //       slides[i].style.display = "none"; 
  //   }
  //   for (i = 0; i < dots.length; i++) {
  //       dots[i].className = dots[i].className.replace(" active", "");
  //   }
  //   slides[slideIndex-1].style.display = "block"; 
  //   dots[slideIndex-1].className += " active";
  // }


  getMovieDiv(movie){
    if(movie){
      return(
        <div class>
          <img src={movie.img} alt={movie.title} width='150'></img>
          <div>
            <b>{movie.title}</b> <br />
            <b>{movie.actors}</b> <br />
            <b>Release Date: {movie.releasedate}</b> <br />
            <b>{movie.duration}</b>
          </div>
        </div>
      )
    }
  }
}
export default MainPage
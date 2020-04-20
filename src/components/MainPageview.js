import React from 'react';



export const MainPageview = (movies, page)=>
{
  return(
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
    <div class="horizontal">
      {getMovieDiv(movies[0])}
      {getMovieDiv(movies[1])}
      {getMovieDiv(movies[2])}
      {getMovieDiv(movies[3])}
      {getMovieDiv(movies[4])}
    </div>
    <div class="horizontal">
      {getMovieDiv(movies[5])}
      {getMovieDiv(movies[6])}
      {getMovieDiv(movies[7])}
      {getMovieDiv(movies[8])}
      {getMovieDiv(movies[9])}
    </div>
    <div class="horizontal">
      {getMovieDiv(movies[10])}
      {getMovieDiv(movies[11])}
      {getMovieDiv(movies[12])}
      {getMovieDiv(movies[13])}
      {getMovieDiv(movies[14])}
    </div>
  </div>

  <div id="page">
    {Pagerender(page)}
  </div>

  <footer>
    <div>About us</div>
  </footer>
</div>)
}


const getMovieDiv=(movie)=>{
  if(movie){
    return(
      <div class='item'>
        <img src={movie.img} alt={movie.title} width='150'></img>
        <p>
          {movie.title}  
          <strong>  {movie.score}</strong>
        </p>
      </div>
    )
  }}

const Pagerender=(page)=>{
    var from = parseInt(page/10)*10
    var arr = [];
    for(var i = from; i < from+10; i++){
      arr.push(i);
    }
    var pagehtml = [
      <button id="pre" disabled={page==1}>pre</button>
  ]
    arr.map(x=>{
      if(x===page){
        pagehtml = [...pagehtml, <button id={x} style={{color:"#111"}}>{x}</button>]
      }
      else if(x>0){
        pagehtml = [...pagehtml, <button id={x}>{x}</button>]
      }
      })
    pagehtml = [...pagehtml, <button id="next">next</button>]
    console.log(pagehtml)
    return pagehtml
  }

import React,{Component} from 'react';

const movieview = (movies,loading, Itemclick)=>{
  var bottomcon=document.getElementById("bottomcon")
  if(loading){
    if(bottomcon)
        bottomcon.classList="bottompart"
    return (
      <div className="loadcontainer">
      <div className="loadmovie"></div>
    </div>
    )
  }

  else{
    if(bottomcon)
        bottomcon.classList="bottomp"
    if(movies.length===0){
      return (<div>Check your network!</div>)
    }
    return(
       <div className="masonry" id="contents">
          {movies.map((x,indx)=>{
            return getMovieDiv(x,indx, Itemclick)
            }
          )}
        </div>
    )
  }
}

const getMovieDiv=(movie,indx,Itemclick)=>{
    if(movie){
      return(
        <div className='item' id={movie.id} key={indx} onClick={Itemclick}>
          <img src={movie.img} 
               alt={movie.title} 
               className='poster'
               onError={(e)=>{e.target.onerror = null; e.target.src="https://cdn.browshot.com/static/images/not-found.png"}}
               ></img>
          <p>
            {movie.title} {'  '} 
            <strong>{movie.score}</strong>
          </p>
        </div>
      )
    }
  }

  export default movieview
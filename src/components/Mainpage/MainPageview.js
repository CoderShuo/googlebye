import React from 'react';

import Moviedetail from '../Details/Moviedetail'
import {Link} from 'react-router-dom'
import Navigator from './Navigator'
import Footer from './Footer'

export const MainPageview = (movies, page, loading)=>
{

  return(
  <div class="container">
    <Navigator/>
    <div class="masonry" id="contents" onClick={Itemclick}>
      {movies.map(x=>{
        return getMovieDiv(x)
        }
      )}

    </div>

    <div id="page">
      {Pagerender(page)}
    </div>
    <Footer/>
  </div>)
}


const getMovieDiv=(movie)=>{
  if(movie){
    return(
      <li class='item' id={movie.id}>
        <img src={movie.img} alt={movie.title} width='150'></img>
        <p>
          {movie.title}  
          <strong>{movie.score}</strong>
        </p>
      </li>
    )
  }
}

const Pagerender=(page)=>{
  var from = parseInt(page/10)*10
  var arr = [];
  for(var i = from; i < from+10; i++){
    arr.push(i);
  }
  var pagehtml = [
    <button class="pagebutton" id="pre" disabled={page==1}>pre</button>
  ]
  arr.map(x=>{
    if(x===page){
      pagehtml = [...pagehtml, <button class="pagebutton" id={x} style={{color:"#111"}}>{x}</button>]
    }
    else if(x>0){
      pagehtml = [...pagehtml, <button class="pagebutton" id={x}>{x}</button>]
    }
  })
  pagehtml = [...pagehtml, <button class="pagebutton" id="next">next</button>]
  return pagehtml
}



const Itemclick=(event)=>{
  if(!event.target.closest("li"))
    return
  var url = "/detail/" + event.target.closest("li").id
  //return(<Moviedetail></Moviedetail>)
  window.location.assign(url)
}
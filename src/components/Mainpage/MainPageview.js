import React from 'react';
import Navigator from './Navigator'
import Footer from './Footer'

export const MainPageview = (movies, page, loading)=>
{

  if (loading) {
    console.log(loading,page)
    return(
      <div className="contrainer">
      <Navigator/>
      <img src="loading-balls.svg" alt="Loading icon" />
      <div id="page" className="pagepart">
      {Pagerender(page)}
      </div>
    </div>
    )
  }
  if(movies){
    return(
      <div class="container">
        <Navigator/>
        <div className="masonry" id="contents" onClick={Itemclick}>
          {movies.map(x=>{
            return getMovieDiv(x)
            }
          )}
        </div>

        <div id="page" className="pagepart">
          {Pagerender(page)}
        </div>
        <Footer/>
      </div>)
  }
}


const getMovieDiv=(movie)=>{
  if(movie){
    return(
      <div className='item' id={movie.id}>
        <img src={movie.img} alt={movie.title} className='poster'></img>
        <p>
          {movie.title} {'  '} 
          <strong>{movie.score}</strong>
        </p>
      </div>
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
    <button className="pagebutton" id="pre" disabled={page==1}>pre</button>
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
  pagehtml = [...pagehtml, <span class="pagebutton goto" ><input className="inputno" maxLength="3" width="3"/><div id="switchpage" className="jump">Go to page</div></span>]
  return pagehtml
}



const Itemclick=(event)=>{
  if(!event.target.closest("div") | event.target.closest("div").id.length<9)
    return
  console.log(event.target.closest("div").id.length)
  var url = "/detail/" + event.target.closest("div").id
  //return(<Moviedetail></Moviedetail>)
  window.location.assign(url)
}
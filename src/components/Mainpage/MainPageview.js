import React from 'react';
import Navigator from './Navigator'
import Footer from './Footer'
import '../../assets/css/style_MainPage.css'

export const MainPageview = (movies, page, loading, searchmovie, norpage,changesort)=>
{

  if (loading) {
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
  if(movies.length>0){
    return(
      <div className="container">
        <Navigator funsearch={(query,page)=>searchmovie(query,page)} norpage={(page, sort)=>norpage(page,sort)} changesort={(sort)=>changesort(sort)}/>
        <div className="masonry" id="contents" onClick={Itemclick}>
          {movies.map((x,indx)=>{
            return getMovieDiv(x,indx)
            }
          )}
        </div>

        <div id="page" className="pagepart">
          {Pagerender(page)}
        </div>
        <Footer/>
      </div>)
  }
  else{
    return(
      <div className="container">
        <Navigator funsearch={(query,page)=>searchmovie(query,page)} norpage={(page, sort)=>norpage(page,sort)} changesort={(sort)=>changesort(sort)}/>
        <div className="masonry" id="contents" onClick={Itemclick}>
          <div className='notfound'>404 No results found.</div>
        </div>

        <div id="page" className="pagepart">
          {Pagerender(page)}
        </div>
        <Footer/>
      </div>)
  }
}


const getMovieDiv=(movie,indx)=>{
  if(movie){
    return(
      <div className='item' id={movie.id} key={indx}>
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

const Pagerender=(page)=>{
  var from = parseInt(page/10)*10
  var arr = [];
  for(var i = from; i < from+10; i++){
    arr.push(i);
  }
  var pagehtml = [
    <button className="pagebutton" id="pre" disabled={page==1} key={0}>pre</button>
  ]
  arr.map((x,indx)=>{
    if(x===page){
      pagehtml = [...pagehtml, <button className="pagebutton" id={x} key={indx+1} style={{color:"#111"}}>{x}</button>]
    }
    else if(x>0){
      pagehtml = [...pagehtml, <button className="pagebutton" id={x} key={indx+1}>{x}</button>]
    }
  })
  pagehtml = [...pagehtml, <button className="pagebutton" id="next" key={11}>next</button>]
  pagehtml = [...pagehtml, <span className="pagebutton goto" key={12}><input className="inputno" maxLength="3" width="3"/><div id="switchpage" className="jump">Go to page</div></span>]
  return pagehtml
}



const Itemclick=(event)=>{
  if(event.target.closest("div").id =="contents")
    return
  var url = "/detail/" + event.target.closest("div").id
  //return(<Moviedetail></Moviedetail>)
  window.location.assign(url)
}
import React, {Component} from 'react';
const hctext = " No hotcomment yet, try to be the first one. :)"
export const Movie=(movie)=>{

        return (
        <div className="top">
        <div className="header">
            <div className="Mainpic">
            <img 
            src={movie.img} 
            alt={movie.title} 
            width="200px"
            onError={(e)=>{e.target.onerror = null; e.target.src="https://cdn.browshot.com/static/images/not-found.png"}}
            ></img>
            </div>
            <div className="movie-info">
                <span className="title">{movie.title}</span>
                <br/>
                <div className='tagline'>{movie.tagline}</div>
                <div className='genres'>
                {movie.genres.map(x=>
                    {return <p className='genre'>{x.name}</p>}
                )}
                </div>
                <span className="info descotent"> <b className="des">Description:</b><br/>{movie.description}</span>
                <br/>
                <span className="info"> <b>Release date:{'  '}</b>{movie.releasedate}</span>
                <br/>
                <span className="info"> <b>Duration:{'  '}</b>{movie.duration} minutes</span>
                <br/>
                <span className="info"> <b>Languages:{'  '}</b>{movie.spoken_lan.map(x=>
                    {return <span className='lan'>{x.name}{'    '}</span>})}
                </span>
            </div>

            <div className="commentofinterest">
            <div className="userlogo">user feedback</div>
            <span className="score"> <strong className="ratingnum">{movie.score} </strong>
                <div className="vote">
                    <div className="vpoint">Points</div> 
                    <div className="vcount">{movie.votecount} participents</div>
                </div>
                </span>
                <br/>
                <span> <b>Hot comment:</b>{movie.hotcomment? movie.hotcomment:hctext}</span>
                <br/>
            </div>
            <div class="clearfloat"></div>
        </div>
        </div>
        )
}
import React, {Component} from 'react';
const hctext = " No hotcomment yet, try to be the first one. :)"
export const Movie=(movie)=>{

        return (
        <div className="top">
        <h1 className="title">{movie.title}</h1>
        <div className="header">
            <div className="Mainpic">
            <img 
            src={movie.img} 
            alt={movie.title} 
            width="150px"
            onError={(e)=>{e.target.onerror = null; e.target.src="https://cdn.browshot.com/static/images/not-found.png"}}
            ></img>
            </div>
            <div className="movie-info">
                <span> <b>Score:</b> {movie.score}</span>
                <br/>
                <span> <b>Description:</b> {movie.description}</span>
                <br/>
                <span> <b>Hot comment:</b>{movie.hotcomment? movie.hotcomment:hctext}</span>
                <br/>
                <span> <b>Release date:</b>{movie.releasedate}</span>
                <br/>
                <span> <b>Duration:</b>{movie.duration} minutes</span>
            </div>
            <div class="clearfloat"></div>
        </div>
        </div>
        )
}
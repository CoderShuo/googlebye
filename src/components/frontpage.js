import React, {Component} from 'react';
import {firestore} from '../config/firebase'

class frontpage extends Component{


    constructor(props){
        super(props);
        this.state={
            movie: null,
        }
        this.getData()
    }


    render(){
        if(this.state.movie){
            var movie = this.state.movie
            console.log(this.state.movie)
            return(
                <div className="preview">
                    Movie preview
                    {this.createMovie(movie.img, movie.title, movie.score, movie.releasedate)}
                </div>
                )
        }
        else{
            console.log("no data") 
            return null
        }
 
    }

    getData(){
        const docRef = firestore.collection("movies").limit(5);
        docRef.get()
        .then(querySnapshot => querySnapshot.forEach(
            doc=>
            this.setState({
                movie: [this.state,doc.id,doc.data()],
                })
            
        ))
        .catch(error=>
            console.log("Error getting document:", error));
    }


    createMovie(img, title, score, date){
        console.log("create")
        return (
            <div className="mb-movie">
                <img src={img}></img>
                <div className="title">{title}</div>
                <div className="score">{score}</div>
                <div className="date">{date}</div>
            </div>
        )
    }
}

export default frontpage 
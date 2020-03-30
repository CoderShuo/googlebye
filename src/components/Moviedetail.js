import React, {Component} from 'react';
import {auth} from '../config/firebase';
import * as firebase from 'firebase'
import './Moviedetail.css'
import {firestore} from '../config/firebase'

class Moviedetail extends Component {
   constructor(props){
     super(props);
     this.state={
//       page: 1,
//       limit: 15,
       movies: [],
     }
}
  render(){
    var movie = this.state.movies[1]
    console.log(movie)
    if(movie){
    return(
      <div>
        <div>
          movie details
          </div>
        <div style={{width:"50%"}}>
            <div className='item'>
            <img src={movie.img} alt={movie.title} width='150'></img>
            <p><b>{movie.title}</b></p>
            <div className="movie-detail">
              <p> <b>Score:</b> {movie.score}</p>
              <p> <b>Description:</b> {movie.description}</p>
              <p> <b>Hot comment:</b>{movie.hotcomment}</p>
              <p> <b>Release date:</b>{movie.releasedate}</p>
              <div className="user-comment">
              <textarea placeholder="Leave your comments here..." rows="6" cols="40"></textarea>
              <select>
                <option>Please rate the movie</option>
                <option>1(very bad)</option>
                <option>2(unsatisfied)</option>
                <option>3(good)</option>
                <option>4(recommend)</option>
                <option>5(highly recommend)</option>
              </select>
              </div>
             <button id="submit" onClick={this.tips}>submit</button>
            </div>
            
          </div>
      </div>
     </div>
    )
  }
  else{
    return(
    <div>
    movie details
    </div>)
  }
  }
  
  componentWillMount(){
    this.gotoPage(1);
  }

  tips(){

    alert("Thanks for your comment.")

  }
  gotoPage(page){
    var tartId = 123456 + 5 * (page-1)
    var first = firestore.collection("movies")
        .orderBy(firebase.firestore.FieldPath.documentId())
        .startAt(String(tartId))
        .limit(5);
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

}
export default Moviedetail
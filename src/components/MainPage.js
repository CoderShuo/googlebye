import {Component} from 'react';
import {auth} from '../config/firebase';
import * as firebase from 'firebase'
import '../assets/css/style_MainPage.css'
import {firestore} from '../config/firebase'
import {MainPageview} from './MainPageview'

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
      MainPageview(this.state.movies, this.state.page)
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
    console.log(pageControl)
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
  
}
export default MainPage
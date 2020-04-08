import {Component} from 'react';

import * as firebase from 'firebase'
import '../../assets/css/style_MainPage.css'
import {firestore} from '../../config/firebase'
import {MainPageview} from './MainPageview'


class MainPage extends Component {
  constructor(props){
    super(props);
    this.state={
      page: 1,
      limit: 15,
      movies: [],
      loading: false,
    }
    this.gotoPage(1)
  }

  render(){
    console.log("current state = ", this.state.page)
    return (
      MainPageview(this.state.movies, this.state.page, this.state.loading)
    )
  }

 

  componentWillReceiveProps(){
    console.log("will receive")
    var currentUser = firebase.auth().currentUser
    console.log("currentUser:",currentUser)
  }

  gotoPage(page){
    // this.setState({
    //   loading:true,
    // })
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
    this.setState({
      movies:movie,
      page:page,
      loading:false,
    })
  })
  }

  componentDidMount(){
    var pageControl = document.getElementById("page")
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
        this.gotoPage(jumpto)
      }, 500)
    })
  }
  
}
export default MainPage
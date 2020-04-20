import React, {Component,findDOMNode} from 'react';
import Navigator from './Navigator'
import * as firebase from 'firebase'
import '../../assets/css/style_MainPage.css'
import {firestore} from '../../config/firebase'
import {MainPageview} from './MainPageview'
import {FetchData} from '../../api/fetch'
import Footer from './Footer';

class MainPage extends Component {
  constructor(props){
    super(props);
    this.state={
      page: 1,
      limit: 32,
      movies: [],
      loading: false,
    }
  }

  render(){
    var movies = this.state.movies
    console.log(movies)
    console.log(movies.length)
    console.log("current state = ", this.state.page)
    return (
      MainPageview(this.state.movies, this.state.page, this.state.loading)
    )
  }

 
  componentWillMount(){
    this.gotoPage(1)
  }

  componentWillReceiveProps(){
    var currentUser = firebase.auth().currentUser
    console.log("currentUser:",currentUser)
  }

  gotoPage(page){

  // The way extract data from firebase
  //   var tartId = 123456 + this.state.limit * (page-1)
  //   var first = firestore.collection("movies")
  //       .orderBy(firebase.firestore.FieldPath.documentId())
  //       .startAt(String(tartId))
  //       .limit(this.state.limit);
  //   first.get().then((documentSnapshots) =>{
  //     var movie = []
  //     documentSnapshots.forEach(function(doc) {
  //       var data = doc.data()
  //       data['id']= doc.id
  //       movie.push(data)
  //   })
  //   this.setState({
  //     movies:movie,
  //     page:page,
  //     loading:false,
  //   })
  // })

  // Fetch data from api
      this.setState({
        loading:true
      })
      FetchData(page)
      .then(data=>{
        this.setState({
          movies:data,
          page:page,
          loading: false,
        })
      })
      .catch(err=>
        console.log(err))
  }

  componentDidMount(){

    var pageControl = document.getElementById("page")
    if(!pageControl)
      return

    pageControl.addEventListener("click", (event)=>{

      if(event.target.className==="inputno")
        return 
      if(event.target.closest("span")){
        var page = event.target.previousElementSibling.value
        if (!page)
          return 
        console.log("switch to page",page)
        this.gotoPage(parseInt(page))
        event.target.previousElementSibling.value=""
      }

      var pagebtn = event.target.closest("button")
      if(!pagebtn)
        return

      var page = pagebtn.id
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
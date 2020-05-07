import React, {Component} from 'react';
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
      recent:false,
      sort:'popularity.desc',
    }
  }

  render(){
    return (
      MainPageview(this.state.movies, this.state.page, this.state.loading, (query, page)=>this.searchMovie(query,page)
      ,(page)=>this.gotoPage(page),(sort)=>this.changesort(sort))
    )
  }

 
  componentWillMount(){
    this.gotoPage(this.state.page,'',this.state.sort)
  }

  searchMovie(query, page){

    this.setState({
      query: query,
      loading:true
    })
    FetchData(page,query)
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

  changesort(sort){
    this.setState({
      loading:true,
      sort:sort
    })
    FetchData(1,'',sort)
    .then(data=>{
      this.setState({
        movies:data,
        page:1,
        loading: false,
      })
    })
    .catch(err=>
      console.log(err))

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
        loading:true,
      })
      FetchData(page,'',this.state.sort)
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
        if(this.state.query){
          this.searchMovie(this.state.query, parseInt(page))
        }
        else{
        this.gotoPage(parseInt(page))
        }
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
        if(this.state.query){
          this.searchMovie(this.state.query, jumpto)
        }
        else{
        this.gotoPage(parseInt(jumpto))
        }
      }, 500)
    }
  )
  


    //searchbtn.addEventListener('click',()=>{console.log(query)})
  
  }

  
}
export default MainPage
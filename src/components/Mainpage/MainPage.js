import React, {Component} from 'react';
import '../../assets/css/style_MainPage.css'
import {firestore} from '../../config/firebase'
import {MainPageview} from './MainPageview'
import {FetchData} from '../../api/fetch'
import Footer from './Footer';

class MainPage extends Component {
  constructor(props){
    var sort = localStorage.getItem('sort')
    sort = sort? sort:'popularity.desc'
    var query = localStorage.getItem('query')
    query = query? query:null
    super(props);
    this.state={
      page: 1,
      movies: [],
      loading: false,
      sort:sort,
      query: query
    }
  }

  render(){
    return (
      MainPageview(this.state.movies, this.state.page, this.state.loading, (query, page)=>this.searchMovie(query,page)
      ,(page)=>this.gotoPage(page),(sort)=>this.changesort(sort))
    )
  }

 
  componentWillMount(){
    console.log('mounttttttttt')
    var page = localStorage.getItem('page')
    var sort = localStorage.getItem('sort')
    var query = localStorage.getItem('query')
    page = page?parseInt(page):this.state.page
    sort = sort? sort:this.state.sort
    query = query? query: this.state.query

    if(query&&query!='null'){
      console.log('search',query,page)
      this.searchMovie(query, page)
    }
    else{
      console.log('sort',sort,page)
      this.gotoPage(page)
    }
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

      localStorage.setItem('page',page)
      localStorage.setItem('query',query)
      
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
        query:null
      })
    })
    .catch(err=>
      console.log(err))
    localStorage.setItem('sort',sort)
    localStorage.setItem('page',1)
    localStorage.setItem('query',null)
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
      FetchData(page,null,this.state.sort)
      .then(data=>{
        this.setState({
          movies:data,
          page:page,
          loading: false,
        })
      })
      .catch(err=>
        console.log(err))
        localStorage.setItem('page', page);   
        localStorage.setItem('sort',this.state.sort)
        localStorage.setItem('query',null)     
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
        var query = this.state.query
        if (!page)
          return 
        if(query&&query!='null'){
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
        if(this.state.query&&this.state.query!='null'){
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
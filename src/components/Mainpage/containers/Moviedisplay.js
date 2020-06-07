import { connect } from "react-redux"
import movieview from "../Movieview"
import React,{Component} from 'react';
import {FetchData} from '../../../api/fetch'
import equal from 'fast-deep-equal'
import {ChangeMaxpage} from '../actions'


class Moviedisplay extends React.Component{
    constructor(props){
        super(props);
        this.state={
            movies:[],
            loading:true,
        }
    }
    
    getMovies(props){
        var page = props.fetchinfo.page
        var query = props.fetchinfo.query
        var sort = props.fetchinfo.sort
        this.prev = {
            page:page,
            query:query,
            sort: sort,   
        }

        
        this.setState({
            loading:true,
        })
        
        FetchData(page,query,sort)
        .then(data=>{
            this.props.ChangeMaxpage(data[1])
            this.setState({
                movies:data[0],
                loading:false,
            })

        })
        .catch(e=>alert("Check your network!"))
    }

    shouldComponentUpdate(nextProps, nextStates){
        if(!equal(nextProps.fetchinfo,this.prev)){
            this.getMovies(nextProps)
            return true
        }
        else{
            return true
        }
    }
    

    componentWillMount(){
        this.getMovies(this.props)
}
    render(){ 
        let movies = this.state.movies
        return movieview(movies,this.state.loading,this.ItemClick)
    }

    ItemClick(event){
        var url = "/detail/" + event.target.closest("div").id
        window.location.assign(url)
    }

}

const mapStateToProps = state =>({
    fetchinfo:
    {
        query:state.fetchchange.query,
        page:state.fetchchange.page,
        sort:state.fetchchange.sort,
    }})

const mapDispatchToProps = dispatch => ({
    ChangeMaxpage: page => dispatch(ChangeMaxpage(page)),
  })

export default connect(
    mapStateToProps,mapDispatchToProps
)(Moviedisplay)
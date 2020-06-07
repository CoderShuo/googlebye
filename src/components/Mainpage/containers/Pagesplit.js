import { connect } from "react-redux"
import Pageview from "../Pageview"
import {ChangePage, ChangeMaxpage} from '../actions'

const mapStateToProps = state =>({pages:{
    page: state.fetchchange.page,
    maxpage:state.fetchchange.maxpage
}})

const mapDispatchToProps = dispatch => ({
    ChangePage: page => dispatch(ChangePage(page)),
  })

  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Pageview)
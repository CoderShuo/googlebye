import React, {Component} from 'react';
import About from '../../Others/about'
import { Link } from 'react-router-dom';

class Footer extends Component {
    render(){
        return(
            <footer>
            <span className="about"><b><Link to='/about' target="_blank">About us</Link></b></span>
            </footer>
    )
}
}

export default Footer
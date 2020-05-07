import React, {Component} from 'react';
import Loginview from './components/Login/Loginview'
import {Redirect, BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import MainPage from './components/Mainpage/MainPage';
import DetailContainer from './components/Details/detailcontainer'
import About from './Others/about';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Switch>
            <Redirect exact from="/" to="Login" />
            <Route path='/login' exact component={Loginview} />
            <Route path='/index' component={MainPage} />
            <Route path='/detail/:id' exact component={DetailContainer} />
            <Route path='/about' exact component={About}/>
          </Switch>
        </div>
      </Router>
    );
  }
}
export default App;
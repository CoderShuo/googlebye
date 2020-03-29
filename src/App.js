import React, {Component} from 'react';
import Login from './components/Login'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import MainPage from './components/MainPage';


class App extends Component {
  render() {
    console.log("appjs")
    return (
      <Router>
        <div className="container">
          <Switch>
            <Route path='/login' exact component={Login} />
            <Route path='/index' component={MainPage} />
          </Switch>
        </div>
      </Router>
    );
  }
}
export default App;
import React, {Component} from 'react';
import Login from './components/Login'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import frontpage from './components/frontpage';


class App extends Component {
  render() {
    console.log("appjs")
    return (
      <Router>
        <div className="container">
          <Switch>
            <Route path='/' exact component={Login} />
            <Route path='/index' component={frontpage} />
          </Switch>
        </div>
      </Router>
    );
  }
}
export default App;
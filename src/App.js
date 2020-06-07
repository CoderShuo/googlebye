import React, {Component} from 'react';
import Loginview from './components/Login/Loginview'
import {Redirect, BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import MainPage from './components/Mainpage/MainPage';
import DetailContainer from './components/Details/detailcontainer'
import About from './Others/About';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './components/Mainpage/reducers'

const store = createStore(rootReducer)

class App extends Component {
  render() {
    return (
      <Router>
          <Switch>
            <Redirect exact from="/" to="login" />
            <Route path='/login' exact component={Loginview} />
            <Route path='/about' exact component={About}/>
            
            <Provider store={store}>
              <Route path='/index' component={MainPage} />
              <Route path='/detail/:id' exact component={DetailContainer} />
            </Provider>

          </Switch>
      </Router>
    );
  }
}
export default App;
import React, {Component} from 'react';
import List from './components/List';
import Login from './components/Login'

class App extends Component {
  render() {
    return (
      <div className="container">
        <Login/>
      </div>
    );
  }
}
export default App;
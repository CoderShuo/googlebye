
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reduxThunk from 'redux-thunk';
import App from './App';
import * as serviceWorker from './serviceWorker';


ReactDOM.render(
    <App />,
  document.getElementById("root")
);
serviceWorker.register();
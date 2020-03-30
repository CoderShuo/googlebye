import React from 'react'
import {Router, Route, browserHistory} from 'react-router'

import Login from './components/Login'
import frontpage from './components/frontpage'

const history = browserHistory;
const Routes = ()=>{
    <Router history={browserHistory}>
        <Route path = "/" component = {App}>
            <Router path="Login" component={Login}/>
            <Router path="frontpage" component={frontpage}/>
        </Route>
    </Router>
}

export default Routes;
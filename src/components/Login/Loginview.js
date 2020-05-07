import React, {Component} from 'react';
import '../../assets/css/style_login.css'
import {logbtnfuction} from './Logincontainer'
import Popup from "reactjs-popup";
class Loginview extends Component {
 
  render(){
    return(
    <div className="Signcontainer">
        <div className="wrap-login">
        <form className="form-login">
            <span className="LoginTitle">Welcome to Googlebye</span>
            <div className="wrap-input">
              <input id = "txtEmail" className="input-login" placeholder = "Email"></input>
            </div>
            <div className="wrap-input">
              <input id = "txtPassword" className="input-login" placeholder = "Password" type="password"></input>
            </div>
            <div className="text-right">
              <a id="reset" href="">Forgot your password?</a>
            </div> 
            </form>
            <button id="btnLogin" className="login-button btn-action">Log in/Sign Up</button>
              
            <div className="wrap-login-with">
              <span><b>Login with:</b></span>
              <button id="btnfb" className="login-with webgap">
                <img src= {require('../../assets/images/facebook.png')}  className="svelte"/>
                <div className="button-content">
                  <span className="button-text svelte">Facebook</span>
                </div>
              </button>

              <button id="btngg" className="login-with webpack">
                <img src= {require('../../assets/images/google.png')} className="svelte"/>
                <div className="button-content">
                  <span className="button-text">Google</span>
                </div>
              </button>
            </div>
            <div className="Signtip">
    Sign up means you agree with <Popup trigger ={<u className="policy">our aggrement</u>} position="right center">
          <div>
            Free free to use and have fun with our application. 
          </div>
            </Popup>
            </div>
        </div>
    </div>)
  }

  componentDidMount(){
    logbtnfuction();
  }

}

export default Loginview
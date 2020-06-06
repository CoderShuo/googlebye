import React, {Component} from 'react';
import '../../assets/css/style_login.css'
import {logbtnfuction} from './Logincontainer'
import Popup from "reactjs-popup";
import {ModalTip, ModalConfirm} from '../Modal'

class Loginview extends Component {
  constructor(props){
    super(props);
    this.state={
    showModal:false, 
    fun:null,
    title:null,
    body:null,
    showConModal:false,
    flag:false,
    }
  }
  render(){
  return(
    <>
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
              <u id="reset">Forgot your password?</u>
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
    </div>
     {ModalTip(this.state.showModal,this.state.fun,this.state.title,this.state.body)}
     {ModalConfirm(this.state.showConModal,this.state.fun,this.state.title,this.state.body,this.state.flag,false)}
     </>
    )
  }

  componentDidMount(){
    logbtnfuction((showModal,fun,title,body,showConModal)=>this.modalstateChange(showModal,fun,title,body,showConModal),
                  );

  }

  modalstateChange(showModal,fun,title,body,showConModal){
    fun = fun==null? ()=>this.setState({showModal:false,showConModal:false}):fun
    this.setState({
      showModal:showModal,
      fun:fun,
      title:title,
      body:body,
      showConModal:showConModal,
    })

  }

}

export default Loginview
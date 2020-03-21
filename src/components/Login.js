import React, {Component} from 'react';
import {auth} from '../config/firebase';
import * as firebase from 'firebase'
import './style.css'

class Login extends Component {

  render(){
    return (
      <div className="Signcontainer">
        <div className="wrap-login">
          <form className="form-login">
            <span className="LoginTitle">Welcome to Googlebye</span>
            <div className="wrap-input">
              <span className="label-login">Username</span>
              <input id = "txtEmail" className="input-login" placeholder = "Email"></input>
            </div>
            <div className="wrap-input">
              <span className="label-login">Password</span>
              <input id = "txtPassword" className="input-login" placeholder = "Password" autocomplete="off"></input>
            </div>
            <div class="text-right">
              <a href="javascript:">Forgot your password?</a>
            </div>
            <button id="btnLogin" className="login-button btn-action">Log in</button>
            <div className="text-center">
              <span>Login with ...</span>
            </div>
            <div className="wrap-login-with">
              <a href="#" class="login-with bg1">
                <i class="fa fa-facebook"></i>
              </a>
              <a href="#" class="login-with bg2">
                <i class="fa fa-twitter"></i>
              </a>
              <a href="#" class="login-with bg3">
                <i class="fa fa-google"></i>
              </a>
            </div>
            <button id="btnSignUp" className="btn btn-action">Sign Up</button>
            <button id="btnLogout" className="btn btn-action hide">Log out</button>
            <div className="Signtip">
              Sign up means you agree with our aggrement
            </div>
            <div className="Card Login-socialLogin">
              <span> other login methods
                <span className="Login-socialButtonGroup">
                  <div class="Login-socialButton">
                    <button id="btnfb" className="btn btn-action">
                    <div className="button-content">
                      
                      <div class="button-text svelte-ol2sdn">
                        <span class="button-type svelte-ol2sdn">Facebook</span>
                      </div>
                    </div>
                    </button>
                  </div>
                </span>
              </span>
            </div>
          </form>
        </div>
      </div>  
    )
  }
  componentDidMount(){
    // Get elements
    const txtEmail = document.getElementById('txtEmail')
    const txtPassword = document.getElementById('txtPassword')
    const btnLogin = document.getElementById('btnLogin')
    const btnSignUp = document.getElementById('btnSignUp')
    const btnLogout = document.getElementById('btnLogout')
    const btnfb = document.getElementById('btnfb')
    // Add signin event
    btnLogin.addEventListener('click',e=>{
      const email = txtEmail.value;
      const pass = txtPassword.value;
      // Sign in
      const promise = auth.signInWithEmailAndPassword(email, pass)
      promise.catch(e=>console.log(e.message))
    })

    // Add signup event
    btnSignUp.addEventListener('click',e=>{
      // TODO: Check 4 real email
      const email = txtEmail.value;
      const pass = txtPassword.value;

      const promise = auth.createUserWithEmailAndPassword(email, pass)
      promise
        .catch(e=>console.log(e.message))
    })

    btnLogout.addEventListener("click",e=>{
      auth.signOut();
    })

    auth.onAuthStateChanged(firebaseUser=>{
      if(firebaseUser){
        console.log(firebaseUser);
        btnLogout.classList.remove('hide')
        window.alert("Login successed!")
      }else{
        console.log("not logged in")
        btnLogout.classList.add('hide')
      }
    })
    btnfb.addEventListener("click",e=>{
      var provider = new firebase.auth.FacebookAuthProvider;
      provider.addScope('user_birthday')
      auth.languageCode = "fr_FR"

      firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
        }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
        });
    })
    
    
  }

}

export default Login
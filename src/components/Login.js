import React, {Component} from 'react';
import {auth} from '../config/firebase';
import * as firebase from 'firebase'
import './style_login.css'
import {firestore} from '../config/firebase'

class Login extends Component {
 
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
              <a href="javascript:">Forgot your password?</a>
            </div> 
            </form>
            <button id="btnLogin" className="login-button btn-action">Log in/Sign Up</button>
            <div className="text-center">
              <span>Login with ...</span>
            </div>
            <div className="wrap-login-with">
              <button id="btnfb" className="btn-action login-with">Facebook</button>
              <button id="btngg" className="btn-action login-with">Google</button>
            </div>
            <div className="Signtip">
              Sign up means you agree with our aggrement
            </div>
        </div>
    </div>)
  }

  componentDidMount(){
    // Get elements
    const txtEmail = document.getElementById('txtEmail')
    const txtPassword = document.getElementById('txtPassword')
    const btnLogin = document.getElementById('btnLogin')
    const btnSignUp = document.getElementById('btnSignUp')
    const btnLogout = document.getElementById('btnLogout')
    const btnfb = document.getElementById('btnfb')
    const btngg = document.getElementById('btngg')
    // Add signin event
    btnLogin.addEventListener('click',e=>{
      const email = txtEmail.value;
      const pass = txtPassword.value;
      var userexist = true;
      // Sign in
      console.log(txtEmail)
      auth.fetchSignInMethodsForEmail(email).then(
        result=>{
          console.log(result)
          if (result.length==0){
            var flag = window.confirm("The user doesn't exist, do you want to create a new account?")
            if(flag){
              const promise = auth.createUserWithEmailAndPassword(email, pass)
              promise.catch(e=>console.log(e.message))
            }
          }
          else{
            const promise = auth.signInWithEmailAndPassword(email, pass)
            promise.catch(
              e=>{
              console.log(e.message)
              window.alert(e)
            })
          }

        }
      )
    })

    // // Add signup event
    // btnSignUp.addEventListener('click',e=>{
    //   // TODO: Check 4 real email
    //   const email = txtEmail.value;
    //   const pass = txtPassword.value;

    //   const promise = auth.createUserWithEmailAndPassword(email, pass)
    //   promise
    //     .catch(e=>console.log(e.message))
    // })

    // btnLogout.addEventListener("click",e=>{
    //   auth.signOut();
    // })

    auth.onAuthStateChanged(firebaseUser=>{
      if(firebaseUser){
        console.log(firebaseUser);
        window.alert("Login successed!")
        window.location.assign("/index")
      }else{
        console.log("not logged in")
      }
    })
    btnfb.addEventListener("click",e=>{
      var provider = new firebase.auth.FacebookAuthProvider;
      firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log("successed", user)
        // ...
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        console.log(error)
        var Msg = "Login failed, please try another way to Login with " + email
        alert(Msg)
      });
    })
    btngg.addEventListener("click", e=>{
      var provider = new firebase.auth.GoogleAuthProvider;
      firebase.auth().signInWithPopup(provider)
    })
    
    
    
  }

}

export default Login
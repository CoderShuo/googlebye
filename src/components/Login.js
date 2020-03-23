import React, {Component} from 'react';
import {auth} from '../config/firebase';
import * as firebase from 'firebase'
import './style.css'
import {Link} from 'react-router-dom'

class Login extends Component {

    render(){
        console.log("hello everyone")
        return (
            <div className="Signcontainer">
                <div className="banner">Welcome to Googlebye</div>
                <div className="SignFlow-accountInput">
                    <input id = "txtEmail" type="email" placeholder = "Email"></input>
                </div>
                <div className="SignFLow-password">
                    <input id = "txtPassword" type="password" placeholder = "Password"></input>
                </div>
                <div className="Signoptions">
                    <button>Forget your password?</button>
                </div>
                <button id="btnLogin" className="btn btn-action">Log in</button>
                <button id="btnSignUp" className="btn btn-action">Sign Up</button>
                <button id="btnLogout" className="btn btn-action hide">Log out</button>
                <div className="Signtip">
                    Sign up means you agree with our aggrement
                </div>
                <div className="Card Login-socialLogin">
                    <span> other login methods
                        <span className="Login-socialButtonGroup">
                            <div className="Login-socialButton">
                                <button id="btnfb" className="btn btn-action">Facebook</button>
                                <button id="btngg" className="btn btn-action">Google</button>
                            </div>
                        </span>
                    </span>
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
        const btngg = document.getElementById('btngg')
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
                window.location.assign("/index");
            }else{
                console.log("not logged in")
                btnLogout.classList.add('hide')
            }
        })
        btnfb.addEventListener("click",e=>{
            var provider = new firebase.auth.FacebookAuthProvider;

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

        btngg.addEventListener("click",e=>{
            var provider = new firebase.auth.GoogleAuthProvider();

            firebase.auth().signInWithPopup(provider).then(function(result) {
                // This gives you a Google Access Token. You can use it to access the Google API.
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
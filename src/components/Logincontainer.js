
import {auth} from '../config/firebase';
import * as firebase from 'firebase'

export const logbtnfuction = ()=>{
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
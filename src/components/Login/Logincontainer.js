
import {auth} from '../../config/firebase';
import * as firebase from 'firebase'

export const logbtnfuction = ()=>{
        // Get elements
        const txtEmail = document.getElementById('txtEmail')
        const txtPassword = document.getElementById('txtPassword')
        const btnLogin = document.getElementById('btnLogin')
        const hreset = document.getElementById('reset')
        const btnfb = document.getElementById('btnfb')
        const btngg = document.getElementById('btngg')
        // Add signin event
        btnLogin.addEventListener('click',e=>{
          const email = txtEmail.value;
          const pass = txtPassword.value;
          var userexist = true;
          // Sign in
          auth.fetchSignInMethodsForEmail(email).then(
            result=>{
              console.log(result)
              if (result.length==0){
                var flag = window.confirm("The user doesn't exist, do you want to create a new account?")
                if(flag){
                  const promise = auth.createUserWithEmailAndPassword(email, pass)
                  setTimeout(alert("Email sent, Please Check your mailbox to confirm your email"),5000)
                  console.log(email)
                  auth.currentUser.sendEmailVerification().then(function() {
                      console.log("email sent")
                    }).catch(function(error) {
                      console.log(error)})
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
        hreset.addEventListener("click", e=>{
          var auth = firebase.auth();
          var emailAddress = txtEmail.value;
          auth.sendPasswordResetEmail(emailAddress).then(function() {
            console.log("Email sent to: ",emailAddress, ",Please Check your mailbox to reset your password")
            // Email sent.
          }).catch(function(error) {
            // An error happened.
            console.log(error)
          });
        }
          )
    
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
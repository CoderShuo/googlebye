
import {auth} from '../../config/firebase';
import * as firebase from 'firebase'


export const logbtnfuction = (modalStatechange,confun)=>{
        console.log(modalStatechange)
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
            if (result.length==0){
                var body = "The user doesn't exist, do you want to create a new account?"
                var flag = window.confirm(body)
                if(flag){
                  const promise = auth.createUserWithEmailAndPassword(email, pass)
                  setTimeout(
                    ()=>{
                    var showModal=true
                    var body = "Thanks for registering!"
                    modalStatechange(showModal,null,'',body)
                  },5000)
                  promise.catch(e=>{
                    console.log(e.message)
                    modalStatechange(true,null,'',e.message)
                  })
                }

              }
              else{
                const promise = auth.signInWithEmailAndPassword(email, pass)
                promise.catch(
                  e=>{
                  console.log(e.message)
                  modalStatechange(true,null,null,e.message)
                })
              }
    
            }
          )
        })
        txtPassword.addEventListener("keyup", function(event) {
          // Number 13 is the "Enter" key on the keyboard
          if (event.keyCode === 13) {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click
            btnLogin.click();
          }
        });

        hreset.addEventListener("click", e=>{
          var auth = firebase.auth();
          var emailAddress = txtEmail.value;
          if(!emailAddress){
            var showModal=true
            var body = "Please input your email at first!"
            modalStatechange(showModal,null,'',body)
            return
          }
          
          auth.sendPasswordResetEmail(emailAddress).then(function() {
            var body = "Email sent to: "+emailAddress+ ",Please Check your mailbox to reset your password"
            modalStatechange(true,null,null,body)
            // Email sent.
          }).catch(function(error) {
            // An error happened.
            var body='There is no user record corresponding to this identifier. Please check the email again!'
            modalStatechange(true,null,null,body)
             
          });
        }
          )
    
        auth.onAuthStateChanged(firebaseUser=>{
          if(firebaseUser){
            if(!firebaseUser.emailVerified){
              modalStatechange(true,null,null,"Your account has not been verified, please check your mailbox to verify it!")
              firebaseUser.sendEmailVerification().then(function() {
                firebase.auth().signOut()
              }).catch(function(error) {
                console.log(error)})
            }
            else{
            modalStatechange(true,()=>{window.location.assign("/index")},'Success',"Login successed!")
            }
          }else{
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
            console.log(error)
            var Msg = "Login failed, please try another way to Login with " + email
            modalStatechange(true, null, null,Msg)
          });
        })
        btngg.addEventListener("click", e=>{
          var provider = new firebase.auth.GoogleAuthProvider;
          firebase.auth().signInWithPopup(provider)
        })
      
}
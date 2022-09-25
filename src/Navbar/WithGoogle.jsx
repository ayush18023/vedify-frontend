import auth from './Finitiate'
import React from 'react'
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import './Navbar.css'

const signinwithgoogle=()=>{
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((result) => {
        const user = result.user;
        console.log(user)
    }).catch((error) => {
        console.log(error)
    });
}

const WithGoogle = () => {
  return (
    <div id="customBtn" class="customGPlusSignIn" onClick={signinwithgoogle}>
        <span class="icon"></span>
        <span class="buttonText">Sign in with Google</span>
    </div>
  )
}

export default WithGoogle

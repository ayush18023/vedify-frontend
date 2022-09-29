import auth from "./Finitiate";
import React from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { CartOn } from "../Redux/Cart";
import { SetUser } from "../Redux/Login";
import { SetaccessToken } from "../Redux/Login";
// import { LogIn,SetaccessToken,SetUser } from '../Redux/Login';
// import { getProducts, ToggleSearch, FilterProductsbyName } from '../Redux/Pages';
const axios = require("axios");

// const toBackend=async ()=>{
//   const backendres=await axios.post('http://localhost:9000/api/v1/auth/whoami',{"authorization":`${response.user.accessToken}`})
//   console.log(backendres)
//   if(backendres.responseText="OK"){
//       dispatch(SetUser(backendres.data.data))
//       dispatch(LogIn())
//       dispatch(SetaccessToken(response.accessToken))
//       setalert(backendres.data.message)
//       closealert()
//   }
// }

const signinwithgoogle = () => {
  // let userres=''

  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then(async (result) => {
      console.log("This is auth:", result);
      const backendres = await axios.post(
        "http://localhost:9000/api/v1/auth/googleLogin",
        { authorization: `${result.user.accessToken}` }
      );
      console.log(backendres);
      // if(backendres.responseText="OK"){
      //     dispatch(SetUser(backendres.data.data))
      //     dispatch(LogIn())
      //     dispatch(SetaccessToken(response.user.accessToken))
      // }
    })
    .catch((error) => {
      console.log(error);
    });
};

const WithGoogle = () => {
  const dispatch = useDispatch();
  return (
    <div
      id="customBtn"
      className="customGPlusSignIn"
      onClick={signinwithgoogle}
    >
      <span className="icon"></span>
      <span className="buttonText">Sign in with Google</span>
    </div>
  );
};

export default WithGoogle;

import { connectAuthEmulator, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyCkWXm9sO-g2k-p9xfGQ6zFW8Y_XWXqhhE",
    authDomain: "ayurvedicweb.firebaseapp.com",
    projectId: "ayurvedicweb",
    storageBucket: "ayurvedicweb.appspot.com",
    messagingSenderId: "465704387766",
    appId: "1:465704387766:web:ee41200427534b5f059217"
};
  
// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// connectAuthEmulator(auth,"http://localhost:9899");

export const FirebaseExceptionHandler=(e)=>{
    let msg=""
    switch (e) {
        case "auth/invalid-email":
            msg="Email id not valid"
            break;
        case "auth/email-already-exists":
            msg="Email id already in use"
            break;
        case "auth/uid-already-exists":
            msg="User already exists"
            break;
        case "auth/user-not-found":
            msg="User not found"
            break;
        case "auth/weak-password":
            msg="The password is too weak"
            break;
        case "auth/wrong-password":
            msg="Wrong password. Please try again"
            break;
    
        case "auth/email-already-in-use":
            msg="Email in use"
            break;
    
        default:
            
            msg="Unknown Error occured:"+e
            break;
    }
    return msg;
}

export default auth




// signInWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed in 
//     const user = userCredential.user;
//     // ...
//     console.log(user)
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     console.log(errorMessage)
// });
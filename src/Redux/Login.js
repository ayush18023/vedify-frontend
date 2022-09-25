import { createSlice } from "@reduxjs/toolkit";


const initialState={
    islogged:0,
    userdetails:{}
}

export const LoginSlice=createSlice({
    name:"login",
    initialState,
    reducers:{
        LogIn:(state)=>{
            state.islogged=1
        },
        LogOut:(state)=>{
            state.islogged=0
        },
        SetUser:(state,action)=>{
            state.userdetails=action.payload
            console.log(JSON.stringify(state.userdetails, undefined, 2))
        }
    }
})

export const {LogIn,LogOut,SetUser} =LoginSlice.actions
export default LoginSlice.reducer
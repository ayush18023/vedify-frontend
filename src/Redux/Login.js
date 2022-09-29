import { createSlice } from "@reduxjs/toolkit";


const initialState={
    islogged:0,
    isAdmin:0,
    accessToken:"",
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
            state.userdetails={}
            state.accessToken=""
            state.isAdmin=0
        },
        SetUser:(state,action)=>{
            state.userdetails=action.payload
            console.log(state.userdetails)

        },
        SetaccessToken:(state,action)=>{
            state.accessToken=action.payload
        },
        SetAdmin:(state)=>{
            state.isAdmin=1;
        }
    }
})

export const {LogIn,LogOut,SetUser,SetaccessToken,SetAdmin} =LoginSlice.actions
export default LoginSlice.reducer
import { createSlice } from "@reduxjs/toolkit";


const initialState={
    search:0,
}

export const PageSlice=createSlice({
    name:"Page",
    initialState,
    reducers:{
        ToggleSearch:(state)=>{
            state.search=!state.search
        }
    }
})

export const {ToggleSearch} =PageSlice.actions
export default PageSlice.reducer
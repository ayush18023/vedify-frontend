import { createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import cors from 'cors'

const initialState={
    search:0,
    isLoading:true,
    products:[],
    filteredProducts:[],
    slots:[],
    medicine:[]
}

export const getProducts = createAsyncThunk(
    //action type string
    'posts/getPosts',
    // callback function
    async (thunkAPI) => {
    const res = await axios.get('http://localhost:9000/api/v1/medicine')
    return res.data.result.data
})
export const getSlots = createAsyncThunk(
    //action type string
    'posts/getSlots',
    // callback function
    async (thunkAPI) => {
    const res = await axios.get('http://localhost:9000/api/v1/schedule')
    return res.data.result.data
})

export const PageSlice=createSlice({
    name:"Page",
    initialState,
    reducers:{
        ToggleSearch:(state)=>{
            state.search=!state.search
        },
        SetProducts:(state,action)=>{
            state.products=action.payload
        },
        SetLoading:(state,action)=>{
            state.isLoading=action.payload
        },
        FilterProductsbyName:(state,action)=>{
            state.filteredProducts=state.products.filter(pro=>pro.name.toLowerCase().includes(action.payload.toLowerCase()))
        },
        AddProduct:(state,action)=>{
          state.products.push(action.payload)
        },
        DeleteProduct:(state,action)=>{
          state.products=state.products.filter(si=>(String(si._id))!==(String(action.payload._id)))
        },
        UpdateProduct:(state,action)=>{          
          // const selected=state.products.find(state=>state.products._id===action.payload._id)
          state.products=state.products.filter(si=>(String(si._id))!==(String(action.payload._id)))
          state.products.push(action.payload)
        }
    },
    extraReducers: {
        [getProducts.pending]: (state) => {
          state.isLoading = true
        },
        [getProducts.fulfilled]: (state, { payload }) => {
          state.isLoading = false
          state.products = payload
          state.filteredProducts=payload
          console.log(state.products)
        },
        [getProducts.rejected]: (state) => {
          state.isLoading = false
        },


        [getSlots.pending]: (state) => {
          state.isLoading = true
        },
        [getSlots.fulfilled]: (state, { payload }) => {
          state.isLoading = false
          state.slots = payload
          console.log(state.slots)
        },
        [getProducts.rejected]: (state) => {
          state.isLoading = false
        },
    },
})

export const {ToggleSearch,SetProducts,SetLoading,FilterProductsbyName,AddProduct,DeleteProduct,UpdateProduct} =PageSlice.actions
export default PageSlice.reducer
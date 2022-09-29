import { createSlice } from '@reduxjs/toolkit'
import * as axios from 'axios';
import { useSelector } from 'react-redux';


const initialState = {
  cartstatus: 0,
  items:[],
  totalcost:0,
  orders:[]
}

export const CartSlice = createSlice({
  name: 'Cart',
  initialState,
  reducers: {
    CartOn: (state) => {
      state.cartstatus = 1
    },
    CartOff: (state) => {
      state.cartstatus = 0
    },
    AddItem: (state, action) => {
      console.log(state)
      console.log(action.payload)
      state.items.push(action.payload)
    },
    DeleteItem:(state,action)=>{
      console.log(action.payload,String(action.payload._id))
      state.items=state.items.filter(si=>(String(si._id))!==(String(action.payload._id)))
    },
    ClearCart:(state,action)=>{
      state.items.forEach((ord)=>{
        state.orders.push(ord)
      })
      console.log("the orders:",state.orders)
      state.items=[]
    },
    Increaseqty:(state,action)=>{
      const selected =state.items.find((si)=>si._id===action.payload) 
      selected.qty+=1
    },
    Decreaseqty:(state,action)=>{
      const selected =state.items.find((si)=>si.id===action.payload) 
      selected.qty-=1
    },
    FindTotal:(state)=>{
      state.totalcost=0
      state.items.map(items=>{
        state.totalcost+=items.price*items.qty
      })
    },
    Isinside:(state,action)=>{
      console.log(JSON.stringify(state.items.find(items=>items.title===action.payload.title)))
      // if(state.items!==null){

      //   if(state.items.find(items=>items===action.payload)){
      //     return 1;
      //   }
      //   else{
      //     return 0;
      //   }
      // }
    },
    UpdateCart: async (state,action)=>{
      //fix this
      console.log("entered dispatch")
      const details={
        emailid:action.payload,
        cart:state.items
      }
      const res=await axios.post('http://localhost:5000/cart',details)
      console.log(res)
    },
  },
})

// Action creators are generated for each case reducer function
export const { CartOn, CartOff, AddItem, DeleteItem , ClearCart,Increaseqty,Decreaseqty,FindTotal,Isinside,UpdateCart} = CartSlice.actions

export default CartSlice.reducer
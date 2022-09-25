import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './Cart'
import LoginReducer from './Login'
import PageReducer from './Pages'

export default configureStore({
    reducer:{
        cart:cartReducer,
        login:LoginReducer,
        page:PageReducer
    }
})
import React, { useEffect } from 'react'
import { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch,useSelector } from 'react-redux/es/exports';
import { CartOff } from '../Redux/Cart';
import './Cart.css'
import Darkbutton from '../Components/Button';
import { DeleteItem, ClearCart,Increaseqty,Decreaseqty,FindTotal} from '../Redux/Cart';
import CartCard from './CartCard';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Link, useNavigate} from 'react-router-dom'

const Cart = () => {
    // const [sliderval, setsliderval] = useState(100)
    // const cartwidth=1300-sliderval
    const dispatch= useDispatch()
    const cartitems=useSelector(state=>state.cart.items)
    const totalcost=useSelector(state=>state.cart.totalcost)
    const navigate=useNavigate()

    // useEffect(() => {
    //   console.log(cartitems)
    // })
    const changepath=()=>{
        navigate('/checkout')
    }
  return (
    <>
        {/* sliding cart */}
        {/* <div className='cart bg-white' style={{width:`${cartwidth}px`}}>
                <div className='text-xl text-center' >CART</div>
                <div className="absolute top-2 right-2 cursor-pointer" onClick={()=>dispatch(CartOff())}><CloseIcon/></div>
                <div>
                    <input type="range" className='sliderinp' min='400' max='970'
                value={sliderval} 
                onChange={(e)=>{setsliderval(e.target.value) ; console.log(sliderval)}}
                />
                </div>
        </div> */}

        <div className='cartbackdrop' onClick={()=>dispatch(CartOff())}></div>
            <div className='cart bg-white'>
                <div className='topofcart'>
                    <div className="absolute top-4 left-2 cursor-pointer z-10" onClick={()=>dispatch(CartOff())}>
                        <ArrowBackIcon sx={{fontSize:30}}/></div>
                    <div className='text-xl text-center pt-4' >CART</div>
                </div>
                <div className='allcartitems'>
                    {cartitems.map((ci,index)=>(
                        <>
                            <CartCard cartitems={ci}/>
                        </>
                    ))}
                </div>
                <div className='totalwindow h-full'>
                    <div className='flex items-center pt-2'>
                        <div className='text-2xl flex-1 ml-8'>Total</div>
                        <div className='text-3xl mr-8'>&#8377;{totalcost}</div>
                    </div>
                    <div className='flex text-center m-2 '>
                        <div className='w-1/2 text-center p-2 m-1 cursor-pointer border-2 border-black hover:bg-black hover:text-white'
                        onClick={()=>dispatch(CartOff())}>Continue Shopping</div>
                        <div className='w-1/2 text-center p-2 m-1 cursor-pointer bg-black text-white hover:border-2 hover:border-black hover:bg-white hover:text-black'
                        onClick={()=>{changepath();dispatch(CartOff())}}>Checkout</div>
                    </div>
                </div>
            </div>
        
        
    
        
        {/* {console.log(cartitems)} */}
        
    </>
  )
}

export default Cart
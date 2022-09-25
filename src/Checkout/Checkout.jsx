import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CartCard from '../Cart/CartCard'
import Navbar from '../Navbar/Navbar'
import './Checkout.css'
import Alert from '../Components/Alert'
import { useState } from 'react'
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import {Navigate} from 'react-router-dom'
import { ClearCart, UpdateCart } from '../Redux/Cart'

const axios=require('axios')
const Checkout = () => {

    const dispatch=useDispatch()
    
    const items=useSelector(state=>state.cart.items)
    const totalcost=useSelector(state=>state.cart.totalcost)
    const islogged=useSelector(state=>state.login.islogged)
    const userdetails=useSelector(state=>state.login.userdetails)

    const [checklogin, setchecklogin] = useState(0)

    const loadScript=(src)=>{
        return new Promise((resolve) => {
            const script = document.createElement('script')
            script.src = src
            script.onload = () => {
                resolve(true)
            }
            script.onerror = () => {
                resolve(false)
            }
            document.body.appendChild(script)
        })
    }
    
    const displayrazorpay=async()=>{
        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
        
        if (!res) {
			alert('Razorpay SDK failed to load. Are you online?')
			return
		}
        const data=await axios.post('http://localhost:5000/razorpay',{totalcost:totalcost})
        console.log(data)
        const options = {
            key: "rzp_test_qTIWsVMiCwwAPF", // Enter the Key ID generated from the Dashboard
            amount: data.data.amount.toString(), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: data.data.currency ,
            order_id: data.data.id,
            name: "AM Deshmukh",
            description: "Dilevery charges will be applied seperately during time of dilevery", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            handler: function (response){
                // console.log(response.razorpay_payment_id);
                // console.log(response.razorpay_order_id);
                // console.log(response.razorpay_signature);
                // <Navigate to='/'/>
                // dispatch(UpdateCart(userdetails.emailid))
                window.location.href='/success'
            },
            prefill: {
                name: userdetails.fname+" "+userdetails.sname,
                email: userdetails.emailid,
            },
            notes: {
                address: "Razorpay Corporate Office"
            },
            theme: {
                color: "#3399cc"
            },
        };
    
        const paymentObject = new window.Razorpay(options)
		
        paymentObject.on('payment.failed', function (response){
                alert('payment.failed');
        });
        paymentObject.open()
        
    }

    

  return (

    <>
        <Navbar active={0}/>
        <img src="https://ik.imagekit.io/thestylist/Assets/JV/Banners/checkout-page-banner.png" alt="" />
        <div className='checkoutitems'>
            <div className='text-3xl ml-[70px] mt-8 mb-8'><b>SHOPPING CART</b></div>
            {items.map(items=>(
                <>
                    <hr className='w-[800px] ml-[50px]'/>
                    <div className='ml-[50px]'>
                        <CartCard cartitems={items} spread={16}/><br />
                    </div>
                    <hr className='w-[800px] ml-[50px]'/>
                
                </>
            ))}
        </div>


        <div className='checkoutwindow bg-red float-right'>
                <div className='paywindow mt-8 p-[40px]'>
                    <div className='text-3xl'><b>ORDER SUMMARY</b></div>
                    <hr className='mr-6 mt-4 w-full border-1 border-black'/>
                    <div className='flex mt-4'>
                        <p className='flex-1'>SUBTOTAL</p>
                        <p className=''>&#8377;{totalcost}</p>
                    </div>
                    <div className='flex mt-4'>
                        <p className='flex-1'>DISCOUNT</p>
                        <p className=''>&#8377;{0}</p>
                    </div>
                    <div className='mt-4'>
                        <input type="text" className='w-3/5 border border-black p-1' placeholder='Enter Promo Code'/>
                        <div className='w-1/4 bg-black border border-black text-white p-1 text-center float-right
                        hover:bg-white hover:text-black cursor-pointer'>Apply</div>
                    </div>
                    <div className='flex mt-8'>
                        <p className='flex-1'><b>TOTAL</b></p>
                        <p className=''><b>&#8377;{totalcost}</b></p>
                    </div>
                    <hr className='mr-6 mt-4 w-full border-1 border-black'/>
                    <p className='my-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, ea!</p>
                    {/* //check login while payment */}
                    {(islogged)?(
                            <div className='w-full bg-black border border-black text-white p-1 text-center float-right
                            hover:bg-white hover:text-black cursor-pointer' id='pay_butt' onClick={()=>displayrazorpay()}>Proceed to Pay</div>
                        ):(
                        <>
                            <div className='w-full bg-black border border-black text-white p-1 text-center float-right
                            hover:bg-white hover:text-black cursor-pointer' id='' onClick={()=>setchecklogin(1)}>Proceed to Pay</div>
                            {(checklogin)?(
                                <p className='text-[#ff0000]'><ReportGmailerrorredIcon/>Login to proceed further</p>
                            ):(
                                <p></p>
                            )}
                        </>
                    )}
                </div>
        </div>
    </>
  )
}

export default Checkout
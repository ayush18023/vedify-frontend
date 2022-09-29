import React,{useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import CartCard from "../Cart/CartCard";
import Navbar from "../Navbar/Navbar";
import "./Checkout.css";
import Alert from "../Components/Alert";
import { useState } from "react";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import { Navigate } from "react-router-dom";
import { ClearCart, UpdateCart } from "../Redux/Cart";

const axios = require("axios");
const Checkout = () => {
  const dispatch = useDispatch();

  const items = useSelector((state) => state.cart.items);
  const totalcost = useSelector((state) => state.cart.totalcost);
  const islogged = useSelector((state) => state.login.islogged);
  const userdetails = useSelector((state) => state.login.userdetails);
    const [tab, settab] = useState(0)
  const [checklogin, setchecklogin] = useState(0);
    const [city, setcity] = useState("")
    const [address, setaddress] = useState("")
    const options = {
        key: 'rzp_test_rEX2nh0cy0bFAi',
        amount: totalcost+"00", //  = INR 1
        name: 'Payment',
        description: '',
        image: 'https://cdn.razorpay.com/logos/7K3b6d18wHwKzL_medium.png',
        handler: function(response) {
            dispatch(ClearCart())
        },
        prefill: {
          name: 'Gaurav',
          contact: '9999999999',
          email: 'demo@demo.com'
        } ,
        notes: {
            address: 'some address'
        },
        theme: {
            color: '#f7f2ee',
            hide_topbar: false
        }
    };
    
    const openPayModal = () => {
        var rzp1 = new window.Razorpay(options);
        rzp1.open();
    };
    
        
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
    }, []);

  return (
    <>
      <Navbar active={1} />
      {/* <img src="https://ik.imagekit.io/thestylist/Assets/JV/Banners/checkout-page-banner.png" alt="" /> */}
      <div className="checkoutitems mt-16">
        <div className="text-3xl ml-[70px] mt-8 mb-8">
          <b>SHOPPING CART</b>
        </div>
        {items.map((items) => (
          <>
            <hr className="w-[800px] ml-[50px]" />
            <div className="ml-[50px]">
              <CartCard cartitems={items} spread={16} />
              <br />
            </div>
            <hr className="w-[800px] ml-[50px]" />
          </>
        ))}
      </div>

      <div className="checkoutwindow mt-12  bg-red float-right">
        <div className="paywindow mt-16 p-[40px]">
          
          <div className="text-3xl ">
            <b>ADDRESS</b>
            
          </div>
          <hr className="mr-6 mt-4 w-full border-1 border-black" />
          <div >
            <form action="" className=" flex flex-col">

                <label >City</label>
                <input type="text" className="border border-black p-1" value={city} onChange={(e)=>setcity(e.target.value)} required/>   
                <label >Address Line 1:</label>
                <textarea type="text" className="border border-black p-1" value={address} onChange={(e)=>setaddress(e.target.value)} required/>   
                <hr className="mr-6 mt-4 w-full border-1 border-black" />
                <div
                    className="w-full bg-black border border-black text-white mt-4 p-1 text-center 
                                hover:bg-white hover:text-black cursor-pointer"
                    id="pay_butt"
                    onClick={() => settab(1)}
                >
                    Next
                </div>
            </form>
          </div>
          
         
        </div>
        {tab===1 && (
            <div className="paywindow mt-8 p-[40px] ">
            <div className="text-3xl">
                <b>ORDER SUMMARY</b>
            </div>
            <hr className="mr-6 mt-4 w-full border-1 border-black" />
            <div className="flex mt-4">
                <p className="flex-1">SUBTOTAL</p>
                <p className="">&#8377;{totalcost}</p>
            </div>
            <div className="flex mt-4">
                <p className="flex-1">DISCOUNT</p>
                <p className="">&#8377;{0}</p>
            </div>
            {/* <div className='mt-4'>
                            <input type="text" className='w-3/5 border border-black p-1' placeholder='Enter Promo Code'/>
                            <div className='w-1/4 bg-black border border-black text-white p-1 text-center float-right
                            hover:bg-white hover:text-black cursor-pointer'>Apply</div>
                        </div> */}
            <div className="flex mt-8">
                <p className="flex-1">
                <b>TOTAL</b>
                </p>
                <p className="">
                <b>&#8377;{totalcost}</b>
                </p>
            </div>
            <hr className="mr-6 mt-4 w-full border-1 border-black" />
            {/* <p className='my-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, ea!</p> */}
            {/* //check login while payment */}
            {islogged ? (
                <>
                <div
                    className="w-full bg-black border border-black text-white mt-4 p-1 text-center 
                                hover:bg-white hover:text-black cursor-pointer"
                    id="pay_butt"
                    onClick={() => openPayModal()}
                >
                    Proceed to Pay
                </div>
                {/* <div className=''>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, non.</div> */}
                </>
            ) : (
                <>
                <div
                    className="w-full bg-black border border-black text-white p-1 mt-4 text-center
                                hover:bg-white hover:text-black cursor-pointer "
                    id=""
                    onClick={() => setchecklogin(1)}
                >
                    Proceed to Pay
                </div>
                {/* <div>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatibus deserunt iure sapiente ratione adipisci, blanditiis maiores iste est explicabo, necessitatibus in! Distinctio odio eius ut cumque. Iste nemo iure provident?</div> */}
                {checklogin ? (
                    <p className="text-[#ff0000]">
                    <ReportGmailerrorredIcon />
                    Login to proceed further
                    </p>
                ) : (
                    <p></p>
                )}
                </>
            )}
            </div>
        )}
      </div>
    </>
  );
};

export default Checkout;

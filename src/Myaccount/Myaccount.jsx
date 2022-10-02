import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Footer from '../footer/Footer'
import Navbar from '../Navbar/Navbar'
import { Link } from 'react-router-dom'

const Myaccount = () => {

    const dispatch=useDispatch()
    const userdetails=useSelector(state=>state.login.userdetails)
    const { orders }=useSelector(state=>state.cart)
    const [tab, settab] = useState(0)
    const { isAdmin }=useSelector(state=>state.login)
    const tabitems=[
        {
            title:"My profile"
        },
        {
            title:"My Orders"
        },
        {
            title:"Logout"
        }
    ]
  return (
    <>
        <Navbar active={1}/>
        {/* <img src="https://ik.imagekit.io/thestylist/Assets/JV/Banners/my-account.png" alt="" /> */}
        <div className='flex mt-16'>

            <div className='w-1/4 '>
                <ul className='w-full float-left pl-10 mt-10 text-xl  font-medium'>
                    <li className='mt-4 cursor-pointer' onClick={()=>settab(0)}>My profile</li>
                    {isAdmin===1 && <Link to='/Admin'><li className='mt-4 cursor-pointer' >Admin</li></Link>}
                    <li className='mt-4 cursor-pointer' onClick={()=>settab(1)}>My Orders</li>
                    <li className='mt-4 cursor-pointer' onClick={()=>{window.location.href='/'}}>Logout</li>
                </ul>
            </div>
            
            <div className='w-3/4 mt-14 float-right mb-8'>
                <div className="text-3xl font-bold ">{tabitems[tab].title}</div><hr />
                {(tab===0)?(
                    <>
                        <div className='mt-10 text-lg'
                        >Name: {userdetails.name}</div>
                        <div className='mt-10 text-lg'>Email: {userdetails.email}</div>
                    </>
                ):(<></>)}
                {tab===1 && (
                    <div className='mt-10 text-lg'>
                        {/* <b className='text-2xl'>Orders</b> */}
                        {orders && orders.map(order=>(
                            <div className='flex'>
                                <img src={order.photo} width="100px" height="100px" className='' alt="" />
                                <div >
                                    <div className='text-2xl'><b>{order.name}</b></div>
                                    <div><b>Total Price:</b> {order.price*order.qty}</div>
                                    <div><b>Qty:</b> {order.qty}</div>

                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div><hr />
        </div><hr />
        <Footer/>
    </>
  )
}

export default Myaccount
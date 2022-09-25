import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Footer from '../footer/Footer'
import Navbar from '../Navbar/Navbar'

const Myaccount = () => {

    const dispatch=useDispatch()
    const userdetails=useSelector(state=>state.login.userdetails)

    const [tab, settab] = useState(0)

    const tabitems=[
        {
            title:"My profile"
        },
        // {
        //     title:"My Orders"
        // },
        {
            title:"Logout"
        }
    ]
  return (
    <>
        <Navbar/>
        <img src="https://ik.imagekit.io/thestylist/Assets/JV/Banners/my-account.png" alt="" />
        <div className='flex'>

            <div className='w-1/4 '>
                <ul className='w-full float-left pl-10 mt-10 text-xl  font-medium'>
                    <li className='mt-4 cursor-pointer' onClick={()=>settab(0)}>My profile</li>
                    {/* <li className='mt-4 cursor-pointer' onClick={()=>settab(1)}>My Orders</li> */}
                    <li className='mt-4 cursor-pointer' onClick={()=>{window.location.href='/'}}>Logout</li>
                </ul>
            </div>
            
            <div className='w-3/4 mt-14 float-right'>
                <div className="text-3xl font-bold ">{tabitems[tab].title}</div><hr />
                {(tab===0)?(
                    <>
                        <div className='mt-10 text-lg'
                        >Name: {userdetails.fname +" "+userdetails.sname}</div>
                        <div className='mt-10 text-lg'>Email: {userdetails.emailid}</div>
                    </>
                ):(<></>)}
            </div><hr />
        </div>
        <Footer/>
    </>
  )
}

export default Myaccount
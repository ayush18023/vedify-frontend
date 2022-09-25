import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import {useParams }from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Menimages from './Menimages'
import { Darkbutton } from '../Components/Button'
import { useDispatch, useSelector } from 'react-redux'
import {AddItem,FindTotal,Isinside,CartOn,UpdateCart} from '../Redux/Cart'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { convertLength } from '@mui/material/styles/cssUtils'
import * as axios from 'axios';

const Menclothes = () => {
    const {id}=useParams()
    const cartitems=useSelector(state=>state.cart.items)
    const islogged=useSelector(state=>state.login.islogged)
    const user=useSelector(state=>state.login.userdetails);
    const dispatch=useDispatch()
    const [cloth, setcloth] = useState({})
    useEffect(() => {
      const sorted=Menimages.filter(mi=>mi.id===Number(id))
      setcloth({...sorted[0],qty:1,size:'S'})
      // console.log(cartitems.find(items=>items.title==cloth.title && items.qty==cloth.qty))
    }, [])
    const week=Math.floor(Math.random() * 10) + 2
    
    const sizes=['S','M','L','XL','XXL']

    const handlecartupdate=()=>{
      dispatch(AddItem(cloth)); 
      // console.log(cartitems);
      dispatch(FindTotal());
      dispatch(CartOn());
      // dispatch(UpdateCart())
    }

  return (
    <>
      <div className=''><Navbar active={1}/></div>
      <hr className='mt-20'/>
      <div className='flex mt-16 ml-40'>
        <img src={cloth.img} alt="" width="30%" className=''/>
        <div className='ml-20'>
          <strong className='uppercase text-3xl'>{cloth.title}</strong>
          <p className='mt-2'>Lorem ipsum dolor sit amet.</p>
          <div className='mt-8 text-lg'><b>SIZE:</b></div><br />
          <div className='flex'>
            {sizes.map(sizes=>(
              <div className={`w-24 h-12 float flex cursor-pointer items-center justify-center border border-${(cloth.size===sizes)?('black'):'gray'} mr-8`} 
              onClick={()=>{setcloth({...cloth,size:sizes})}}>{sizes}</div>
            ))}
          </div>
          <div className='flex mt-20 w-[600px]'>
            <div className='text-3xl flex-1'>&#8377;{cloth.price*cloth.qty}</div>
            <span className='border-2 border-black px-6 py-2 '>
                          <span className='mr-2 cursor-pointer'
                          onClick={()=>{cloth.qty>1?setcloth({...cloth,qty:cloth.qty-1}):setcloth({...cloth})}}><RemoveIcon sx={{ fontSize: 20 }}/> </span>
                          {cloth.qty}    
                          <span className='ml-2 cursor-pointer' 
                          onClick={()=>{setcloth({...cloth,qty:cloth.qty+1})}}> <AddIcon sx={{ fontSize: 20 }}/></span>
            </span> 

          </div>
          <div className='mt-10'><b>ESTIMATED DILEVERY TIME:</b></div>
          <div className='mb-10'>{week +' - '+ (week+1)} Weeks</div>

          {(typeof(cartitems.find(items=>items.title===cloth.title && items.size===cloth.size))!="undefined")?(
              <div className='w-1/2 h-10 flex justify-center items-center hover:bg-black hover:text-white 
              bg-white text-black border-2 border-black text-lg cursor-pointer'
              onClick={()=>{dispatch(CartOn())}}>Go to Cart</div>
            ):(
              <div className='w-1/2 h-10 flex justify-center items-center bg-black text-white 
              hover:bg-white hover:text-black hover:border-2 hover:border-black text-lg cursor-pointer'
              onClick={()=>{handlecartupdate()}}>Add to Cart</div>
          )}
        </div>
      </div>
        
    </>
  )
}

export default Menclothes
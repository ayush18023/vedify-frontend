import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
// import {
//     Input, 
//   } from "@chakra-ui/react";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { ToggleSearch } from '../Redux/Pages';

const Landingback = () => {
    const search=useSelector(state=>state.page.search)
    const dispatch=useDispatch()
  return (
    <>
        
        
       
        <div className='h-[105vh] bg-[#b0bd88] flex items-center'>
            <div className='w-1/2 p-16'>
                <div className='text-6xl text-[#524000]'>Grandmas Magical pouch <br />Medicines and Consultaion</div>
                <div className='search mt-12 cursor-pointer flex'>
                    <div className='w-1/2 bg-white text-[#524000] text-lg p-2 pl-4 ' onClick={()=>{dispatch(ToggleSearch());}}>Search for Medicines...</div>
                    <div className='w-[40px] flex justify-center items-center bg-gray-300'><SearchIcon/></div>
                </div>
            </div>
            <div className='w-1/2'>
                <img src="https://media.istockphoto.com/vectors/llustration-of-mortar-and-herbal-ingredients-vector-id1191822502?k=20&m=1191822502&s=612x612&w=0&h=PhtX9SZeVhn3gPhwXllR4Bb0Uk_PFSwYdONTR7pltbo=" alt="" />
            </div>
        </div>
    </>
  )
}

export default Landingback
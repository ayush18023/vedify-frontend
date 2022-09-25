import React from 'react'
import Navbar from '../Navbar/Navbar'
import './Men.css'
import Breadcrumbs from '@mui/material/Breadcrumbs';
// import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import {Link} from 'react-router-dom'
import { useState } from 'react';
import Menimages from './Menimages';

const Menimg=Menimages;

const Men = () => {
    const [items, setitems] = useState(Menimages)

    const sort=(sel)=>{
        if(sel==="all"){
            console.log(sel)
            setitems(Menimg)
        }
        else{
            const sorted=Menimages.filter(mi=>mi.category===sel)
            setitems(sorted)
        }
        
    }
  return (
    <>
        <Navbar active={0}/>   
        <img src="https://admin-valaya.perniapopup.studio/pub/media_valaya/promobanners/p/a/page-banner.png"  alt="" /> 
        <div className='Sort_window h-full mt-4 ml-8'>
            <Breadcrumbs aria-label="breadcrumb" >
                <Link to="/">Home</Link>
                <Typography color="text.primary">Men</Typography>
            </Breadcrumbs>
        <div className="category_men mt-4">
            <div className='text-xl'>Category</div>
            <div className='text-base ml-4'>
                <input type="radio" name="foo" id="" onClick={()=>sort("all")}/>
                <label htmlFor="" className='ml-2'>All</label><br />
                <input type="radio" name="foo" id="" onClick={()=>sort("kurta_set")}/>
                <label htmlFor="" className='ml-2'>Kurta Set</label><br />
                <input type="radio" name="foo" id="" onClick={()=>sort("Rumeli")}/>
                <label htmlFor="" className='ml-2'>Rumeli</label><br />
                <input type="radio" name="foo" id="" onClick={()=>sort("Shirt")}/>
                <label htmlFor="" className='ml-2'>Shirt</label><br />
                <input type="radio" name="foo" id="" onClick={()=>sort("Bursa")}/>
                <label htmlFor="" className='ml-2'>Bursa</label><br />
            </div>
        </div>
        </div>
        <div className='mt-10 men-container'>
            {items.map((mi)=>(
                <Link to={`/men/${mi.id}`}>
                    <div className='card' key={mi.id} >
                        <img src={mi.img}  alt="" />
                        <p className='text-base'>{mi.title}</p>
                        <p className='text-base'>&#8377;{mi.price}</p>
                    </div> 
                </Link>
                
            ))}
        </div>
    </>
  )
}

export default Men
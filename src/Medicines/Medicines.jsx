import React,{useEffect} from 'react'
import Navbar from '../Navbar/Navbar'
import './Medicines.css'
import Breadcrumbs from '@mui/material/Breadcrumbs';
// import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import {Link} from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { SetProducts,SetLoading } from '../Redux/Pages';
import { CircularProgress } from '@mui/material';
import {getProducts} from '../Redux/Pages'
const Medicines = () => {
    const {products,isLoading}=useSelector(state=>state.page)
    const dispatch=useDispatch()
    useEffect(() => {
        // (async ()=>{
        //     dispatch(SetLoading(true))
        //     await axios.get("http://localhost:9000/api/v1/medicine")
        //     .then(res=>{dispatch(SetProducts(res.data.result.data));setfilteredproducts(res.data.result.data)})   
        //     dispatch(SetLoading(false))
        // })()
        // console.log("products:",filteredproducts)
        dispatch(getProducts())
    }, [])
    const [filteredproducts, setfilteredproducts] = useState(products)
    const sort=(value)=>{
        if(value==="all"){
            setfilteredproducts(products)
        }
        else{

            setfilteredproducts(products.filter(pro=>pro.disease.includes(value)))
        }
        
    }
  return (
    <>
        <Navbar active={1}/>   
        {/* <img src="https://admin-valaya.perniapopup.studio/pub/media_valaya/promobanners/p/a/page-banner.png"  alt="" />  */}
        <div className='text-4xl mt-32 ml-8'><b>Medicines:</b></div>
        <div className='background_products'>
            <div className='Sort_window h-full mt-12 ml-8 '>
                <Breadcrumbs aria-label="breadcrumb" >
                    <Link to="/">Home</Link>
                    <Typography color="text.primary">Medicines</Typography>
                </Breadcrumbs>
                <div className="category_men mt-4 ml-4">
                    <div className='text-xl'>Category</div>
                    <div className='text-base ml-4'>
                        <input type="radio" name="foo" id="" onClick={()=>sort("all")}/>
                        <label htmlFor="" className='ml-2'>All</label><br />
                        <input type="radio" name="foo" id="" onClick={()=>sort("Asthama")}/>
                        <label htmlFor="" className='ml-2'>Asthama</label><br />
                        <input type="radio" name="foo" id="" onClick={()=>sort("SwineFlu")}/>
                        <label htmlFor="" className='ml-2'>SwineFlu</label><br />
                        <input type="radio" name="foo" id="" onClick={()=>sort("Dengue")}/>
                        <label htmlFor="" className='ml-2' >Dengue</label><br />
                        <input type="radio" name="foo" id="" onClick={()=>sort("Malaria")}/>
                        <label htmlFor="" className='ml-2'>Malaria</label><br />
                        <input type="radio" name="foo" id="" onClick={()=>sort("Common Cold")}/>
                        <label htmlFor="" className='ml-2'>Common Cold</label><br />
                        <input type="radio" name="foo" id="" onClick={()=>sort("Fever")}/>
                        <label htmlFor="" className='ml-2'>Fever</label><br />
                        <input type="radio" name="foo" id="" onClick={()=>sort("Cough")}/>
                        <label htmlFor="" className='ml-2'>Cough</label><br />
                        <input type="radio" name="foo" id="" onClick={()=>sort("Constipation")}/>
                        <label htmlFor="" className='ml-2'>Constipation</label><br />
                        <input type="radio" name="foo" id="" onClick={()=>sort("Diarrhoea")}/>
                        <label htmlFor="" className='ml-2'>Diarrhoea</label><br />
                        <input type="radio" name="foo" id="" onClick={()=>sort("Body Pain")}/>
                        <label htmlFor="" className='ml-2'>Body Pain</label><br />
                    </div>
                </div>
            {/* <div className="category_men mt-4">
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
            </div> */}
            </div>
            <div className='mt-10 medicines_container'>
                {filteredproducts.map((mi)=>(
                    <Link to={`/Medicines/${mi._id}`}>
                        <div className='parent_card '>
                            <div className='card' key={mi.id} >
                                <img src={mi.photo}  alt="" className='w-[100%] h-[200px] object-cover'/>
                                <p className='text-xl p-2'>{mi.name}</p>
                                <p className='text-xl p-2'>&#8377;{mi.price}</p>
                            </div> 
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    </>
  )
}

export default Medicines
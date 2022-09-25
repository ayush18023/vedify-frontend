import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Payment = () => {
    const [timer, settimer] = useState(5)
    const handletimer=()=>{
        settimer(timer-1)
    }
    useEffect(() => {
        
        setTimeout(() => {
            window.location.href='/'
        }, 5000);
    },[])
    setInterval(() => {
        if(timer>0){
            handletimer()
        }
    }, 1000);
    
    return (
        <>
            <div className='text-4xl text-center mt-8'><CheckCircleIcon style={{color:'green'}} sx={{fontSize:40}}/>You Payment Was Succesful <br />   Redirecting to Home in ....</div>
            <div className='text-center text-4xl'>{timer}</div> 
        </>
    
  )
}

export default Payment
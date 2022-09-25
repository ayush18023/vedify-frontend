import React from 'react'
import { useEffect,useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';

const Alert = (props) => {
    const text=props.text

    const [alert, setalert] = useState('')
    useEffect(() => {
        setTimeout(() => {
            setalert('')
        }, 4000);
    }, [])
    
    
  return (
    <>
        //alert already styled in nvabar alert className
        <div className={(alert!=='')?('absolute h-20 w-80  bg-black right-4 p-4 text-white z-10 alert'):('gayab')}>{text}
        <span className='absolute top-1 right-1 ' onClick={()=>setalert('')}><CloseIcon/></span></div>
    </>
  )
}

export default Alert
import React, { useEffect, useState } from 'react'
import {ChevronRightIcon} from '@heroicons/react/24/solid'
import emailjs from '@emailjs/browser';
const Contact = () => {
    const [values,setValues]=useState({
        fullName:'',
        email:'',
        message:''
    })
    const[status,setStatus]=useState('')
    const changeHandler=(e)=>{
        setValues(values=>({
            ...values,
            [e.target.name]:e.target.value
        }))
    }
    useEffect(()=>{
        if(status==='SUCCESS'){
            setTimeout(()=>{
                setStatus('')
            },3000)
        }
    },[status])
    const submitHandler=(e)=>{
        e.preventDefault()
        emailjs.send('service_fi5azxb', 'template_cmyiqig', values,'N5o5rMrm7uYC68sS8')
        .then((res)=>{
            console.log('SUCCESS!',res)
            setValues({
                fullName:'',
                email:'',
                message:''
            })
            setStatus('SUCCESS')
        },err=>{
            console.log('FAILED..',err)
        })
    }
    return (
        <div>
            {status && renderPopup()}
            <form onSubmit={submitHandler}>
                <div>
                    <label className='text-gray-500 text-sm'>Full Name</label>
                    <input className='border-b-2 outline-none text-gray-700 w-full bg-gray-100 h-10 px-2' value={values.fullName} type='text' name='fullName' placeholder='John Doe' required onChange={changeHandler}></input>
                </div>
                <div>
                    <label className='text-gray-500 text-sm'>Email</label>
                    <input className='border-b-2 outline-none text-gray-700 w-full bg-gray-100 h-10 px-2' value={values.email} type='email' name='email' placeholder='name@example.com' required  onChange={changeHandler}></input>
                </div>
                <div>
                    <label className='text-gray-500 text-sm'>How can we help you?</label>
                    <textarea name='message' rows='5' className='w-full border b-2 outline-none bg-gray-100 p-2' placeholder='Type your query here' onChange={changeHandler} value={values.message}></textarea>
                </div>
                <button className='mt-4 bg-gray-900 text-gray-200 rounded hover:bg-gray-700 px-4 py-2 focus:outline-none' type='submit'>Send<ChevronRightIcon className='w-6 ml-2 float-right'/></button>
            </form>
        </div>
    )
}
const renderPopup=()=>{
    return(
        <div className='px-4 py-1 leading-normal text-green-700 bg-green-100 rounded mb-5 text-center'><p>Message sent successfully</p></div>
    )
}

export default Contact
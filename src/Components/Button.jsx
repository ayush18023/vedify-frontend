import React from 'react'

const Lightbutton=({text})=>{
    return(
        <div className='w-40 h-10 pt-1 text-center text-white cursor-pointer border-white border-2 '>{text}</div>
        
    )
}

const Darkbutton=({text})=>{
    return(
        <div className='w-40 h-10 pt-1 text-center cursor-pointer align-center border-2 border-black hover:bg-black hover:text-white'>{text}</div>   
    )
}

export default Lightbutton
export {Darkbutton}
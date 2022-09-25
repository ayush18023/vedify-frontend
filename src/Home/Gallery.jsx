import React, { useState } from 'react'
import Footer from '../footer/Footer'
import './Gallery.css'
import gimages from './Galleryimages'

const Gallery = () => {
  const sort=gimages.filter(gi=>gi.category==='shoots')
  const [cat, setcat] = useState(sort)
  
  const [active, setative] = useState(0);

  const selectcategory=(selectcat)=>{
    const sorted=gimages.filter(gi=>gi.category===selectcat)
    setcat(sorted)

  }
  const galleryitems=[
    {
      title:"SHOOTS",
      category:"shoots"
    },
    {
      title:"PRESS & MEDIA",
      category:"press&media"
    },
    {
      title:"RUNWAY",
      category:"runaway"
    },
    {
      title:"CELEBRITIES",
      category:"celebs"
    },
  ]
  return (
    <>
      <div className='container-gallery flex flex-col items-center mt-10 '>
        <div className='text-xl mt-16 text-4xl list-none'>Gallery</div>
        <ul className='flex my-10 cursor-pointer'>
          {galleryitems.map((gi,index)=>(
            <li className={`px-10 border-b-2 border-b-transparent hover:border-b hover:border-b-black 
            ${(active===index)?('border-b-black border-b'):('')}`} onClick={()=>{selectcategory(gi.category);setative(index)}}>{gi.title}</li>
          ))}
        </ul>
    </div>
    <div className='gallery_objects flex justify-center pb-10'>
      {cat.map((cat,index)=>(
        <img src={cat.imlink} key={cat.id} alt="" className='m-1' width="30%"/>
      ))}
    </div>

    <Footer/>
    
    </>
    
  )
}

export default Gallery
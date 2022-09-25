import React from 'react'
import { Link } from 'react-router-dom'

const Womendrop = ({ handlemouse }) => {
  const items=[
    {
      id:1,
      title:"Category",
      option:[  "Dress","Skirt Set","Kurta set","Anarkali set","Jacket set","Lehenga","Saree"  ]
    },
    {
        id:2,
        title:"Collection",
        option:[ "Rumeli","Bursa","Bursa Chapter 2","Tabriz","Jhalamand House","Chevron "]
    },
    {
        id:3,
        title:"Jewellery",
        option:["JJ VALAYA X CONFLUENCE"]
    },
    {
        id:4,
        title:"Accesories",
        option:[  "Shawl","Scarves","Belts","Hairbands"  ]
    }
  ]
  return (
    <div className='itembox' onMouseEnter={()=>handlemouse(1)} onMouseLeave={()=>handlemouse(3)}>
        {items.map((items,i)=>{
            return(
                <span className='item-category' key={items.id}> 
                    <h4 classname='font-bold'><b>{items.title}</b></h4>
                    {items.option.map((opt,index)=>(
                        <Link to='/men'><p key={index}>{opt}</p></Link>
                    ))}
                </span>
            )  
        })} 
    </div>
  )
}

export default Womendrop
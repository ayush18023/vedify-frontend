import React from 'react'
import './CartCard.css'
import { useDispatch,useSelector } from 'react-redux/es/exports';
import { DeleteItem, ClearCart,Increaseqty,Decreaseqty,FindTotal} from '../Redux/Cart';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const CartCard = (props) => {
    const cartitems=props.cartitems;
    const spread=props.spread
    const dispatch= useDispatch()
  return (
    <>  
        <div className='flex ml-4 mt-4'>
            <img src={cartitems.photo} alt="" width="150px" className={`cartcardimg mr-${spread}`}/>
            <div>
                <div className='flex ml-4 mt-10'>
                    <div className='itemtitle text-black text-l uppercase '>{cartitems.name }</div>
                    <div className='text-lg ml-[100px] float-right'>&#8377;{cartitems.price}</div>
                </div>
                <div className='ml-4 mt-8'>
                    <span className='border-2 border-black px-6 py-2'>
                        <span className='mr-2 cursor-pointer' 
                        onClick={()=>{(cartitems.qty>1)?dispatch(Decreaseqty(cartitems._id)) && dispatch(FindTotal()):dispatch(FindTotal())}}>
                        <RemoveIcon sx={{ fontSize: 20 }}/> </span>
                        {cartitems.qty}    
                        <span className='ml-2 cursor-pointer'
                        onClick={()=>{dispatch(Increaseqty(cartitems._id));dispatch(FindTotal())}}> <AddIcon sx={{ fontSize: 20 }}/></span>
                    </span> 
                    <span className='p-1 hover:border-b-black hover:border-b-2 cursor-pointer ml-[210px]' 
                    onClick={()=>{dispatch(DeleteItem(cartitems));dispatch(FindTotal())}}>Remove</span>
                </div>
                
            </div>
        </div>
        
    </>
  )
}

export default CartCard
import React, { useEffect, useState } from 'react'
import './Navbar.css'
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import CallIcon from '@mui/icons-material/Call';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom'
// import { Darkbutton } from '../Components/Button';
import CloseIcon from '@mui/icons-material/Close';
import Cart from '../Cart/Cart';
import MenuIcon from '@mui/icons-material/Menu';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import auth from './Finitiate'
import { ToggleSearch } from '../Redux/Pages';
import { useSelector,useDispatch } from 'react-redux/es/exports';
import { CartOn } from '../Redux/Cart';
import { LogIn,SetUser } from '../Redux/Login';
import Womendrop from './Womendrop';
import WithGoogle from './WithGoogle';

const axios=require('axios')

export const Navbar = (props) => {
    const active=props.active
    const [nav, setnav] = useState('')
    const [login, setlogin] = useState(0)
    const [alert, setalert] = useState('')
    const [register, setregister] = useState(0)
    
    const [userlog, setuserlog] = useState({
        emailid:"",password:""
    })
    const [userreg, setuserreg] = useState({
        emailid:"",name:"",password:"",cpassword:"",phoneno:null
    })
    const colortheme={
        primary:"#524000",
        secondary:"#4e6e19"
    }
    const [color, setcolor] = useState(colortheme.primary)
    
    //reducer
    const cartstatus=useSelector(state=>state.cart.cartstatus)
    const islogged=useSelector(state=>state.login.islogged)
    const search=useSelector(state=>state.page.search)
    const dispatch=useDispatch()
    const items=useSelector(state=>state.cart.items)
    
    const handlescroll=()=>{
        // console.log(document.body.style)
        const offset=window.scrollY;
        if(offset > 30 ){
            setnav('mouse-in-nav');
            setcolor(colortheme.secondary)
        }
        else{
            setnav('')
            setcolor(colortheme.primary)
        }
    }

    const handlelogin=()=>{
        setlogin(1)
    }
    const dologin=async ()=>{

        const response=await signInWithEmailAndPassword(auth,userlog.emailid,userlog.password)
        console.log(response)
    }

    const doregister=async ()=>{
        if(userreg.password!==userreg.cpassword || userreg.password===" "){
            setalert("Password incorrect")
            setuserreg({...userreg,password:"",cpassword:""})
            closealert()
        }
        else{
            const email=userreg.emailid;
            const password=userreg.password
            const response=await createUserWithEmailAndPassword(auth, email, password)
            console.log(response)   
        }
    }

    const closealert=()=>{
         setTimeout(() => {
                setalert('')
        }, 4000);
    }
    useEffect(() => {
        window.addEventListener('scroll',handlescroll)  
        if(active){
            setnav('mouse-in-nav')
        }
    })
    // useEffect(()=>{
    //     login && (document.body.style.overflow = 'hidden');
    //     !login && (document.body.style.overflow = 'hidden');
    // },[login,register])
    
  return (

    <div className='nav'>

        <div className={(alert!=='')?('absolute h-20 w-80  bg-black right-4 p-4 text-white z-10 alert'):('gayab')}>{alert}
        <span className='absolute top-1 right-1 ' onClick={()=>setalert('')}><CloseIcon/></span></div>

        <div className={`top-header items-center ${nav}`}>
            {/* <Link to='/'><img src={(nav==="")?("https://ik.imagekit.io/thestylist/Assets/JV/Logo/logo-light.svg"):("https://ik.imagekit.io/thestylist/Assets/JV/Logo/logo-dark.svg")} width="192" height="40" className='logo' alt="" /></Link>  */}
            <Link to='/'>
                <div className={`text-3xl mb-4 md:text-6xl text-[${color}] mt-2  heading `}>Vedify</div>
            </Link>
            <div className={`flex h-8 ml-48 text-xl text-[${color}]`}>
                <div className='px-6 nav_bullets'>Order Medicines</div>
                <div className='px-6 nav_bullets'>Book Apointment</div>
                <div className='px-6 nav_bullets'>About</div>
            </div>     
            <div className="imp text-xl ">

                
                <span className="space-right text-[#524000] cursor-pointer " onClick={()=>dispatch(ToggleSearch())}><SearchIcon sx={{color:color}}/>Search</span>

                <span className="space-right cursor-pointer">
                    {islogged===0?(
                        <div className={`login text-[${color}]`} onClick={()=>{handlelogin();handlescroll()}} >
                            <PersonOutlineIcon sx={{color:color}}/><span className='md:block hidden'>Login/Register</span>
                        </div>
                    ):(
                        <div className={`text-[${color}]`}><Link to='/myaccount'><PersonOutlineIcon sx={{color:color}}/> My Account</Link></div>
                    )}   
                </span>

                
                <div className='flex space-right'>
                    <span className="cursor-pointer" onClick={()=>dispatch(CartOn())}> <ShoppingCartIcon sx={{color:color}}/></span>
                    {/* onClick={()=>setiscart(true)} */}
                    <div className='md:w-[20px] md:h-[20px] ml-[-10px] mt-[-5px] md:block md:rounded-[20px] md:relative md:text-center md:bg-[#524000] md:text-white hidden'>{items.length}</div>
                </div>
            </div>
                       
        </div> 

        {/* for search   */}
        <>
            <div className={(search===1 || search===true)?('login_window'):('gayab')} onClick={()=>{dispatch(ToggleSearch())}}></div>
            <div className={(search===1 || search===true)?'w-1/2 bg-white searchbar flex':'gayab'}> 
                <input type="text" className='w-2/3 h-[20px] p-[25px] text-lg' placeholder='Search for Medicines...'/>
                <div className='w-[60px] flex justify-center items-center bg-gray-300'><SearchIcon/></div>
            </div>
            
        </>                

        {/* for login         */}
        <div className={(login===1)?('login_window'):("gayab")} onClick={()=>setlogin(0)}></div>
        <div className={(login===1)?("detailslogin flex flex-col items-center"):("gayab")}>
            <div className="mt-4">LOG IN</div>
            <div className="absolute top-2 right-2 cursor-pointer" onClick={()=>{setlogin(0)}}><CloseIcon/></div>
            <form className="w-full flex flex-col items-center">
                <input type="text" value={userlog.emailid} className="logininp" name="" id="" placeholder="Enter Email Address"
                onChange={(e)=>{setuserlog({...userlog,emailid:e.target.value})}} 
                />

                <input type="password" value={userlog.password} className="logininp" name="" id=""  placeholder="Enter Password"
                onChange={(e)=>{setuserlog({...userlog,password:e.target.value})}}
                />

                <div className="loginbutt mt-10 text-center" onClick={dologin}>Login to your account</div>
            </form><hr className='horizontal'/>
            <WithGoogle/>
            <div className="mt-4 cursor-pointer" onClick={()=>{setregister(1);setlogin(0)}}>or <b>Register</b> an account</div>
        </div>
        
        

        {/* for registration */}
        <div className={(register===1)?('login_window'):("gayab")} onClick={()=>setregister(0)}></div> 
        <div className={(register===1)?("detailsregister mx-auto flex flex-col items-center"):("gayab")}>
            <div className="mt-4">Register</div>
                <div className="absolute top-2 right-2 cursor-pointer" onClick={()=>{setregister(0)}}><CloseIcon/></div>
                <form className="w-full flex flex-col items-center">
                    <input type="text" className="logininp" name="" id=""  placeholder="Enter Email Address"
                    value={userreg.emailid}
                    onChange={(e)=>{setuserreg({...userreg,emailid:e.target.value})}} 
                    />
                    <div className="">
                        <input type="text" className="registerinp" id="name" placeholder="First name"
                        value={userreg.name}
                        onChange={(e)=>{setuserreg({...userreg,name:e.target.value})}} 
                        />
                        <input type="text" className="registerinp" placeholder="Phone no."
                        value={userreg.phoneno}
                        onChange={(e)=>{setuserreg({...userreg,phoneno:e.target.value})}} 
                        />
                    </div>
                    <input type="password" className="rinp" name="" id=""  placeholder="Enter Password"
                    value={userreg.password}
                    onChange={(e)=>{setuserreg({...userreg,password:e.target.value})}} 
                    />
                    <input type="password" className="rinp" name="" id="" placeholder="Confirm password"
                    value={userreg.cpassword}
                    onChange={(e)=>{setuserreg({...userreg,cpassword:e.target.value})}}
                    />

                    <div className="loginbutt mt-10 text-center" onClick={doregister}>Register new account</div>
                </form><hr className='horizontal'/>
                <WithGoogle/>
                <div className="mt-4 cursor-pointer" onClick={()=>{setregister(0);setlogin(1)}}>or <b>Login</b> into an account</div>
        </div>
            
        
        {/* sidebar cart               */}
        {(cartstatus===1)?(<Cart/>):(<></>)}
    


    </div>
  )
}

export default Navbar
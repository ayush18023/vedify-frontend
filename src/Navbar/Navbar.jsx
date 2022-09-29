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
import { getProducts, ToggleSearch, FilterProductsbyName } from '../Redux/Pages';
import { useSelector,useDispatch } from 'react-redux/es/exports';
import { CartOn } from '../Redux/Cart';
import { LogIn,SetaccessToken,SetAdmin,SetUser } from '../Redux/Login';
import WithGoogle from './WithGoogle';
import {FirebaseExceptionHandler} from './Finitiate'

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
    const items=useSelector(state=>state.cart.items)
    const { products,filteredProducts }=useSelector(state=>state.page)
    const dispatch=useDispatch()
    
    const handlescroll=()=>{
        // console.log(document.body.style)
        const offset=window.scrollY;
        if(offset > 30 ){
            active=1
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
        try {
            if(userlog.emailid==="admin@gmail.com"){
                dispatch(SetAdmin())
            }
            const response=await signInWithEmailAndPassword(auth,userlog.emailid,userlog.password)
            console.log("accesstoken:",response.user.accessToken)
            const backendres=await axios.post('http://localhost:9000/api/v1/auth/whoami',{"authorization":`${response.user.accessToken}`}) 
            console.log(backendres)
            if(backendres.responseText="OK"){
                dispatch(SetUser(backendres.data.data))
                setlogin(0)
                dispatch(LogIn())
                dispatch(SetaccessToken(response.user.accessToken))
                setalert(backendres.data.message)
                closealert()
            }

        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            const errormsg=FirebaseExceptionHandler(errorCode)
            setalert(errormsg)
            closealert()
        }
    }

    const doregister=async ()=>{
        if(userreg.password!==userreg.cpassword || userreg.password===" "){
            setalert("Password incorrect")
            setuserreg({...userreg,password:"",cpassword:""})
            closealert()
        }
        else{
            try {
                const email=userreg.emailid;
                const password=userreg.password
                const response=await createUserWithEmailAndPassword(auth, email, password)
                console.log(response)  
                const data={
                    name:userreg.name,
                    email:email,
                    phoneNo:response.user.phoneNumber,
                    photo:response.user.photoURL
                }
                const backendres=await axios.post('http://localhost:9000/api/v1/auth/register',data,{ headers: {"authorization" : `${response.user.accessToken}`} }) 
                console.log(backendres)
                if(backendres.statusText==="OK"){
                    dispatch(SetUser(backendres.data.data))
                    setregister(0)
                    dispatch(LogIn())
                    dispatch(SetaccessToken(response.accessToken))
                    setalert(backendres.data.message)
                    closealert()
                }
            } catch (error) {
                const errorCode = error.code;
                const errorMessage = error.message;
                const errormsg=FirebaseExceptionHandler(errorCode)
                setalert(errormsg)
                closealert()
            }
            
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
    useEffect(() => {
        dispatch(getProducts())
    }, [])
    
    // useEffect(()=>{
    //     login && (document.body.style.overflow = 'hidden');
    //     !login && (document.body.style.overflow = 'hidden');
    // },[login,register])
    const handlefilter=(e)=>{
        dispatch(FilterProductsbyName(e.target.value))
    }
  return (

    <div className='nav'>

        <div className={(alert!=='')?('absolute h-20 w-80  bg-black right-4 p-4 text-white z-10 alert'):('gayab')}>{alert}
        <span className='absolute top-1 right-1 ' onClick={()=>setalert('')}><CloseIcon/></span></div>

        <div className={`top-header items-center ${nav}`}>
            {/* <Link to='/'><img src={(nav==="")?("https://ik.imagekit.io/thestylist/Assets/JV/Logo/logo-light.svg"):("https://ik.imagekit.io/thestylist/Assets/JV/Logo/logo-dark.svg")} width="192" height="40" className='logo' alt="" /></Link>  */}
            <Link to='/'>
                {/* <div className={`text-xl mb-4 md:text-6xl text-[${color}] mt-2  heading `}>GMP</div> */}
                <img src="/logo.png" alt="" width="60px" className={`text-xl  text-[${color}]   heading `}/>
            </Link>
            <div className={`flex h-8 ml-48 text-xl text-[${color}]`}>
                <Link to='/About'><div className='px-6 nav_bullets'>About</div></Link>
                <Link to='/Medicines'><div className='px-6 nav_bullets'>Order Medicines</div></Link>
                <Link to='/Book'><div className='px-6 nav_bullets'>Book Apointment</div></Link>
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
        <div className='search_window'>
            <div className={(search===1 || search===true)?('login_window'):('gayab')} onClick={()=>{dispatch(ToggleSearch())}}></div>
            <div className={(search===1 || search===true)?'bg-white searchbar flex':'gayab'}> 
                <input type="text" className='w-[528px] h-[20px] p-[25px] text-lg' onChange={e=>handlefilter(e)} placeholder='Search for Medicines...'/>
                <div className='w-[60px] flex justify-center items-center bg-gray-300'><SearchIcon/></div>
            </div>
            <div className={(search===1 || search===true)?'w-[590px] h-[400px] bg-white searchanswers':'gayab'}>
                {filteredProducts.map(products=>(   
                    <Link to={`/Medicines/${products._id}`}>
                        <div className='flex items-center searchitems ' key={products._id} onClick={()=>dispatch(ToggleSearch())}>
                            <img src={products.photo}  alt="" />
                            <p className='text-xl ml-8'>{products.name}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>                

        {/* for login         */}
        <div className={(login===1)?('login_window'):("gayab")} onClick={()=>setlogin(0)}></div>
        <div className={(login===1)?("detailslogin flex flex-col items-center"):("gayab")}>
            <div className="mt-4">LOG IN</div>
            <div className="absolute top-2 right-2 cursor-pointer" onClick={()=>{setlogin(0)}}><CloseIcon/></div>
            <form className="w-full flex flex-col items-center">
                <input type="text" value={userlog.emailid} className="logininp p-1" name="" id="" placeholder="Enter Email Address"
                onChange={(e)=>{setuserlog({...userlog,emailid:e.target.value})}} 
                />

                <input type="password" value={userlog.password} className="logininp p-1 " name="" id=""  placeholder="Enter Password"
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
                    <input type="text" className="logininp p-1"  placeholder="Enter Email Address"
                    value={userreg.emailid}
                    onChange={(e)=>{setuserreg({...userreg,emailid:e.target.value})}} 
                    />
                    <div className="">
                        <input type="text" className="registerinp p-1" id="name" placeholder="Name"
                        value={userreg.name}
                        onChange={(e)=>{setuserreg({...userreg,name:e.target.value})}} 
                        />
                        <input type="text" className="registerinp p-1" placeholder="Phone no."
                        value={userreg.phoneno}
                        onChange={(e)=>{setuserreg({...userreg,phoneno:e.target.value})}} 
                        />
                    </div>
                    <input type="password" className="rinp p-1"  placeholder="Enter Password"
                    value={userreg.password}
                    onChange={(e)=>{setuserreg({...userreg,password:e.target.value})}} 
                    />
                    <input type="password" className="rinp p-1" placeholder="Confirm password"
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
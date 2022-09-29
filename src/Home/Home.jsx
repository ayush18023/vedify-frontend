import React, { useState } from "react";
import Slider from "../Slider/Slider";
import Navbar from "../Navbar/Navbar";
import "./Home.css";
import Lightbutton, { Darkbutton } from "../Components/Button";
import Gallery from "./Gallery";
import { Link } from "react-router-dom";
import Landingback from "../Navbar/Landingback";
import HomeCarousal from "../Slider/HomeCarousal";
import { Avatar } from "@mui/material";
import StatisticsHome from "./StatisticsHome";
import HomeCatagoryCards from "./HomeCatagoryCards";
import { Center } from "@chakra-ui/react";
import Footer from "../footer/Footer";

const Home = () => {
  return (
    <div>
      {/* <div className="h-20px bg-black text-center text-white absolute w-100%">Contact us:+91-8800554491</div> */}
      <Navbar active={0} />
      {/* <button onClick={}>Click me</button> */}
      {/* <div className='slid'><Slider/></div> */}
      <Landingback />
      <div className="w-full h-[380px] bg-[#f7f2ee] flex mt-[-2rem] rounded-tl-[3rem]">
        <div className="text-green-800 w-1/2 p-32">
          <div className="text-6xl pl-4">What do we do?</div>
          <div className="text-xl p-8">
            We Provide healthy Ayurvedic medicines at you doorstep and
            <br />
            also Get Consultation from professional Ayurvedic Doctor.
          </div>
        </div>
        <div className="w-1/2 flex justify-center items-center pt-16">
          <Avatar
            alt="Remy Sharp"
            src="https://img.collegedekhocdn.com/media/img/careers/doctor-clinic.jpg"
            sx={{ width: 250, height: 250 }}
          />
        </div>
      </div>
      {/* <div className='w-full h-[100px] border-2 border-red-500 bg-[#f7f2ee]'>
        </div> */}
      <StatisticsHome />
      <div className="bg-[#b0bd88] w-full px-16 pt-16 pb-16 mt-[-2rem] rounded-tr-[3rem]">
        <Center fontSize="4rem" paddingBottom="2rem" color="#524000">
          Ge<u>t Start</u>ed
        </Center>
        <HomeCatagoryCards />
      </div>
      {/* <div className="category-container">
          <p className='welcome-head'>SHOP THE COLLECTION</p>
          <b><p className='welcome'>WELCOME TO THE WORLD OF JJ VALAYA AND CELEBRATE LUXURY WITH OUR CAREFULLY CURATED COLLECTIONS.</p></b>
          <div className="options">
            <span className="men relative flex items-end justify-center">
              <div className='absolute text-2xl text-white z-10 shift_up'>MEN</div>
              <img src="https://ik.imagekit.io/thestylist/valaya/pub/media_valaya/HOMEPAGE_IMAGES/13_May_22/Grid-2_(2).jpg" alt="" className='women-img'/>
              <span className="absolute bottom-10"><Link to='/men'><Lightbutton text={"SHOP NOW"}/></Link></span>
            </span>
            <span className="women relative flex items-end justify-center">
              <img src="https://ik.imagekit.io/thestylist/valaya/pub/media_valaya/HOMEPAGE_IMAGES/13_May_22/Grid-6.jpg" alt="" className='women-img'/>
              <div className='absolute text-2xl text-white z-10 shift_up'>WOMEN</div>
              <span className="absolute bottom-10"><Lightbutton text={"SHOP NOW"}/></span>
            </span>
            <span className="accesories relative flex items-end justify-center">
              <div className='absolute text-2xl text-white z-10 shift_up'>ACCESSORIES</div>
              <img src="https://ik.imagekit.io/thestylist/valaya/pub/media_valaya/HOMEPAGE_IMAGES/13_May_22/collection-belt_(1).jpg" alt="" className='women-img'/>
              <span className="absolute bottom-10"><Lightbutton text={"SHOP NOW"}/></span>  
            </span>
          </div>
          
        </div> */}

      <Footer />
    </div>
  );
};

export default Home;

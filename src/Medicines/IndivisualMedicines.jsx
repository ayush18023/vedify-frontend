import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { Darkbutton } from "../Components/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  AddItem,
  FindTotal,
  Isinside,
  CartOn,
  UpdateCart,
} from "../Redux/Cart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import axios from "axios";
import { getProducts, SetLoading, SetProducts } from "../Redux/Pages";
import { Avatar, Rating, TextField } from "@mui/material";

const IndivisualMedicines = () => {
  const { _id } = useParams();
  const cartitems = useSelector((state) => state.cart.items);
  const { islogged, accessToken } = useSelector((state) => state.login);
  const user = useSelector((state) => state.login.userdetails);
  const { products, isLoading } = useSelector((state) => state.page);
  const [rating, setrating] = useState(0);
  const [comment, setcomment] = useState("");
  const dispatch = useDispatch();
  // const [currentproduct, setcurrentproduct] = useState()
  const [currentproduct, setcurrentproduct] = useState({
    photo: "",
    disease: [],
    ingredients: [],
  });

  const getproductbyid = () => {
    console.log(_id);
    const finder = products.filter((pro) => pro._id == _id);
    setcurrentproduct({ ...finder[0], qty: 1 });
  };
  useEffect(() => {
    dispatch(getProducts());
    getproductbyid();
    console.log("hi",accessToken);
    
  }, []);

  const handlecartupdate = () => {
    dispatch(AddItem(currentproduct));
    // console.log(cartitems);
    dispatch(FindTotal());
    dispatch(CartOn());
    // dispatch(UpdateCart())
  };

  const AddAReview = async () => {
    const response = await axios.post(
      "http://localhost:9000/api/v1/medicine/addReview/" + _id,
      { feedback: comment, star: rating },
      { headers: { authorization: accessToken } }
    );
    console.log("frommeds:", accessToken);
  };

  return (
    <>
      <div className="">
        <Navbar active={1} />
      </div>
      <hr className="mt-20" />
      <div className="flex mt-16 ml-40">
        <img src={currentproduct.photo} alt="" width="30%" className="" />

        <div className="ml-20 mt-12">
          <strong className="uppercase text-3xl">{currentproduct.name}</strong>
          {/* <p className='mt-2'>Lorem ipsum dolor sit amet.</p> */}
          <div className="pr-12 pt-2">
            <b>Description:</b>
            {currentproduct.description}
          </div>
          <div className="">
            <div className="pt-4 flex">
              <b>Cures: </b>
              <div className="flex">
                {currentproduct.disease.map((disease) => (
                  <p>{disease},</p>
                ))}
              </div>
            </div>
            <div className="pt-4 flex">
              <b>Ingredients: </b>
              <div className="flex">
                {currentproduct.ingredients.map((ingredients) => (
                  <p>{ingredients},</p>
                ))}
              </div>
            </div>
            {/* {console.log(currentproduct)  } */}
          </div>
          {/* <div className='mt-8 text-lg'><b>SIZE:</b></div><br />
        <div className='flex'>
          {sizes.map(sizes=>(
            <div className={`w-24 h-12 float flex cursor-pointer items-center justify-center border border-${(currentproduct.size===sizes)?('black'):'gray'} mr-8`} 
            onClick={()=>{setcurrentproduct({...currentproduct,size:sizes})}}>{sizes}</div>
          ))}
        </div> */}
          <div className="flex mt-20 w-[600px]">
            <div className="text-3xl flex-1">
              &#8377;{currentproduct.price * currentproduct.qty}
            </div>
            <span className="border-2 border-black px-6 py-2 ">
              <span
                className="mr-2 cursor-pointer"
                onClick={() => {
                  currentproduct.qty > 1
                    ? setcurrentproduct({
                        ...currentproduct,
                        qty: currentproduct.qty - 1,
                      })
                    : setcurrentproduct({ ...currentproduct });
                }}
              >
                <RemoveIcon sx={{ fontSize: 20 }} />{" "}
              </span>
              {currentproduct.qty}
              <span
                className="ml-2 cursor-pointer"
                onClick={() => {
                  setcurrentproduct({
                    ...currentproduct,
                    qty: currentproduct.qty + 1,
                  });
                }}
              >
                {" "}
                <AddIcon sx={{ fontSize: 20 }} />
              </span>
            </span>
          </div>
          {/* <div className='mt-10'><b>ESTIMATED DILEVERY TIME:</b></div>
        <div className='mb-10'>{week +' - '+ (week+1)} Weeks</div> */}

          {typeof cartitems.find(
            (items) => items.name === currentproduct.name
          ) != "undefined" ? (
            <div
              className="w-1/2 h-10 flex justify-center items-center hover:bg-black hover:text-white 
            bg-white text-black border-2 border-black text-lg cursor-pointer"
              onClick={() => {
                dispatch(CartOn());
              }}
            >
              Go to Cart
            </div>
          ) : (
            <div
              className="w-1/2 h-10 flex justify-center items-center bg-black text-white 
            hover:bg-white hover:text-black hover:border-2 hover:border-black text-lg cursor-pointer"
              onClick={() => {
                handlecartupdate();
              }}
            >
              Add to Cart
            </div>
          )}
        </div>
      </div>
      <div className=" p-16 mt-16">
        <b className="text-4xl">Reviews</b>

        <hr className="border border-gray-500 mt-2" />
        <div className="flex justify-between mt-4">
          <div className="flex">
            <Avatar sx={{ bgcolor: "blue" }}>N</Avatar>
            <input
              type="text"
              value={comment}
              onChange={(e) => setcomment(e.target.value)}
              className="text-xl w-[40vw] ml-8 border-2 border-b-black bg-gray-200 p-2 text-black"
              placeholder="Add Comment"
            />
            <div className="flex flex-col items-center justify-self-start ml-8">
              <b>Select Rating</b>
              <Rating
                name="simple-controlled"
                value={rating}
                onChange={(event, newValue) => {
                  setrating(newValue);
                }}
              />
            </div>
          </div>
          <div
            className="justify-items-end bg-black text-white cursor-pointer hover:bg-white hover:text-black text-lg p-2  border border-black"
            onClick={AddAReview}
          >
            Add Review
          </div>
        </div>
        {comment !== "" && rating !== 0 && <div className=""></div>}
        <hr className="border border-gray-500 mt-4" />
        {currentproduct.review &&
          currentproduct.review.map((rev) => (
            <div className="text-xl mt-8">
              <Rating name="read-only" value={rev.star} readOnly />
              <p>{rev.feedback}</p>
              <hr className="border border-gray-200 mt-4" />
            </div>
          ))}
      </div>
    </>
  );
};

export default IndivisualMedicines;

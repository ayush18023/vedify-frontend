import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../Navbar/Navbar";
import { getSlots } from "../Redux/Pages";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import axios from "axios";
import { Razorpay } from "../Razorpay";
import { Tooltip } from "@mui/material";

const BookAppointment = () => {
  const [day, setday] = useState();
  const [month, setmonth] = useState();
  const [date, setdate] = useState();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [isSelected, setisSelected] = useState(0);
  const dispatch = useDispatch();
  const [name, setname] = useState();
  const [reason, setreason] = useState();
  // let day = days[d.getDay()];
  const islogged = useSelector((state) => state.login.islogged);
  const { userdetails, accessToken } = useSelector((state) => state.login);
  const { slots } = useSelector((state) => state.page);
  const { isLoading } = useSelector((state) => state.page);
  const [selectedslot, setselectedslot] = useState({});
  useEffect(() => {
    const d = new Date();
    setmonth(months[d.getMonth()]);
    setday(d.getDay());
    setdate(d.getDate());
    dispatch(getSlots());
    // console.log("details:",userdetails)
  }, []);

  const handleslots = async () => {
    console.log("userdetails:", userdetails);
    console.log("accesstoken:", accessToken);
    const response = await axios.put(
      "http://localhost:9000/api/v1/schedule/" + selectedslot._id,
      { isBooked: true, bookedBy: userdetails._id, name:userdetails.name , reason:reason  },
      { headers: { authorization: `${accessToken}` } }
    );
    console.log(response);
  };

  return (
    <>
      <Navbar active={1} />
      <div className="w-2/3 bg-white shadow-2xl h-[70vh] m-auto mt-32 border border-gray-200 flex items-center">
        <div className="w-1/2 pl-8 mt-[-140px]">
          <div className="text-3xl">
            <b>Book Now</b>
          </div>
          <div className="">
            <label>Name:</label>
            <br />
            <input
              type="text"
              placeholder=""
              className="w-2/3 border border-black p-1"
              value={name}
              onChange={(e) => setname(e.target.value)}
            />
          </div>
          <div>
            <label className="">Reason:</label>
            <br />
            <textarea
              placeholder="Enter reason"
              className="w-2/3 border border-black p-1"
              value={reason}
              onChange={(e) => setreason(e.target.value)}
            >
              {" "}
            </textarea>
          </div>
          {islogged ? (
            // <span className='p-2 relative top-8 cursor-pointer rounded-lg bg-blue-700 text-white ' onClick={handleslots}>Book Now</span>
            <Razorpay onClick={handleslots} />
          ) : (
            <>
              <p className="text-[#ff0000]">
                <ReportGmailerrorredIcon />
                Login to proceed further
              </p>
              <span className="p-2 relative top-8 cursor-pointer rounded-lg bg-gray-700 text-white">
                Book Now
              </span>
            </>
          )}
        </div>
        <div className="border border-gray-200 h-[80%] "></div>
        <div className="w-1/2 ">
          <div className="flex space-x-20 ml-16 ">
            <div
              className={
                isSelected === date
                  ? "hover:bg-gray-200 px-4 cursor-pointer bg-gray-200"
                  : "hover:bg-gray-200 px-4 cursor-pointer"
              }
              onClick={() => setisSelected(date)}
            >
              <div className="text-xl">{days[day]}</div>
              <div className="text-3xl">
                <b>{date}</b>
              </div>
              <div className="text-xl">{month}</div>
            </div>
            <div
              className={
                isSelected === date + 1
                  ? "hover:bg-gray-200 px-4 cursor-pointer bg-gray-200"
                  : "hover:bg-gray-200 px-4 cursor-pointer"
              }
              onClick={() => setisSelected(date + 1)}
            >
              <div className="text-xl">{days[day + 1]}</div>
              <div className="text-3xl">
                <b>{(date + 1)%30}</b>
              </div>
              <div className="text-xl">{month}</div>
            </div>

            <div
              className={
                isSelected === date + 2
                  ? "hover:bg-gray-200 px-4 cursor-pointer bg-gray-200"
                  : "hover:bg-gray-200 px-4 cursor-pointer"
              }
              onClick={() => setisSelected(date + 2)}
            >
              <div className="text-xl">{days[(day + 2)%7]}</div>
              <div className="text-3xl">
                <b>{(date + 2)%30}</b>
              </div>
              <div className="text-xl">Oct</div>
            </div>
          </div>
          <div className="border border-gray-200 mt-4"></div>
          {/* slots here */}
          <div></div>
          <div className="grid grid-cols-3 gap-2 h-[300px] w-[500px] ml-2 mt-2 overflow-auto">
            {!isLoading &&
              slots
                .filter((slots) => slots.date === isSelected)
                .map((slots) => {
                  if (slots.bookedBy === userdetails._id && slots.isBooked) {
                    return (
                      <Tooltip title="Booked by you" placement="top" arrow>
                        <div className="text-white text-center p-2 bg-green-700 w-[100px]">
                          {slots.timeSlot}
                        </div>

                      </Tooltip>
                    );
                  } else if (
                    slots.isBooked &&
                    slots.bookedBy !== userdetails._id
                  ) {
                    return (
                      <Tooltip title="Already Booked" placement="top" arrow>
                          <div className="text-white text-center p-2 bg-red-700 w-[100px]">
                            {slots.timeSlot}
                          </div>
                      </Tooltip>
                      
                    );
                  } else if (selectedslot._id === slots._id) {
                    return (
                      
                      <div className="text-white text-center p-2 bg-yellow-700 cursor-pointer w-[100px]">
                        {slots.timeSlot}
                      </div>
                    );
                  } else {
                    return (
                      <Tooltip title="Free slot" placement="top" arrow>
                        <div
                          className="text-white text-center p-2 bg-blue-700 cursor-pointer w-[100px]"
                          onClick={() => setselectedslot(slots)}
                        >
                          {slots.timeSlot}
                        </div>
                      </Tooltip>
                    );
                  }
                })}
          </div>
        </div>
      </div>
    </>
  );
};

export default BookAppointment;

import React, { Fragment, useState,useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import "./Admin.css";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import EventNoteIcon from "@mui/icons-material/EventNote";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import { MDBDataTable } from "mdbreact";
import { Link } from "react-router-dom";
import "./Admin.css";
import Dashboard from "./Dashboard";
import EnhancedTable from "./Tabl1"
import { useDispatch, useSelector } from "react-redux";
import { getSlots } from "../Redux/Pages";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const orders = [
  {
    _id: 0,
    orderItems: [],
    amount: 0,
    status: "",
    actions: (
      <Fragment>
        <Link to={`/`} className="btn btn-primary py-1 px-2">
          <i className="fa fa-eye"></i>
        </Link>
        <button className="btn btn-danger py-1 px-2 ml-2">
          <i className="fa fa-trash"></i>
        </button>
      </Fragment>
    ),
  },
];
const Admin = () => {
  const [tab, settab] = useState(0);
  const { slots } = useSelector((state) => state.page);
  const dispatch=useDispatch()
  useEffect(() => {
    dispatch(getSlots());
  }, [])
  
  const setOrders = () => {
    const data = {
      columns: [
        {
          label: "Order ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "No of Items",
          field: "numofItems",
          sort: "asc",
        },
        {
          label: "Amount",
          field: "amount",
          sort: "asc",
        },
        {
          label: "Status",
          field: "status",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };

    orders.forEach((order) => {
      data.rows.push({
        id: order._id,
        numofItems: order.orderItems.length,
        amount: `$${order.totalPrice}`,
        status:
          order.orderStatus &&
          String(order.orderStatus).includes("Delivered") ? (
            <p style={{ color: "green" }}>{order.orderStatus}</p>
          ) : (
            <p style={{ color: "red" }}>{order.orderStatus}</p>
          ),
        actions: (
          <Fragment>
            <Link
              to={`/admin/order/${order._id}`}
              className="btn btn-primary py-1 px-2"
            >
              <i className="fa fa-eye"></i>
            </Link>
            <button className="btn btn-danger py-1 px-2 ml-2">
              <i className="fa fa-trash"></i>
            </button>
          </Fragment>
        ),
      });
    });

    return data;
  };

  return (
    <>
      <Navbar active={1} />
      <div className="w-[270px] pt-32 p-8 h-[100vh] bg-[#f7f2ee] text=[#524000] float-left text-2xl sidebar sticky left-0 top-0">
        <div
          className="py-6 cursor-pointer hover:border hover:border-gray-500 px-2"
          onClick={() => settab(0)}
        >
          <DashboardCustomizeIcon sx={{ color: "#6a9b1d", fontSize: "30px" }} />{" "}
          Dashboard
        </div>
        <div
          className="py-6 cursor-pointer hover:border hover:border-gray-500 px-2"
          onClick={() => settab(1)}
        >
          <LocalShippingIcon sx={{ color: "#6a9b1d", fontSize: "30px" }} />{" "}
          Products
        </div>
        <div
          className="py-6 cursor-pointer hover:border hover:border-gray-500 px-2"
          onClick={() => settab(2)}
        >
          <EventNoteIcon sx={{ color: "#6a9b1d", fontSize: "30px" }} />{" "}
          Appointments
        </div>
      </div>

      {tab === 0 && <Dashboard />}

      {tab === 1 && (
        <div className="pt-32 ml-80">
          <EnhancedTable />



        </div>
      )}

      {tab === 2 && (
        <div className="pt-32 ml-80">
          <div className="text-3xl">
            <b>Appointments</b>
          </div>
          <div className="pr-16">
            {console.log("slots:",slots)}
            
                <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="right">Name</TableCell>
                      <TableCell align="right">Date</TableCell>
                      <TableCell align="right">TimeSlot</TableCell>
                      <TableCell align="right">Reason</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  { slots && slots.filter(slots=>slots.isBooked).map(bookedslots=>(
                      <TableRow
                        key={bookedslots.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {bookedslots.name}
                        </TableCell>
                        <TableCell align="right">{String(bookedslots.date)+'/' +String(bookedslots.month) +'/'+String(bookedslots.year) }</TableCell>
                        <TableCell align="right">{bookedslots.timeSlot}</TableCell>
                        <TableCell align="right">{bookedslots.reason}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
    
          </div>
        </div>
      )}
    </>
  );
};

export default Admin;

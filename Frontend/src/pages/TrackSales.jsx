import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useContext } from "react";
import { VendorContext } from "../context/VendorContextProvider";
import { Link, useNavigate } from "react-router-dom";
const VITE_API_URL = import.meta.env.VITE_API_URL;
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import toast from "react-hot-toast";
const VendorDashBoard = () => {
  const { vendor, setVendor } = useContext(VendorContext);
  const [itemList, setitemList] = useState([]);
  const [type, setType] = useState("daily");
  const Navigate = useNavigate();
  useEffect(() => {
    if (!vendor) Navigate("/");
  }, [vendor]);
  useEffect(() => {
    const getsales = async () => {
      try {
        const res = await axios.post(`${VITE_API_URL}/sales/${type}`,{},{
          withCredentials : true
        });
        setitemList(res.data)
      } catch (err) {
        toast.error(err.response.data.message)
        console.log(err);
      }
    };
    getsales()
  }, [type]);
  return (
    <div className="min-h-screen overflow-y-auto">
      <Navbar usertype={"customer"} />
      <div className="carousel py-3 w-full">
        <div className="carousel-item rounded-full h-80 w-80">
          <img
            src="https://images.unsplash.com/photo-1727387562395-6be53e861975?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHJlc3RhdXJhbnQlMjBmb29kfGVufDB8fDB8fHww"
            alt="Burger"
            className="rounded-full h-full w-full object-cover"
          />
        </div>
        <div className="carousel-item h-80 w-80">
          <img
            src="https://plus.unsplash.com/premium_photo-1663036447682-8f0d918adbed?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cmVzdGF1cmFudCUyMGZvb2R8ZW58MHx8MHx8fDA%3D"
            alt="Burger"
            className="rounded-full h-full w-full object-cover"
          />
        </div>
        <div className="carousel-item h-80 w-80">
          <img
            src="https://images.unsplash.com/photo-1652690772703-0461a655643d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHJlc3RhdXJhbnQlMjBmb29kfGVufDB8fDB8fHww"
            alt="Burger"
            className="rounded-full h-full w-full"
          />
        </div>
        <div className="carousel-item h-80 w-80">
          <img
            src="https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHJlc3RhdXJhbnQlMjBmb29kfGVufDB8fDB8fHww"
            alt="Burger"
            className="rounded-full h-full w-full objeect-cover"
          />
        </div>
        <div className="carousel-item h-80 w-80">
          <img
            src="https://images.unsplash.com/photo-1502998070258-dc1338445ac2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHJlc3RhdXJhbnQlMjBmb29kfGVufDB8fDB8fHww"
            className="rounded-full h-full w-full object-cover"
            alt="Burger"
          />
        </div>
        <div className="carousel-item h-80 w-80">
          <img
            src="https://images.unsplash.com/photo-1652690772450-2cc9c53060f5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cmVzdGF1cmFudCUyMGZvb2R8ZW58MHx8MHx8fDA%3D"
            className="rounded-full h-full w-full object-cover"
            alt="Burger"
          />
        </div>
        <div className="carousel-item h-80 w-80">
          <img
            src="https://images.unsplash.com/photo-1651440204227-a9a5b9d19712?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmVzdGF1cmFudCUyMGZvb2R8ZW58MHx8MHx8fDA%3D"
            className="rounded-full h-full w-full object-cover"
            alt="Burger"
          />
        </div>
      </div>
      <div className="animate-fadeIn bg-gradient-to-r from-purple-400 via-purple-200 to-purple-400 p-6 rounded-2xl shadow-xl text-center max-w-xl mx-auto mt-5">
        <p className="text-3xl font-bold text-gray-800">Vendor Dashboard</p>
      </div>
      <div className="flex flex-wrap justify-center gap-4 mt-6">
        <button
          className={`px-4 py-2 border border-gray-300 rounded-full hover:bg-purple-800 hover:text-white transition duration-300 ${
            type == "daily"
              ? "bg-purple-800 text-white"
              : "bg-white text-gray-800"
          }`}
          onClick={(e) => {
            e.preventDefault();
            setitemList([]);
            setType("daily");
          }}
        >
          Daily Sales
        </button>
        <button
          className={`px-4 py-2 border border-gray-300 rounded-full hover:bg-purple-800 hover:text-white transition duration-300 ${
            type == "monthly"
              ? "bg-purple-800 text-white"
              : "bg-white text-gray-800"
          }`}
          onClick={(e) => {
            e.preventDefault();
            setitemList([]);
            setType("monthly");
          }}
        >
          Monthly Sales
        </button>
        <button
          className={`px-4 py-2 border border-gray-300 rounded-full hover:bg-purple-800 hover:text-white transition duration-300 ${
            type == "yearly"
              ? "bg-purple-800 text-white"
              : "bg-white text-gray-800"
          }`}
          onClick={(e) => {
            e.preventDefault();
            setitemList([]);
            setType("yearly");
          }}
        >
          Yearly Sales
        </button>
      </div>
      <div className="mt-10 px-4">
        {itemList.length > 0 ? (
          <>
            {/* Chart */}
            <div className="bg-white shadow-md rounded-xl p-4 mb-6">
              <h2 className="text-xl font-semibold mb-2 text-center">
                {type.charAt(0).toUpperCase() + type.slice(1)} Sales Chart
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={itemList}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="_id" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="totalSales" fill="#f87171" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Table */}
            <div className="bg-white shadow-md rounded-xl p-4 max-w-3xl mx-auto">
              <h2 className="text-xl font-semibold mb-4 text-center">
                {type.charAt(0).toUpperCase() + type.slice(1)} Sales Table
              </h2>
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 text-left">Date</th>
                    <th className="p-2 text-left">Orders</th>
                    <th className="p-2 text-left">Total Sales (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {itemList.map((entry) => (
                    <tr key={entry._id} className="border-t">
                      <td className="p-2">{entry._id}</td>
                      <td className="p-2">{entry.orders}</td>
                      <td className="p-2">₹{entry.totalSales}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="text-center text-gray-500 py-10">
            No {type} sales data available.
          </div>
        )}
      </div>
    </div>
  );
};
export default VendorDashBoard;

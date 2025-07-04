import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";
import { CustomerContext } from "../context/CustomerContextProvider";
import { VendorContext } from "../context/VendorContextProvider";
import { useContext , useEffect} from "react";
import toast from "react-hot-toast";
const VITE_API_URL = import.meta.env.VITE_API_URL;
const LoginVendor = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const Navigate = useNavigate();
  const { customer, setCustomer } = useContext(CustomerContext);
  const { vendor, setVendor } = useContext(VendorContext);
  useEffect(() => {
    if (customer) Navigate("/home");
    if (vendor) Navigate("/vendordashboard");
  }, [customer, vendor]);
  const handleonSubmit = async () => {
    const obj = {
      email: email,
      password: password,
    };
    try {
      const res = await axios.post(`${VITE_API_URL}/vendor/login`, obj, {
        withCredentials: true,
      });
      setVendor(res.data.vendor)
      Navigate("/vendordashboard");
      toast.success(res.data.message)
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };
  return (
    <div className="h-screen w-screen relative">
      <div className="h-1/2 top-0 absolute w-full -z-20 flex items-center justify-center">
        <img
          src="https://res.cloudinary.com/rainforest-cruises/images/c_fill,g_auto/f_auto,q_auto/w_1120,h_732,c_fill,g_auto/v1661347444/india-food-butter-chicken/india-food-butter-chicken-1120x732.jpg"
          alt=""
          className="object-cover transition-all duration-500 h-full w-full"
        />
      </div>
      <div className="bottom-0 absolute h-full w-full bg-gradient-to-t from-purple-900 via-purple-500 to-transparent z-10"></div>
      <div className="absolute items-center flex flex-col justify-center w-full top-3/5 z-20 left-1/2 -translate-x-1/2 -translate-y-3/5">
        <form
          className="md:w-1/3 w-2/3 flex flex-col bg-gray-200 shadow-2xl p-4 rounded-2xl items-center"
          action=""
        >
          <div className="text-center">
            <p className="text-2xl font-bold">Welcome Vendor!!</p>
            <p className="text-sm text-gray-500">Sell your product here...</p>
          </div>
          <div className="w-full m-1">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">What is your Email?</legend>
              <input
                type="email"
                className="input"
                placeholder="Type here"
                value={email}
                onChange={(e) => {
                  e.preventDefault();
                  setEmail(e.target.value);
                }}
              />
            </fieldset>
          </div>
          <div className="w-full m-1">
            <legend className="fieldset fieldset-legend py-2">
              What is your Password?
            </legend>
            <label className="input validator">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                  <circle
                    cx="16.5"
                    cy="7.5"
                    r=".5"
                    fill="currentColor"
                  ></circle>
                </g>
              </svg>
              <input
                type="password"
                required
                placeholder="Password"
                minLength="8"
                title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                value={password}
                onChange={(e) => {
                  e.preventDefault();
                  setPassword(e.target.value);
                }}
              />
            </label>
          </div>
          <button
            className="btn bg-purple-500 hover:bg-purple-800 text-white rounded-xl w-full m-2"
            onClick={(e) => {
              e.preventDefault();
              handleonSubmit();
            }}
          >
            Login
          </button>
          <div className="text-center">
            <Link
              className="text-sm underline hover:text-gray-500"
              to="/registervendor"
            >
              Don't have account? Register Vendor
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginVendor;
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
    if (customer) Navigate("/");
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
    <div className="h-screen bg-yellow-50 p-2">
      <Navbar />
      <div className="flex p-3">
        <div className="w-1/4 flex">
          <form className="flex flex-col border-2 p-4 rounded-2xl" action="">
            <div className="m-3">
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
            <div className="m-3">
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
              className="btn bg-amber-700 text-white rounded-xl m-2"
              onClick={(e) => {
                e.preventDefault();
                handleonSubmit();
              }}
            >
              Submit
            </button>
            <div className="text-center">
              <Link className="text-sm underline" to="/registervendor">
                Don't have account? Register Vendor
              </Link>
            </div>
          </form>
        </div>
        <div className="w-3/4 h-120 p-1">
          <img
            src="https://media.istockphoto.com/id/461020030/video/eating.jpg?s=640x640&k=20&c=U7Xp0VrVb5M_ae63J85j9O9jHc_EFS0liPqRjf75pZI="
            className="w-full h-full rounded-2xl"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default LoginVendor;

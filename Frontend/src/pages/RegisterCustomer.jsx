import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CustomerContext } from "../context/CustomerContextProvider";
import { VendorContext } from "../context/VendorContextProvider";
import toast from "react-hot-toast";
const VITE_API_URL = import.meta.env.VITE_API_URL;
const RegisterCustomer = () => {
  const [showForm, setShowForm] = useState(false);
  const formRef = useRef(null);
  const [firstName, setfirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNo, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [street, setStreet] = useState("");
  const [otp, setOtp] = useState("");
  const Navigate = useNavigate();
  const { customer, setCustomer } = useContext(CustomerContext);
  const { vendor, setVendor } = useContext(VendorContext);
  useEffect(() => {
    if (customer) Navigate("/home");
    if (vendor) Navigate("/dashboardvendor");
  }, [customer, vendor]);
  useEffect(() => {
    if (showForm && formRef.current) {
      formRef.current.focus();
    }
  }, [showForm]);
  const handelonsubmit = async (e) => {
    e.preventDefault();
    const obj = {
      fullName: {
        firstName: firstName,
        lastName: lastName,
      },
      email: email,
      phoneNo: phoneNo,
      password: password,
      address: {
        city: city,
        pinCode: pincode,
        street: street,
        state: state,
      },
    }
    try {
      const res = await axios.post(
        `${VITE_API_URL}/customer/register`,
        obj,
        {
          withCredentials: true,
        }
      );
      setShowForm(true);
      toast.success(res.data.message);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };
  const handleotp = async (e) => {
    e.preventDefault();
    const obj = {
      otp: otp,
      fullName: {
        firstName: firstName,
        lastName: lastName,
      },
      email: email,
      phoneNo: phoneNo,
      password: password,
      address: {
        city: city,
        pinCode: pincode,
        street: street,
        state: state,
      },
    };
    try {
      console.log(obj);
      const res = await axios.post(
        `${VITE_API_URL}/cutomer/verifyotp`,
        obj,
        {
          withCredentials: true,
        }
      );
      setCustomer(res.data.customer)
      Navigate("/home");
      toast.success(res.data.message);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message)
    }
  };
  return (
    <div className="h-screen w-screen relative">
      {showForm && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-40">
          <div
            className="bg-white p-6 rounded-xl shadow-lg w-96"
            tabIndex={-1}
            ref={formRef}
          >
            <form className="space-y-2">
              <legend>Enter OTP sent on your email..</legend>
              <input
                type="text"
                placeholder="Medium"
                className="input input-md"
                value={otp}
                onChange={(e) => {
                  e.preventDefault();
                  setOtp(e.target.value);
                }}
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-500 hover:bg-purple-800 rounded text-white"
                  onClick={handleotp}
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div
        className={
          showForm ? "filter blur-sm pointer-events-none select-none" : ""
        }
      >
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
              <p className="text-2xl font-bold">Welcome Customer!!</p>
              <p className="text-sm text-gray-500">You can register here...</p>
            </div>
            <div className="flex w-full">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">FirstName</legend>
                <input
                  type="text"
                  className="input"
                  placeholder="Type here"
                  value={firstName}
                  onChange={(e) => {
                    e.preventDefault();
                    setfirstName(e.target.value);
                  }}
                />
              </fieldset>
              <fieldset className="fieldset mx-1">
                <legend className="fieldset-legend">LastName</legend>
                <input
                  type="text"
                  className="input"
                  placeholder="Type here"
                  value={lastName}
                  onChange={(e) => {
                    e.preventDefault();
                    setLastName(e.target.value);
                  }}
                />
              </fieldset>
            </div>
            <div className="w-full">
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
            <div className="w-full">
              <legend className="fieldset fieldset-legend">
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
            <div className="w-full">
              <legend className="fieldset fieldset-legend">
                What is your Phone No.?
              </legend>
              <label className="input validator">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                >
                  <g fill="none">
                    <path
                      d="M7.25 11.5C6.83579 11.5 6.5 11.8358 6.5 12.25C6.5 12.6642 6.83579 13 7.25 13H8.75C9.16421 13 9.5 12.6642 9.5 12.25C9.5 11.8358 9.16421 11.5 8.75 11.5H7.25Z"
                      fill="currentColor"
                    ></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M6 1C4.61929 1 3.5 2.11929 3.5 3.5V12.5C3.5 13.8807 4.61929 15 6 15H10C11.3807 15 12.5 13.8807 12.5 12.5V3.5C12.5 2.11929 11.3807 1 10 1H6ZM10 2.5H9.5V3C9.5 3.27614 9.27614 3.5 9 3.5H7C6.72386 3.5 6.5 3.27614 6.5 3V2.5H6C5.44771 2.5 5 2.94772 5 3.5V12.5C5 13.0523 5.44772 13.5 6 13.5H10C10.5523 13.5 11 13.0523 11 12.5V3.5C11 2.94772 10.5523 2.5 10 2.5Z"
                      fill="currentColor"
                    ></path>
                  </g>
                </svg>
                <input
                  type="tel"
                  className="tabular-nums"
                  required
                  placeholder="Phone"
                  pattern="[0-9]*"
                  minLength="10"
                  maxLength="10"
                  title="Must be 10 digits"
                  value={phoneNo}
                  onChange={(e) => {
                    e.preventDefault();
                    setPhone(e.target.value);
                  }}
                />
              </label>
            </div>
            <legend className="fieldset fieldset-legend w-full">
              What is your Address?
            </legend>
            <div className="flex w-full">
              <input
                type="text"
                placeholder="City"
                className="input"
                value={city}
                onChange={(e) => {
                  e.preventDefault();
                  setCity(e.target.value);
                }}
              />
              <input
                type="text"
                placeholder="State"
                className="input mx-1"
                value={state}
                onChange={(e) => {
                  e.preventDefault();
                  setState(e.target.value);
                }}
              />
            </div>
            <div className="flex w-full">
              <input
                type="text"
                placeholder="Street Location"
                className="input"
                value={street}
                onChange={(e) => {
                  e.preventDefault();
                  setStreet(e.target.value);
                }}
              />
              <input
                type="text"
                placeholder="Pincode"
                className="input mx-1"
                maxLength={6}
                pattern="\d{6}"
                value={pincode}
                onChange={(e) => {
                  e.preventDefault();
                  setPincode(e.target.value);
                }}
              />
            </div>
            <button
              className="w-full bg-purple-500 p-2 hover:bg-purple-800 text-sm text-white rounded-xl m-1"
              onClick={handelonsubmit}
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterCustomer;

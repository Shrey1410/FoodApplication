import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CustomerContext } from "../context/CustomerContextProvider";
import { VendorContext } from "../context/VendorContextProvider";
import toast from "react-hot-toast";
const RegisterVendor = () => {
  const [showForm, setShowForm] = useState(false);
  const Navigate = useNavigate();
  const formRef = useRef(null);
  useEffect(() => {
    if (showForm && formRef.current) {
      formRef.current.focus();
    }
  }, [showForm]);
  const [fullName, setfullName] = useState("");
  const [shopName, setshopName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNo, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [street, setStreet] = useState("");
  const [otp, setOtp] = useState("");
  const { customer, setCustomer } = useContext(CustomerContext);
  const { vendor, setVendor } = useContext(VendorContext);
  const VITE_API_URL = import.meta.env.VITE_API_URL;
  useEffect(() => {
    if (customer) Navigate("/");
    if (vendor) Navigate("/vendordashboard");
  }, [customer, vendor]);
  const handelonsubmit = async (e) => {
    e.preventDefault();
    const obj = {
      fullName: fullName,
      shopName: shopName,
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
        `${VITE_API_URL}/vendor/register`,
        obj,
        {
          withCredentials: true,
        }
      );
      setShowForm(true)
      toast.success(res.data.message);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message)
    }
  };
  const handleotp = async (e) => {
    e.preventDefault();
    const obj = {
      otp: otp,
      fullName: fullName,
      shopName: shopName,
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
      const res = await axios.post(
        `${VITE_API_URL}/vendor/verifyotp`,
        obj,
        {
          withCredentials: true,
        }
      );
      setVendor(res.data.vendor)
      toast.success(res.data.message);
      Navigate("/vendordashboard");
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };
  return (
    <div>
      <div className="h-screen bg-yellow-50 p-2">
        <Navbar />
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
                    className="px-4 py-2 bg-amber-400 rounded text-white"
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
          <div className="flex p-3">
            <div className="w-1/3 flex">
              <form
                className="border-2 p-2 rounded-2xl flex flex-col"
                action=""
              >
                <div className="flex">
                  <fieldset className="fieldset mx-1">
                    <legend className="fieldset-legend">ShopName</legend>
                    <input
                      type="text"
                      className="input"
                      placeholder="Type here"
                      value={shopName}
                      onChange={(e) => {
                        e.preventDefault();
                        setshopName(e.target.value);
                      }}
                    />
                  </fieldset>
                  <fieldset className="fieldset mx-1">
                    <legend className="fieldset-legend">FullName</legend>
                    <input
                      type="text"
                      className="input"
                      placeholder="Type here"
                      value={fullName}
                      onChange={(e) => {
                        e.preventDefault();
                        setfullName(e.target.value);
                      }}
                    />
                  </fieldset>
                </div>
                <div>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">
                      What is your Email?
                    </legend>
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
                <div>
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
                <div>
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
                <legend className="fieldset fieldset-legend">
                  What is your Address?
                </legend>
                <div className="flex">
                  <input
                    type="text"
                    placeholder="City"
                    className="input m-1"
                    value={city}
                    onChange={(e) => {
                      e.preventDefault();
                      setCity(e.target.value);
                    }}
                  />
                  <input
                    type="text"
                    placeholder="State"
                    className="input m-1"
                    value={state}
                    onChange={(e) => {
                      e.preventDefault();
                      setState(e.target.value);
                    }}
                  />
                </div>
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Street Location"
                    className="input m-1"
                    value={street}
                    onChange={(e) => {
                      e.preventDefault();
                      setStreet(e.target.value);
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Pincode"
                    className="input m-1"
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
                  className=" bg-amber-700 p-2 hover:bg-amber-500 text-sm text-white rounded-xl m-1"
                  onClick={handelonsubmit}
                >
                  Submit
                </button>
              </form>
            </div>
            <div className="w-2/3 h-120 p-1">
              <img
                src="https://media.istockphoto.com/id/461020030/video/eating.jpg?s=640x640&k=20&c=U7Xp0VrVb5M_ae63J85j9O9jHc_EFS0liPqRjf75pZI="
                className="w-full h-full rounded-2xl"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterVendor;

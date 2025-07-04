import React from 'react'
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useContext } from 'react';
import { CustomerContext } from '../context/CustomerContextProvider';
import { VendorContext } from '../context/VendorContextProvider';
import { useNavigate } from 'react-router-dom';
const EnterPage = () => {
  const {customer, setCustomer} = useContext(CustomerContext)
  const {vendor , setVendor} = useContext(VendorContext)
  const Navigate = useNavigate()
  useEffect(()=>{
      if(customer) Navigate('/home')
      if(vendor) Navigate('/vendordashboard')
    },[customer, vendor])
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
      <div className="absolute items-center flex flex-col justify-center w-full top-2/5 z-20 left-1/2 -translate-x-1/2">
        <Link
          to="/loginvendor"
          className="md:w-1/3 w-2/3 rounded-lg text-xl text-center py-3 px-5 bg-neutral text-white m-1"
        >
          Login as Vendor with Email
        </Link>
        <Link
          to="/logincustomer"
          className="md:w-1/3 w-2/3 rounded-lg text-xl text-center py-3 px-5 bg-neutral text-white m-1"
        >
          Login as Customer with Email
        </Link>
        <div className="flex justify-center items-center">
          <div className="h-0.5 bg-white md:w-40 w-14"></div>
          <div className="text-white p-2">
            <p>or Use Social Signup</p>
          </div>
          <div className="h-0.5 bg-white md:w-40 w-14"></div>
        </div>
        <button className="btn md:w-1/3 w-2/3 bg-white text-black border-[#e5e5e5]">
          <svg
            aria-label="Google logo"
            width="24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path d="m0 0H512V512H0" fill="#fff"></path>
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              ></path>
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              ></path>
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              ></path>
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              ></path>
            </g>
          </svg>
          Continue with Google
        </button>
        <div className="text-white font-semibold p-4">
          <Link to='/registercustomer' className="underline hover:text-gray-400">
            Don't have Account? Signup
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EnterPage

import React, { useContext, useEffect } from "react";
import Navbar from "../components/Navbar";
import { CustomerContext } from "../context/CustomerContextProvider";
import { VendorContext } from "../context/VendorContextProvider";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const { customer } = useContext(CustomerContext);
  const { vendor } = useContext(VendorContext)
  const Navigate = useNavigate()
  useEffect(()=>{
    if(!customer && !vendor){
        Navigate("/")
    }
  }, [customer, vendor])
  return (
    <div className="min-h-screen relative flex flex-col items-center">
      <div className="absolute inset-0 -z-20">
        <img
          src="https://res.cloudinary.com/rainforest-cruises/images/c_fill,g_auto/f_auto,q_auto/w_1120,h_732,c_fill,g_auto/v1661347444/india-food-butter-chicken/india-food-butter-chicken-1120x732.jpg"
          alt=""
          className="h-full w-full object-cover transition-all duration-500"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-purple-200/90"></div>
      <Navbar usertype="customer" />
      <div className="absolute top-1/2 -translate-y-1/2 max-w-xl bg-white rounded-2xl shadow-lg p-8 bg-gradient-to-tr from-purple-100 via-purple-50 to-purple-300">
        <h2 className="text-3xl font-bold text-purple-800 mb-6 text-center">
          My Profile
        </h2>
        {customer ? (
          <div className="space-y-4">
            <div>
              <span className="font-semibold text-gray-700">Name:</span>
              <span className="ml-2 text-gray-900">
                {customer.fullName.firstName} {customer.fullName.lastName}
              </span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">Email:</span>
              <span className="ml-2 text-gray-900">{customer.email}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">Phone:</span>
              <span className="ml-2 text-gray-900">
                {customer.phone || "N/A"}
              </span>
            </div>
            <div>
              <div className="font-semibold text-gray-700">Address:</div>
              <div className="ml-2 text-gray-900 capitalize">
                State: {customer.address.state || "N/A"}
              </div>
              <div className="ml-2 text-gray-900 capitalize">
                City: {customer.address.city || "N/A"}
              </div>
              <div className="ml-2 text-gray-900 capitalize">
                Street: {customer.address.street || "N/A"}
              </div>
              <div className="ml-2 text-gray-900 capitalize">
                Pincode: {customer.address.pinCode || "N/A"}
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
        {vendor ? (
          <div className="space-y-4">
            <div>
              <span className="font-semibold text-gray-700">Name:</span>
              <span className="ml-2 text-gray-900">{vendor.fullName}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">Email:</span>
              <span className="ml-2 text-gray-900">{vendor.email}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">Phone:</span>
              <span className="ml-2 text-gray-900">
                {vendor.phone || "N/A"}
              </span>
            </div>
            <div>
              <div className="font-semibold text-gray-700">Address:</div>
              <div className="ml-2 text-gray-900 capitalize">
                State: {vendor.address.state || "N/A"}
              </div>
              <div className="ml-2 text-gray-900 capitalize">
                City: {vendor.address.city || "N/A"}
              </div>
              <div className="ml-2 text-gray-900 capitalize">
                Street: {vendor.address.street || "N/A"}
              </div>
              <div className="ml-2 text-gray-900 capitalize">
                Pincode: {vendor.address.pinCode || "N/A"}
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Profile;

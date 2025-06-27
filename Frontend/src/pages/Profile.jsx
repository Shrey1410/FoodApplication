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
        Navigate("/logincustomer")
    }
  }, [customer, vendor])
  return (
    <div className="bg-yellow-50 min-h-screen m-2">
      <Navbar usertype="customer" />
      <div className="max-w-xl mx-auto mt-10 bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-amber-700 mb-6 text-center">
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
              <span className="ml-2 text-gray-900">
                {vendor.fullName}
              </span>
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

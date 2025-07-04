import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { VendorContext } from "../context/VendorContextProvider";
import { CustomerContext } from "../context/CustomerContextProvider";
import axios from "axios";
import toast from "react-hot-toast";
const VITE_API_URL = import.meta.env.VITE_API_URL;
const statusSteps = [
  { key: "pending", label: "Order Placed" },
  { key: "shipped", label: "Shipped" },
  { key: "completed", label: "Delivered" },
];
function getStepIndex(status) {
  if (status === "pending") return 0;
  if (status === "shipped") return 1;
  return 2;
}
const CustomerTrackorder = () => {
  const { vendor } = useContext(VendorContext);
  const { customer } = useContext(CustomerContext);
  const [otp, setOtp] = useState("");
  const { state } = useLocation();
  let orderid = state?.order;
  const [order, setOrder] = useState(null);
  const [currentStep, setcurrentStep] = useState(1);
  const Navigate = useNavigate()
  useEffect(() => {
    if (!customer && !vendor) {
      Navigate("/");
    }
  }, [customer, vendor]);
  useEffect(() => {
    const getorderbyidvendor = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        const res = await axios.get(
          `${VITE_API_URL}/getorder/vendor/${orderid}`,
          {
            withCredentials: true,
          }
        );
        setOrder(res.data.order);
        setcurrentStep(getStepIndex(res.data.order.status));
      } catch (err) {
        console.log(err);
      }
    };
    if (vendor) getorderbyidvendor();
    const getorderbyidcustomer = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        const res = await axios.get(
          `${VITE_API_URL}/getorder/customer/${orderid}`,
          {
            withCredentials: true,
          }
        );
        setOrder(res.data.order);
        setcurrentStep(getStepIndex(res.data.order.status));
      } catch (err) {
        console.log(err);
      }
    };
    if (customer) getorderbyidcustomer();
  }, [vendor, customer]);
  const updatetoshipped = async () => {
    try {
      const res = await axios.post(
        `${VITE_API_URL}/update/status/shipped`,
        {
          orderid: orderid,
        },
        {
          withCredentials: true,
        }
      );
      setOrder(res.data.order);
      setcurrentStep(getStepIndex(res.data.order.status));
      toast.success(res.data.message);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };
  const updatetocompleted = async () => {
    try {
      const res = await axios.post(
        `${VITE_API_URL}/update/status/completed`,
        { orderid: orderid, otp: otp },
        {
          withCredentials: true,
        }
      );
      setOrder(res.data.order);
      setcurrentStep(getStepIndex(res.data.order.status));
      toast.success(res.data.message);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };
  return order ? (
    <div className="flex flex-col items-center justify-center min-h-screen bg-purple-100 py-8">
      <h2 className="text-3xl font-bold hover:bg-purple-800 mb-8 text-purple-950">
        Track Your Order
      </h2>
      <div className="flex flex-col sm:flex-row items-center justify-center mb-10 gap-y-6 sm:gap-x-4 w-full">
        {statusSteps.map((step, idx) => (
          <div
            key={step.key}
            className="flex items-center sm:flex-row flex-col relative"
          >
            <div
              className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 text-base sm:text-lg font-bold hover:bg-purple-800
          ${
            idx <= currentStep
              ? "bg-purple-400 border-purple-400 text-white"
              : "bg-gray-200 border-gray-500 text-gray-400"
          }
        `}
            >
              {idx + 1}
            </div>

            <div className="flex flex-col items-center sm:ml-2 sm:mr-2 mt-2 sm:mt-0">
              <span
                className={`text-xs sm:text-sm font-semibold text-center ${
                  idx <= currentStep ? "text-purple-800" : "text-gray-400"
                }`}
              >
                {step.label}
              </span>
            </div>

            {idx < statusSteps.length - 1 && (
              <div
                className={`${
                  idx < currentStep ? "bg-purple-400" : "bg-gray-500"
                } sm:w-16 sm:h-1 w-1 h-8 rounded transition-all duration-500 sm:mx-2 my-2 sm:my-0`}
              />
            )}
          </div>
        ))}
      </div>
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h3 className="text-lg font-bold hover:bg-purple-800 mb-4 text-purple-800">
          Order Details
        </h3>
        <ul className="mb-4"></ul>
        <figure className="mb-2">
          <img
            src={order.item.itemImage}
            alt={"Food Item"}
            className="rounded-xl object-cover"
            style={{ width: "250px", height: "200px" }}
          />
        </figure>
        <p className="mb-2">
          <span className="font-semibold">Total:</span> ₹
          {order.item.price * order.quantity}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Order Id:</span> {order._id}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Item Name:</span>{" "}
          {order.item.foodName}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Quantity:</span> {order.quantity}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Status:</span>{" "}
          <span className="capitalize">{order.status}</span>
        </p>
        {vendor && order.status === "pending" ? (
          <button
            className="bg-purple-500 rounded-2xl text-sm p-3 text-white font-bold hover:bg-purple-800"
            onClick={(e) => {
              e.preventDefault();
              updatetoshipped();
            }}
          >
            Update Status Shipped
          </button>
        ) : (
          <></>
        )}
        {vendor && order.status === "shipped" ? (
          <>
            <input
              type="text"
              className="input validator mb-2"
              required
              placeholder="Enter a OTP here"
              onChange={(e) => {
                e.preventDefault;
                setOtp(e.target.value);
              }}
            />
            <button
              className="bg-purple-500 rounded-2xl text-sm p-3 text-white font-bold hover:bg-purple-800"
              onClick={(e) => {
                e.preventDefault();
                updatetocompleted();
              }}
            >
              Update Status Completed
            </button>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  ) : (
    <div className="h-screen w-screen flex items-center justify-center bg-white">
      <div className="h-16 w-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default CustomerTrackorder;

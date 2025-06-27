import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
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
  useEffect(() => {
    const getorderbyidvendor = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 3000));
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
        await new Promise((resolve) => setTimeout(resolve, 3000));
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
      toast.success(res.data.message)
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message)
    }
  };
  return order ? (
    <div className="flex flex-col items-center justify-center min-h-screen bg-amber-50 py-8">
      <h2 className="text-2xl font-bold mb-8 text-amber-700">
        Track Your Order
      </h2>
      <div className="flex items-center mb-10">
        {statusSteps.map((step, idx) => (
          <div key={step.key} className="flex items-center">
            <div
              className={`flex items-center justify-center w-12 h-12 rounded-full border-2 text-lg font-bold
                                ${
                                  idx <= currentStep
                                    ? "bg-amber-400 border-amber-400 text-white"
                                    : "bg-gray-200 border-gray-300 text-gray-400"
                                }
                            `}
            >
              {idx + 1}
            </div>
            <div className="flex flex-col items-center ml-2 mr-2">
              <span
                className={`text-sm font-semibold ${
                  idx <= currentStep ? "text-amber-700" : "text-gray-400"
                }`}
              >
                {step.label}
              </span>
            </div>
            {idx < statusSteps.length - 1 && (
              <div
                className={`h-1 w-16 rounded transition-all duration-300
                                    ${
                                      idx < currentStep
                                        ? "bg-amber-400"
                                        : "bg-gray-300"
                                    }
                                `}
              />
            )}
          </div>
        ))}
      </div>
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h3 className="text-lg font-bold mb-4 text-amber-700">Order Details</h3>
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
            className="bg-yellow-300 rounded-2xl text-sm p-3 text-red-800 font-bold"
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
              className="bg-yellow-300 rounded-2xl text-sm p-3 text-red-800 font-bold"
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
    <></>
  );
};

export default CustomerTrackorder;

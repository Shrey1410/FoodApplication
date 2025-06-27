import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { CustomerContext } from "../context/CustomerContextProvider";
import { VendorContext } from "../context/VendorContextProvider";
import toast from "react-hot-toast";
const VITE_API_URL = import.meta.env.VITE_API_URL;
const Navbar = (props) => {
  const { customer, setCustomer } = useContext(CustomerContext);
  const { vendor, setVendor } = useContext(VendorContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const handelogoutcustomer = async () => {
    try {
      const res = await axios.post(
        `${VITE_API_URL}/customer/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      setCustomer(null);
      toast.success(res.data.message)
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };
  const handelogoutvendor = async () => {
    try {
      const res = await axios.post(
        `${VITE_API_URL}/vendor/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      toast.success(res.data.message)
      setVendor(null);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };
  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (searchQuery.trim().length === 0) {
        setSearchResults([]);
        return;
      }
      try {
        const res = await axios.get(
          `${VITE_API_URL}/search/order/${searchQuery}`,
          { withCredentials: true }
        );
        setSearchResults([res.data.result]);
      } catch (err) {
        console.error("Search failed", err);
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  return (
    <div className="flex animate-fadeIn bg-gradient-to-r justify-between navbar shadow-sm rounded-2xl  from-yellow-300 via-red-400 to-orange-300">
      <div className="flex items-start justify-center">
        <img
          src="https://www.greenqueen.com.hk/wp-content/uploads/2013/09/Foodie-Logo.jpg"
          className="w-10 h-10 rounded-2xl shadow-2xl"
          alt=""
        />
        <p className="text-2xl font-bold px-2 flex animate-fadeIn bg-gradient-to-r from-yellow-800 via-red-900 to-orange-700 bg-clip-text text-transparent">
          Foodie
        </p>
      </div>
      {vendor && (
        <div className="relative w-full max-w-md">
          <label className="input flex items-center gap-2 border rounded px-3 py-2 shadow-sm bg-white w-full">
            <svg
              className="h-5 w-5 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="M21 21l-4.3-4.3"></path>
            </svg>
            <input
              type="search"
              className="grow outline-none"
              placeholder="Search orders"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </label>

          {/* Results Dropdown */}
          {searchResults.length > 0 && (
            <ul className="absolute z-10 bg-white border rounded mt-1 w-full shadow-lg max-h-64 overflow-auto">
              {searchResults.map((order) => (
                <Link
                  to="/customertrackorder"
                  state={{ order: order._id }}
                  key={order._id}
                  className="px-4 py-2 hover:bg-amber-100 cursor-pointer"
                  onClick={() => {
                    // Optional: handle click (e.g., navigate to order details)
                    console.log("Selected order:", order);
                    setSearchQuery("");
                    setSearchResults([]);
                  }}
                >
                  {order._id} - {order.item?.foodName || "No name"}
                </Link>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className="flex gap-2">
        <div className="dropdown dropdown-end">
          <div className="flex gap-2">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
              >
                {/* Three-line menu icon (hamburger) */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </div>
            </div>
          </div>

          {customer ? (
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/trackorder">Show Orders</Link>
              </li>
              <li>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handelogoutcustomer();
                  }}
                >
                  Logout
                </button>
              </li>
            </ul>
          ) : (
            <></>
          )}

          {vendor ? (
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/tracksales">Track Sales</Link>
              </li>
              <li>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handelogoutvendor();
                  }}
                >
                  Logout
                </button>
              </li>
            </ul>
          ) : (
            <></>
          )}

          {props.usertype == null ? (
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/loginvendor">Vendor Login</Link>
              </li>
              <li>
                <Link to="/logincustomer">Customer Login</Link>
              </li>
            </ul>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};
export default Navbar;

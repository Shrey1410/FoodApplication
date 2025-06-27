import React from "react";
import Navbar from "../components/Navbar";
import Items from "../components/Items";
import { useContext } from "react";
import { CustomerContext } from "../context/CustomerContextProvider";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Skeleton from "../components/Skeleton";
import { useState } from "react";
import axios from "axios";
import Order from "../components/Order"
import toast from "react-hot-toast";
const VITE_API_URL = import.meta.env.VITE_API_URL;
const CustomerOrder = () => {
  const Navigate = useNavigate();
  const { customer } = useContext(CustomerContext);
  const [category, setCategory] = useState("fastfood");
  const [itemlist, setItemList] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!customer) Navigate("/logincustomer");
  }, [customer]);
  useEffect(() => {
    const fetchitemlist = async () => {
      setLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        const res = await axios.get(
          `${VITE_API_URL}/customer/orders`,
          {
            withCredentials: true,
            params: {
              page: page,
              limit: limit,
            },
          }
        );
        console.log(res.data)
        setItemList([...itemlist, ...res.data.orders]);
        if (res.data.totalPages > page) {
          setPage(page + 1);
        }
      } catch (err) {
        console.log(err);
        toast.error(err.response.data.message);
      } finally {
        setLoading(false);
      }
    };
    fetchitemlist();
  }, [category, page]);
  return (
    <div className="bg-yellow-50 p-2 min-h-screen overflow-y-auto">
      <Navbar usertype={"customer"} />
      <div className="carousel rounded-box h-100 py-3">
        <div className="carousel-item h-full">
          <img
            src="https://images.unsplash.com/photo-1727387562395-6be53e861975?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHJlc3RhdXJhbnQlMjBmb29kfGVufDB8fDB8fHww"
            alt="Burger"
          />
        </div>
        <div className="carousel-item h-full">
          <img
            src="https://plus.unsplash.com/premium_photo-1663036447682-8f0d918adbed?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cmVzdGF1cmFudCUyMGZvb2R8ZW58MHx8MHx8fDA%3D"
            alt="Burger"
          />
        </div>
        <div className="carousel-item h-full">
          <img
            src="https://images.unsplash.com/photo-1652690772703-0461a655643d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHJlc3RhdXJhbnQlMjBmb29kfGVufDB8fDB8fHww"
            alt="Burger"
          />
        </div>
        <div className="carousel-item h-full">
          <img
            src="https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHJlc3RhdXJhbnQlMjBmb29kfGVufDB8fDB8fHww"
            alt="Burger"
          />
        </div>
        <div className="carousel-item h-full">
          <img
            src="https://images.unsplash.com/photo-1502998070258-dc1338445ac2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHJlc3RhdXJhbnQlMjBmb29kfGVufDB8fDB8fHww"
            alt="Burger"
          />
        </div>
        <div className="carousel-item h-full">
          <img
            src="https://images.unsplash.com/photo-1652690772450-2cc9c53060f5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cmVzdGF1cmFudCUyMGZvb2R8ZW58MHx8MHx8fDA%3D"
            alt="Burger"
          />
        </div>
        <div className="carousel-item h-full">
          <img
            src="https://images.unsplash.com/photo-1651440204227-a9a5b9d19712?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmVzdGF1cmFudCUyMGZvb2R8ZW58MHx8MHx8fDA%3D"
            alt="Burger"
          />
        </div>
      </div>
      <div className="animate-fadeIn bg-gradient-to-r from-yellow-100 via-red-100 to-pink-100 p-6 rounded-2xl shadow-xl text-center max-w-xl mx-auto mt-5">
        <p className="text-3xl font-bold text-gray-800">
          Track your <span className="text-red-500">Orders</span>{" "}here
        </p>
      </div>
      <div className="w-full px-4 py-6 overflow-x-auto scrollbar-hidden">
        <div className="flex gap-4 min-w-[1000px]">
          {itemlist.map((item) => {
            return <Order key={item._id} item={item} />;
          })}
          {loading && <Skeleton />}
        </div>
      </div>
    </div>
  );
};
export default CustomerOrder;
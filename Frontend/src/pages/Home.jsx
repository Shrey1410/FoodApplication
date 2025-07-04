import React, { useContext, useRef, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Items from "../components/Items";
import Skeleton from "../components/Skeleton";
import { CustomerContext } from "../context/CustomerContextProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const VITE_API_URL = import.meta.env.VITE_API_URL;

const Home = () => {
  const Navigate = useNavigate();
  const { customer } = useContext(CustomerContext);
  const [category, setCategory] = useState("chinese");
  const [itemList, setItemList] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (!customer) Navigate("/");
  }, [customer]);

  useEffect(() => {
    setItemList([]);
    setPage(1);
    setHasMore(true);
  }, [category]);

  useEffect(() => {
    const fetchItems = async () => {
      if (loading || !hasMore) return;
      setLoading(true);
      try {
        const res = await axios.get(
          `${VITE_API_URL}/getitemlistbycategory/${category}`,
          {
            withCredentials: true,
            params: { page, limit },
          }
        );
        const newItems = res.data.foodList;
        setItemList((prev) => [...prev, ...newItems]);
        if (res.data.totalPages <= page) {
          setHasMore(false);
        }
      } catch (err) {
        console.error(err);
        toast.error("Error fetching items.");
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [page, category]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollLeft, clientWidth, scrollWidth } = container;
      if (
        scrollLeft + clientWidth >= scrollWidth - 100 &&
        !loading &&
        hasMore
      ) {
        setPage((prev) => prev + 1);
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  return (
    <div className="min-h-screen">
      <Navbar usertype={"customer"} />

      {/* Image Carousel */}
      <div className="carousel py-3 w-full">
        {[
          "https://images.unsplash.com/photo-1727387562395-6be53e861975",
          "https://plus.unsplash.com/premium_photo-1663036447682-8f0d918adbed",
          "https://images.unsplash.com/photo-1652690772703-0461a655643d",
          "https://images.unsplash.com/photo-1467003909585-2f8a72700288",
          "https://images.unsplash.com/photo-1502998070258-dc1338445ac2",
          "https://images.unsplash.com/photo-1652690772450-2cc9c53060f5",
          "https://images.unsplash.com/photo-1651440204227-a9a5b9d19712",
        ].map((url, index) => (
          <div key={index} className="carousel-item h-80 w-80 rounded-full">
            <img
              src={`${url}?w=600&auto=format&fit=crop&q=60`}
              alt="Food"
              className="rounded-full h-full w-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Welcome Message */}
      <div className="animate-fadeIn bg-gradient-to-r from-purple-200 p-6 rounded-2xl shadow-xl text-center max-w-xl mx-auto mt-5">
        <p className="text-3xl font-bold text-gray-800">
          Welcome to <span className="text-purple-800">Foodie</span>, to become{" "}
          <span className="text-purple-800">Foodie</span>
        </p>
      </div>

      {/* Category Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mt-6">
        {[
          "chinese",
          "indian",
          "italian",
          "deserts",
          "fastfood",
          "beverage",
        ].map((cat) => (
          <button
            key={cat}
            disabled={loading}
            className={`px-4 py-2 border border-gray-300 rounded-full hover:bg-purple-800 hover:text-white transition duration-300 ${
              loading ? "cursor-not-allowed" : ""
            } ${
              category === cat
                ? "bg-purple-800 text-white"
                : "bg-white text-gray-800"
            }`}
            onClick={(e) => {
              e.preventDefault();
              setCategory(cat);
              setItemList([]);
              setPage(1);
              setHasMore(true);
            }}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Item List with Horizontal Scroll */}
      <div
        className="w-full px-4 py-6 overflow-x-auto scrollbar-hidden"
        ref={scrollContainerRef}
      >
        <div className="flex gap-4 min-w-[800px]">
          {itemList.length > 0
            ? itemList.map((item) => <Items key={item._id} item={item} />)
            : loading && <Skeleton height={"h-full"} />}
          {loading && <Skeleton height={"h-full"} />}
        </div>
      </div>
    </div>
  );
};

export default Home;
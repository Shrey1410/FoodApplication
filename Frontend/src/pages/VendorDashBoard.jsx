import React, { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import Order from "../components/Order";
import { useContext } from "react";
import { VendorContext } from "../context/VendorContextProvider";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Items from "../components/Items";
import Skeleton from "../components/Skeleton";
import toast from "react-hot-toast";
const VITE_API_URL = import.meta.env.VITE_API_URL;
const VendorDashBoard = () => {
  const [showForm, setShowForm] = useState(false);
  const formRef = useRef(null);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [foodName, setfoodName] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const { vendor, setVendor } = useContext(VendorContext);
  const [itemList, setitemList] = useState([]);
  const [pendingList, setpendingList] = useState([]);
  const [completedList, setcompletedList] = useState([]);
  const [shippedList, setshippedList] = useState([]);
  const [type, setType] = useState("foodList");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [loading, setloading] = useState(false);
  const [loading2, setLoading2] = useState(false)
  const Navigate = useNavigate();

  useEffect(() => {
    if (!vendor) Navigate("/loginvendor");
  }, [vendor]);

  useEffect(() => {
    if (showForm && formRef.current) {
      formRef.current.focus();
    }
  }, [showForm]);
  
  useEffect(()=>{
    setcompletedList([])
    setitemList([])
    setpendingList([])
    setshippedList([])
    setPage(1)
  }, [type])

  useEffect(() => {
    const getitemlist = async () => {
      try {
        setloading(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        const res = await axios.get(`${VITE_API_URL}/getitemlistbyuser`, {
          withCredentials: true,
          params: {
            page: page,
            limit: limit,
          },
        });
        setitemList([...itemList, ...res.data.foodList]);
        if (page < res.data.totalPages) {
          setPage(page + 1);
        }
      } catch (err) {
        console.log(err);
        toast.error(err.response.data.message);
      } finally {
        setloading(false);
      }
    };  
    const getorderspending = async () => {
      try {
        setloading(true)
        await new Promise((resolve) => setTimeout(resolve, 3000));
        const res = await axios.get(`${VITE_API_URL}/getorders/pending`, {
          params: {
            page: page,
            limit: limit,
          },
          withCredentials: true,
        });
        console.log("pendingorder", res.data)
        setpendingList([...pendingList, ...res.data.orders]);
        if (page < res.data.totalPages) {
          setPage(page + 1);
        }
      } catch (err) {
        console.log(err);
        toast.error(err.response.data.message);
      }
      finally{
        setloading(false)
      }
    };
    const getorderscompleted = async () => {
      try {
        setloading(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        const res = await axios.get(
          `${VITE_API_URL}/getorders/completed`,
          {
            params: {
              page: page,
              limit: limit,
            },
            withCredentials: true,
          }
        );
        setcompletedList([...completedList, ...res.data.orders]);
        console.log(itemList)
        if (page < res.data.totalPages) {
          setPage(page + 1);
        }
      } catch (err) {
        console.log(err);
        toast.error(err.response.data.message);
      }
      finally{
        setloading(false)
      }
    };
    const getordersshipped = async () => {
      try {
        setloading(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        const res = await axios.get(`${VITE_API_URL}/getorders/shipped`, {
          params: {
            page: page,
            limit: limit,
          },
          withCredentials: true,
        });
        console.log(res);
        setshippedList([...shippedList, ...res.data.orders]);
        console.log(res.data);
        if (page < res.data.totalPages) {
          setPage(page + 1);
        }
      } catch (err) {
        console.log(err);
        toast.error(err.response.data.message);
      }
      finally{
        setloading(false)
      }
    };
    if (type === "foodList") getitemlist();
    if (type === "pendingorder") getorderspending();
    if (type === "completedorder") getorderscompleted();
    if (type === "shippedorder") getordersshipped();
  }, [page, type]);

  const handelonsubmit = async (e) => {
    const formdata = new FormData();
    formdata.append("description", description);
    formdata.append("price", price);
    formdata.append("foodName", foodName);
    formdata.append("category", category);
    formdata.append("image", image);
    try {
      setLoading2(true)
      const res = await axios.post(
        `${VITE_API_URL}/create/fooditem`,
        formdata,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setShowForm(false);
      toast.success(res.data.message)
      setLoading2(false)
    } catch (err) {
      toast.error(err.response.data.message);
      console.log(err);
    }
  };

  return (
    <div className="bg-yellow-50 p-2 min-h-screen overflow-y-auto">
      <Navbar usertype={"customer"} />
      {showForm && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-40">
          <div
            className="bg-white p-6 rounded-xl shadow-lg w-96"
            tabIndex={-1}
            ref={formRef}
          >
            <h2 className="text-lg font-bold mb-4">Add Food Item</h2>
            <form>
              <input
                className="w-full mb-3 p-2 border rounded"
                type="text"
                placeholder="Food Name"
                autoFocus
                value={foodName}
                onChange={(e) => {
                  e.preventDefault();
                  setfoodName(e.target.value);
                }}
              />
              <input
                className="w-full mb-3 p-2 border rounded"
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => {
                  e.preventDefault();
                  setPrice(e.target.value);
                }}
              />
              <textarea
                className="w-full mb-3 p-2 border rounded"
                placeholder="Description"
                value={description}
                onChange={(e) => {
                  e.preventDefault();
                  setDescription(e.target.value);
                }}
              />
              {/* Category Select */}
              <select
                className="w-full mb-3 p-2 border rounded"
                onChange={(e) => setCategory(e.target.value)}
                defaultValue=""
              >
                <option value="" disabled>
                  Select Category
                </option>
                <option value="beverage">Beverage</option>
                <option value="fastfood">Fast Food</option>
                <option value="indian">Indian</option>
                <option value="italiyan">Italiyan</option>
                <option value="chinese">Chinese</option>
                <option value="deserts">Deserts</option>
              </select>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">
                  Add an image of item.
                </legend>
                <input
                  type="file"
                  className="file-input"
                  accept="image/*"
                  onChange={(e) => {
                    e.preventDefault();
                    setImage(e.target.files[0]);
                  }}
                />
              </fieldset>

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
                  className={`px-4 py-2 bg-amber-400 rounded text-white ${
                    loading ? "disabled" : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handelonsubmit();
                  }}
                  disabled={loading2}
                >
                  {loading2 ? "Processing..." : "Add"}
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
      </div>
      <div className="animate-fadeIn bg-gradient-to-r from-yellow-300 via-red-200 to-pink-300 p-3 rounded-2xl shadow-xl text-center max-w-xl mx-auto mt-2 hover:size-1/3 hover:shadow-2xl">
        <button
          className="text-lg font-bold text-gray-800"
          onClick={(e) => {
            e.preventDefault();
            setShowForm(true);
          }}
        >
          Create A Food Item
        </button>
      </div>
      <div className="animate-fadeIn bg-gradient-to-r from-yellow-100 via-red-100 to-pink-100 p-6 rounded-2xl shadow-xl text-center max-w-xl mx-auto mt-5">
        <p className="text-3xl font-bold text-gray-800">Vendor Dashboard</p>
      </div>
      <div className="flex flex-wrap justify-center gap-4 mt-6">
        <button
          className="px-4 py-2 bg-white text-gray-800 border border-gray-300 rounded-full hover:bg-red-100 hover:text-red-600 transition duration-300"
          onClick={(e) => {
            e.preventDefault();
            setType("pendingorder");
          }}
        >
          Pending Orders
        </button>
        <button
          className="px-4 py-2 bg-white text-gray-800 border border-gray-300 rounded-full hover:bg-red-100 hover:text-red-600 transition duration-300"
          onClick={(e) => {
            e.preventDefault();
            setType("shippedorder");
          }}
        >
          Shipped Orders
        </button>
        <button
          className="px-4 py-2 bg-white text-gray-800 border border-gray-300 rounded-full hover:bg-red-100 hover:text-red-600 transition duration-300"
          onClick={(e) => {
            e.preventDefault();
            setType("completedorder");
          }}
        >
          Completed Orders
        </button>
        <button
          className="px-4 py-2 bg-white text-gray-800 border border-gray-300 rounded-full hover:bg-red-100 hover:text-red-600 transition duration-300"
          onClick={(e) => {
            e.preventDefault();
            setType("foodList");
          }}
        >
          Items Lists
        </button>
      </div>
      <div className="w-full px-4 py-6 overflow-x-auto scrollbar-hidden">
        <div className="flex gap-4 min-w-[1000px]">
          {itemList.length > 0 && type === "foodList" ? (
            itemList.map((item) => {
              return <Items key={item._id} item={item} />;
            })
          ) : (
            <>{loading && <Skeleton height={"h-full"} />}</>
          )}
          {pendingList.length > 0 && type === "pendingorder" ? (
            pendingList.map((item) => {
              return <Order key={item._id} item={item} />;
            })
          ) : (
            <>{loading && <Skeleton height={"h-full"} />}</>
          )}
          {shippedList.length > 0 && type === "shippedorder" ? (
            shippedList.map((item) => {
              return <Order key={item._id} item={item} />;
            })
          ) : (
            <>{loading && <Skeleton height={"h-full"}/>}</>
          )}
          {completedList.length > 0 && type === "completedorder" ? (
            completedList.map((item) => {
              return <Order key={item._id} item={item} />;
            })
          ) : (
            <>{loading && <Skeleton height={"h-full"} />}</>
          )}
        </div>
      </div>
    </div>
  );
};
export default VendorDashBoard;

import React, { useContext, useState } from "react";
import axios from "axios";
import { VendorContext } from "../context/VendorContextProvider";
import toast from "react-hot-toast";
const VITE_API_URL = import.meta.env.VITE_API_URL;
const Items = (props) => {
  const [quantity, setQuantity] = useState(1);
  const { vendor } = useContext(VendorContext);
  const [loading, setLoading] = useState(false);
  const handelonBuy = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${VITE_API_URL}/create/order/${props.item._id}/${quantity}`,
        {},
        {
          withCredentials: true,
        }
      );
      toast.success(res.data.message)
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="card bg-base-100 w-96 shadow-sm">
        <figure className="px-10 pt-10">
          <img
            src={props.item?.itemImage}
            alt={props.foodName || "Food Item"}
            className="rounded-xl object-cover"
            style={{ width: "250px", height: "200px" }}
          />
        </figure>

        <div className="card-body items-center text-center font-bold">
          <h2 className="card-title capitalize">{props.item.foodName}</h2>
          <p className="text-sm line-clamp-3 capitalize">{props.item?.description}</p>
          <p className="text-sm line-clamp-3 capitalize">Category: {props.item?.category}</p>
          <p className="text-sm line-clamp-3">
            Price: ₹{props.item?.price * quantity}
          </p>
          <p className="text-sm line-clamp-3">Item Id: {props.item?._id}</p>
          {vendor ? (
            <></>
          ) : (
            <>
              <input
                type="number"
                className="input validator"
                required
                placeholder="Type a number between 1 to 10"
                min="1"
                max="10"
                title="Must be between be 1 to 10"
                onChange={(e) => {
                  e.preventDefault();
                  setQuantity(e.target.value);
                }}
              />
              <p className="validator-hint">Must be between be 1 to 10</p>
              <div className="card-actions">
                <button
                  className={`btn btn-primary ${loading ? "disabled" : ""}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handelonBuy();
                  }}
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Buy Now"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Items;

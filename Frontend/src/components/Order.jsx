import React from 'react'
import { Link } from 'react-router-dom';

const Order = (props) => {
  return (
    <div>
      <div className="card w-96 shadow-sm bg-yellow-100">
        <div className="card-body items-center text-center">
          <figure className="px-10 pt-10">
            <img
              src={props.item?.item?.itemImage}
              alt={props.item?.item?.foodName || "Food Item"}
              className="rounded-xl object-cover"
              style={{ width: "250px", height: "200px" }}
            />
          </figure>
          <h2 className="card-title capitalize">
            {props.item?.item?.foodName || "Food Item"}
          </h2>
          <p className="font-semibold">Order Id : {props.item._id}</p>
          <p className="font">Price : ₹ {props.item.item.price * props.item.quantity}</p>
          <p className="font">Quantity : {props.item.quantity}</p>
          <div className="card-actions">
            <Link
              to="/customertrackorder"
              state={{ order: props.item._id }}
              className="btn btn-primary"
            >
              Track Order
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order

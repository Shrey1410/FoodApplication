const orderModel = require("../models/order.model");
const foodModel = require("../models/fooditem.model");
const crypto = require("crypto");
const mongoose = require("mongoose");
const mailService = require("../services/mail.services")
const bcrypt = require('bcrypt')
const SALT = parseInt(process.env.SALT)
exports.placeorder = async (req, res) => {
  const { itemid, quantity } = req.params;
  const customer = req.customer;
  const otp = crypto.randomBytes(3).toString("hex");
  const item = await foodModel.findOne({
    _id: new mongoose.Types.ObjectId(itemid),
  });
  try {
    await mailService.sendmail(
      customer.email,
      otp,
      `This is the otp for your delivery order ${itemid}`
    );
    const order = await orderModel.create({
      orderedBy: customer._id,
      item: itemid,
      vendor: item.createdBy,
      otp: bcrypt.hashSync(otp,SALT),
      quantity: quantity,
    });
    console.log(order);
    return res.status(200).send({
      order: order,
      message: "Ordered Placed successfully.",
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send({
      message: "Error in sending mail.",
    });
  }
};

exports.completeorder = async (req, res) => {
  console.log("entered")
  const { orderid, otp } = req.body;
  console.log(otp)
  if(!otp){
    return res.status(400).send({
      message : "Otp not found"
    })
  }
  const otpr = await orderModel.findOne({ _id: orderid });
  if (bcrypt.compareSync(otp, otpr.otp)) {
    const order = await orderModel.findByIdAndUpdate(
      { _id: orderid },
      {
        $set: {
          status: "completed",
        },
      },{
        new : true
      }
    ).populate('item');
    return res.status(200).send({
      order: order,
      message: "Ordered Completed successfully.",
    });
  }
  return res.status(200).send({
    message: "Incorrect otp not verified!",
  });
};

exports.getorderbycustomer = async (req, res) => {
  const { page, limit } = req.query;
  const skip = (page - 1) * limit;
  console.log("page", page, limit)
  const customer = req.customer;
  const orders = await orderModel
    .find({ orderedBy: customer._id })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate("item");
  const totalItems = await orderModel.countDocuments({
    orderedByBy: customer._id,
  });
  return res.status(200).send({
    orders: orders,
    currentPage: page,
    totalPages: Math.ceil(totalItems / limit),
    totalItems,
    message: "Orders fetched successfully",
  });
};

exports.getorderbyvendorpending = async (req, res) => {
  const { page, limit } = req.query;
  console.log(page , limit)
  const skip = (page - 1) * limit;
  const vendor = req.vendor;
  const orders = await orderModel
    .find({ vendor: vendor._id, status: "pending" })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate("item");
  const totalItems = await orderModel.countDocuments({
    vendor: vendor._id,
    status: "pending",
  });
  return res.status(200).send({
    orders: orders,
    currentPage: page,
    totalPages: Math.ceil(totalItems / limit),
    totalItems,
    message: "Orders fetched successfully",
  });
};

exports.getorderbyvendorcompleted = async (req, res) => {
  const { page, limit } = req.query;
  const skip = (page - 1) * limit;
  const vendor = req.vendor;
  const orders = await orderModel
    .find({ vendor: vendor._id, status: "completed" })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate("item");
  const totalItems = await orderModel.countDocuments({
    vendor: vendor._id,
    status: "completed",
  });
  return res.status(200).send({
    orders: orders,
    currentPage: page,
    totalPages: Math.ceil(totalItems / limit),
    totalItems,
    message: "Orders fetched successfully",
  });
};

exports.getorderbyvendorshipped = async (req, res) => {
  const { page, limit } = req.query;
  const skip = (page - 1) * limit;
  const vendor = req.vendor;
  const orders = await orderModel
    .find({ vendor: vendor._id, status: "shipped" })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate("item");
  const totalItems = await orderModel.countDocuments({
    vendor: vendor._id,
    status: "shipped",
  });
  return res.status(200).send({
    orders: orders,
    currentPage: page,
    totalPages: Math.ceil(totalItems / limit),
    totalItems,
    message: "Orders fetched successfully",
  });
};

exports.shippedorder = async (req, res) => {
  const { orderid } = req.body;
  const order = await orderModel.findByIdAndUpdate(
    { _id: orderid },
    {
      $set: {
        status: "shipped",
      },
    },
    {
      new : true
    }
  ).populate('item');
  if (!order) {
    return res.status(400).json({
      message: "Error Order does not exists.",
    });
  }
  return res.status(200).send({
    order: order,
    message: "Ordered Shipped successfully.",
  });
};

exports.getorderbyid = async(req, res)=>{
  const {orderid} = req.params
  const order = await orderModel.findById(orderid).populate('item')
  return res.status(200).json({
    order : order
  })
}

exports.searchOrderById = async (req, res) => {
  let { orderid } = req.params;
  console.log(orderid)
  orderid = orderid.trim()
  if (!(/^[a-fA-F0-9]{24}$/.test(orderid))) {
    return res.status(400).json({ error: "Invalid ObjectId format" });
  }
  try {
    const result = await orderModel.findById(orderid).populate('item'); // or findOne({ _id: query })
    if (!result) return res.status(404).json({ message: "Order not found" });
    return res.status(200).json({ result });
  } catch (err) {
    console.error("Search error:", err);
    return res.status(500).json({ error: "Server error" });
  }
};
const mongoose = require("mongoose")
const orderSchema = new mongoose.Schema({
  orderedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "Customer",
    required: true,
  },
  item: {
    type: mongoose.Schema.ObjectId,
    ref: "Fooditem",
    required: true,
  },
  vendor : {
    type : mongoose.Schema.ObjectId,
    ref : "Vendor",
    required : true
  },
  status: {
    type : String, 
    default: "pending",
    enum: ["pending", "shipped", "completed"],
  },
  otp : {
    type : String,
    required : true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  quantity : {
    type : Number,
    default : 1,
  }
});
module.exports = mongoose.model("Order", orderSchema)
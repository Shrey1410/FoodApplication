const mongoose = require("mongoose");
const vendorSchema = new mongoose.Schema(
  {
    shopName: {
      type: String,
      required: true,
      minlength: 3,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    fullName: {
      type: String,
      required: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      street: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      pinCode: {
        type: String,
        required: true,
      },
    },
    totalOrders : {
      type : Number,
      default : 0
    },
    pendingOrders : {
      type : Number,
      default : 0
    },
    completedOrders : {
      type : Number,
      default : 0
    },
    totalRevenu : {
      type : Number,
      default : 0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vendor", vendorSchema);

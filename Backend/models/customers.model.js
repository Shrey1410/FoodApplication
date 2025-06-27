const mongoose = require("mongoose");
const customerSchema = new mongoose.Schema(
  {
    fullName: {
      firstName: {
        type: String,
        required: true,
        minlength: 3,
      },
      lastName: {
        type: String,
        required: true,
        minlength: 3,
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    phone: {
      type : Number,
      required : true
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
  },
  { timestamps: true }
);
module.exports = mongoose.model("Customer", customerSchema);

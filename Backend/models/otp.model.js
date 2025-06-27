const mongoose = require("mongoose");
const otpSchema = mongoose.Schema({
  otp: {
    type: String,
    required: true,
  },
  createdBy: {
    type : String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300,
  },
});
module.exports = mongoose.model("Otp", otpSchema);
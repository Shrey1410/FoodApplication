const customerModel = require("../models/customers.model");
const vendorModel = require("../models/vendor.model")
const jwt = require("jsonwebtoken")
const JWT_SECRET = process.env.JWT_SECRET
exports.verifycustomer = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const decode = jwt.verify(token, JWT_SECRET);
  const customer = await customerModel.findById(decode._id);
  if (!customer) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  req.customer = customer;
  next();
};

exports.verifyvendor = async (req, res, next) => {
  const token = req.cookies.token;
  console.log(token)
  if (!token) {
    return res.status(401).json({ message: "Unauthorized!!" });
  }
  const decode = jwt.verify(token, JWT_SECRET);
  const vendor = await vendorModel.findById(decode._id); 
  console.log(vendor)
  if (!vendor) {
    return res.status(401).json({ message: "Unauthorized!!!" });
  }
  req.vendor = vendor;
  next();
};

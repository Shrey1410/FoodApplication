const vendorModel = require("../models/vendor.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const SALT = parseInt(process.env.SALT);
const JWT_SECRET = process.env.JWT_SECRET;
const { validationResult } = require("express-validator");
const otpModel = require("../models/otp.model");
const crypto = require("crypto");
const mailService = require("../services/mail.services");

exports.register = async (req, res) => {
  console.log("entered in reg")
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array()[0].msg,
    });
  }
  const { shopName, fullName, email, phoneNo, address, password } = req.body;
  console.log(req.body);
  if (!shopName || !fullName || !email || !phoneNo || !address || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  if (!address.city || !address.state || !address.pinCode || !address.street) {
    return res.status(400).json({
      message: "Address must be complete",
    });
  }
  const c = await vendorModel.findOne({ email: email });
  if (c) {
    return res.status(400).send({
      message: "User already exists..",
    });
  }
  let user = await otpModel.findOne({ createdBy: email });
  if (!user) {
    user = await otpModel.create({
      otp: crypto.randomBytes(3).toString("hex"),
      createdBy: email,
    });
  }
  try {
    mailService.sendmail(email, user.otp);
    return res.status(200).send({
      message: "Email sent succesfully",
    });
  } catch (err) {
    console.log(err);
  }
};

exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array()[0].msg,
    });
  }
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  const vendor = await vendorModel
    .findOne({ email: email })
    .select("+password");
  if (!vendor) {
    return res.status(404).json({ message: "Vendor not found" });
  }
  if (!bcrypt.compareSync(password, vendor.password)) {
    return res.status(400).json({ message: "Invalid password" });
  }
  const token = jwt.sign(
    {
      _id: vendor._id,
      email: vendor.email,
      role: "vendor",
    },
    JWT_SECRET,
    { expiresIn: "1d" }
  );
  return res
    .status(200)
    .cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    })
    .send({
      vendor: {
        _id: vendor._id,
        shopName: vendor.shopName,
        fullName: vendor.fullName,
        email: vendor.email,
        phone: vendor.phone,
        address: vendor.address,
      },
      message: "Logged in successfully",
    });
};

exports.logout = (req, res) => {
  return res
    .status(200)
    .clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    })
    .send({
      message: "Logged out successfully",
    });
};

exports.automaticlogin = async (req, res) => {
  console.log("akpmmosnoa")
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const decoded = jwt.verify(token, JWT_SECRET);
  console.log(decoded)
  const vendor = await vendorModel.findById(decoded._id);
  console.log("vendor", vendor)
  if (!vendor) {
    return res.status(401).send({
      message: "Unauthorized",
    });
  }
  return res.status(200).send({
    message: "Logged in Successfully",
    vendor: {
      _id: vendor._id,
      shopName: vendor.shopName,
      fullName: vendor.fullName,
      email: vendor.email,
      phone: vendor.phone,
      address: vendor.address,
    },
  });
};

exports.otpverification = async (req, res)=>{
  console.log("dnkneknkrfnpppp")
  const { otp, shopName, fullName, email, phoneNo, address, password } =
    req.body;
  if(!otp || !email){
    return res.status(400).send({
      message : "OTP Missing"
    })
  }
  const user = await otpModel.findOne({createdBy : email})
  if(!user){
    return res.status(400).json({
      message :"OTP is expired"
    })
  }
  if(user.otp === otp){
    console.log("dkndknkfk")
    const vendor = await vendorModel.create({
      shopName: shopName,
      fullName: fullName,
      email: email,
      phone: phoneNo,
      address: address,
      password: bcrypt.hashSync(password, SALT),
    });
    if (!vendor) {
      return res.status(500).json({ message: "Error creating vendor" });
    }
    const token = jwt.sign(
      {
        _id: vendor._id,
        email: vendor.email,
        role: "vendor",
      },
      JWT_SECRET,
      { expiresIn: "1d" }
    );
    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .send({
        vendor: {
          _id: vendor._id,
          shopName: vendor.shopName,
          fullName: vendor.fullName,
          email: vendor.email,
          phone: vendor.phone,
          address: vendor.address,
        },
        message: "Created vendor successfully",
      });
  }
  return res.status(400).send({
    message : "Incorrect OTP"
  })
}
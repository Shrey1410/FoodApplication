const customerModel = require("../models/customers.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const SALT = parseInt(process.env.SALT);
const JWT_SECRET = process.env.JWT_SECRET;
const {validationResult} = require("express-validator")
const otpModel = require("../models/otp.model")
const crypto = require('crypto')
const mailService = require("../services/mail.services")

exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array()[0].msg,
    });
  }
  const { fullName, email, phoneNo, address, password } = req.body;
  console.log(req.body)
  if (!fullName || !email || !phoneNo || !address || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  if(!address.city || !address.state || !address.pinCode || !address.street){
    return res.status(400).json({
      message : "Address must be complete"
    })
  }
  const c = await customerModel.findOne({email : email})
  if(c){
    return res.status(400).send({
      message : "User already exists.."
    })
  }
  let user = await otpModel.findOne({createdBy : email})
  if(!user){
  user = await otpModel.create({
      otp: crypto.randomBytes(3).toString("hex"),
      createdBy: email,
  });
  }
  try{
  mailService.sendmail(email, user.otp);
  return res.status(200).send({
    message : "Email sent succesfully"
  })
  }
  catch(err){
    console.log(err)
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
  const customer = await customerModel
    .findOne({ email: email })
    .select("+password");
  if (!customer) {
    return res.status(404).json({ message: "Customer not found" });
  }
  if (!bcrypt.compareSync(password, customer.password)) {
    return res.status(400).json({ message: "Invalid password" });
  }
  const token = jwt.sign(
    {
      _id: customer._id,
      email : customer.email,
      role : "customer"
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
      customer: {
        _id: customer._id,
        fullName: customer.fullName,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
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
  console.log("enkenkeknk")
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const decode = jwt.verify(token, JWT_SECRET);
  const user = await customerModel.findById(decode._id);
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  return res.status(200).send({
    customer: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      address: user.address,
    },
    message: "Logged in successfully",
  });
};

exports.otpverification = async (req, res)=>{
  const {otp, fullName, email, phoneNo, address, password} = req.body
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
    const customer = await customerModel.create({
      fullName: fullName,
      email: email,
      phone: phoneNo,
      address: address,
      password: bcrypt.hashSync(password, SALT),
    });
    if (!customer) {
      return res.status(500).json({ message: "Error creating customer" });
    }
    const token = jwt.sign(
      {
        _id: customer._id,
        email: customer.email,
        role: "customer",
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
        customer: {
          id: customer._id,
          fullName: customer.fullName,
          email: customer.email,
          phone: customer.phone,
          address: customer.address,
        },
        message: "Created customer successfully",
      });
  }
  return res.status(400).send({
    message : "Incorrect OTP"
  })
}
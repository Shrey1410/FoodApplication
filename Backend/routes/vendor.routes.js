const { body } = require("express-validator");
const vendorControllers = require("../controllers/vendor.controllers");
const authmiddleware = require("../middlewares/auth.middleware")
module.exports = (app) => {
  app.post(
    "/vendor/register",
    [
      body("email").isEmail().withMessage("Please Enter a valid Email"),
      body("email")
        .isLength({ min: 8 })
        .withMessage("Email must have a length of 8 or more"),
      body("password")
        .isLength({ min: 8 })
        .withMessage("Password must be of length 8"),
      body("fullName")
        .isLength({ min: 3 })
        .withMessage("FirstName must be of length more than 3"),
      body("shopName")
        .isLength({ min: 3 })
        .withMessage("ShopName must be of length more than 3"),
    ],
    vendorControllers.register
  );

  app.post("/vendor/verifyotp", [], vendorControllers.otpverification);

  app.post(
    "/vendor/login",
    [
      body("email").isEmail().withMessage("Please provide a valid email"),
      body("password")
        .isLength({ min: 8 })
        .withMessage("password must be of length 8"),
    ],
    vendorControllers.login
  );

  app.post("/vendor/logout", [authmiddleware.verifyvendor], vendorControllers.logout)
  
  app.post("/vendor/automaticlogin", [], vendorControllers.automaticlogin)
};

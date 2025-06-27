const { body } = require("express-validator")
const customerControllers = require("../controllers/customer.controllers")
const authmiddleware = require("../middlewares/auth.middleware")
module.exports = (app)=>{
    app.post("/customer/register", [
      body("email").isEmail().withMessage("Please Enter a valid Email"),
      body("email")
        .isLength({ min: 8 })
        .withMessage("Email must have a length of 8 or more"),
      body("password")
        .isLength({ min: 8 })
        .withMessage("Password must be of length 8"),
      body("fullName.firstName")
        .isLength({ min: 3 })
        .withMessage("FirstName must be of length more than 3"),
      body("fullName.lastName")
        .isLength({ min: 3 })
        .withMessage("LastName must be of length more than 3"),
    ], customerControllers.register);

    app.post("/cutomer/verifyotp", [], customerControllers.otpverification)

    app.post("/customer/login", [body('email').isEmail().withMessage('Please provide a valid email'), body('password').isLength({min : 8}).withMessage('password must be of length 8')], customerControllers.login)

    app.post("/customer/logout", [authmiddleware.verifycustomer], customerControllers.logout)

    app.post("/customer/automaticlogin", [], customerControllers.automaticlogin)
}
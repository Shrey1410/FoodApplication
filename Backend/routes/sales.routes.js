const  salesController = require("../controllers/sales.controller");
const authmiddleware = require("../middlewares/auth.middleware")
module.exports = (app)=>{
    app.post(
      "/sales/:type",
      [authmiddleware.verifyvendor],
      salesController.getsales
    );
}
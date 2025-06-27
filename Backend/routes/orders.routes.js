const authmiddleware = require("../middlewares/auth.middleware")
const orderController = require("../controllers/order.controller")
module.exports = (app)=>{
    app.post("/create/order/:itemid/:quantity", [authmiddleware.verifycustomer], orderController.placeorder)
    
    app.get(
      "/getorders/pending",
      [authmiddleware.verifyvendor],
      orderController.getorderbyvendorpending
    );
    app.get(
      "/getorders/completed",
      [authmiddleware.verifyvendor],
      orderController.getorderbyvendorcompleted
    );
    app.get(
      "/getorders/shipped",
      [authmiddleware.verifyvendor],
      orderController.getorderbyvendorshipped
    );

    app.get("/customer/orders", [authmiddleware.verifycustomer], orderController.getorderbycustomer)

    app.post("/update/status/shipped", [authmiddleware.verifyvendor], orderController.shippedorder);

    app.post("/update/status/completed", [authmiddleware.verifyvendor], orderController.completeorder);

    app.get("/getorder/vendor/:orderid", [authmiddleware.verifyvendor], orderController.getorderbyid);
    
    app.get("/getorder/customer/:orderid", [authmiddleware.verifycustomer], orderController.getorderbyid);

    app.get("/search/order/:orderid", [authmiddleware.verifyvendor], orderController.searchOrderById)
}

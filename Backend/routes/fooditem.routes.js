const fooditemController = require("../controllers/food.contollers")
const authmiddleware = require("../middlewares/auth.middleware")
const multermiddleware = require("../middlewares/multer.middleware")
module.exports = (app)=>{
    app.post("/create/fooditem", [authmiddleware.verifyvendor, multermiddleware.upload.fields([
        {  name : "image",
           maxCount : 1 
        }
    ])], fooditemController.createfooditem)

    app.get("/getitemlistbyuser", [authmiddleware.verifyvendor], fooditemController.getlistoffooditembyuser);

    app.get(
      "/getitemlistbycategory/:category",
      [authmiddleware.verifycustomer],
      fooditemController.getlistoffooditembycategory
    );
}
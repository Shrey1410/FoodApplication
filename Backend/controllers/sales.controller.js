const mongoose = require("mongoose")
const orderModel = require("../models/order.model")
exports.getsales = async (req, res)=>{
    const vendor = req.vendor
    const { type } = req.params
    if(!["daily", "monthly", "yearly"].includes(type)){
        return res.status(400).json({
            message : "Invalid type"
        })
    }
    let dateFormat;
    if (type === "daily") dateFormat = "%Y-%m-%d";
    else if (type === "monthly") dateFormat = "%Y-%m";
    else if (type === "yearly") dateFormat = "%Y";
    try{
        const sales = await orderModel.aggregate([
          { $match: { vendor: new mongoose.Types.ObjectId(vendor._id) } },
          {
            $lookup: {
              from: "fooditems",
              localField: "item",
              foreignField: "_id",
              as: "itemDetails",
            },
          },
          { $unwind: "$itemDetails" },
          {
            $addFields: {
              totalAmount: { $multiply: ["$itemDetails.price", "$quantity"] },
            },
          },
          { 
            $group: {
              _id: {
                $dateToString: { format: dateFormat, date: "$createdAt" },
              },
              totalSales: { $sum: "$totalAmount" },
              orders: { $sum: 1 },
            },
          },
          { $sort: { _id: 1 } },
        ])    
        console.log(sales)      
        return res.status(200).json(sales);
    }catch (error) {
        console.error("Sales aggregation error:", error);
        return res.status(500).json({ error: "Internal server error" });
      }
    };
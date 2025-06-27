const foodModel = require("../models/fooditem.model")
const cloudinaryService = require("../services/cloudinary.services")
exports.createfooditem = async (req, res)=>{
    const {foodName, category, price, description } = req.body
    const postimage = req?.files?.image?.[0]?.path || null
    console.log(postimage)
    console.log(req.body)
    if(!postimage || !foodName || !category || !price || !description){
        return res.status(400).json({
            message : "All fields required"
        })
    }
    let image;
    try{
        image = await cloudinaryService.uploadoncloudinary(postimage)
    }
    catch(err){
        return res.status(400).send({
            message : "Error uploading image."
        })
    }
    const item = await foodModel.create({
        itemImage : image?.url,
        foodName : foodName,
        category : category,
        price : price,
        description : description,
        createdBy : req.vendor.id
    })
    return res.status(200).send({
        item : item,
        message : "Food item created successfully"
    })
}

exports.getlistoffooditembyuser = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;
    const vendor = req.vendor;
    const foodList = await foodModel
      .find({ createdBy: vendor._id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    const totalItems = await foodModel.countDocuments({
      createdBy: vendor._id,
    });
    return res.status(200).json({
      foodList,
      currentPage: page,
      totalPages: Math.ceil(totalItems / limit),
      totalItems,
      message: "Food List fetched successfully.",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Failed to fetch food list.",
      error: err.message,
    });
  }
};

exports.getlistoffooditembycategory = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;
    const { category } =req.params
    const foodList = await foodModel
      .find({ category: category })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    const totalItems = await foodModel.countDocuments({
      category: category,
    });
    return res.status(200).json({
      foodList,
      currentPage: page,
      totalPages: Math.ceil(totalItems / limit),
      totalItems,
      message: "Food List fetched successfully.",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Failed to fetch food list.",
      error: err.message,
    });
  }
};
const mongoose = require('mongoose')
const foodSchema = new mongoose.Schema({
    itemImage : {
        type : String,
        required : true
    },
    foodName : {
        type : String,
        minlength : 3,
        required : true, 
    },
    category : {
        type : String,
        enum : ["beverage", "fastfood", "indian", "italiyan", "chinese", "deserts"],
        required : true,
    },
    createdBy : {
        type : mongoose.Schema.ObjectId,
        ref : "Vendor",
        required : true
    },
    price : {
        type : Number,
        required : true,
    },
    description : {
        type : String,
        required : true
    }
}, {timestamps : true})
module.exports = mongoose.model('Fooditem', foodSchema)
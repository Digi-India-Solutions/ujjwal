const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
    categoryname:{
        type:String,
        required:[true,"Category name is must required"]
    },
    image:{
        type:String,
        required:[true,"Category Image is must Required"]
    },
    active:{
        type:Boolean,
        default:false
    }
})

const productCategory = mongoose.model("catgory",categorySchema)

module.exports = productCategory
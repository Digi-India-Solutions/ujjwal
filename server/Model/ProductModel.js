const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    categoryname: {
        type: String,
        required: [true, "CategoryName is must Required"]
    },
    subcategoryName:{
        type:String,
        required:[true,"Subcategory is must required"]
    },
    details:{
        type:String,
        required:[true,"Details is must required"]
    },
    productname:{
        type:String,
        required:[true,"Productname is must required"]
    },
    image1:{
        type:String,
        required:[true,"Image is must required"]
    },
    image2:{
        type:String,
        // required:[true,"Image is must required"]
    },
    image3:{
        type:String,
        // required:[true,"Image is must required"]
    },
    image4:{
        type:String,
        // required:[true,"Image is must required"]
    },
    tableData:{
        type:String
    },
    active:{
        type:Boolean,
        default:false
    },
    hotProduct:{
        type:Boolean,
        default:false
    },
})

const product = mongoose.model("product" , productSchema)


module.exports = {
    product,
    productSchema
  };
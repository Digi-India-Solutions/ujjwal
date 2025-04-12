const mongoose = require("mongoose")

const subcategorySchema = new mongoose.Schema({
    categoryname:{
        type:String,
        required:[true,"Category Name is must Required"]
    },
    subcategoryName:{
        type:String,
        required:[true,"SubCategory Name is must Required"]
    },
    image:{
        type:String,
        required:[true,"SubCategory Image is must Required"]
    },
})


const subcategory = mongoose.model("subcategory" , subcategorySchema)

module.exports = subcategory
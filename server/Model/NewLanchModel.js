const mongoose = require("mongoose")

const newLanchSchema =new  mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    active:{
        type:Boolean,
        default:false
    }
})

const NewLanch = mongoose.model("NewLanch" ,newLanchSchema)

module.exports = NewLanch
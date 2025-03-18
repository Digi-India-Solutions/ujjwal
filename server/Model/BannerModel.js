const mongoose = require("mongoose")

const bannerSchema = new mongoose.Schema({
    image:{
        type:String,
        required:[true,"Image is muts required"]
    }
})

const banner = mongoose.model("banner" , bannerSchema)

module.exports = banner
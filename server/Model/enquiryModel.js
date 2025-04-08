const mongoose = require("mongoose")

const enquirySchema = new mongoose.Schema({
    productName: {
        type: String,
        required: [true, "ProductName is must required"]
    },
    name: {
        type: String,
        required: [true, "Name is must required"]
    },
    email:{
        type: String,
        required: [true, "Email is must required"]
    },
    phone:{
        type: String,
        required: [true, "Phone is must required"]
    },
    message: {
        type: String,
        required: [true, "Message is must required"]
    }
})

const enquiry = mongoose.model("enquiry", enquirySchema)
module.exports = enquiry
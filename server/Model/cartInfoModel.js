const mongoose = require("mongoose");
const { productSchema } = require("./ProductModel.js");

const infoCartEnquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  designation: { type: String },
  companyName: { type: String },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String },
  status: { type: String},
 cart:[productSchema]
}, { timestamps: true });

module.exports = mongoose.model("InfoCartEnquiry", infoCartEnquirySchema);

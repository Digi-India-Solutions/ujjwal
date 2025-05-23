const express = require("express");
const router = express.Router();
const InfoCartEnquiry = require("../Model/cartInfoModel.js");

router.post("/create-cart-enquiry", async (req, res) => {
  try {
    const { name, designation, company, phone, email, message, status,cart } =
      req.body;
    if (!name || !designation || !company || !phone || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newEnquiry = new InfoCartEnquiry({
      name,
      designation,
      companyName: company,
      phone,
      email,
      message,
      status,
      cart
  });
    const saved = await newEnquiry.save();
    res
      .status(201)
      .json({ message: "Enquiry submitted successfully", data: saved });
  } catch (err) {
    console.log("Error creating enquiry:", err);
    
    res
      .status(500)
      .json({ message: "Error creating enquiry", error: err.message });
  }
});


router.get("/cart-enquiry", async (req, res) => {
  try {
    const enquiries = await InfoCartEnquiry.find().sort({ createdAt: -1 });
   
    res.status(200).json(enquiries);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching enquiries", error: err.message });
  }
});

module.exports = router;

const express = require("express");
const { createEnquiry, getAllEnquiry } = require("../Controllar/enquiryControllar");
const router = express.Router();

router.post("/create-enquiry", createEnquiry);
router.get("/get-all-enquiry", getAllEnquiry);
    
module.exports = router;
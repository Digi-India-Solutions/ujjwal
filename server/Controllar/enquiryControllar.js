const enquiry = require("../Model/enquiryModel.js");

const createEnquiry = async (req, res) => {
  try {
    const { name, email, phone, message, productName } = req.body || {};
  
    if (!name || !email || !phone || !message || !productName) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const enquiryData = await enquiry.create({
        name,
        email,
        phone,
        message,
        productName,
      })

    return res.status(200).json({
      success: true,
      message: "Enquiry created successfully",
      data:enquiryData,
    });
  } catch (error) {
    console.log("Enquiry error", error);
    res.status(500).json({
      message: "Enquiry error",
      error: error.message,
    });
  }
};

const getAllEnquiry = async (req, res) => {
  try {
    const enquiryData = await enquiry.find({});
    return res.status(200).json({
      success: true,
      message: "Enquiry fetched successfully",
      data:enquiryData,
    });
  } catch (error) {
    console.log("Enquiry error", error);
    res.status(500).json({
      message: "Enquiry error",
      error: error.message,
    });
  }
}

module.exports = {
  createEnquiry,
  getAllEnquiry
};

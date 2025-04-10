const product = require("../Model/ProductModel");
const fs = require("fs");
const path = require("path");
const { uploadImage, deleteImage } = require("../Cloudnary/Cloudnary");

const createRecord = async (req, res) => {
  try {
    const {
      tableData,
      categoryname,
      subcategoryName,
      details,
      productname,
      active,
    } = req.body;

    if (!categoryname || !subcategoryName || !details || !productname) {
      return res.status(403).json({
        success: false,
        mess: "Fill all required fields",
      });
    } 

      const data = new product({
        categoryname,
        subcategoryName,
        details,
        productname,
        tableData,
      });

 
      if (req.files) {
        if (req.files.image1) {
          const imagePath = req.files.image1[0].path;
          const url = await uploadImage(imagePath, "product-images");
          data.image1 = url;
        
        }
        if (req.files.image2) {
          const imagePath = req.files.image2[0].path;
          const url = await uploadImage(imagePath, "product-images");
          data.image2 = url;
       
        }
        if (req.files.image3) {
          const imagePath = req.files.image3[0].path;
          const url = await uploadImage(imagePath, "product-images");
          data.image3 = url;

          
        }
        if (req.files.image4) {
          const imagePath = req.files.image4[0].path;
          const url = await uploadImage(imagePath, "product-images");
          data.image4 = url;
        
        }
      }
      if (active) {
        data.active = active;
      }else{
        data.active = false;
      }

      await data.save();
  
      res.status(200).json({
        success: true,
        mess: "New Product created",
        data: data,
      });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      mess: "Internal Server Error",
    });
  }
};

const deleteImageFile = (filePath) => {
  const fullPath = path.join(__dirname, "..", filePath);
  if (fs.existsSync(fullPath)) {
    fs.unlinkSync(fullPath);
  }
};

const deleteRecord = async (req, res) => {
  try {
    let data = await product.findOne({ _id: req.params._id });
    if (data) {
      deleteImage(data.image1);
      deleteImage(data.image2);
      deleteImage(data.image3);
      deleteImage(data.image4);

      await data.deleteOne();
      res.status(200).json({
        success: true,
        mess: "Record deleted",
      });
    } else {
      res.status(404).json({
        success: false,
        mess: "Record Not Found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      mess: "Internal Server Error",
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    let data = await product.findOne({ _id: req.params._id });

    if (data) {
      data.categoryname = req.body.categoryname ?? data.categoryname;
      data.productname = req.body.productname ?? data.productname;
      data.details = req.body.details ?? data.details;
      data.subcategoryName = req.body.subcategoryName ?? data.subcategoryName;
      data.tableData = req.body.tableData ?? data.tableData;

      if (req.files) {
        if (req.files.image1) {
          deleteImage(data.image1); // Delete old image
          const imagePath = req.files.image1[0].path;
          const url = await uploadImage(imagePath, "product-images");
          data.image1 = url;
        }
        if (req.files.image2) {
          deleteImage(data.image2);
          const imagePath = req.files.image2[0].path;
          const url = await uploadImage(imagePath, "product-images");
          data.image2 = url;
        }
        if (req.files.image3) {
          deleteImage(data.image3);
          const imagePath = req.files.image3[0].path;
          const url = await uploadImage(imagePath, "product-images");
          data.image3 = url;
        }
        if (req.files.image4) {
          deleteImage(data.image4);
          const imagePath = req.files.image4[0].path;
          const url = await uploadImage(imagePath, "product-images");
          data.image4 = url;
        }
      }

      data.active = req.body.active ?? data.active;
      await data.save();
      res.status(200).json({
        success: true,
        mess: "Record updated successfully",
        data: data,
      });
    } else {
      return res.status(403).json({
        success: false,
        mess: "Record Not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      mess: "Internal Server Error",
    });
  }
};

const getproduct = async (req, res) => {
  try {
    let data = await product.find();
    if (!data) {
      return res.status(400).json({
        success: true,
        mess: "Record not found",
      });
    } else {
      res.status(200).json({
        success: true,
        mess: "Record found",
        data: data,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: true,
      mess: "Internal Server Error",
    });
  }
};

const getSinglrproduct = async (req, res) => {
  try {
    let data = await product.findOne({ _id: req.params._id });
    if (!data) {
      return res.status(400).json({
        success: true,
        mess: "Record not found",
      });
    } else {
      res.status(200).json({
        success: true,
        mess: "Record found",
        data: data,
      });
    }
  } catch (error) {
    // console.log(error)
    res.status(500).json({
      success: true,
      mess: "Internal Server Error",
    });
  }
};

const newLanchProduct = async (req, res) => {
  try {
    let data = await product.find({ active: true });
    if (!data) {
      return res.status(400).json({
        success: true,
        mess: "Record not found",
      });
    } else {
      res.status(200).json({
        success: true,
        mess: "Record found",
        data: data,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: true,
      mess: "Internal Server Error",
    });
  }
};
module.exports = {
  createRecord,
  deleteRecord,
  updateProduct,
  getproduct,
  getSinglrproduct,
  newLanchProduct,
};

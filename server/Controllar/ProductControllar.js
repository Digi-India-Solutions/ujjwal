const product = require("../Model/ProductModel");
const fs = require("fs");
const path = require("path");


const createRecord = async (req, res) => {
    try {
        const { tableData, categoryname, subcategoryName, details, productname } = req.body;
        if (!categoryname || !subcategoryName || !details || !productname) {
            return res.status(403).json({
                success: false,
                mess: "Fill all required fields"
            });
        } else {
            const data = new product({ categoryname, subcategoryName, details, productname, tableData });
            
            if (req.files) {
                if (req.files.image1) {
                    const imagePath =  req.files.image1[0].path
                    data.image1 = imagePath;
                }
                if (req.files.image2) {
                    const imagePath =  req.files.image2[0].path
                    data.image2 = imagePath;
                }
                if (req.files.image3) {
                    const imagePath =  req.files.image3[0].path
                    data.image3 = imagePath;
                }
                if (req.files.image4) {
                    const imagePath =  req.files.image4[0].path
                    data.image4 = imagePath;
                }
            }
            
            await data.save();
            res.status(200).json({
                success: true,
                mess: "New Product created",
                data: data
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            mess: "Internal Server Error"
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
            deleteImageFile(data.image1);
            deleteImageFile(data.image2);
            deleteImageFile(data.image3);
            deleteImageFile(data.image4);

            await data.deleteOne();
            res.status(200).json({
                success: true,
                mess: "Record deleted"
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
                    deleteImageFile(data.image1); // Delete old image
                    const imagePath =  req.files.image1[0].path
                    data.image1 = imagePath;
                }
                if (req.files.image2) {
                    deleteImageFile(data.image2);
                    const imagePath =  req.files.image2[0].path
                    data.image2 = imagePath;
                }
                if (req.files.image3) {
                    deleteImageFile(data.image3);
                    const imagePath =  req.files.image3[0].path
                    data.image3 = imagePath;
                }
                if (req.files.image4) {
                    deleteImageFile(data.image4);
                    const imagePath =  req.files.image4[0].path
                    data.image4 = imagePath;
                }
            }
            
            await data.save();
            res.status(200).json({
                success: true,
                mess: "Record updated successfully",
                data: data
            });
        } else {
            return res.status(403).json({
                success: false,
                mess: "Record Not found"
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            mess: "Internal Server Error"
        });
    }
};


const getproduct = async (req, res) => {
    try {
        let data = await product.find()
        if (!data) {
            return res.status(400).json({
                success: true,
                mess: "Record not found"
            })
        }
        else {
            res.status(200).json({
                success: true,
                mess: "Record found",
                data: data
            })
        }
    } catch (error) {
        res.status(500).json({
            success: true,
            mess: "Internal Server Error"
        })
    }
}

const getSinglrproduct = async (req, res) => {
    try {
        let data = await product.findOne({ _id: req.params._id })
        if (!data) {
            return res.status(400).json({
                success: true,
                mess: "Record not found"
            })
        }
        else {
            res.status(200).json({
                success: true,
                mess: "Record found",
                data: data
            })
        }
    } catch (error) {
        // console.log(error)
        res.status(500).json({
            success: true,
            mess: "Internal Server Error"
        })
    }
}


module.exports = {
    createRecord,
    deleteRecord,
    updateProduct,
    getproduct,
    getSinglrproduct
};

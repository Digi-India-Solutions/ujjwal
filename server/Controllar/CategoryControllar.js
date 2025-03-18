const productCategory = require("../Model/CategoryModel");
const fs = require("fs");
const path = require("path");

const createRecord = async (req, res) => {
    try {
        const { categoryname } = req.body;
        if (!categoryname) {
            return res.status(403).json({
                success: false,
                mess: "Fill All Required Fields"
            });
        } else {
            const data = new productCategory({ categoryname });
            if (req.file) {
                const localPath =req.file.path;
                data.image = localPath;
            }
            await data.save();
            res.status(200).json({
                success: true,
                mess: "New Category created",
                data: data
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            mess: "Internal Server Error"
        });
    }
};

const getRecord = async (req, res) => {
    try {
        let data = await productCategory.find();
        if (data) {
            res.status(200).json({
                success: true,
                mess: "All Category found",
                data: data
            });
        } else {
            res.status(403).json({
                success: true,
                mess: "Category Not Found"
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            mess: "Internal server error"
        });
    }
};

const getSingleRecord = async (req, res) => {
    try {
        let data = await productCategory.findOne({ _id: req.params._id });
        if (data) {
            res.status(200).json({
                success: true,
                mess: "Category Found",
                data: data
            });
        } else {
            res.status(403).json({
                success: true,
                mess: "Category Not Found"
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            mess: "Internal Server Error"
        });
    }
};

const updateRecord = async (req, res) => {
    try {
        let data = await productCategory.findOne({ _id: req.params._id });
        if (data) {
            data.categoryname = req.body.categoryname ?? data.categoryname;
            if (req.file) {
                // Delete the old image from local storage
                if (data.image) {
                    const oldImagePath = path.join(__dirname, "..", data.image);
                    if (fs.existsSync(oldImagePath)) {
                        fs.unlinkSync(oldImagePath);
                    }
                }
                // Save new image path
                const localPath = req.file.path
                data.image = localPath;
            }
            await data.save();
            res.status(200).json({
                success: true,
                mess: "Category Updated Successfully",
                data: data
            });
        } else {
            res.status(404).json({
                success: false,
                mess: "Category not found"
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            mess: "Internal server error"
        });
    }
};

const deleteRecord = async (req, res) => {
    try {
        let data = await productCategory.findOne({ _id: req.params._id });
        if (data) {
            // Delete the image from local storage
            if (data.image) {
                const imagePath = path.join(__dirname, "..", data.image);
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            }
            await data.deleteOne();
            res.status(200).json({
                success: true,
                mess: "Record deleted"
            });
        } else {
            return res.status(403).json({
                success: false,
                mess: "Record not found"
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            mess: "Internal Server Error"
        });
    }
};

module.exports = {
    createRecord,
    getRecord,
    getSingleRecord,
    updateRecord,
    deleteRecord
};

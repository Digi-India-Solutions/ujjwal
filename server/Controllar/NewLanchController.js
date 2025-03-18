const fs = require("fs");
const path = require("path");
const NewLanch = require("../Model/NewLanchModel");

// Utility function to delete an image from the local folder
const deleteImageFile = (filePath) => {
    const fullPath = path.join(__dirname, "..", filePath);
    if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
    }
};

const createRecord = async (req, res) => {
    try {
        const { productName, active } = req.body;

        if (!productName) {
            return res.status(400).json({
                success: false,
                message: "New Launch Product Name is required",
            });
        }
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "New Launch Product Image is required",
            });
        }

        // Save the image path in the database
        const imgPath =  req.file.path
        const newProduct = new NewLanch({
            productName,
            image: imgPath,
            active: active || false,
        });
        await newProduct.save();

        res.status(200).json({ message: "Product created successfully", newProduct });
    } catch (error) {
        if (req.file) fs.unlinkSync(req.file.path);
        res.status(400).json({ message: "Error creating product", error });
    }
};

const getRecord = async (req, res) => {
    try {
        const products = await NewLanch.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving products", error });
    }
};

const getSingleRecord = async (req, res) => {
    try {
        const product = await NewLanch.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving product", error });
    }
};

const updateRecord = async (req, res) => {
    try {
        const { productName, active } = req.body;
        const productId = req.params.id;
        let updatedProduct = await NewLanch.findById(productId);

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        let imgPath = updatedProduct.image;

        // If a new image is uploaded, delete the old one and save the new one
        if (req.file) {
            deleteImageFile(imgPath);
            imgPath =  req.file.path
        }

        updatedProduct = await NewLanch.findByIdAndUpdate(
            productId,
            { productName, image: imgPath, active },
            { new: true, runValidators: true }
        );

        res.status(200).json({ message: "Product updated successfully", updatedProduct });
    } catch (error) {
        if (req.file) fs.unlinkSync(req.file.path);
        res.status(400).json({ message: "Error updating product", error });
    }
};

const deleteRecord = async (req, res) => {
    try {
        const product = await NewLanch.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Delete the image from the local folder
        deleteImageFile(product.image);
        
        await NewLanch.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting product", error });
    }
};

module.exports = {
    createRecord, getRecord, getSingleRecord, updateRecord, deleteRecord
};

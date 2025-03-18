const banner = require("../Model/BannerModel");
const fs = require("fs");
const path = require("path");

const createBanner = async (req, res) => {
    try {
        // console.log(req.file)
        if (!req.file || !req.file.path) {
            return res.status(401).json({
                success: false,
                mess: "File not chosen"
            });
        } else {
            // Save the image path locally in the static folder
            const imgPath = req.file.path
            const data = new banner({ image: imgPath });
            await data.save();

            res.status(200).json({
                success: true,
                mess: "Banner created"
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            mess: "Internal server error"
        });
    }
};

const getBanner = async (req, res) => {
    try {
        const data = await banner.find();
        if (data) {
            res.status(200).json({
                success: true,
                mess: "Banner found successfully",
                data: data
            });
        } else {
            res.status(200).json({
                success: true,
                mess: "Banner not found",
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            mess: "Internal server error"
        });
    }
};

const getSingleBanner = async (req, res) => {
    try {
        const data = await banner.findOne({ _id: req.params._id });
        if (data) {
            res.status(200).json({
                success: true,
                mess: "Banner found successfully",
                data: data
            });
        } else {
            res.status(200).json({
                success: true,
                mess: "Banner not found",
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            mess: "Internal server error"
        });
    }
};

const deleteBanner = async (req, res) => {
    try {
        const data = await banner.findOne({ _id: req.params._id });
        if (data) {
            const imgPath = path.join(__dirname, "..", data.image); // Construct the full path of the image
            await data.deleteOne();

            // Delete the image file from the static folder
            fs.unlink(imgPath, (err) => {
                if (err) {
                    console.error("Error deleting image:", err);
                }
            });

            res.status(200).json({
                success: true,
                mess: "Banner deleted successfully",
            });
        } else {
            res.status(200).json({
                success: true,
                mess: "Banner not found",
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            mess: "Internal server error"
        });
    }
};

const updateBanner = async (req, res) => {
    try {
        const data = await banner.findOne({ _id: req.params._id });
        if (data) {
            if (req.file) {
                // Save new image and delete the old one
                const imgPath = req.file.path
                const oldImgPath = path.join(__dirname, "..", data.image);

                data.image = imgPath;
                await data.save();

                // Delete the old image file
                fs.unlink(oldImgPath, (err) => {
                    if (err) {
                        console.error("Error deleting old image:", err);
                    }
                });

                res.status(200).json({
                    success: true,
                    mess: "Banner updated successfully",
                    data: data
                });
            } else {
                res.status(400).json({
                    success: false,
                    mess: "No image file provided"
                });
            }
        } else {
            res.status(404).json({
                success: false,
                mess: "Banner not found",
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            mess: "Internal server error"
        });
    }
};

module.exports = {
    createBanner,
    getBanner,
    getSingleBanner,
    deleteBanner,
    updateBanner
};

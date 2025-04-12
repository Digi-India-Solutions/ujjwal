const { deleteImage, uploadImage } = require("../Cloudnary/Cloudnary")
const { product } = require("../Model/ProductModel")
const subcategory = require("../Model/SubcategoryModel")

const createSubcategory = async (req, res) => {
    try {
        const { categoryname, subcategoryName } = req.body
      
        if (!categoryname || !subcategoryName) {
            return res.status(401).json({
                success: false,
                mess: "Fill all required feild"
            })
        }
        
        else {
           if(!req.file){
            return res.status(401).json({
                success: false,
                mess: "provide image"
            })
           }
            const data = new subcategory({ categoryname, subcategoryName })
            if(req.file) {
                const localPath = req.file.path
                const url = await uploadImage(localPath, "subcategory")
               data.image = url
            }
            await data.save()
            res.status(200).json({
                success: true,
                mess: "New Subcategory Created"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            mess: "Internal server error"
        })
    }
}

const getSubcategory = async (req, res) => {
    try {
        let data = await subcategory.find()
      
        if (data) {
            res.status(200).json({
                success: true,
                mess: "Subcategory Found successfully",
                data: data
            })
        }
        else {
            res.status(403).json({
                success: false,
                mess: "Subcategory not found"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            mess: "Internal server error"
        })
    }
}

const getSingleSubcategory = async (req, res) => {
    try {
        let data = await subcategory.findOne({ _id: req.params._id })
        if (data) {
            res.status(200).json({
                success: true,
                mess: "Subcategory Found successfully",
                data: data
            })
        }
        else {
            res.status(403).json({
                success: false,
                mess: "Subcategory not found"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            mess: "Internal server error"
        })
    }
}

const deleteSubcategory = async (req, res) => {
    try {
        let data = await subcategory.findOne({ _id: req.params._id })
        if (data) {
            if(data.image) {
                await deleteImage(data.image)
            }
            await data.deleteOne()
            res.status(200).json({
                success: true,
                mess: "Subcategory Deleted successfully",
                data: data
            })
        }
        else {
            res.status(403).json({
                success: false,
                mess: "Subcategory not found"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            mess: "Internal server error"
        })
    }
}

const updateSubcategory = async (req, res) => {
    try {
        let data = await subcategory.findOne({ _id: req.params._id });

        if (data) {
            if (req.file) {
                if (data.image) {
                    await deleteImage(data.image);
                }
                const localPath = req.file.path;
                const url = await uploadImage(localPath, "subcategory");
                data.image = url;
            }

            data.categoryname = req.body.categoryname ?? data.categoryname;

            // Sync subcategory name to products if it has changed
            if (req.body.subcategoryName && req.body.subcategoryName !== data.subcategoryName) {
                await product.updateMany(
                    { subcategoryName: data.subcategoryName },
                    { $set: { subcategoryName: req.body.subcategoryName } }
                );
                data.subcategoryName = req.body.subcategoryName;
            }

            await data.save();

            res.status(200).json({
                success: true,
                mess: "Subcategory updated successfully",
                data: data
            });
        } else {
            res.status(403).json({
                success: false,
                mess: "Subcategory not found"
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
    createSubcategory: createSubcategory,
    getSubcategory: getSubcategory,
    getSingleSubcategory: getSingleSubcategory,
    deleteSubcategory: deleteSubcategory,
    updateSubcategory:updateSubcategory
}
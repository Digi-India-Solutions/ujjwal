const subcategory = require("../Model/SubcategoryModel")

const createSubcategory = async (req, res) => {
    try {
        const { categoryname, subcategoryName } = req.body
        // console.log(req.body, "Iam hit")
        if (!categoryname || !subcategoryName) {
            return res.status(401).json({
                success: false,
                mess: "Fill all required feild"
            })
        }
        else {
            const data = new subcategory({ categoryname, subcategoryName })
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
        let data = await subcategory.findOne({ _id: req.params._id })
        // console.log(data)
        if (data) {
            // console.log(req.body.categoryname)
            data.categoryname=req.body.categoryname??data.categoryname
            data.subcategoryName=req.body.subcategoryName??data.subcategoryName
            await data.save()
            res.status(200).json({
                success: true,
                mess: "Subcategory updated successfully",
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
module.exports = {
    createSubcategory: createSubcategory,
    getSubcategory: getSubcategory,
    getSingleSubcategory: getSingleSubcategory,
    deleteSubcategory: deleteSubcategory,
    updateSubcategory:updateSubcategory
}
const { createSubcategory, getSubcategory, getSingleSubcategory, deleteSubcategory, updateSubcategory } = require("../Controllar/SubcategoryControllar")
const uploader = require("../Multer/Multer")

const subcategoryrouter = require("express").Router()

subcategoryrouter.post("/subcategory",uploader.single("image") ,createSubcategory)
subcategoryrouter.get("/subcategory" ,getSubcategory)
subcategoryrouter.get("/subcategory/:_id" ,getSingleSubcategory)
subcategoryrouter.delete("/subcategory/:_id" ,deleteSubcategory)
subcategoryrouter.put("/subcategory/:_id",uploader.single("image") ,updateSubcategory)


module.exports = subcategoryrouter
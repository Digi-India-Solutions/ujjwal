const { createSubcategory, getSubcategory, getSingleSubcategory, deleteSubcategory, updateSubcategory } = require("../Controllar/SubcategoryControllar")

const subcategoryrouter = require("express").Router()

subcategoryrouter.post("/subcategory" ,createSubcategory)
subcategoryrouter.get("/subcategory" ,getSubcategory)
subcategoryrouter.get("/subcategory/:_id" ,getSingleSubcategory)
subcategoryrouter.delete("/subcategory/:_id" ,deleteSubcategory)
subcategoryrouter.put("/subcategory/:_id" ,updateSubcategory)


module.exports = subcategoryrouter
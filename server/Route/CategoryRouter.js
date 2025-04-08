const { createRecord, getRecord, getSingleRecord, updateRecord ,deleteRecord, newLauchCategory } = require("../Controllar/CategoryControllar")
const uploader = require("../Multer/Multer")

const categoryRouter = require("express").Router()

categoryRouter.post("/category", uploader.single("image"), createRecord)
categoryRouter.get("/category", getRecord)
categoryRouter.get("/category/:_id", getSingleRecord)
categoryRouter.put("/category/:_id", uploader.single("image"), updateRecord)
categoryRouter.delete("/category/:_id", deleteRecord)
categoryRouter.get("/new-lauch-category", newLauchCategory)

module.exports = categoryRouter
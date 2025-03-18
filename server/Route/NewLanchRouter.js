const { createRecord, getRecord, getSingleRecord, updateRecord, deleteRecord } = require("../Controllar/NewLanchController")
const uploader = require("../Multer/Multer")

const newLanchRouter = require("express").Router()

newLanchRouter.post("/new-lanch", uploader.single("image"), createRecord)
newLanchRouter.get("/new-lanch", getRecord)
newLanchRouter.get("/new-lanch/:id", getSingleRecord)
newLanchRouter.put("/new-lanch/:id", uploader.single("image"), updateRecord)
newLanchRouter.delete("/new-lanch/:id", deleteRecord)


module.exports = newLanchRouter
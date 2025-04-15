const productRouter = require("express").Router()
const { createRecord, getproduct, getSinglrproduct, deleteRecord, updateProduct, newLanchProduct, hotProduct } = require("../Controllar/ProductControllar")
const uploader = require("../Multer/Multer")


productRouter.post("/product", uploader.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 }
]), createRecord)
productRouter.get("/product", getproduct)
productRouter.get("/product/:_id", getSinglrproduct)
productRouter.delete("/product/:_id", deleteRecord)
productRouter.put("/product/:_id", uploader.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
]), updateProduct)
productRouter.get("/new-lanch-product", newLanchProduct)
productRouter.get("/hot-product", hotProduct)

module.exports = productRouter
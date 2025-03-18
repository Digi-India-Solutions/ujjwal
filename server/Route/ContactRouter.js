const { createRecord, deleteRecord, getRecord } = require("../Controllar/ContactControllar")

const contactRouter = require("express").Router()

contactRouter.post("/contact", createRecord)
contactRouter.get("/contact", getRecord)
contactRouter.delete("/contact/:_id", deleteRecord)

module.exports = contactRouter
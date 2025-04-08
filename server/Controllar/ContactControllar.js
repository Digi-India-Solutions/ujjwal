const contact = require("../Model/ContactModel")

const createRecord = async (req, res) => {
    try {
        const { name, email, phone, message, address, companyname } = req.body
        // console.log(req.body ,'i am hit')
        if (!name || !email || !phone || !message || !address || !companyname) {
            return res.status(403).json({
                success: false,
                mess: "Please fill all fields"
            })
        }
        else {
            const data = new contact({ name, email, phone, address, message, companyname })
            await data.save()
            res.status(200).json({
                success: true,
                mess: "New Contact Recive",
                data: data
            })
        }
    } catch (error) {
        console.log(error)
        if (error.keyValue.email) {
            return res.status(400).json({
                success: false,
                mess: "Email id is already exits"
            })
        }
        else if (error.keyValue.phone) {
            return res.status(400).json({
                success: false,
                mess: "Phone number is already exits"
            })
        }
        else {
            res.status(500).json({
                success: false,
                mess: "Internal server error"
            })
        }
    }
}

const getRecord = async (req, res) => {
    try {
        let data = await contact.find()
        if (data) {
            res.status(200).json({
                success: true,
                mess: "contact Record found success fully",
                data:data
            })
        }
        else {
            return res.status(400).json({
                success: false,
                mess: "Record not found"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            mess: "Internal Server Error"
        })
    }
}

const deleteRecord = async (req, res) => {
    try {
        let data = await contact.findOne({ _id: req.params._id })
        // console.log(data)/
        if (data) {
           await data.deleteOne()
            res.status(200).json({
                success: true,
                mess: "contact Deleted success fully"
            })
        }
        else {
            return res.status(400).json({
                success: false,
                mess: "Record not found"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            mess: "Internal Server Error"
        })
    }
}


module.exports = {
    createRecord: createRecord,
    deleteRecord:deleteRecord,
    getRecord:getRecord
}
const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is must required"]
    }
})
const subscription = mongoose.model("subscription", subscriptionSchema)
module.exports = subscription
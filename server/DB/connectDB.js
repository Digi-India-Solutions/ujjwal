const mongoose = require("mongoose")

const getConnect = async () => {
    try {
        // await mongoose.connect("mongodb+srv://mannu22072000:RKg9jwKtOgJbvyE3@cluster0.wt6qskc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Databae is connect is successfully")
    } catch (error) {
        console.log(error)
    }
}

getConnect()
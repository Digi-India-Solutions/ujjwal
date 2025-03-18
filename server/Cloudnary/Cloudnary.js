const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECTER
})


const uploadImage = async (file, folder) => {
    try {
        const uploadFileData = await cloudinary.uploader.upload(file, {
            folder: folder
        })
        return uploadFileData.secure_url
    } catch (error) {
        console.log(error)
    }
}

const deleteImage = async (file) => {
    try {
        await cloudinary.uploader.destroy(file)
        // console.log("Image Delete Successfully")
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    uploadImage: uploadImage,
    deleteImage: deleteImage
}
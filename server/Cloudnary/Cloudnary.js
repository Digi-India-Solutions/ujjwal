const cloudinary = require('cloudinary').v2
const fs = require('fs')
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
        if(uploadFileData.secure_url) {
          fs.unlink(file, (err) => {
            if (err) {
                console.log(err)
            } })
        }
        return uploadFileData.secure_url
    } catch (error) {
        console.log(error)
    }
}


function extractPublicIdFromUrl(url) {
    if (!url) throw new Error("No URL provided");
  
    const parts = url.split("/");
    const fileNameWithExtension = parts.pop(); // e.g. image-name.jpg
  
    if (!fileNameWithExtension.includes(".")) {
      throw new Error("Invalid Cloudinary URL format");
    }
  
    const fileName = fileNameWithExtension.split(".")[0];
    const uploadIndex = parts.findIndex(part => part === "upload");
    const folderPath = parts.slice(uploadIndex + 1).join("/");
  
  
    return folderPath ? `${folderPath}/${fileName}` : fileName;
  }

 const deleteImage = async (image) => {
    try {
     let publicId = await extractPublicIdFromUrl(image)
      const result = await cloudinary.uploader.destroy(publicId);
      return result;
    } catch (error) {
      throw new Error("Cloudinary deletion failed: " + error.message);
    }
  };
module.exports = {
    uploadImage: uploadImage,
    deleteImage: deleteImage
}
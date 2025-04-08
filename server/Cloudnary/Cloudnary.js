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

const deleteImage = async (imageUrl) => {
    try {
   
      const urlParts = imageUrl.split('/');
      const fileNameWithExtension = urlParts[urlParts.length - 1]; 
      const folderPath = urlParts.slice(urlParts.indexOf('upload') + 1, urlParts.length - 1).join('/');
  
      const fileNameWithoutExtension = fileNameWithExtension.split('.')[0];
      const publicId = `${folderPath}/${fileNameWithoutExtension}`;
  
      // Delete the image from Cloudinary
      const result = await cloudinary.uploader.destroy(publicId);
      console.log('Deleted:', result);
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

module.exports = {
    uploadImage: uploadImage,
    deleteImage: deleteImage
}
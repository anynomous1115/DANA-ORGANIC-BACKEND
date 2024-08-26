const cloudinaryConfig = require("../../configs/cloudinary");
const { successHandler, errorHandler } = require("../../helper/response");

const uploadImage = async (req, res) => {
  try {
    const imageUrl = req.file.map((file) => file.path);
    const uploadedImage = [];
    const result = await cloudinaryConfig.uploader.upload(imageUrl);
    successHandler(res, imageUrl, "Image uploaded successfully!", 200);
  } catch (error) {
    errorHandler(res, error);
  }
};

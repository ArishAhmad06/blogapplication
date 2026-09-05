import cloudinary from "../lib/cloudinary.js";
import fs from "fs";

export const uploadToCloudinary = async (localFilePath: string) => {
  try {
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "image",
    });
    fs.unlinkSync(localFilePath);
    return response.secure_url;
  } catch (error) {
    console.log("Error while uploading image to cloudinary: ", error);
    fs.unlinkSync(localFilePath);
    throw error;
  }
};

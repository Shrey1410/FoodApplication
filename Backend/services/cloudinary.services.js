const cloudinary = require('cloudinary').v2;
const fs = require('fs');
// const { cloud_name, api_key, api_secret } = require('../configs/cloudinary.config')
require('dotenv').config()
const cloud_name = process.env.cloud_name
const api_key = process.env.api_key
const api_secret = process.env.api_secret
console.log(api_key)
cloudinary.config({
  cloud_name: cloud_name,
  api_key: api_key,
  api_secret: api_secret
});

const uploadoncloudinary = async (localpath)=>{
    try{
        if(!localpath) return null
        const res = await cloudinary.uploader.upload(localpath, {
            resource_type : "auto"
        })
        console.log("file uploaded on cloudinary")
        fs.unlinkSync(localpath)
        return res;
    }
    catch(err){
        console.log(err)
        console.log("error while uploading")
        throw new Error("Network Error")
        fs.unlinkSync(localpath)
    }
}

module.exports = {
    uploadoncloudinary
}
const validator = require('validator');
const { cloudinary } = require('./cloudinary');
const streamifier = require("streamifier");

function validateSignup(req) {
    const {
        name,
        email,
        password,
    } = req.body;

    if (!name){
        throw new Error("Name is required")
    }else if(!validator.isEmail(email)){
        throw new Error("Invalid Email Address!")
    }else if(!validator.isStrongPassword(password)){
        throw new Error("Password is not strong enough")
    }

}


function validateLogin(req){ 
    const {email, password} = req.body;

    if(!validator.isEmail(email)){
        throw new Error("Invalid Email Address!")
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Password is not strong enough")
    }

}


const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "uploads" },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });
};




module.exports = {
    validateSignup,
    validateLogin,
    uploadToCloudinary
}
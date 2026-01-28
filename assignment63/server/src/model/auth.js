const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');


const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 50,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error("Invalid email format");
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value){
            if(!validator.isStrongPassword(value)) {
                throw new Error("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character");
            }
        }
    },
    gender: {
        type: String,
        required: true,
        lowercase: true,
        validate(value){
            if(!['male', 'female', 'other'].includes(value)) {
                throw new Error("Gender must be male, female or other");
            }
        }
    },
    age: {
        type: Number,
        required: true,
        min: 18,
        max: 120
    },
    about: {
        type: String,
        trim: true,
        maxLength: 500,
        lowercase: true,
        default: "this user prefers to keep an air of mystery about them."
    },
    skills: {
        type: [String],
        default: ['none']
    },
    photoURL: {
        type: String,
        trim: true,
        default: "https://www.example.com/default-photo.jpg",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid URL format for photoURL");
            }
        }

    },
}, { 
    conllection: 'users',
    timestamps: true
})



userSchema.methods.getjwt = async function() {
    const user = this;
    const token = await jwt.sign({id: user._id}, process.env.SECRET_KEY, {expiresIn: '7d'});
    return token;
}

userSchema.methods.validatePassword = async function(password) {
    const user = this;
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    return isPasswordMatch;
}

const User = mongoose.model('User', userSchema);

module.exports = {User};
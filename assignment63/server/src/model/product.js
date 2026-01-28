const mongoose = require('mongoose');
const {Schema} = mongoose;
const validator = require('validator');

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 100
    },
    price: {
        type: Number,
        required: true,
        trim: true,
        min: 0
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
        maxlength: 1000
    },
    imageUrl: {
        type: String,
        required: true,
        validate: {
            validator: (value) => {
                return validator.isURL(value);
            },
            message: "Invalid URL"
        }
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    stock: {
        type: Number,
        required: true,
        trim: true
    },
 
}, {
    collection: "products",
    timestamps: true
});

const Product = mongoose.model("Product", productSchema);
module.exports = {Product};
const express = require('express');
const { Product } = require('../model/product');
const productRouter = express.Router();
const { User } = require('../model/auth');
const bcrypt = require('bcrypt');
// const {authMiddleware} = require('../middleware/auth');




productRouter.post('/addProduct', async (req, res) => {
    try {
        const { name, price, description, imageUrl, category, stock } = req.body;
        const product = await Product({
            name,
            price,
            description,
            imageUrl,
            category,
            stock,
            user: req.user._id
        });
        await product.save();
        res.status(201).send({ message: "Product added successfully", product });
    } catch (error) {
        res.status(400).send({ message: "BAD request ", error: error.message });
    }
})

// add product body
// {
//     "name": "Product 1",
//     "price": 100,
//     "description": "Description of Product 1",
//     "imageUrl": "https://example.com/product1.jpg",
//     "category": "Category 1",
//     "stock": 10
// }

productRouter.get('/getAllProducts', async (req, res) => {
    try {
        const products = await Product.find({});
        if (!products) {
            throw new Error("Products not found");
        }
        res.status(200).send({ message: "Products fetched successfully", products });
    } catch (error) {
        res.status(400).send({ message: "BAD request ", error: error.message });
    }
})

productRouter.get('/getProduct/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            throw new Error("Product not found");
        }
        res.status(200).send({ message: "Product fetched successfully", product });
    } catch (error) {
        res.status(400).send({ message: "BAD request ", error: error.message });
    }
})


productRouter.delete('/deleteProduct/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            throw new Error("Product not found");
        }
        res.status(200).send({ message: "Product deleted successfully", product });
    } catch (error) {
        res.status(400).send({ message: "BAD request ", error: error.message });
    }
})


productRouter.post('/updateProduct/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
        if (!product) {
            throw new Error("Product not found");
        }
        res.status(200).send({ message: "Product updated successfully", product });
    } catch (error) {
        res.status(400).send({ message: "BAD request ", error: error.message });
    }
})



module.exports = { productRouter };
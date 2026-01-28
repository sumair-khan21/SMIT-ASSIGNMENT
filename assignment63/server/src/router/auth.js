const express = require('express');
const { User } = require('../model/auth');
const authRouter = express.Router();
const bcrypt = require('bcrypt');
const { validateSignup, validateLogin } = require('../lib/utils');


authRouter.post('/signup', async (req, res) => {
    try {
        validateSignup(req);

        const { name, email, password, gender, age, about } = req.body;

        const user = await User.findOne({ email });
        if(user){
            return res.status(400).json({ error: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            gender,
            age,
            about
        });

        await newUser.save();

        res.status(201).send({ message: "User registered successfully",
            user: newUser
         });
        
    } catch (error) {
        res.status(400).send({ message: "BAD request ", error: error.message });
    }
})

// signup body
// {
//    "name": "John Doe",
//    "email": "johndoe@example.com",
//    "password": "SecurePass123!",
//    "gender": "male",
//    "age": 25,
//    "about": "Software developer"
// }




authRouter.post('/login', async (req, res) => {
    try {

        const { email, password } = req.body;

        validateLogin(req);
        
        const user = await User.findOne({ email });
        if(!user){
            throw new Error("Invalid email or password");
        }

        const isPasswordMatch = await user.validatePassword(password);
        if(!isPasswordMatch){
            throw new Error("Invalid email or password");
        }

        const token = await user.getjwt();
        console.log("Generated Token:", token);

        res.cookie('token', token, {
            expires: new Date(Date.now() + 7*24*60*60*1000),
        })

        res.status(200).send({ message: "Login successful", user });

    } catch (error) {
        res.status(400).send({ message: "BAD request ", error: error.message });
    }
})



authRouter.post('/logout', (req, res) => {
    try {
        
    res.clearCookie('token');
    res.status(200).send({ message: "Logout successful" });
    } catch (error) {
        res.status(400).send({ message: "BAD request ", error: error.message });
    }
})  



module.exports = {authRouter};
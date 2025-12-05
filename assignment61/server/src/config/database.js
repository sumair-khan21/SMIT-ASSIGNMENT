const mongoose = require("mongoose");
const url = 'mongodb+srv://first-database:Admin%40123@cluster.chstfkz.mongodb.net/todo';
const connectDB = async () =>{
    try {
        await mongoose.connect(url);
        console.log("MongoDB connected");
    } catch (error) {
        console.log(error);
    }
} 


module.exports = {
    connectDB
}
const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const cors = require('cors');
const { authRouter } = require('./router/auth');
const { productRouter } = require('./router/product');
const { authMiddleware } = require('./middleware/auth');
const { fileRouter } = require('./router/files');
dotenv.config();

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());


app.use('/auth', authRouter);
app.use('/products', authMiddleware, productRouter);
app.use('/files', fileRouter);


const port = process.env.PORT || 5000;

// okkkkkkkkkkkkkkkkkkkkkk

connectDB().then(() => {
    console.log("Database connected successfully");
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });

}).catch((err) => {
    console.log("Database connection failed", err);
});
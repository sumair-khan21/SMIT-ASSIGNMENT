const jwt = require('jsonwebtoken');
const { User } = require('../model/auth');

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if(!token){
            throw new Error("Unauthorized Access please login first");
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findById(decoded.id);
        if(!user){
            throw new Error("Unauthorized Access please login first");
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).send({ message: "Unauthorized Access please login first", error: error.message });
    }
}

module.exports = {authMiddleware};
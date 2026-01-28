const mongoose = require('mongoose');

const connectDB = async () => {
  return mongoose.connect(
    `mongodb+srv://${process.env.DbUserName}:${process.env.DbPassword}@cluster.chstfkz.mongodb.net/${process.env.DbName}?authSource=admin`
  );
};

module.exports = connectDB;

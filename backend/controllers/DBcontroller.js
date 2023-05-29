const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async() => {
    mongoose.connect(process.env.MONGO_URI)
    .then(()=> console.log("connection to database established"))
    .catch((err)=> console.log(err));
};

module.exports = connectDB;
const mongoose = require('mongoose');
const joi = require('joi');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your Name!"]
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, "Email is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: 8
    }
});

const validateUser = (data) => {
    const schema = joi.object({
        name: joi.string().min(5).max(40).required(),
        email: joi.string().email().required(),
        password: joi.string().min(8).required()
    });

    return schema.validate(data);
};

const User = new mongoose.model("User", userSchema);

module.exports = { validateUser, User};
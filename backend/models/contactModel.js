const mongoose = require('mongoose');
const joi = require("joi");

const ContactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required."],
    },
    address: {
        type: String,
        required: [true, "address is required."],
    },
    email: {
        type: String,
        required: [true, "email is required."],
    },
    phone: {
        type: Number,
        required: [true, "phone number is required."],
    },
    postedBy: {
        // type: mongoose.Schema.Types.ObjectId,
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "Contact must belong to a user"]
    },
});

ContactSchema.virtual('contacts',{
    ref: 'Contact',
    foreignField: 'postedBy',
    localField: '_id'
});

const Contact = new mongoose.model("Contact", ContactSchema);

const validateContact = (data) => {
    const schema = joi.object({
        name: joi.string().min(5).max(25).required(),
        address: joi.string().min(4).max(100).required(),
        email: joi.string().email().required(),
        phone: joi.number().required(),
    });

    return schema.validate(data);
}

module.exports = {
    Contact,
    validateContact,
};
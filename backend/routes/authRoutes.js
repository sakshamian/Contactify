const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const router = express.Router();

const auth = require('../middlewares/auth');
const { validateUser, User} = require('../models/userModel');

// register
router.post("/register", async(req,res)=> {
    
    const { error } = validateUser(req.body);

    if(error){
        console.log(error);
        return res.status(400).json({ error: error.details[0].message });
    }

    const { name, email, password } = req.body;

    try{
        const doesUserAlreadyExist = await User.findOne({ email });

        if(doesUserAlreadyExist){
            return res
                .status(400)
                .json({error: `User with the email ${email} already exists`});
        }

        const hashedPassword = await bcrypt.hash(password,12);
        const newUser = new User({ name, email, password: hashedPassword});

        const result = await newUser.save();
        result._doc.password = undefined;

        return res.status(201).json({ ...result._doc });
    }
    catch(err){
        console.log(err);
        return res.status(500).json({ error: err.message });
    }
});

// login
router.post("/login", async(req,res)=> {
    const { email, password } = req.body;

    if(!email || !password){
        return res 
            .status(400)
            .json({ error: 'Invalid email or password'})
    }

    try{
        const doesUserExist = await User.findOne({ email });

        if(!doesUserExist){
            return res 
                .status(400)
                .json({ error: "Invalid email or password" });
        }

        const passwordCheck = await bcrypt.compare(
            password,
            doesUserExist.password
        );

        if(!passwordCheck){
            return res 
                .status(400)
                .json({ error: "Password does not match" });
        }

        const payload = { _id: doesUserExist._id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "6h",
        })

        const user = { ...doesUserExist._doc, password: undefined};
        return res.status(200).json({ status:"success", token, user });

    }
    catch(err){
        console.log(err);
        return res
            .status(500)
            .json({ error: err.message });
    }

});

router.get('/me', auth, async(req,res)=>{
    return res.status(200).json({ ...req.user._doc });
});

router.put('/user', auth, async(req, res) => {
    const { id } = req.body;
    if(!id) return res.status(400).json({ error: "Enter a valid id"});

    try{
        const userToEdit = await User.findOne({ _id: id});
        const { password } = req.body;
        console.log(userToEdit.password);
        const passwordCheck = await bcrypt.compare(
            password,
            userToEdit.password
        );

        if(!passwordCheck){
            return res 
                .status(400)
                .json({ error: "Password does not match" });
        }
        const updatedData = { ...req.body, password: userToEdit.password, id: undefined};
        console.log(updatedData);
        const result = await User.findByIdAndUpdate(id, updatedData,{
            new: true
        });

        return res.status(200).json({
            status: "success",
            ...result._doc
        });
    }
    catch(err){
        console.log(err);
        return res.status(400).json({ error: err});
    }

});

module.exports = router;
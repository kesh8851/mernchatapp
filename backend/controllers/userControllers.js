const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const generateToken = require('../config/generateToken');

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, pic } = req.body;

    // if (!name || !email || !password) {
    //     res.status(400).send("Please Enter all the Fields"); // Sending error message
    //     return; // Return to avoid further execution
    // }

    const userExists = await User.findOne({ email });

    if (userExists) {
    return res.status(400).json({ error: "User already exists" }); // Sending JSON error message
}


    const user = await User.create({
        name,
        email,
        password,
        pic,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id),
        });
    } else {
        res.status(400).send("Failed to create new user"); // Sending error message
    }
});

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id),
        });
    } else {
        res.status(401).send("Invalid Email or Password"); // Sending error message
    }
});


const allUsers = asyncHandler(async(req,res)=>{
    const keyword=req.query.search ?{
        $or :[
            {name:{$regex: req.query.search, $options:"i"}},
            {email:{$regex: req.query.search, $options:"i"}},
        ]

    }:{ };

    const users= await User.find(keyword).find({_id:{$ne:req.user._id}});
    res.send(users);
});
module.exports = { registerUser, authUser,allUsers };

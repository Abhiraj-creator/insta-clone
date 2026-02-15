const UserModel = require('../models/user.model')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


async function registerController(req, res) {

    const { username, email, password, bio, profilePic } = req.body;

    const IsUserAlreadyExist = await UserModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })

    if (IsUserAlreadyExist) {
        res.status(409).json({
            message: `username already exist with ${IsUserAlreadyExist.email === email ? 'this email' : 'this username'}`
        })
    }
    const hash=await bcrypt.hash(password,10);
    const user = await UserModel.create({
        username,
        email,
        password: hash,
        bio,
        profilePic
    })

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET,
        { expiresIn: '1d' }
    )

    res.cookie("token", token)


    res.status(201).json({
        message: "user register successfully",
        user,
        token
    })
}


async function loginController(req, res) {

    const { username, email, password } = req.body;

    const user = await UserModel.findOne({
        $or: [
            { username: username },
            { email: email }
        ]
    })
    if (!user) {
        res.status(409).json({
            message: "user not found"
        })
    }
    const IspasswordValid = await bcrypt.compare(password,user.password)

    if (!IspasswordValid) {
        res.status(400).json({
            message: "invalid password"
        })
    }

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET,
        { expiresIn: '1d' }
    )

    res.cookie('token', token);

    res.status(201).json({
        message: "user logged in",
        user: {
            username: user.username,
            email: user.email
        },
        token
    })
}

module.exports = {
    registerController,
    loginController
}
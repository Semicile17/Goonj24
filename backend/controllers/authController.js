const jwt = require('jsonwebtoken');

const UserData = require('../model/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const signToken = id=>{
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}


const signup = catchAsync (async (req, res, next)=>{

    const newUser = await UserData.create({
        googleId: req.body.googleId,
        name: req.body.name,
        email: req.body.email,
        pNum: req.body.pNum,
        state: req.body.state,
        city: req.body.city,
        college: req.body.college,
        ca_id: req.body.ca_id?req.body.ca_id:undefined
    })

    const token = signToken(newUser._id);

    res.status(201).json({
        status: 'success',
        token,
        userCreated: newUser
    })
})

const casignup = catchAsync(async (req, res, next) =>{
    const newUser = await UserData.create({
        googleId: req.body.googleId,
        name: req.body.name,
        email: req.body.email,
        pNum: req.body.pNum,
        state: req.body.state,
        city: req.body.city,
        college: req.body.college,
        role: 'ambassador'
    })

    const token = signToken(newUser._id);

    res.status(201).json({
        status: 'success',
        token,
        userCreated: newUser
    })
})


module.exports = {signup, casignup};
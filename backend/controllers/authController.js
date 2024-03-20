const UserData = require('../model/userModel');

const signup = async (req, res)=>{
    try {
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

        res.status(201).json({
            status: 'success',
            userCreated: newUser
        })

    } catch (error) {
        res.status(400).json({
            status: 'fail',
            msg: 'Something happened: ' + error
        })
    }
}

const casignup = async (req, res) =>{
    try {
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
    res.status(201).json({
        status: 'success',
        userCreated: newUser
    })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            msg: 'Something happened: ' + error
        })
    }
}

module.exports = {signup, casignup};
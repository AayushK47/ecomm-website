const bcrypt = require('bcrypt');

const { getToken } = require('../utils/auth');
const User = require('../models/User');

async function registerUser(req, res) {
    try
    {
        const hashed_password = await bcrypt.hash(req.body.password, 12);
        req.body.password = hashed_password;
        const user = await User.create(req.body);
        const token = getToken({ id: user.id });
        delete user.password
        res.status(201).json({
            message: "Registeration Successfully",
            user,
            token: token
        });
    } catch(e) {
        console.log(e);
        res.status(500).json({
            message: "Some Error Occurred. Please try after some time"
        });
    }
}

async function login(req, res) {
    try{
        console.log(req.body.email);
        const user = await User.findOne({ where: { email: req.body.email } });
        if(!user) {
            throw Error('User does not exist');
        }
        const passwordMatched = await bcrypt.compare(req.body.password, user.password);
        if(!passwordMatched) {
            throw Error('Incorrect Password');
        }
        const token = getToken({ id: user.id });
        res.status(200).json({
            message: "Login successful",
            user,
            token
        });
    } catch(err) {
        if(err.message === 'User does not exist' || err.message === "Incorrect Password") {
            res.status(401).json({
                message: err.message
            });
        } else {
            console.log(err);
            res.status(500).json({
                message: "Some Error Occurred. Please try after some time"
            })
        }
    }
}

async function getUserById(req, res) {
    try {
        const user = await User.findOne({ where: { id: req.userId } });
        if(!user) {
            throw Error(`User with id ${req.userId} not found.`);
        }
        res.status(200).json({
            message: `User with id ${req.userId} found successfully`,
            user
        })
    } catch(e) {
        if(e.message === `User with id ${req.userId} not found.`) {
            res.status(404).json({
                message: e.message
            });
        } else {
            res.status(500).json({
                message: "Some Error Occurred. Please try after some time"
            });
        }
    }
}

module.exports = {
    registerUser,
    login,
    getUserById
};
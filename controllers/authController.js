const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env' });
const { validationResult } = require('express-validator')

exports.authenticateUser = async (req, res, next) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()});
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        res.status(401).json({msg: 'Username does not exist'})
        return next();
    }


    if (bcrypt.compareSync(password, user.password)) {
        console.log('Password Correct!')
        const token = jwt.sign({
            _id: user._id,
            name: user.name,
            email: user.email
        }, process.env.SECRET, {
            expiresIn: '8h'
        });
        res.json({token});
    } else {
        res.status(401).json({msg: "Incorrect Password"})
    }

}

exports.authenticatedUser = (req, res) => {

}
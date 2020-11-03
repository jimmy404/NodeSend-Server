const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { check } = require('express-validator');

router.post('/',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'add a valid Email').isEmail(),
        check('password', 'The password must be at least 8 characters').isLength({min: 8})
    ],
    userController.newUser
);

module.exports = router;

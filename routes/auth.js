const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { check } = require('express-validator');

router.post('/',
    [
        check('email', 'Add a valid email').isEmail(),
        check('password', 'The password cannot be empty').not().isEmpty()
    ],
    authController.authenticateUser
);

router.get('/',
    authController.authenticatedUser
);

module.exports = router;

const { check } = require('express-validator/check');

module.exports = {
    validateAdmin:[
        check('email')
            .isEmail()
            .withMessage('Email is required.')
            .not()
            .isEmpty()
            .withMessage('Email is not valid.'),

        check('password')
            .not()
            .isEmpty()
            .withMessage('Password is empty')
            .isLength({ min: 8 })
            .withMessage('Password must be at least 8 characters.')
            .not()
            .equals('confirmPassword')
            .withMessage('Password do not match'),
    ]};
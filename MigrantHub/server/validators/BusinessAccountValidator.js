const { check } = require('express-validator/check');

module.exports = {
    validateBusiness: [
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

        check('corpId')
            .not()
            .isEmpty()
            .withMessage('Corporation ID is required'),

        check('firstName')
            .not()
            .isEmpty()
            .withMessage('First name is required and empty')
            .isAlpha()
            .withMessage('First name is not valid'),

        check('lastName')
            .not()
            .isEmpty()
            .withMessage('Last name is required and empty')
            .isAlpha()
            .withMessage('Last name is not valid'),

        check('address')
            .not()
            .isEmpty()
            .withMessage('Address is required and empty'),

        check('postalCode')
            .not()
            .isEmpty()
            .withMessage('Postal code is required and empty')
            .isLength({ min: 7, max: 7 })
            .withMessage('Postal code is invalid')
            .matches('[A-Za-z][0-9][A-Za-z] [0-9][A-Za-z][0-9]')
            .withMessage('Postal code is invalid'),

        check('city')
            .not()
            .isEmpty()
            .withMessage('City is required and empty')
            .isAlpha()
            .withMessage('City name is not valid'),

        check('province')
            .not()
            .isEmpty()
            .withMessage('Province is required and empty'),

        check('phoneNumber')
            .not()
            .isEmpty()
            .withMessage('Phone number is required and empty')
            .isMobilePhone(['en-CA'])
            .withMessage('Phone number is not valid')
            .matches('[(][0-9]{3}[)][ ][0-9]{3}[-][0-9]{4}')
            .withMessage('Phone number is not valid'),
    ]};
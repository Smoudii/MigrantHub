const { check } = require('express-validator/check');

module.exports = {
    validateEvent: [
        check('eventName')
            .not()
            .isEmpty()
            .withMessage('Event name is required.'),

        check('description')
            .not()
            .isEmpty()
            .withMessage('description is required.')
            .isLength({min: 10})
            .withMessage("Description must be at least 10 characters"),

        check('location')
            .optional()
            .not()
            .isEmpty()
            .withMessage('Location information is required'),

        check('location.address')
            .optional()
            .not()
            .isEmpty()
            .withMessage('Address is required and empty'),

        check('location.postalCode')
            .optional()
            .not()
            .isEmpty()
            .withMessage('Postal code is required and empty')
            .isLength({ min: 7, max: 7 })
            .withMessage('Postal code is invalid')
            .matches('[A-Za-z][0-9][A-Za-z] [0-9][A-Za-z][0-9]')
            .withMessage('Postal code is invalid'),

        check('location.city')
            .optional()
            .not()
            .isEmpty()
            .withMessage('City is required and empty')
            .isAlpha()
            .withMessage('City name is not valid'),

        check('location.province')
            .optional()
            .not()
            .isEmpty()
            .withMessage('Province is required and empty'),

        check('location.phoneNumber')
            .optional()
            .not()
            .isEmpty()
            .withMessage('Phone number is required and empty')
            .isMobilePhone(['en-CA'])
            .withMessage('Phone number is not valid')
            .matches('[(][0-9]{3}[)][ ][0-9]{3}[-][0-9]{4}')
            .withMessage('Phone number is not valid'),

        check('dateStart')
            .optional()
            .not()
            .isEmpty()
            .withMessage('Starting date is required'),

        check('dateEnd')
            .optional()
            .not()
            .isEmpty()
            .withMessage('Ending date is required'),

        check('timeStart')
            .optional()
            .not()
            .isEmpty()
            .withMessage('Starting time is required'),

        check('timeEnd')
            .optional()
            .not()
            .isEmpty()
            .withMessage('Ending time is required'),
    ]};
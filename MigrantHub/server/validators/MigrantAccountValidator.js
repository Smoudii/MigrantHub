const { check } = require('express-validator/check');

module.exports = {
    validateMigrant: [
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

        check('age')
            .not()
            .isEmpty()
            .withMessage('Please enter your age')
            .isNumeric({no_symbols: true}).trim().escape()
            .matches('^[1-9][0-9]?$')
            .isLength({ min: 1, max: 2 })
            .withMessage('Invalid age'),

        check('gender')
            .not()
            .isEmpty()
            .withMessage('Please select a gender'),

        check('nationality')
            .not()
            .isEmpty()
            .withMessage('Please enter your nationality')
            .isAlpha()
            .withMessage('Please enter a valid nationality'),

        check('relationshipStatus')
            .not()
            .isEmpty()
            .withMessage('Please enter your relationship status'),

        check('status')
            .not()
            .isEmpty()
            .withMessage('Please enter your status'),

        check('motherTongue')
            .not()
            .isEmpty()
            .withMessage('Please enter your mother tongue')
            .isAlpha()
            .withMessage('Please enter a valid language'),

        check('writingLevel')
            .not()
            .isEmpty()
            .withMessage('Please enter your writing level'),

        check('speakingLevel')
            .not()
            .isEmpty()
            .withMessage('Please enter your speaking level'),

        check('family')
            .optional()
            .not()
            .isEmpty()
            .withMessage('Family member information is required'),

        check('family.*.age')
            .optional()
            .not()
            .isEmpty()
            .withMessage('Family member age is required')
            .isNumeric({no_symbols: true}).trim().escape()
            .matches('^[1-9][0-9]?$')
            .isLength({ min: 1, max: 2 })
            .withMessage('Invalid age'),

        check('family.*.gender')
            .optional()
            .not()
            .isEmpty()
            .withMessage('Family member gender is required'),

        check('family.*.relationshipStatus')
            .optional()
            .not()
            .isEmpty()
            .withMessage('Family member relationshipStatus is required'),

        check('family.*.relation')
            .optional()
            .not()
            .isEmpty()
            .withMessage('Family member relation is required'),

        check('educationLevel')
            .not()
            .isEmpty()
            .withMessage('Please enter your education level'),

        check('jobStatus')
            .not()
            .isEmpty()
            .withMessage('Please enter your job status'),

        check('lookingForJob')
            .not()
            .isEmpty()
            .withMessage('Please select an option'),

        check('currentIncome')
            .optional({checkFalsy: true })
            .not()
            .isEmpty()
            .withMessage('Please enter your current income')
            .isInt({min:0, max:99999999})
            .withMessage('Please enter a valid amount'),

        check('workExperience')
            .optional()
            .not()
            .isEmpty()
            .withMessage('work experience is required'),

        check('workExperience.*.title')
            .optional()
            .not()
            .isEmpty()
            .withMessage('Work position title is required')
            .isAlpha()
            .withMessage('Please enter a valid work title'),

        check('workExperience.*.company')
            .optional()
            .not()
            .isEmpty()
            .withMessage('Company name is required'),

        check('workExperience.*.years')
            .optional()
            .not()
            .isEmpty()
            .withMessage('Please enter the amount of years')
            .isNumeric({no_symbols: true}).trim().escape()
            .matches('^[1-9][0-9]?$')
            .isLength({ min: 1, max: 2 })
            .withMessage('Invalid amount of years'),

        check('settlingLocation')
            .not()
            .isEmpty()
            .withMessage('Please enter a settling location'),

        check('settlingDuration')
            .not()
            .isEmpty()
            .withMessage('Please enter settling duration')
            .isNumeric({no_symbols: true}).trim().escape()
            .matches('^[1-9][0-9]?$')
            .isLength({ min: 1, max: 2 })
            .withMessage('Invalid duration'),

        check('joiningReason')
            .not()
            .isEmpty()
            .withMessage('Please select a reason for joining'),
    ]};
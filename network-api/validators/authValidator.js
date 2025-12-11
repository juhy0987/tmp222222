const { body } = require('express-validator');

exports.registerValidator = [
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email.')
        .normalizeEmail(),
    body('password')
        .trim()
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long.'),
    body('nickname')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Nickname is required.')
        .isLength({ min: 3 })
        .withMessage('Nickname must be at least 3 characters long.')
];
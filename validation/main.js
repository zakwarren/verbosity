const { body } = require('express-validator');

exports.checkMain = [
    body('url')
        .isURL()
        .withMessage('Please enter a valid URL')
];
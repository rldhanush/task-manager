const express = require('express');
const { signup, login, logout } = require('../controllers/authController');
const { body } = require('express-validator');
const router = express.Router();

// Signup route
router.post(
    '/signup',
    [
        body('firstName').notEmpty().withMessage('First name is required'),
        body('lastName').notEmpty().withMessage('Last name is required'),
        body('email').isEmail().withMessage('Invalid email address'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
        body('confirmPassword').custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Passwords do not match');
            }
            return true;
        })
    ],
    signup
);

// Login route
router.post(
    '/login',
    [
        body('email').isEmail().withMessage('Invalid email address'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
    ],
    login
);

// Logout route - if header does not contain token, return 401 
router.post('/logout', logout);

module.exports = router;

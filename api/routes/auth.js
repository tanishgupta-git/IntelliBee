const express = require('express');
const { body } = require('express-validator/check');
const router = express.Router();
const User = require('../models/user');
const authController = require('../controllers/auth');

router.put('/signup',[
    body('email').isEmail().withMessage("Please enter a valid email").bail().custom((value,{ req }) => {
        return User.findOne({email : value}).then(userDoc => {
            if (userDoc) {
                return Promise.reject('E-mail address already exists!');
            }
        })
    }).normalizeEmail(),
    body('password').trim().isLength({min : 5}),
    body('username').trim().notEmpty().bail().custom((value,{ req }) => {
        return User.findOne({username : value}).then(userDoc => {
            if (userDoc) {
                return Promise.reject('Username already exists!');
            }
        }) })

],authController.signup)

router.post('/login',authController.login);

module.exports = router
const express = require('express');
const{
   signUp,login
} = require('../controller/user.controller');
const morgan = require('morgan');
const userRoute = express.Router();
userRoute.use(morgan('combined'));

userRoute.route('/signUp').post(signUp);

userRoute.route('/login').post(login);

module.exports = userRoute;
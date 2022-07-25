const express = require('express');
const{
   
} = require('../controller/user.controller');
const morgan = require('morgan');
const contractRoute = express.Router();
contractRoute.use(morgan('combined'));
const express = require('express');
const morgan = require('morgan');

const authRoute = require('./routes/authRoute')

const app = express();

app.use(morgan('dev'));

app.use('api/v1/auth', authRoute);


module.exports = app;

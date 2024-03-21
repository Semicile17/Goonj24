const express = require('express');
const morgan = require('morgan');
const cors = require('cors');



const authRoute = require('./routes/authRoute')

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,POST,PATCH,DELETE'
}))

app.use(morgan('dev'));

app.use('api/v1/auth', authRoute);


module.exports = app;

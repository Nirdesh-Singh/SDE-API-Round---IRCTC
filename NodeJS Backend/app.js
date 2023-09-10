// app.js
const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./router/user.router');

const app = express();

// Middleware
app.use(bodyParser.json());

// Use the user router
app.use('/api/user', userRouter);


module.exports = app;

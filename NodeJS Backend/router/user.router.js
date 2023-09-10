// routes/user.router.js
const express = require('express');
const userController = require('../controller/user.controller');

const router = express.Router();

// User Registration Route
router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/trains/create', userController.createTrain);
router.get('/trains/availability', userController.getTrainsBetweenSourceAndDestination);
router.post('/trains/:train_id/book', userController.bookSeat);
router.get('/bookings/:booking_id', userController.getBookingDetails);

module.exports = router;

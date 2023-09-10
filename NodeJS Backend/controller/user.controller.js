// controllers/user.controller.js

// Import necessary modules and the database connection


const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');



// Get specific booking details
exports.getBookingDetails = async (req, res) => {
    const { booking_id } = req.params;
    const { user_id } = req.user; // Assuming user information is available in the request after authentication
  
    try {
      // Query the database to get booking details
      const [booking] = await db.promise().query(
        'SELECT b.booking_id, b.train_id, t.train_name, b.user_id, b.no_of_seats, b.seat_numbers, ' +
        't.arrival_time_at_source, t.arrival_time_at_destination ' +
        'FROM bookings b ' +
        'JOIN trains t ON b.train_id = t.train_id ' +
        'WHERE b.booking_id = ? AND b.user_id = ?',
        [booking_id, user_id]
      );
  
      if (!booking) {
        return res.status(404).json({ error: 'Booking not found' });
      }
  
      res.status(200).json(booking);
    } catch (error) {
      console.error('Error getting booking details:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

// Book a seat on a particular train
exports.bookSeat = async (req, res) => {
    const { train_id } = req.params;
    const { user_id, no_of_seats } = req.body;
  
    try {
      // Check if the train exists and has available seats
      const [train] = await db.promise().query(
        'SELECT * FROM trains ' +
        'WHERE train_id = ? ' +
        'AND (seat_capacity - IFNULL(booked_seats, 0)) >= ?',
        [train_id, no_of_seats]
      );
  
      if (!train) {
        return res.status(400).json({ error: 'Train not found or not enough available seats' });
      }
  
      // Create a booking for the user
      const [result] = await db.promise().query(
        'INSERT INTO bookings (train_id, user_id, no_of_seats) VALUES (?, ?, ?)',
        [train_id, user_id, no_of_seats]
      );
  
      const bookingId = result.insertId;
  
      // Generate an array of booked seat numbers
      const bookedSeats = Array.from({ length: no_of_seats }, (_, index) => index + 1);
  
      // Update the booked seats for the train
      await db.promise().query(
        'UPDATE trains ' +
        'SET booked_seats = IFNULL(booked_seats, 0) + ? ' +
        'WHERE train_id = ?',
        [no_of_seats, train_id]
      );
  
      res.status(201).json({
        message: 'Seat booked successfully',
        booking_id: bookingId,
        seat_numbers: bookedSeats,
      });
    } catch (error) {
      console.error('Error booking a seat:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

// Get trains between source and destination
exports.getTrainsBetweenSourceAndDestination = async (req, res) => {
    const { source, destination } = req.query;
  
    try {
      // Query the database to get trains between the specified source and destination
      const [rows] = await db.promise().query(
        'SELECT train_id, train_name, (seat_capacity - IFNULL(booked_seats, 0)) AS available_seats ' +
        'FROM trains ' +
        'LEFT JOIN ( ' +
        '  SELECT train_id, SUM(no_of_seats) AS booked_seats ' +
        '  FROM bookings ' +
        '  WHERE source = ? AND destination = ? ' +
        '  GROUP BY train_id ' +
        ') AS b ON trains.train_id = b.train_id ' +
        'WHERE source = ? AND destination = ?',
        [source, destination, source, destination]
      );
  
      res.status(200).json(rows);
    } catch (error) {
      console.error('Error getting trains between source and destination:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

// Create a new train (admin-only)
exports.createTrain = async (req, res) => {
    const { train_name, source, destination, seat_capacity, arrival_time_at_source, arrival_time_at_destination } = req.body;
  
    // Check if the user is an admin (You need to implement admin authentication logic here)
  
    try {
      // Insert the new train details into the database
      const [result] = await db.promise().query(
        'INSERT INTO trains (train_name, source, destination, seat_capacity, arrival_time_at_source, arrival_time_at_destination) VALUES (?, ?, ?, ?, ?, ?)',
        [train_name, source, destination, seat_capacity, arrival_time_at_source, arrival_time_at_destination]
      );
  
      const trainId = result.insertId;
  
      res.status(201).json({
        message: 'Train added successfully',
        train_id: trainId,
      });
    } catch (error) {
      console.error('Error creating a new train:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the username exists in the database
    const [user] = await db.promise().query('SELECT * FROM users WHERE username = ?', [username]);

    if (!user) {
      return res.status(401).json({
        status: 'Incorrect username/password provided. Please retry',
        status_code: 401,
      });
    }

    // Compare the provided password with the hashed password stored in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        status: 'Incorrect username/password provided. Please retry',
        status_code: 401,
      });
    }

    // If the username and password are correct, create a JWT token for the user
    const accessToken = jwt.sign({ user_id: user.user_id }, 'your_secret_key_here', {
      expiresIn: '1h', // Token expiration time (adjust as needed)
    });

    res.status(200).json({
      status: 'Login successful',
      status_code: 200,
      user_id: user.user_id,
      access_token: accessToken,
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// User Registration Controller
exports.signup = async (req, res) => {
    try {
      const { username, password, email } = req.body;
  
      // Check if the username or email already exists
      const existingUser = await userService.checkExistingUser(username, email);
      if (existingUser) {
        return res.status(400).json({ error: 'Username or email already exists' });
      }
  
      // Create a new user
      const userId = await userService.createUser(username, password, email);
  
      res.status(200).json({
        status: 'Account successfully created',
        status_code: 200,
        user_id: userId,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
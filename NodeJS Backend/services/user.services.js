// services/user.service.js
const mysql = require('mysql2/promise');
const dbConfig = require('../config/db.js');

const pool = mysql.createPool(dbConfig);

// Check if a username or email already exists in the database
async function checkExistingUser(username, email) {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.execute(
      'SELECT * FROM users WHERE username = ? OR email = ?',
      [username, email]
    );
    return rows.length > 0;
  } finally {
    connection.release();
  }
}

// Create a new user
async function createUser(username, password, email) {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.execute(
      'INSERT INTO users (username, password, email, role) VALUES (?, ?, ?, ?)',
      [username, password, email, 'loginUser']
    );
    return result.insertId;
  } finally {
    connection.release();
  }
}

module.exports = {
  checkExistingUser,
  createUser,
};

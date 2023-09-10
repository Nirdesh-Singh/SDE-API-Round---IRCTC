const app = require('./app');
const dbConnection = require('./config/db'); // Import the database connection from db.js


// You can now use db.query for database operations
dbConnection.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Error executing query:', err.message);
    } else {
        console.log('Connected to MySQL database');
    
        // Start the Express server after the database connection is established
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
          console.log(`Server is running on port ${PORT}`);
        });
    }
  
    // Don't forget to close the connection when you're done with it
    dbConnection.end();
  });



const mysql = require('mysql2');

var mysqlConnection = mysql.createConnection({
    host : 'localhost',
    username  : 'root',
    password : 'nirdesh',
    database : 'notesdb',
    multipleStatements : true,
    connectTimeout: 10000,
});

module.exports = mysqlConnection;
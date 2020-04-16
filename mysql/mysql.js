const mysql = require('mysql')
var connection = mysql.createConnection({

});
connection.connect();
module.exports = connection;
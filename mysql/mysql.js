const mysql = require('mysql')
var connection = mysql.createConnection({
    host:'',
    user:'',
    password:'',
    database:''
});
connection.connect();
module.exports = connection;
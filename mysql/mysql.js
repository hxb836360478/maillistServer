const mysql = require('mysql')
var connection = mysql.createConnection({
    host:'39.97.104.91',
    user:'root',
    password:'gxj19971105.',
    database:'test'
});
connection.connect();
module.exports = connection;
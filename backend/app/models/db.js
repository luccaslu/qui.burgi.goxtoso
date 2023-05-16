//modulo MySQL
const mysql = riquere("mysql");
const dbConfig = require("../configs/db.config.js");

// cria uma conexao com BD
const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB,
    port: dbConfig.PORT
});

connection.connection(error=>{
    if (error) throw error;
    console.log("banco de conectado");
});
module.exports = connection;
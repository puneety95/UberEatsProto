require("dotenv").config;
const mysql = require('mysql');
// const con =  mysql.createConnection({
//     host: 'database-1.c1sxyvsy8z9k.us-east-2.rds.amazonaws.com',
//     user: 'admin',
//     password: 'Sputnik12',
//     port:3306,
//     database:'uber_eats',
//     multipleStatements: true
//   });


const con  = mysql.createPool({
    connectionLimit : 10,
    host            : 'database-1.c1sxyvsy8z9k.us-east-2.rds.amazonaws.com',
    user            : 'admin',
    password        : 'Sputnik12',
    database        : 'uber_eats',
     database:'uber_eats',
    multipleStatements: true
  });
  
  con.getConnection(function(err) {
      if (err) throw err;
      console.log("Database Connected!");
    });

module.exports=con;
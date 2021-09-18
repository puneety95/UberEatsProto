const express = require('express');
const bodyParser=require('body-parser');
const app=express();
const cors=require('cors');
var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "yourusername",
    password: "yourpassword"
  });
app.use(cors());
const routesHandler=require('./routes/handler.js');

var cors_options ={
   origin:'http://localhost:3000'
}
app.use(cors(cors_options));

app.use('/',routesHandler);
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const PORT =4000;
app.listen(PORT,()=>{
    console.log('Back end Server is running on'+ PORT);
});

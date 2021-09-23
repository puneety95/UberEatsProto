const express = require('express');
const bodyParser=require('body-parser');
require("dotenv").config;
const app=express();
const cors=require('cors');
var mysql = require('mysql');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
console.log(process.env.NODE_ENV);



const con=require('./SQL_Connection.js')

app.use(cors());
var cors_options ={
    origin:'http://localhost:3000'
 }
 app.use(cors(cors_options));



const routesHandler=require('./routes/handler.js');




app.use('/',routesHandler);


const PORT =4000;
app.listen(PORT,()=>{
    console.log('Back end Server is running on'+ PORT);
});


const express = require('express');

const bodyParser=require('body-parser');
require("dotenv").config;
const app=express();
const cors=require('cors');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
console.log(process.env.NODE_ENV);




//const con=require('./SQL_Connection.js')
//const con = requre

app.use(cors());
var cors_options ={ //18.224.14.188
    origin:'http://localhost:3000'
 }
 //http://localhost:3000
 app.use(cors(cors_options));



const routesHandler=require('./routes/handler.js');

const restRoutesHandler=require('./routes/restaurantRoutes.js');

const customerRoutesHandler=require('./routes/customerRoutes.js');


app.use('/',routesHandler);
app.use('/',restRoutesHandler);
app.use('/',customerRoutesHandler);
const PORT =4000;
app.listen(PORT,()=>{
    console.log('Back end Server is running on'+ PORT);
});



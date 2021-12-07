const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config;
const app = express();
const cors = require("cors");
const path = require("path");
const { graphqlHTTP } = require("express-graphql");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
console.log(process.env.NODE_ENV);
const mongoose = require("mongoose");
//const express = require('express');
mongoose.connect(
  "mongodb+srv://UberEatsUser:Sputnik12@ubereats.atuet.mongodb.net/UberEats?retryWrites=true&w=majority",
  () => {
    console.log("Connected to Mongo Database");
  }
);

//const con=require('./SQL_Connection.js')
//const con = requre

app.use(cors());
var cors_options = {
  //18.224.14.188
  origin: "http://54.218.164.95:3000",
};
//http://localhost:3000
app.use(cors(cors_options));

const routesHandler = require("./routes/handler.js");

const restRoutesHandler = require("./routes/restaurantRoutes.js");

const customerRoutesHandler = require("./routes/customerRoutes.js");

const schema = require("./schema");
app.use("/", routesHandler);
app.use("/", restRoutesHandler);
app.use("/", customerRoutesHandler);
const PORT = 4000;

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(PORT, () => {
  console.log("Back end Server is running on" + PORT);
});

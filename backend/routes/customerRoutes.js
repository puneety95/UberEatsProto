const jwt=require('jsonwebtoken');
const express=require('express');
const customerRouter=express.Router();
const con=require('../SQL_Connection.js');

let secret_jwt_token='4405fdad7ce0e57621bd4e62b6c39ff91e72d16253238917ea9c844fc60245c6a299576c85c1b553849f7ccdf0ab29372e12b18cdda2cd8842480ce3e124e6be';
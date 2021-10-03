const jwt=require('jsonwebtoken');
const express=require('express');
const customerRouter=express.Router();
const con=require('../SQL_Connection.js');



function authenticateToken(req,res,next)
{
  const authHeader =req.headers.authorization;
 
  const token =authHeader.split(' ')[1];
  
  if(token==null)
  {
    res.sendStatus(401);
  }
  jwt.verify(token,secret_jwt_token,(err,user)=>{
    if(err)
      {
       
        res.sendStatus(403);
      }
      
    req.user=user;
    
    next();

  })
}

customerRouter.post('/profile',(res,req)=>{
    let sql=`select name,dob,city,nickname,phone from cust_profile where id=${res.body.id};`;
    con.query(sq,function(err,result){
      if(err)
      {
        res.statusCode(500);
      }
      else{
        res.send(result);
      }
    })
})

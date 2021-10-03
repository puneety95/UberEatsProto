const jwt=require('jsonwebtoken');
const express=require('express');
const restRouter=express.Router();
const con=require('../SQL_Connection.js');
const authenticateToken=require('./authenticateToken');
const s3 =require('./imageHandler.js');
let secret_jwt_token='4405fdad7ce0e57621bd4e62b6c39ff91e72d16253238917ea9c844fc60245c6a299576c85c1b553849f7ccdf0ab29372e12b18cdda2cd8842480ce3e124e6be';


//REST DASHBOARD - PROFILE
restRouter.get('/RestProfile',authenticateToken,(req,res)=>{
    
    console.log("PUneet->>>>>>>>>>>");
    sql=`select r.r_id, u.location, r.r_description, u.name,r.r_contact, r_timings from rest_info r inner join user_login u on u.id=r.r_id where u.email='${req.user.loginEmail}'; `;
      
    console.log(sql);
      con.query(sql,function(err,result){
          if(err)
          {
            console.log("Iside error  -->>>>>>>>>>>>>");
            res.send(500);
          }
          console.log(result);
          res.json({profileDetails:result});
      });
    
  
  });
  
  //REST PROFILE UPDATE
  restRouter.post('/RestProfileUpdate',authenticateToken,(req,res)=>{
    console.log(req.body);
    let val=req.body;
    sql=`update  rest_info set r_description='${val.r_description}',r_contact='${val.r_contact}',r_timings='10pm' where r_id=${val.r_id};`;
    sql=sql+ `update user_login set name='${val.name}' , location='${val.location}' where id=${val.r_id};`;
    console.log(sql);
    con.query(sql,function(err,result){
      if(err)
      {
        
        console.log(err);
        res.sendStatus(500);
      }
      else{
        res.send('ok')
      }
     
    })
  });


  restRouter.get('/s3url',authenticateToken,async (req,res)=>{
      const  url = await s3();
      res.send({url});
  })





module.exports=restRouter;
const jwt=require('jsonwebtoken');
const express=require('express');
const customerRouter=express.Router();
const con=require('../SQL_Connection.js');
const { commit } = require('../SQL_Connection.js');



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

customerRouter.get('/getRestaurant',(req,res)=>{
    
  let sql=`select r.r_id,r.profile_pic,u.name from rest_info as r ,user_login as u where u.location not in (select location from user_login where id='${req.query.id}') and u.id=r.r_id and r.type='${req.query.type}';`;
    con.query(sql,(error,result)=>{
    if(error)
    {
      res.sendStatus(500);
    }
    else
    {
      let sql=`select r.r_id,r.profile_pic,u.name from rest_info as r ,user_login as u where u.location=(select location from user_login where id='${req.query.id}') and r.type='${req.query.type}' and u.id=r.r_id;`;
     
      con.query(sql,(error2,result2)=>{
        if(error2)
        {
          
          res.sendStatus(500);
        }
        else{
          
          let d=[...result2, ...result];
          console.log(d);
          res.send(d);
        }
      })
    }
  })

})



customerRouter.get('/getRestaurantCustomer',(req,res)=>{
  console.log("Get restuarant details----------------------------------");
  
  let sql=`select r.profile_pic,u.name,r.r_description,r.r_contact,r.r_timings,r.type,u.location from rest_info as r , user_login as u where u.id=r.r_id and r.r_id = '${req.query.id}';`;  
  
  con.query(sql,(error,result)=>{
    if(error)
    {
      console.log(error);
      res.sendStatus(500);
    }
    else{
      console.log("Puneet-----",result);
      res.send(result);
    }
  })

})


customerRouter.post('/addfavourite',(req,res)=>{
  console.log("inside favouritessss");
  let val=req.body;
  let sql;
  if(val.check==1)
  {
    sql=`delete from favourites where rest_id='${val.id}' and cust_id='${val.uid}';`;
  }
  else{
    sql=`Insert into favourites values ('${val.id}' ,'${val.uid}');`;
  }
  console.log(sql);
  con.query(sql,(error,result)=>{
    if(error)
    {
     console.log(error);
      res.sendStatus(500);
    }
    else{
      console.log("Success");
      res.sendStatus(200);
    }
  })
})


customerRouter.get('/getFavourites',(req,res)=>{
  console.log("Iside get favourites-----------");
  
  let sql=`select r.r_id , r.profile_pic , u.name from rest_info as r, user_login as u where u.id=r.r_id and  r.r_id in (select rest_id from favourites where cust_id='${req.query.id}');`;
  console.log(sql);
  con.query(sql ,(error,result)=>{
      if(error)
      {
        console.log(error);
        res.sendStatus(500);
      }
      else
      {
        console.log("Success",result);
        res.send(result);
      }
  })

})

module.exports=customerRouter;
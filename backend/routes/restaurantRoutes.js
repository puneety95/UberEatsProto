const jwt=require('jsonwebtoken');
const express=require('express');
const restRouter=express.Router();
const con=require('../SQL_Connection.js');
const authenticateToken=require('./authenticateToken');
const s3 =require('./imageHandler.js');
let secret_jwt_token='4405fdad7ce0e57621bd4e62b6c39ff91e72d16253238917ea9c844fc60245c6a299576c85c1b553849f7ccdf0ab29372e12b18cdda2cd8842480ce3e124e6be';


//REST DASHBOARD - PROFILE
restRouter.get('/RestProfile',authenticateToken,(req,res)=>{
    
    sql=`select r.r_id, u.location,r.profile_pic, r.r_description, u.name,r.r_contact, r_timings from rest_info r inner join user_login u on u.id=r.r_id where u.email='${req.user.loginEmail}'; `;
      
     con.query(sql,function(err,result){
          if(err)
          {
            console.log("Iside error  -->>>>>>>>>>>>>",err);
            res.sendStatus(500);
          }
          else
          {
          console.log(result);
          res.json({profileDetails:result});
          }
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


  restRouter.get('/s3url',async (req,res)=>{
    console.log("HErerererererer");
      const  url = await s3();
      res.send({url});
  })

  restRouter.post('/RestProfileImageUpdate',authenticateToken,(req,res)=>{
    console.log(req.body);
    let sql=`Update rest_info set profile_pic='${req.body.imageUrl}' where r_id='${req.body.id}';`;
    console.log(sql);
    con.query(sql,(error,result)=>{
        if(error)
        {
          console.log(error);
          res.sendStatus(500);
        }
        else{
          res.sendStatus(200);
        }
    })
  })

  restRouter.post('/RestDishesAdd',authenticateToken,(req,res)=>{
    console.log("Puneet-------------------",req.body);
    let value=req.body;
    let sql=`insert into images(url) values('${req.body.imageUrl}');`;
    
    con.query(sql,(error,result)=>{
        if(error)
        { 
          console.log(error);
          res.sendStatus(500);
        }
        else{
          sql=`insert into dishes (rest_id,name,ingredients,images,price,description,cat) values('${value.id}','${value.name}','${value.ingredients}','${req.body.imageUrl}','${value.price}','${value.description}','${value.category}');`;
          con.query(sql,(error,result)=>{
            if(error)
            {
              console.log("Here");
              console.log(error);
              res.sendStatus(500);
            }
            else{
              res.send(200);
            }
          })
        }
      
  })})

  restRouter.get('/getDishes',authenticateToken,(req,res)=>{
    console.log(req.body);
    let sql=`select d.id,d.rest_id,d.name,d.ingredients,d.price,d.description,d.cat,c.type,d.images from dishes d, category c where`;
    sql=sql+` d.cat=c.id and  rest_id='${req.query.id}';`
    console.log(sql);
    con.query(sql,(error,result)=>{
      if(error){
        console.log(error);
        res.sendStatus(500);
      }
      else{
        console.log("Success");
        res.send(result);
      }
    })

  })

module.exports=restRouter;
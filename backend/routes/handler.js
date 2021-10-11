const e = require('express');
const jwt=require('jsonwebtoken');
const express =require('express');
const router=express.Router();
const con=require('../SQL_Connection.js')
const bcrypt=require('bcrypt');
const multer=require('multer');



let secret_jwt_token='4405fdad7ce0e57621bd4e62b6c39ff91e72d16253238917ea9c844fc60245c6a299576c85c1b553849f7ccdf0ab29372e12b18cdda2cd8842480ce3e124e6be';

//handles signup - /signup
router.post('/signup',   (req,res)=>{
    
    let val=(req.body);
    let sql=`select count(*) as ecount from user_login where email='${val.signup_email}';`;
    let resq;
   con.query(sql , function (err, result) {
      if (err)
         {   console.log(err);
                     res.status(500).send("There were some errors while performing this action");
         }
     else
      {
        resq=result[0].ecount;
        if(resq!=0)
        {
          
           res.status(403).send("Email Id already present.");
 
        }
    else{
    
     try{
     
      const pp= bcrypt.hashSync(val.signup_pass, 10);
       
        sql = `INSERT INTO user_login  (id,email,password,location,role,name) VALUES`
        sql=sql+ `((select * from (select max(id)+1 from uber_eats.user_login b) as  temp), '${val.signup_email}' ,'${pp}','${val.signup_location}','${val.role}','${val.signup_name}');`;
       if(val.role==1)
       {
         sql=sql+`Insert into cust_profile (id) values((select max(id) from user_login));`;
       }
       else
       {
        sql=sql+` Insert into rest_info (r_id) values((select max(id) from user_login));`;
       }
       
           con.query(sql ,function (error, result) {
              if (error)
              {
                console.log(error);
                res.status(500).send("There were some errors while performing this action");
                  
              } 
              else
              {
                
                sql=`select id,email,role from user_login where id = (select max(id) from user_login);`;
                con.query(sql,function(err,result){
                  if(err)
                  {
                    
                     res.status(500).send("There were some error while performing the action");
                  }
                  else
                  {
                                  
                   val={loginEmail:req.body.signup_email}
                   res.json({id:result[0].id, role:result[0].role, email:result[0].email});
                   
                  }
                })
                
              }
              
            }); 
          }
          catch(error)
          {
            console.log(error);
            res.status(500).send("There were some errors while performing this action");
          }
          }
        }  
            
    });
 
   });


// To login -/login
 router.post('/login',(req,res)=>{
  console.log(req.body);
  let val=req.body;
  let sql=`select password from user_login where email='${val.loginEmail}' `;
 
  con.query(sql, function (err,result){
    if(err)
    {
      res.status(500).send("There were some errors while performing the action");
    }
    else{
      let upass=result;
      if(upass.length==0)
      {
        res.status(403).send("Login Credentials are wrong. Please try again.");
      }
      
    else
    {  
    try{
        
     if( bcrypt.compareSync(val.loginPassword, upass[0].password))
      {
        let sql2=`select id,role,email,location from user_login where email='${val.loginEmail}';`
        
        con.query(sql2, function(err2,result2){
          if(err2){   
            
            res.status(500).send("There were some errors while performing the action");        
          }

          else
          {
            let id2=result2;
            val={loginEmail:req.body.loginEmail}
            const accessToken= jwt.sign(val,secret_jwt_token);
            res.json({accessToken:accessToken, id:result2[0].id, role:result2[0].role, location:result2[0].location, email:result2[0].email});
          }
           
        }); 
        
       // const jwt=require('jsonwebtoken');

     }
     else{
       res.sendStatus(403).send("Login Credentials are wrong. Please try again.")
     }
    }
    catch(error)
    {
      res.sendStatus(500).send("There were some errors while performing the action");
    }
  }
    }
  });
});


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

      console.log("use----------",user);
    req.user=user;
    
    next();

  })
}





module.exports=router;

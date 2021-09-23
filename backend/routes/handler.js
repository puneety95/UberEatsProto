const e = require('express');
const jwt=require('jsonwebtoken');
const express =require('express');
const router=express.Router();
const con=require('../SQL_Connection.js')
const bcrypt=require('bcrypt');
router.get('/profile',(req,res)=>{
 let name="puneet";
 res.send(name);
});

let secret_jwt_token='4405fdad7ce0e57621bd4e62b6c39ff91e72d16253238917ea9c844fc60245c6a299576c85c1b553849f7ccdf0ab29372e12b18cdda2cd8842480ce3e124e6be';
router.post('/signup',  (req,res)=>{
 
    let val=(req.body);
    let sql=`select count(*) as ecount from user_login where email='${val.signup_email}';`;
    console.log(sql);
    let resq;
   con.query(sql , function (err, result) {
      if (err)
         {   
          console.log("PUNET");
       res.status(403).send("There were some errors while performing this action");
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
      console.log("PUNET");
    // val.signup_pass= bcrypt.hash(val.signup_pass,10);
    const pp= bcrypt.hashSync(val.signup_pass, 10);
        console.log(val.signup_pass);
        sql = `INSERT INTO user_login  (id,email,password,location,role,name) VALUES`
        sql=sql+ `((select * from (select max(id)+1 from uber_eats.user_login b) as  temp), '${val.signup_email}' ,'${pp}','${val.signup_location}','${val.role}','${val.signup_name}');`;
       sql=sql+` Insert into rest_info (r_id) values((select max(id) from user_login));`;
        console.log(sql);
           con.query(sql ,function (err, result) {
              if (err)
              {
                console.log(err);
                res.status(403).send("There were some errors while performing this action");
                  
              } 
              else
              {
                res.send("Db Success");
              }
              
            }); 
          }
          catch(error)
          {
            console.log(error);
            res.status(403).send("There were some errors while performing this action");
          }
          }
        }  
            
    });
 
   });


 router.post('/login',(req,res)=>{
  
  let val=req.body;
 
  
  let sql=`select password from user_login where email='${val.loginEmail}' `;
  console.log(sql);
  con.query(sql, function (err,result){
    if(err)
    {
      res.status(403).send("There were some errors while performing the action");
      
    }
    else{
      let upass=result;
      if(upass.length==0)
      {
        res.status(403).send("Login Credentials are wrong. Please try again.");
      }
      console.log(val.loginPassword);
      console.log(upass[0].password);
      try{

    
     if( bcrypt.compareSync(val.loginPassword, upass[0].password))
      {
        let sql2=`select id,name from user_login where email='${val.loginEmail}';`
        console.log(sql2)
        con.query(sql2, function(err2,result2){
          if(err2){
            console.log(err2);
            res.status(403).send("There were some errors while performing the action");        
          }
          console.log("entered here2")
          let id2=result2;
          console.log("id of the table - "+result2)
          const accessToken= jwt.sign(val,secret_jwt_token);
          console.log(accessToken);
           res.json({accessToken:accessToken,
                     id:id2 });
        }); 
        
     
     }
     else{
       res.sendStatus(403).send("Login Credentials are wrong. Please try again.")
     }
    }
    catch(error)
    {
      res.sendStatus(403).send("There were some errors while performing the action");
    }
    }
  });
});

function authenticateToken(req,res,next)
{
  const authHeader =req.headers.authorization;
  console.log(req.headers.authorization);
  const token =authHeader.split(' ')[1];
  console.log(token);
  if(token==null)
  {
    res.sendStatus(401);
  }
  jwt.verify(token,secret_jwt_token,(err,user)=>{
    if(err)
      {
        console.log("Puneet")
        res.sendStatus(403);
      }
      console.log("YAda")
    req.user=user;
    console.log(user);
    next();

  })
}

//REST DASHBOARD - PROFILE
router.get('/RestProfile',authenticateToken,(req,res)=>{
    //console.log(req);
    sql=`select r.r_id, u.location, r.r_description, u.name,r.r_contact, r_timings from rest_info r inner join user_login u on u.id=r.r_id where u.email='${req.user.loginEmail}'; `;
    
    con.query(sql,function(err,result){
        if(err)
        {
          
          res.send(500);
        }
        
        res.json({profileDetails:result});
    });
   

});


module.exports=router;
// ('+'(select max(id)+1 from user_login),' +values.signup_email+','+values.signup_pass+','+values.signup_location+','+values.role+','+values.signup_name + ');';
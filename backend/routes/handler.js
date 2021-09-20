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


router.post('/signup',  (req,res)=>{
 
    let val=(req.body);
    let sql=`select count(*) as ecount from user_login where email='${val.signup_email}';`;
    console.log(sql);
    let resq;
   con.query(sql , function (err, result) {
      if (err)
         {   
     
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
  console.log("signinnnnn");
  let val=req.body;
  console.log(req.body);
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

     let secret_jwt_token='4405fdad7ce0e57621bd4e62b6c39ff91e72d16253238917ea9c844fc60245c6a299576c85c1b553849f7ccdf0ab29372e12b18cdda2cd8842480ce3e124e6be';
     if( bcrypt.compareSync(val.loginPassword, upass[0].password))
      {
        
      const accessToken= jwt.sign(val,secret_jwt_token);
      console.log(accessToken);
       res.json({accessToken:accessToken});
     }
     else{
       res.status(403).send("Login Credentials are wrong. Please try again.")
     }
    }
    catch(error)
    {
      res.status(403).send("There were some errors while performing the action");
    }
    }
  });
});


module.exports=router;
// ('+'(select max(id)+1 from user_login),' +values.signup_email+','+values.signup_pass+','+values.signup_location+','+values.role+','+values.signup_name + ');';
const e = require('express');
const jwt=require('jsonwebtoken');
const express =require('express');
const router=express.Router();
const con=require('../SQL_Connection.js')
const bcrypt=require('bcrypt');
const multer=require('multer');

const kafka = require('../kafka/client');

let secret_jwt_token='4405fdad7ce0e57621bd4e62b6c39ff91e72d16253238917ea9c844fc60245c6a299576c85c1b553849f7ccdf0ab29372e12b18cdda2cd8842480ce3e124e6be';

/*
//handles signup - /signup
router.post('/signup',   (req,res)=>{
    console.log("Signing UP--------");
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
   


router.post('/signup', async (req, res) => {
  console.log("PuneetAPI");
  const value=req.body;
 
  const isPresent =  await user_login.find({email:value.signup_email});
  if(isPresent.length ==0){
    const maxid =  await user_login.find().sort({id:-1}).limit(1);
    console.log("IDDDDD is",maxid[0].id);
    const pp= bcrypt.hashSync(value.signup_pass, 10);
    const user_info = new user_login({
      id:maxid[0].id +1 , 
      email:value.signup_email,
      password: pp,
      role: value.role,
      location: value.signup_location,
      name: value.signup_name
      });
      
      try {
        console.log("SAving------------")
          const saved_user = await user_info.save();
          if(value.role==1){
            const cust_prof=new cust_profile({id:maxid[0].id+1,
            dob:"",
            city:"",
            state:"",
            country:"",
            nickname:"",
            phone:"",
            profile_pic:"",
            about:""
          });
             await cust_prof.save();
          }
          else{
            const rest_prof=new rest_info({r_id:maxid[0].id+1,
              r_description:"",
              r_contact:"",
              r_timings:"",
              profile_pic:"",
              type:""

            });
             await rest_prof.save();
          }        
          
          res.status(200).json(saved_user);
      } catch (error) {
        console.log(error)
          res.status(400).json({"msg": error});
      }

  }
  else{
    res.status(403).send("Email Id already present.");
  }
 
});
*/

router.post('/signup',async (req,res)=>{
  kafka.make_request('sign_up',req.body,(error,result)=>{
    console.log("-------------------In result-----------------");
    console.log(result);
    

    if(error){
      console.log("------------Inside the error block----------");
      console.log(error);
      res.status(500).send("There were some error while performing the action");
    }
    else{
      console.log("---------------Inside the result------------");
      res.status(result.status).json(result.msg);
    }
  })
})


// To Login
router.post('/login',async (req,res)=>{
  kafka.make_request('login',req.body,(error,result)=>{
    console.log("-------------------In result-----------------");
    console.log(result);
    console.log(error);
    if(error){
     
      console.log(error);
      res.status(500).send("There were some error while performing the action");
    }
    else{

      if(result.status==200){
        result=result.msg;
        val={loginEmail:req.body.loginEmail}
        const accessToken= jwt.sign(val,secret_jwt_token);
        console.log("--------Isnide result-------",result)
        res.json({accessToken:accessToken, id:result.id, role:result.role, location:result.location, email:result.email});
        }else{
          res.status(500).send(result.msg);
        }
      
    }
  })
})




// // To login -/login
//  router.post('/login',(req,res)=>{
//   console.log(req.body);
//   let val=req.body;
//   let sql=`select password from user_login where email='${val.loginEmail}' `;
 
//   con.query(sql, function (err,result){
//     if(err)
//     {
//       res.status(500).send("There were some errors while performing the action");
//     }
//     else{
//       let upass=result;
//       if(upass.length==0)
//       {
//         res.status(403).send("Login Credentials are wrong. Please try again.");
//       }
      
//     else
//     {  
//     try{
        
//      if( bcrypt.compareSync(val.loginPassword, upass[0].password))
//       {
//         let sql2=`select id,role,email,location from user_login where email='${val.loginEmail}';`
        
//         con.query(sql2, function(err2,result2){
//           if(err2){   
            
//             res.status(500).send("There were some errors while performing the action");        
//           }

//           else
//           {
//             let id2=result2;
//             val={loginEmail:req.body.loginEmail}
//             const accessToken= jwt.sign(val,secret_jwt_token);
//             res.json({accessToken:accessToken, id:result2[0].id, role:result2[0].role, location:result2[0].location, email:result2[0].email});
//           }
           
//         }); 
        
//        // const jwt=require('jsonwebtoken');

//      }
//      else{
//        res.sendStatus(403).send("Login Credentials are wrong. Please try again.")
//      }
//     }
//     catch(error)
//     {
//       res.sendStatus(500).send("There were some errors while performing the action");
//     }
//   }
//     }
//   });
// });


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

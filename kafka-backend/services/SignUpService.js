//var mongo = require('./mongo');
const bcrypt=require('bcrypt');
const user_login=require('../Model/SignUpModel');
const cust_profile=require('../Model/CustomerModel');
const rest_info=require('../Model/RestModel')

async function handle_request(msg,callback)
{
  console.log("---------------------------------------------------------------", msg)
    const value=msg;
    const isPresent = await user_login.find({email:value.signup_email});
    console.log("In handle request inside ----------------:");
  
  if(isPresent.length ==0){
    console.log("---------------------------------------------------In length------------------------")
    const maxid = await user_login.find().sort({id:-1}).limit(1);
    console.log("--------------",maxid);
    console.log("IDDDDD is",maxid[0].id);
   // const pp=value.signup_pass;
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
          const saved_user =  user_info.save();
          if(value.role==1){
            const cust_prof=new cust_profile({id:maxid[0].id+1,
            dob:"",
            city:"",
            state:"",
            country:"",
            nickname:"",
            phone:"",
            profile_pic:"",
            about:"",
            

          });
              cust_prof.save();
          }
          else{
            const rest_prof=new rest_info({r_id:maxid[0].id+1,
              r_description:"",
              r_contact:"",
              r_timings:"",
              profile_pic:"",
              type:"",
              user_name:""

            });
              rest_prof.save();
          }        
          callback(null,{status:200,msg:saved_user});
          
        //  res.status(200).json(saved_user);
      } catch (error) {
        console.log(error)
        console.log("----------here-----------------");
        callback({status:400,msg:error},null);
          //res.status(400).json({"msg": error});
      }

  }
  else{
    callback(null,{status:403,msg:"Email ID already present"})
    //res.status(403).send("Email Id already present.");
  }
}
  exports.handle_request=handle_request
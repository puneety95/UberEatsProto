const bcrypt=require('bcrypt');
const user_login=require('../Model/SignUpModel');

async function handle_request(msg,callback)
{
  
    const value=msg;
    const isPresent = await user_login.find({email:value.loginEmail});
    
     console.log("-----------insdie mgs------------",msg);
  if(isPresent.length !=0){

    try{
        if( bcrypt.compareSync(value.loginPassword, isPresent[0].password))
        {         console.log("-----------login------------");        
                   
           callback(null,{status:200,msg:isPresent[0]});
        }
        else{
            callback(null,{status:403,msg:"Login Credentials are wrong. Please try again"});
          }

    }catch(error){
      console.log("-----------error------------",error);
        callback(null,{status:500,msg:"There were some errors while processing your request"});
    }
    
  }
  else{
     
      callback(null,{status:403,msg:"Login Credentials are wrong. Please try again"});
   
  }
}
  exports.handle_request=handle_request
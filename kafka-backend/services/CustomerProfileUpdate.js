const cust_profile=require("../Model/CustomerModel");
const user_login = require("../Model/SignUpModel");

async function handle_request(msg,callback)
{
   
       try{
        const value=msg;
      
        await cust_profile.updateOne({id:value.id},{
            dob:value.dob,
            city:value.city,
            state:value.state,
            country:value.country,
            phone:value.phone,
            nickname:value.nickname,
            about:value.about
        });
        await user_login.updateOne({id:value.id},{
            name:value.name,
            location:value.city,
            email:value.email
        })
        const result=await cust_profile.find({id:value.id},{location:1,_id:0})
       
        callback(null,{status:200,msg:result[0]});
        
       }catch(error){
           console.log("Inside Error",error);
           callback(null,{status:500,msg:"There were some error while performing this task."})
       }
     
}
  exports.handle_request=handle_request
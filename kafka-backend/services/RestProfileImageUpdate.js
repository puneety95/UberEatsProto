const user_login=require('../Model/SignUpModel');
const rest_info=require('../Model/RestModel');

async function handle_request(msg,callback)
{
       try{
        const value=msg;
        console.log("values iso ",value);
       // await user_login.updateOne({id:value.r_id},{name:value.name,location:value.location})
        await rest_info.updateOne({r_id:value.id},{profile_pic:value.imageUrl});
        callback(null,{status:200})
        
       }catch(error){
           console.log("Inside Error",error);
           callback(null,{status:500,msg:"There were some error while performing this task."})
       }
     
}
  exports.handle_request=handle_request
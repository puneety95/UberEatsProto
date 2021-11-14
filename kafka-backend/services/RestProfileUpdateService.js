const user_login=require('../Model/SignUpModel');
const rest_info=require('../Model/RestModel');

async function handle_request(msg,callback)
{
       try{
        const value=msg;
        console.log("values iso ",value);
        await user_login.updateOne({id:value.r_id},{name:value.name,location:value.location})
        await rest_info.updateOne({r_id:value.r_id},{r_contact:value.r_contact,r_description:value.r_description,r_timings:10,
    type:value.type});
        callback(null,{status:200})
        
       }catch(error){
           console.log("Inside Error",error);
           callback(null,{status:500,msg:"There were some error while performing this task."})
       }
     
}
  exports.handle_request=handle_request
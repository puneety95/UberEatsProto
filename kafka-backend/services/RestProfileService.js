const user_login=require('../Model/SignUpModel');
const rest_info=require('../Model/RestModel');

async function handle_request(msg,callback)
{
       try{
        const value=msg;
        
        const restName = await user_login.find({email:value.loginEmail},{name:1,id:1,location:1,_id:0});
        const restProf=await rest_info.find({r_id:restName[0].id},{_id:0});
       
        restProf[0].name=restName[0].name;
        restProf[0].idd=restName[0].id;
        restProf[0].location=restName[0].location;
        const restDetails={...restName[0]._doc,...restProf[0]._doc};
        callback(null,{status:200,msg:restDetails})
       }catch(error){
           console.log("Inside Error",error);
           callback(null,{status:500,msg:"There were some error while performing this task."})
       }
     
}
  exports.handle_request=handle_request
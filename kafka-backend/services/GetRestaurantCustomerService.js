const rest_info=require("../Model/RestModel");
const user_login = require("../Model/SignUpModel");
const dishes=require("../Model/DishesModel");


async function handle_request(msg,callback)
{
    // / let sql=`select r.profile_pic,u.name,r.r_description,r.r_contact,r.r_timings
    //,r.type,u.location from rest_info as r , user_login as u where u.id=r.r_id and r.r_id = '${req.query.id}';`;
  
       try{
        const value=msg;
       
        
       let rest_info= await rest.find({r_id:value.id},{});
       console.log("Values of the restaurant are",rest_info[0]);
       let user_login= await user.find({id:value.id},{password:0});
       console.log("Values of the restaurant user are",user_login[0]);
       const result={...rest_info[0]._doc,...user_login[0]._doc};
       console.log("Values of theresult is ",result);
       callback(null,{status:200,msg:result});
     
       }catch(error){
           console.log("Inside Error",error);
           callback(null,{status:500,msg:"There were some error while performing this task."})
       }
     
}
  exports.handle_request=handle_request
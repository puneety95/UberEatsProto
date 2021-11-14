const cust_profile=require("../Model/CustomerModel");
const cust_profile_name=require("../Model/SignUpModel");

async function handle_request(msg,callback)
{
   // let sql=`select a.id,a.about,u.name,a.profile_pic,u.email,a.state,a.country,a.dob,a.city,a.nickname,
   //a.phone from cust_profile as a, user_login as u where a.id=${req.query.id} and u.id=a.id;`;
       try{
        const value=msg;
        const user_info=await cust_profile.find({id:value.id});
        const user_info_name=await cust_profile_name.find({id:value.id},{password:0});
        const result={...user_info_name[0]._doc,...user_info[0]._doc};
        callback(null,{status:200,msg:result});
        
       }catch(error){
           
           callback(null,{status:500,msg:"There were some error while performing this task."})
       }
     
}
  exports.handle_request=handle_request
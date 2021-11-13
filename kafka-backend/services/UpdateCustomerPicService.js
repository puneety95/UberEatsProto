const cust=require('../Model/CustomerModel');

async function handle_request(msg,callback)
{   
       try{
        const value=msg;
        await cust.updateOne({id:value.id},
            {profile_pic : value.imageUrl}
            );
        callback(null,{status:200});
       }catch(error){
           console.log("Inside Error",error);
          
       }
     
}
  exports.handle_request=handle_request
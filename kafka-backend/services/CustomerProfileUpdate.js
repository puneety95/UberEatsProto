const cust_profile=require("../Model/CustomerModel");
const user_login = require("../Model/SignUpModel");

async function handle_request(msg,callback)
{
   // let sql=`update cust_profile set dob='${val.dob}' , city='${val.city}' , state='${val.state}' , 
   //country='${val.country}' , phone='${val.phone}'  ,nickname='${val.nickname}' ,
   //about='${val.about}' where id='${val.id}' ; `
  // sql=sql + `update user_login set name='${val.name}' ,  location='${val.city}' , email='${val.email}' 
  //where id='${val.id}' ; `
       try{
        const value=msg;
        console.log("values iso ",value);
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
       
        callback(null,{status:200,msg:"Customer Profile data is updated"});
        
       }catch(error){
           console.log("Inside Error",error);
           callback(null,{status:500,msg:"There were some error while performing this task."})
       }
     
}
  exports.handle_request=handle_request
const rest=require("../Model/RestModel");
const user = require("../Model/SignUpModel");
var _ = require('lodash');

async function handle_request(msg,callback)
{
    
  
       try{
        const value=msg;
        
       let rest_info= await rest.find({},{
            r_id:1,
            profile_pic:1
                });
        let id_array=[]


        rest_info.forEach(function(item){
            id_array.push(item.r_id);
          
        });

                
        let user_login= await user.find({id: {$in: id_array}},{password:0,location:0});
        
        var result = [];
        var len = user_login.length;
            for (var i = 0; i < len; i++) {
                result.push({
                 id:user_login[i]['id'],
                 r_id:rest_info[i]['r_id'],
                 email:user_login[i]['email'],
                 role:user_login[i]['role'],
                 name:user_login[i]['name'],
                 profile_pic:rest_info[i]['profile_pic']
                
                      });
                }
    

        callback(null,{status:200,msg:result});
        
       }catch(error){
           console.log("Inside Error",error);
           callback(null,{status:500,msg:"There were some error while performing this task."})
       }
     
}
  exports.handle_request=handle_request
const rest=require("../Model/RestModel");
const user = require("../Model/SignUpModel");
const dishes=require("../Model/DishesModel");
var _ = require('lodash');

async function handle_request(msg,callback)
{
    try{
       
        const value=msg;
        let t=value.type;
        let type_arr= [t,'Delivery'];
        const user_loc = await user.find({id:value.id});
       
                const rest_id = await user.find({role:2,location:{$ne : user_loc[0].location}},{id:1,_id:0});
                let rest_id_arr=[];
                for(let i=0;i<rest_id.length ; i++){
                    rest_id_arr.push(rest_id[i].id);
                }
                const rest_type_n_loc = await rest.find({r_id:{$in:rest_id_arr}, type:{$in:type_arr}}).
                populate({path:'pop_name',select:'name'}).exec();
               

                const rest_id2 = await user.find({role:2,location:user_loc[0].location},{id:1,_id:0});
                rest_id_arr=[];
                for(let i=0;i<rest_id2.length ; i++){
                    rest_id_arr.push(rest_id2[i].id);
                }
                const rest_type_loc = await rest.find({r_id:{$in:rest_id_arr}, type:{$in:type_arr}}).
                populate({path:'pop_name',select:'name'}).exec();

                const rest_id3 = await user.find({role:2,location:value.location},{id:1,_id:0});
                rest_id_arr=[];
                for(let i=0;i<rest_id3.length ; i++){
                    rest_id_arr.push(rest_id3[i].id);
                }
                const rest_type_loc_search = await rest.find({r_id:{$in:rest_id_arr}, type:{$in:type_arr}}).
                populate({path:'pop_name',select:'name'}).exec();

                let result=[...rest_type_loc_search,...rest_type_loc,...rest_type_n_loc];
                result=_.uniqBy(result, 'r_id');
                callback(null,{status:200,msg:result});
          
            
    }catch(error){
            console.log("-----------Inside Error-----------",error);
            callback(null,{status:500});

    }
  
       
}
  exports.handle_request=handle_request
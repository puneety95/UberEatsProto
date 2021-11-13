const fav = require("../Model/FavouriteModel");
const SignUpModel = require("../Model/SignUpModel.js");
const rest=require("../Model/RestModel.js");
const user=require("../Model/SignUpModel.js");


async function handle_request(msg,callback){
    
    const value=msg;
    console.log("---------------Inside The service",value);
    try{
       
        const fav_rest = await fav.find({cust_id:value.id});
        console.log("VAlues of the rest id",fav_rest);
        const fav_arr=[]
        for(let i=0;i< fav_rest.length;i++){
            fav_arr.push(fav_rest[i]['rest_id']);
        }
        
       
        const result=await rest.find({r_id: {$in: fav_arr}}).populate({path:'pop_name',select:'name'}).exec();
        //console.log(rest_det));
        callback(null,{status:200,msg:result});
     

    }catch(error){
        console.log("---------------Inside The service error",error);
        callback(null,{status:500})
    }

}
exports.handle_request=handle_request
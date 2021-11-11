const fav=require("../Model/FavouriteModel");

async function handle_request(msg,callback){
    const value= msg;
    try{

        if(value.check!=1){
            const fav_data= new fav({cust_id:value.uid , rest_id:value.id});
            await fav_data.save();
        }else{
            await fav.remove({cust_id:value.uid,rest_id:value.id});
        }
        
        callback(null,{status:200});
    }catch(error){
        callback(null,{status:500,msg:'There were some errors while performing the task'});
    }
    



}
exports.handle_request=handle_request;
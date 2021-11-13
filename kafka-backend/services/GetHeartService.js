const heart=require('../Model/FavouriteModel');

async function handle_request(msg,callback){
    try{
        const value=msg;
        const result=await heart.find({rest_id:value.id,cust_id:value.uid});
        callback(null,{status:200,msg:result});

    }catch(error){
        console.log("#error in get heart service-----",error);
        callback(error,{status:500});
    }
}
exports.handle_request=handle_request;
const orders=require("../Model/OrdersModel.js");
async function handle_request(msg,callback){
 
try{
    const value=msg;
    await orders.deleteOne({id:value.id});
    callback(null,{status:200});
}catch(error){
    console.log("---------------inside error----------------",error);
    callback({status:500},null);
}
   

}
exports.handle_request=handle_request;
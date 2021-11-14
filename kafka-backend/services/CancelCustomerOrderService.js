const orders=require("../Model/OrdersModel.js");
async function handle_request(msg,callback){
 
try{
    const value=msg;
    await orders.updateOne({id:value.id},{
        status:8,
        order_status:3,
    });
    callback(null,{status:200});
}catch(error){
     callback({status:500},null);
}
   

}
exports.handle_request=handle_request;
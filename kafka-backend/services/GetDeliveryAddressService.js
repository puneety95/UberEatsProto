const add=require("../Model/AddDeliveryModel.js");
async function handle_request(msg,callback){

try{
    //let sql=`select address from delivery_address where cust_id='${req.query.id}' ;`;
    const value=msg;
    const result= await add.find({cust_id:value.id});
    callback(null,{status:200,msg:result});
    
}catch(error){
    callback({status:500},null);
}
   

}
exports.handle_request=handle_request;
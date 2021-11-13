const customer=require("../Model/CustomerModel.js");
async function handle_request(msg,callback){
    const value= msg;
    console.log("----------------------------------------Get cust image-----------");
    try{
        const result=await customer.find({id:value.id},{profile_pic:1});
        console.log("Value of the customer profile link is --------------",result);
        callback(null,{status:200,msg:result});
    }catch(error){
        callback(null,{status:500,msg:'There were some errors while performing the task'});
    }
}
exports.handle_request=handle_request;
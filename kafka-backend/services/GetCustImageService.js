const user=require("../Model/SignUpModel");
const customer=require("../Model/CustomerModel.js");
async function handle_request(msg,callback){
    const value= msg;
    
    try{
        const pic=await customer.find({id:value.id},{profile_pic:1, _id:0});
        const name= await user.find({id:value.id},{name:1,_id:0})
        const result={...pic[0]._doc, ...name[0]._doc}
        callback(null,{status:200,msg:result});
    }catch(error){
        callback(null,{status:500,msg:'There were some errors while performing the task'});
    }
}
exports.handle_request=handle_request;
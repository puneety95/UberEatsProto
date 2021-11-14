const orders=require("../Model/OrdersModel.js");
async function handle_request(msg,callback){
 
try{
    const value=msg;
   
    let order_detail;
    if(value.status==7){
         order_detail = await orders.find({rest_id:value.id}).sort({date:'desc'});
            
    }else{
        order_detail = await orders.find({rest_id:value.id,order_status:value.status}).sort({date:'desc'});
       
    }
    callback(null,{status:200,msg:order_detail});
        
    
}catch(error){
    console.log("---------------inside error----------------",error);
    callback({status:500},null);
}
   

}
exports.handle_request=handle_request;
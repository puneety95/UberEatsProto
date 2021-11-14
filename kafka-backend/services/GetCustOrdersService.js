const orders=require("../Model/OrdersModel.js");
async function handle_request(msg,callback){
 
try{
    
    const value=msg;
    
    let order_detail;
    if(value.status==7){
         order_detail = await orders.find({cust_id:value.id}).sort({date:'desc'});
            
    }else{
      
        order_detail = await orders.find({cust_id:value.id,status:value.status}).sort({date:'desc'});
        
    }
    callback(null,{status:200,msg:order_detail});
        
    
}catch(error){
    c
    callback({status:500},null);
}
   

}
exports.handle_request=handle_request;
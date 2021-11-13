const orders=require("../Model/OrdersModel.js");
async function handle_request(msg,callback){
 
try{
    const value=msg;
    console.log("-----------------value-----------",value);
    let order_detail;
    if(value.status==7){
         order_detail = await orders.find({rest_id:value.id}).sort({date:'desc'});
            
    }else{
       console.log("------------------------here----------------");
        order_detail = await orders.find({rest_id:value.id,order_status:value.status}).sort({date:'desc'});
        console.log("VALues of the order deatls---------",order_detail)
    }
    callback(null,{status:200,msg:order_detail});
        
    
}catch(error){
    console.log("---------------inside error----------------",error);
    callback({status:500},null);
}
   

}
exports.handle_request=handle_request;
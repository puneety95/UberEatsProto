const orders=require("../Model/OrdersModel.js");
async function handle_request(msg,callback){
 
try{
    const value=msg.orderStatus2;
    console.log("-----------------value-----------",msg);
    let order_detail;
    if(value.status==4){
         await orders.updateOne({id:value.id},{
             status:4,
             order_status:2,

         });
            
    }else if(value.status==8){
        console.log("-------------------cancelled the order--------------------");
        await orders.updateOne({id:value.id},{
            status:8,
            order_status:3,
        });
    } else{
           await orders.updateOne({id:value.id},{
            status:value.status,
             });
    }
    callback(null,{status:200,msg:order_detail});
        
    
}catch(error){
    console.log("---------------inside error----------------",error);
    callback({status:500},null);
}
   

}
exports.handle_request=handle_request;
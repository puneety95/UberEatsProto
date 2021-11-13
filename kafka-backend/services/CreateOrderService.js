const orders=require("../Model/OrdersModel.js");
const users=require("../Model/SignUpModel");
const rest_info=require("../Model/RestModel");
const cust_info=require("../Model/CustomerModel");
async function handle_request(msg,callback){
  
try{
    const value=msg.order;
    const val2=msg.items;
    console.log("VALUES__________________________",value);
    console.log("VALUES of the items__________________________",val2);
    const maxid = await orders.count();
    const rest=await users.find({id:value.rest_id});
    const cust=await users.find({id:value.rest_id});
    const restP=await rest_info.find({r_id:value.rest_id});
    const custP=await cust_info.find({id:value.cust_id});
    console.log("VALUES of the maxID-----------",maxid);
    console.log("VALUES of the rest-----------",rest[0]);
    console.log("VALUES of the cust-----------",cust[0]);
    console.log("VALUES of the restProfile-----------",restP[0]);
    console.log("VALUES of the custProfile-----------",custP[0]);
    let values2 = []
    for (let i = 0; i < val2.length; i++) {
        values2.push({id:maxid+1, name:val2[i].name, quantity:val2[i].size,cost:val2[i].price});
     }
    const order_detail= new orders({
        id:maxid +1,
        cust_id:value.cust_id,
        rest_id:value.rest_id,
        date:value.time,
        status:1,
        mode:value.mode,
        address:value.address,
        order_status:1,
        rest_name:rest[0].name,
        cust_name:cust[0].name,
        cust_profile_pic:restP[0].profile_pic,
        rest_profile_pic:custP[0].profile_pic,
        order_item:values2
    });
    await order_detail.save();
    console.log("----------------Saving the data------------------------",order_detail);
    callback(null,{status:200});
    
}catch(error){
    console.log("_-------------------INside error---------------",error);
    callback({status:500},null);
}
   
}
exports.handle_request=handle_request;
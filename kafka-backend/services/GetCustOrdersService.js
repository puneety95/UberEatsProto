const orders=require("../Model/OrdersModel.js");
async function handle_request(msg,callback){
   //   if(req.query.status==7)
//   {
//      sql=`select o.* , i.* , r.profile_pic, u.name as rest_name 
// from user_login u,orders o, order_item i, 
//rest_info r where i.id=o.id and u.id=r.r_id and 
//r.r_id =o.rest_id and o.cust_id='${req.query.id}' order by DATE(o.date) desc;`;
//   }
//   else
//   {
//      sql=`select o.* , i.* ,r.profile_pic ,u.name as rest_name from user_login u, orders o, order_item i,rest_info r where i.id=o.id and u.id=r.r_id and r.r_id =o.rest_id and o.cust_id='${req.query.id}'and lower(o.status) =lower('${req.query.status}')  order by DATE(o.date) desc;`;
//   }
try{
    const value=msg;
    console.log("-----------------value-----------",value);
    let order_detail;
    if(value.status==7){
         order_detail = await orders.find({cust_id:value.id}).sort({date:'desc'}).exec(function(err,docs){
             console.log("--------------Inside first find---------",docs);
            callback(null,{status:200,msg:docs});
         });
    }else{
        console.log("--------------Inside second find---------",docs);
        order_detail = await orders.find({cust_id:value.id,status:value.status}).sort({date:'desc'}).exec(function(err,docs){
            callback(null,{status:200,msg:docs});
         });
    }
    
}catch(error){
    console.log("---------------inside error----------------",error);
    callback({status:500},null);
}
   

}
exports.handle_request=handle_request;
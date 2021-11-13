const add_del=require('../Model/AddDeliveryModel.js');

async function handle_request(msg,callback)
{   
    //let sql=`insert into delivery_address values ('${req.body.id}' , '${req.body.address}') ;`
       try{
        const value=msg;
        const add_value=new add_del({
            cust_id:value.id,
            address:value.address
        });
        await add_value.save();
        callback(null,{status:200});
       }catch(error){
           console.log("Inside Error",error);
           callback(null,{status:500});
       }
     
}
  exports.handle_request=handle_request
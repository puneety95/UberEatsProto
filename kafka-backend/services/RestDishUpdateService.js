const dish_update=require('../Model/DishesModel');
//const rest_info=require('../Model/RestModel');

async function handle_request(msg,callback)
{
    //let sql= `update dishes set name ='${val.name}' , ingredients='${val.ingredients}' , price='${val.price}' 
    //, description='${val.description}' where id='${val.id}' and rest_id='${val.rest_id}';`
       try{
        const value=msg;
        console.log("values iso ",value);
        await dish_update.updateOne({id:value.id,rest_id:value.rest_id},{
            name:value.name,
            ingredients:value.ingredients,
            price:value.price,
            description:value.description
        });
        callback(null,{status:200})
        
       }catch(error){
           console.log("Inside Error",error);
           callback(null,{status:500,msg:"There were some error while performing this task."})
       }
     
}
  exports.handle_request=handle_request
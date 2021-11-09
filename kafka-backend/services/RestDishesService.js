const rest_dish=require('../Model/DishesModel');

async function handle_request(msg,callback)
{   
  const value=msg;
   try{
    const dishes = await rest_dish.find({rest_id:value.id});
    callback(null,{status:200,msg:dishes})
     }catch(error){
       callback(null,{status:500,msg:'There were some errors while performing this task'});
  }
}
  exports.handle_request=handle_request
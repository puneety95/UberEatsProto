const category=require('../Model/CategoryModel.js');
const dish=require('../Model/DishesModel.js');

async function handle_request(msg,callback)
{   
       try{
        const value=msg;
        let filter=value.filter;
        if(filter.length==0)
        {      
            filter=['veg','nonveg','vegan'];
        }else{
            filter=filter.split(',');
        }
        const result=await dish.find({rest_id:value.id});
        callback(null,{status:200,msg:result});

       }catch(error){
           
           callback(null,{status:500});
       }
     
}
  exports.handle_request=handle_request
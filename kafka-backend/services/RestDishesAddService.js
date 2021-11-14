//const images_model=require('../Model/ImagesModel');
const dish_add=require('../Model/DishesModel');

async function handle_request(msg,callback)
{
    const value=msg;
    
       try{
       // sql=`insert into dishes (rest_id,name,ingredients,images,price,description,cat,filter)
       // values('${value.id}','${value.name}','${value.ingredients}','${req.body.imageUrl}',
       //'${value.price}','${value.description}','${value.category}','${value.type}');`;
           //await dis
           const len=await dish_add.find();
         
           const dish_details = new dish_add({
            id:len.length+1,
            rest_id:value.id,
            name:value.name,
            ingredients:value.ingredients,
            images:value.imageUrl,
            price:value.price,
            description:value.description,
            cat:value.category,
            filter:value.type
            });
            const saved_dish = await dish_details.save();
            callback(null,{status:200,msg:"Dish was added successfully"});
        
       }catch(error){
           console.log("Inside Error",error);
           callback(null,{status:500,msg:"There were some error while performing this task."})
       }
     
}
  exports.handle_request=handle_request
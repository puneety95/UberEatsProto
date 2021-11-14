const rest_info=require("../Model/RestModel");
const user_login = require("../Model/SignUpModel");
const dishes=require("../Model/DishesModel");
var _ = require('lodash');

async function handle_request(msg,callback)
{
    
  
       try{
       const value=msg;
        
    //    let rest_info= await rest.find({},{
    //         r_id:1,
    //         profile_pic:1
    //             });
    //     let id_array=[]


    //     rest_info.forEach(function(item){
    //         id_array.push(item.r_id);
          
    //     });

                
    //     let user_login= await user.find({id: {$in: id_array}},{password:0,location:0});
        
    //     var result = [];
    //     var len = user_login.length;
    //         for (var i = 0; i < len; i++) {
    //             result.push({
    //              id:user_login[i]['id'],
    //              r_id:rest_info[i]['r_id'],
    //              email:user_login[i]['email'],
    //              role:user_login[i]['role'],
    //              name:user_login[i]['name'],
    //              profile_pic:rest_info[i]['profile_pic']
                
    //                   });
    //             }
    console.log("-----------------------------isnide finding rest--------------------------");
    const u_loc = await user_login.findOne({ id: value.id }, { location: 1, _id: 0 });
    console.log("--------------------VAues of the lication is ",u_loc);
    const rest_ids = await user_login.find(
      { $and: [
      {location: { $ne: u_loc.location }},
      { role: 2 },
    //   { name: new RegExp(search, 'i') }
      ]},
         { id: 1, _id: 0 }
     );
     console.log("-----------------------------############# id not in location--------------------------",value.filter);
    
       let filter  = value.filter.split(',');
    
      if(filter.length<3){
          filter=['veg','nonveg','vegan'];
      }
    console.log("--------------filters are----------------",filter);


  const dish_rest_ids = await dishes.find({ filter }, { rest_id: 1, _id: 0 });
  let type_rest="'"+value.type+"'";
  console.log("------------------------values of dish_rest_id",dish_rest_ids);
  let i = _.intersection(rest_ids.id, dish_rest_ids.rest_id);
  console.log(i);

  const restaurants = await rest_info.find({
      $and: [
          {r_id: { $in: _.intersection(rest_ids.id, dish_rest_ids.rest_id) }},
              {type: {
                  $in: [type_rest, 'Delivery']
                  }}
              ]
          }).populate({path:'pop_name',select:'name'}).exec();
      console.log("-------------------------REst--------------",restaurants);
      callback(null,{status:200,msg:restaurants})

       // callback(null,{status:200,msg:result});
        
       }catch(error){
           console.log("Inside Error",error);
           callback(null,{status:500,msg:"There were some error while performing this task."})
       }
     
}
  exports.handle_request=handle_request
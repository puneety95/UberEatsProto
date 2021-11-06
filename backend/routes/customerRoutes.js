const jwt=require('jsonwebtoken');
const express=require('express');
const customerRouter=express.Router();
const con=require('../SQL_Connection.js');
//const con_mongo=require('../mongoose_connection');
var _ = require('lodash');
const { commit, getMaxListeners } = require('../SQL_Connection.js');
const { groupBy } = require('lodash');
let secret_jwt_token='4405fdad7ce0e57621bd4e62b6c39ff91e72d16253238917ea9c844fc60245c6a299576c85c1b553849f7ccdf0ab29372e12b18cdda2cd8842480ce3e124e6be';


function authenticateToken(req,res,next)
{
  const authHeader =req.headers.authorization;
 
  const token =authHeader.split(' ')[1];
  
  if(token==null)
  {
    res.sendStatus(401);
  }
  jwt.verify(token,secret_jwt_token,(err,user)=>{
    if(err)
      {
       
        res.sendStatus(403);
      }
      
    req.user=user;
    
    next();

  })
}

//To get Customer Profile -> /Profile
customerRouter.get('/getCustProfile',authenticateToken,(req,res)=>{
    let sql=`select a.id,a.about,u.name,a.profile_pic,u.email,a.state,a.country,a.dob,a.city,a.nickname,a.phone from cust_profile as a, user_login as u where a.id=${req.query.id} and u.id=a.id;`;
    
    con.query(sql,function(err,result){
      if(err)
      {
        console.log(err);
        res.sendStatus(500);
      }
      else{
               
        res.send(result);
      }
    })
})


//To update customer profile CustProfileUpdate
customerRouter.post('/CustProfileUpdate',authenticateToken,(req,res)=>{
  console.log(req.body);
  let check=`select email from user_login where email='${req.body.email}';`;
  con.query(check,(error,result)=>{
    if(error)
    {
      res.sendStatus(500)
    }
    else
    {
      //console.log("---",result[0].email);
      console.log(result)
        if(result.length>0)
        {
         let test=result[0].email;
         let test2=req.body.email;
         console.log(test);
         console.log(test2);
          if(test != test2)
       //  if(5 != 3) 
         {
            console.log("HERERER");
           res.sendStatus(403);
          }

          else
        {
          let val=req.body;
          let sql=`update cust_profile set dob='${val.dob}' , city='${val.city}' , state='${val.state}' , country='${val.country}' , phone='${val.phone}'  ,nickname='${val.nickname}' ,about='${val.about}' where id='${val.id}' ; `
          sql=sql + `update user_login set name='${val.name}' ,  location='${val.city}' , email='${val.email}' where id='${val.id}' ; `
          console.log(sql);
          con.query(sql,function(err,result){
          if(err)       
            {
            
            if(err.errno == 1062)
            {
              res.sendStatus(403);
            }
            else{
              
              res.sendStatus(500);
            }
           
            }
          else{
               res.send(result);
              }       
            })

        }


        }
        else
        {
          let val=req.body;
          let sql=`update cust_profile set dob='${val.dob}' , city='${val.city}' , state='${val.state}' , country='${val.country}' , phone='${val.phone}'  ,nickname='${val.nickname}' ,about='${val.about}' where id='${val.id}' ; `
          sql=sql + `update user_login set name='${val.name}' , location='${val.city}', email='${val.email}' where id='${val.id}' ; `
          console.log(sql);
          con.query(sql,function(err,result){
          if(err)       
            {
            console.log(err);
            res.sendStatus(500);
            }
          else{
               res.send(result);
              }       
            })

        }

    }

  })





  
})


//to get restaurant at home page
customerRouter.get('/getRestaurant',authenticateToken,(req,res)=>{
  console.log("-------------------------------",req.query);
 
let sql=`select r.r_id,r.profile_pic,u.name from rest_info as r ,user_login as u where u.location not in (select location from user_login where id='${req.query.id}') and u.id=r.r_id and r.type in ('${req.query.type}','Delivery')`;

let search="";

if((req.query.search)!="undefined")
{
   search=req.query.search
}

 let filter=req.query.filter;
 if(filter.length==0)
 {
   filter="'veg','nonveg','vegan'";
 }
 
filter="(" + filter +")";
sql=sql + ` and r.r_id  in (select rest_id from dishes where filter in ${filter} )`
sql = sql + ` and  (u.name like '%${search}%' or r.r_id  in (select rest_id from dishes where name like '%${search}%' ));`
console.log("Value 111111 is---->",sql);
con.query(sql,(error,result)=>{
  if(error)
  {
    res.sendStatus(500);
  }
  else
  {
    let sql=`select r.r_id,r.profile_pic,u.name from rest_info as r ,user_login as u where u.location=(select location from user_login where id='${req.query.id}') and r.type in ('${req.query.type}' , 'Delivery') and u.id=r.r_id `;
    sql=sql + ` and r.r_id   in (select rest_id from dishes where filter in ${filter})`
    sql = sql + ` and  (u.name like '%${search}%' or r.r_id  in (select rest_id from dishes where name like '%${search}%' ));`
    console.log("query22222222 is------------------------ >", sql);
   
    con.query(sql,(error2,result2)=>{
      if(error2)
      {
        
        res.sendStatus(500);
      }
      else{
        
        let sql=`select r.r_id,r.profile_pic,u.name from rest_info as r ,user_login as u where u.location='${req.query.location}' and r.type in ('${req.query.type}','Delivery') and u.id=r.r_id `;
        sql=sql + ` and r.r_id   in (select rest_id from dishes where filter in ${filter})`
        sql = sql + ` and  (u.name like '%${search}%' or r.r_id  in (select rest_id from dishes where name like '%${search}%' ));`
        console.log("quer333------------------------------>",sql)
        con.query(sql,(err,result3)=>{
            if(err)
            {
              console.log(error);
              res.send(500)
            }
            else{
             // console.log("REsult is -->",result)
              let d=[...result3,...result2, ...result];
              d=_.uniqBy(d, 'r_id');
              console.log("uniqueee---------->,",d);
              res.send(d);
            }

        })
       
      }
    })
  }
})

})



//TO get selected restaurant details - Dashboard
customerRouter.get('/getRestaurantCustomer',authenticateToken,(req,res)=>{
  console.log("Get restuarant details----------------------------------");


  let sql=`select r.profile_pic,u.name,r.r_description,r.r_contact,r.r_timings,r.type,u.location from rest_info as r , user_login as u where u.id=r.r_id and r.r_id = '${req.query.id}';`;
 // sql=sql + ` and r.r_id in (select rest_id from dishes where rest_id='${req.query.id}' and filter in ${filter});`  
  console.log('ppppppp',sql);
  con.query(sql,(error,result)=>{
    if(error)
    {
      console.log(error);
      res.sendStatus(500);
    }
    else{
      console.log("Puneet-----",result);
      res.send(result);
    }
  })

})


customerRouter.post('/addfavourite',authenticateToken,(req,res)=>{
  console.log("inside favouritessss");
  let val=req.body;
  let sql;
  if(val.check==1)
  {
    sql=`delete from favourites where rest_id='${val.id}' and cust_id='${val.uid}';`;
  }
  else{
    sql=`Insert into favourites values ('${val.id}' ,'${val.uid}');`;
  }
  console.log(sql);
  con.query(sql,(error,result)=>{
    if(error)
    {
     console.log(error);
      res.sendStatus(500);
    }
    else{
      console.log("Success");
      res.sendStatus(200);
    }
  })
})


customerRouter.get('/getFavourites',authenticateToken,(req,res)=>{
  console.log("Iside get favourites-----------");
  
  let sql=`select r.r_id , r.profile_pic , u.name from rest_info as r, user_login as u where u.id=r.r_id and  r.r_id in (select rest_id from favourites where cust_id='${req.query.id}');`;
  console.log(sql);
  con.query(sql ,(error,result)=>{
      if(error)
      {
        console.log(error);
        res.sendStatus(500);
      }
      else
      {
        console.log("Success",result);
        res.send(result);
      }
  })

})

customerRouter.post('/updateCustomerProfilePic',authenticateToken,(req,res)=>{
  console.log("Inside customer Profile Pic upload");
  let sql = `Update cust_profile set profile_pic='${req.body.imageUrl}' where id='${req.body.id}'; `
  console.log(sql);
  con.query(sql,(error,result)=>{
    if(error)
    {
      res.sendStatus(500);
    }
    else
    {
      res.send(200);
    }
  })
});

//To add delivery addrees - Checkout
customerRouter.post('/addDeliveryAddress',authenticateToken,(req,res)=>{
  let sql=`insert into delivery_address values ('${req.body.id}' , '${req.body.address}') ;`
  con.query(sql,(error,result)=>{
    if(error)
    {
      console.log(error);
      res.sendStatus(500);
    }
    else
    {
      res.sendStatus(200);
    }
  })
})

//To get delivery addrees - Checkout
customerRouter.get('/getDeliveryAddress',authenticateToken,(req,res)=>{
  console.log("Inside=--------------");
  let sql=`select address from delivery_address where cust_id='${req.query.id}' ;`;
  console.log(sql);
  con.query(sql,(error,result)=>{
    if(error)
    {
      console.log(error);
      res.sendStatus(500);
    }
    else
    {
      console.log("HERERERERER____",result);
      
      res.send(result);
    }
  })
})
//To create order - checkout
customerRouter.post('/createOrder',authenticateToken,(req,res)=>{
 
  let val=req.body.order;
  let val2=req.body.items;
  let sql=`insert into orders values('0','${val.cust_id}','${val.rest_id}','${val.time}','1','${val.mode}','${val.del_add}','1');`;
  
  con.query(sql,(error,result)=>{
    if(error)
    {
      console.log(error);
      res.sendStatus(500);
    }
    else{

        let sql=`select max(id) as maxID   from orders;`
        con.query(sql,(err,result2)=>{
          if(err) res.sendStatus(500)
          else
          {
            
            let sql=`insert into order_item values?`
             let values = [];
            for (let i = 0; i < val2.length; i++) {
            values.push([result2[0].maxID, val2[i].name, val2[i].size,val2[i].price])
                  }
            console.log("Query is ===>",sql);
            con.query(sql, [values], (err, result3) => {
              if (err)
                {
                  console.log(err);
                  } 
              else
                {
                console.log("rows affected " + result3.affectedRows);
                res.sendStatus(200);
                }        
          });
          }
        })
    }
  })
})

//To get customer order data
customerRouter.get('/getCustOrders',authenticateToken,(req,res)=>{
  console.log("STATUS_______",req.query);
  let sql;
  if(req.query.status==7)
  {
     sql=`select o.* , i.* , r.profile_pic, u.name as rest_name  from user_login u,orders o, order_item i, rest_info r where i.id=o.id and u.id=r.r_id and r.r_id =o.rest_id and o.cust_id='${req.query.id}' order by DATE(o.date) desc;`;
  }
  else
  {
     sql=`select o.* , i.* ,r.profile_pic ,u.name as rest_name from user_login u, orders o, order_item i,rest_info r where i.id=o.id and u.id=r.r_id and r.r_id =o.rest_id and o.cust_id='${req.query.id}'and lower(o.status) =lower('${req.query.status}')  order by DATE(o.date) desc;`;
  }
  
 
  con.query(sql,(error,result)=>{
     if(error)
     {
       
       res.sendStatus(500);
     }
     else
     {
       result2= _.groupBy(result,'id');
     
       res.send(result2);
     }
  })
})


customerRouter.get('/getDishes2',authenticateToken,(req,res)=>{
  console.log("FILTERS");
  let filter=req.query.filter;
  console.log(filter);
  console.log("Filter up");
   if(filter.length==0)
 {
   filter="'veg','nonveg','vegan'";
 }
 
filter="(" + filter +")";
  let sql=`select d.id,d.rest_id,d.name,d.ingredients,d.price,d.description,d.cat,c.type,d.images from dishes d, category c where`;
  sql=sql+` d.cat=c.id and  rest_id='${req.query.id}' and filter in ${filter};`
  console.log(sql);
  con.query(sql,(error,result)=>{
    if(error){
      console.log(error);
      res.sendStatus(500);
    }
    else{
      console.log("Success");
      res.send(result);
    }
  })

})

customerRouter.get('/getHeart',authenticateToken,(req,res)=>{
  let sql=`select * from favourites where rest_id = '${req.query.id}' and cust_id='${req.query.uid}' ;`;
  console.log("favoirut",sql);
  con.query(sql,(err,result)=>{
    if(result)
    {
      console.log(result);
      res.send(result);
      
    }
  })
})

customerRouter.get('/getCustImage',authenticateToken,(req,res)=>{
  let sql=`select c.profile_pic, u.name from cust_profile c , user_login u where c.id='${req.query.id}' and c.id=u.id;`
  con.query(sql,(err,result)=>{
     if(err)
     {
       console.log(err);
       res.sendStatus(500);
     }
     else
     {
       res.send(result);
     }
  })
})

module.exports=customerRouter;
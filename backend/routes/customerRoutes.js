const jwt=require('jsonwebtoken');
const express=require('express');
const customerRouter=express.Router();
const con=require('../SQL_Connection.js');
const { commit, getMaxListeners } = require('../SQL_Connection.js');
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
  let val=req.body;
  let sql=`update cust_profile set dob='${val.dob}' , city='${val.city}' , state='${val.state}' , country='${val.country}' , phone='${val.nickname}' ,  state='${val.phone}' ,nickname='${val.nickname}' ,about='${val.about}' where id='${val.id}' ; `
   sql=sql + `update user_login set name='${val.name}' where id='${val.id}' ; `
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
})


//to get restaurant at home page
customerRouter.get('/getRestaurant',(req,res)=>{
let sql=`select r.r_id,r.profile_pic,u.name from rest_info as r ,user_login as u where u.location not in (select location from user_login where id='${req.query.id}') and u.id=r.r_id and r.type='${req.query.type}'`;

let search=""
if(!(req.query.search))
{
  search=req.query.search
}
 let filter=req.query.filter;
 if(filter.length==0)
 {
   filter="'veg','nonveg','vegan'";
 }
 
filter="(" + filter +")";
sql=sql + `and u.name like '%${search}%' and r.r_id  in (select rest_id from dishes where filter in ${filter} and name like '%${search}%' );`
console.log("Value is---->",sql);
con.query(sql,(error,result)=>{
  if(error)
  {
    res.sendStatus(500);
  }
  else
  {
    let sql=`select r.r_id,r.profile_pic,u.name from rest_info as r ,user_login as u where u.location=(select location from user_login where id='${req.query.id}') and r.type='${req.query.type}' and u.id=r.r_id `;
    sql=sql + `and u.name like '%${search}%' and r.r_id   in (select rest_id from dishes where filter in ${filter} and name like '%${search}%' );`
    console.log("query is ", sql);
   
    con.query(sql,(error2,result2)=>{
      if(error2)
      {
        
        res.sendStatus(500);
      }
      else{
        
        console.log("-------------",result);
        
        let d=[...result2, ...result];
        console.log(d);
        res.send(d);
      }
    })
  }
})

})



//TO get selected restaurant details - Dashboard
customerRouter.get('/getRestaurantCustomer',(req,res)=>{
  console.log("Get restuarant details----------------------------------");
  
  let sql=`select r.profile_pic,u.name,r.r_description,r.r_contact,r.r_timings,r.type,u.location from rest_info as r , user_login as u where u.id=r.r_id and r.r_id = '${req.query.id}';`;  
  
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


customerRouter.post('/addfavourite',(req,res)=>{
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


customerRouter.get('/getFavourites',(req,res)=>{
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

customerRouter.post('/updateCustomerProfilePic',(req,res)=>{
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
customerRouter.post('/createOrder',(req,res)=>{
 
  let val=req.body.order;
  let val2=req.body.items;
  let sql=`insert into orders values('0','${val.cust_id}','${val.rest_id}','${val.time}','1','${val.mode}','${val.del_add}');`;
  
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
            values.push([result2[0].maxID, val2[i].name, val2[i].quantity,val2[i].price])
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
customerRouter.get('/getCustOrders',(req,res)=>{
  console.log("YESESESEESSEESSEES=-------");
  let sql;
  if(req.query.status==7)
  {
     sql=`select o.* , i.* from orders o, order_item i where i.id=o.id and o.cust_id='${req.query.id}';`;
  }
  else
  {
     sql=`select o.* , i.* from orders o, order_item i where i.id=o.id and o.cust_id='${req.query.id}'and o.status ='${req.query.status}';`;
  }
  
  console.log("----------->",sql);
  con.query(sql,(error,result)=>{
     if(error)
     {
       
       res.sendStatus(500);
     }
     else
     {
       console.log("Results--->",result);
       res.send(result);
     }
  })
})

module.exports=customerRouter;
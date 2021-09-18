const express =require('express');
const router=express.Router();

router.get('/profile',(req,res)=>{
 let name="puneet";
 res.send(name);
});

router.post('/signup',(req,res)=>{
    console.log(req);
    let name={"puneet":1};
    res.send(JSON.stringify(name));
   });
module.exports=router;
const e = require('express');
const jwt=require('jsonwebtoken');
const express =require('express');
const imageRouter=express.Router();
const con=require('../SQL_Connection.js')
const bcrypt=require('bcrypt');
const multer=require('multer');
const { application } = require('express');
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

//Storage Engine
const storage= multer.diskStorage({
    destination :'../images/',
    filename: function(req,file,cb)
    {
        cb(null,file.fieldname +'-'+Date.now()+Path2D.extname(file.originalname));
    }
});

const upload=multer(
    {storage:storage,
     fileFilter: function(req,file,cb)
     {
         checkFileType(file,cb)
     }
    }
).single('uploadImage');

imageRouter.post('/uploadImage',authenticateToken,(req,res)=>{
    console.log(" REquest body-" +req.file);
    upload(req,res,(err)=>{
        if(err)
        {
            console.log(err)
        }
        else{
            console.log(req.file);
        }
    })
})

module.exports=imageRouter;
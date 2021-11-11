//import mongoose from "mongoose";
const mongoose =require("mongoose");

const favouriteSchema = mongoose.Schema({
    rest_id:{
        type: Number ,
        required : true
       },
    
    cust_id: {
        type: String,
        required: true
    },
   
});

module.exports=mongoose.model('favourite', favouriteSchema);

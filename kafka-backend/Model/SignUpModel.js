//import mongoose from "mongoose";
const mongoose =require("mongoose");
console.log("---------------------------------")
const userloginSchema = mongoose.Schema({
    id:{
        type: Number ,
        required : true
       },
    
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Number ,
        required : true
    },
    location: {
        type: String,
    },
    name: {
        type: String
    }
});

module.exports=mongoose.model('user_login', userloginSchema);
//export default mongoose.model('user_login', userloginSchema);
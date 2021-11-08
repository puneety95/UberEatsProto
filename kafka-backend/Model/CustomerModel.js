const mongoose =require("mongoose");

const customerSchema = mongoose.Schema({
    id:{
        type: Number ,
        required : true
       },
    
    dob: {
        type: String
        
    },
    city: {
        type: String
    
    },
    state: {
        type: Number
    },
    country: {
        type: String
    },
    nickname: {
        type: String
    },
    phone: {
        type: String
    },
    profile_pic: {
        type: String
    },
    about: {
        type: String
    }
});

module.exports=mongoose.model('cust_profile', customerSchema);

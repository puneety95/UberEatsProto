const mongoose =require("mongoose");

const restSchema = mongoose.Schema({
    r_id:{
        type: Number
        
       },
    
    r_description: {
        type: String
        
    },
    r_contact: {
        type: String
    
    },
    r_timings: {
        type: Number 
    },
    profile_pic: {
        type: String
    },
    type: {
        type: String
    }
    
});

module.exports=mongoose.model('rest_info', restSchema);

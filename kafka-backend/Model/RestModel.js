const mongoose =require("mongoose");


const restSchema = mongoose.Schema({
    r_id:{
        
        type: Number,
                       
       },
    
    r_description: {
        type: String
        
    },
    r_contact: {
        type: String
    
    },
    r_timings: {
        type: String 
    },
    profile_pic: {
        type: String
    },
    type: {
        type: String
    },
    
   
    
       
    
    
},
{
    timestamps: false,
    collection: "rest_info",
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

restSchema.virtual("pop_name", {
    ref: "user_login",
    localField: "r_id",
    foreignField: "id",
  });
  
module.exports=mongoose.model('rest_info', restSchema);

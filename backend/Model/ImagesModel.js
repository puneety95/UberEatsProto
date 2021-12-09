const mongoose =require("mongoose");

const imagesSchema = mongoose.Schema({
    id:{
        type: Number        
       },
    
    url: {
        type: String        
    }   
    
});

module.exports=mongoose.model('images', imagesSchema );

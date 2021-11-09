const mongoose =require("mongoose");

const categorySchema = mongoose.Schema({
    id:{
        type: Number ,
        required : true
       },
    
    type: {
        type: String
    }
});

module.exports=mongoose.model('category', categorySchema);

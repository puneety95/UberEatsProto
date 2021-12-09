const mongoose =require("mongoose");
const dishesSchema = mongoose.Schema({
    id:{
        type: Number,
        required:true
       },
    
    rest_id: {
        type: Number
        
    },
    name: {
        type: String
    
    },
    ingredients: {
        type: String 
    },
    images: {
        type: String
    },
    price: {
        type: String
    },
    description: {
        type: String
    },
    cat: {
        type: Number
    },
    filter: {
        type: String
    }
});

module.exports=mongoose.model('dishes', dishesSchema);

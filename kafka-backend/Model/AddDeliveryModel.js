const mongoose =require("mongoose");

const addDeliverySchema = mongoose.Schema({
    cust_id:{
        type: Number ,
            },
    address: {
        type: String
    }
});

module.exports=mongoose.model('delivery_address', addDeliverySchema);

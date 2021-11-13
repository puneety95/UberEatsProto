const { StreamingQuerystring } = require("formidable");
const mongoose =require("mongoose");
require('mongoose-double')(mongoose);
const OrdersSchema = mongoose.Schema({
    id:{
        type: Number ,
        required : true
       },
    cust_id:{
        type:Number
    },
    rest_id:{
        type:Number
    },
    status:{
        type:Number
    },
    rest_name:{
        type:String
    },
    cust_name:{
        type:String
    },
    mode:{
        type:String
    },
    cust_profile_pic:{
        type:String
    },
    rest_profile_pic:{
        type:String
    },
    address:{
        type:String
    },
    order_status:{
        type:Number
    },
    order_item:[{
        id:Number,
        name:String,
        quantity:Number,
        cost:String
    }],
    date:{
        type:Date
    },
    instruction:{
        type:String
    }

});

module.exports=mongoose.model('orders', OrdersSchema);

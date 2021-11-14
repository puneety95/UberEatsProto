const mongoose=require('mongoose');
//const express = require('express');



mongoose.connect('mongodb+srv://UberEatsUser:Sputnik12@ubereats.atuet.mongodb.net/UberEats?retryWrites=true&w=majority',()=>{
    console.log('Connected to Mongo Database');
});
var connection =  new require('./kafka/Connection');
//topics files
//var signin = require('./services/signin.js');
var SignUp = require('./services/SignUpService.js');
var LoginIn = require('./services/LoginService.js');
var RestProfile = require('./services/RestProfileService.js');
var RestProfileUpdate = require('./services/RestProfileUpdateService.js');
var RestProfileImageUpdate = require('./services/RestProfileImageUpdate.js');
var RestDishes=require('./services/RestDishesService');
var RestDishesAdd=require('./services/RestDishesAddService.js');
var UpdateRestDishes=require('./services/RestDishUpdateService.js');
var CustomerProfile=require('./services/CustomerProfile.js');
var CustomerProfileUpdate=require('./services/CustomerProfileUpdate.js');
var GetRestaurant=require('./services/GetRestaurantService');
var GetRestaurantCustomer=require('./services/GetRestaurantCustomerService');
var AddFavourite=require('./services/AddFavouriteService.js');
var GetFavourite=require('./services/GetFavouriteService.js');
var UpdateCustomerPic=require('./services/UpdateCustomerPicService.js');
var AddDeliveryAdress=require('./services/AddDeliveryAdressService.js');
var GetDishes2=require('./services/GetDishes2Service.js');
var GetHeart=require('./services/GetHeartService.js');
var GetCustImage=require('./services/GetCustImageService.js');
var GetCustOrders=require('./services/GetCustOrdersService.js');
var CreateOrder=require('./services/CreateOrderService.js');
var GetDeliveryAddressService=require('./services/GetDeliveryAddressService.js');
var GetRestOrders=require('./services/GetRestOrdersService.js');
var UpdateOrderStatus=require('./services/UpdateOrderStatusService.js');
var CancelCustomerOrder=require('./services/CancelCustomerOrderService.js');
const router = require('../backend/routes/handler.js');




function handleTopicRequest(topic_name,fname){
    //var topic_name = 'root_topic';
    console.log(topic_name);
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name +" ", fname);
        console.log(JSON.stringify(message.value));
        console.log("---------------------------------------------------------------printing value------------------");
        console.log(message);
        var data = JSON.parse(message.value);
        //console.log(fname);
        fname.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
        
    });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
handleTopicRequest("sign_up",SignUp);
handleTopicRequest("login",LoginIn);
handleTopicRequest("rest_profile",RestProfile);
handleTopicRequest("rest_profile_update",RestProfileUpdate);
handleTopicRequest("rest_profile_image_update",RestProfileImageUpdate);
handleTopicRequest("get_dishes",RestDishes);
handleTopicRequest("rest_dishes_add",RestDishesAdd);
handleTopicRequest("update_dish",UpdateRestDishes);
handleTopicRequest("cust_profile",CustomerProfile);
handleTopicRequest("cust_profile_update",CustomerProfileUpdate);
handleTopicRequest("get_restaurant",GetRestaurant);
handleTopicRequest("get_restaurant_customer",GetRestaurantCustomer);
handleTopicRequest("add_favourite",AddFavourite);
handleTopicRequest("get_favourite",GetFavourite);
handleTopicRequest("update_customer_profile_pic",UpdateCustomerPic);
handleTopicRequest("add_delivery_address",AddDeliveryAdress);
handleTopicRequest("get_dishes2",GetDishes2);
handleTopicRequest("get_heart",GetHeart);
handleTopicRequest("get_cust_image",GetCustImage);
handleTopicRequest("get_cust_orders",GetCustOrders);
handleTopicRequest("create_order",CreateOrder);
handleTopicRequest("get_delivery_address",GetDeliveryAddressService);
handleTopicRequest("get_rest_orders",GetRestOrders);
handleTopicRequest("update_order_status",UpdateOrderStatus);
handleTopicRequest("cancel_customer_order",CancelCustomerOrder);
//handleTopicRequest("rest_dishes_add",RestDishesAdd);


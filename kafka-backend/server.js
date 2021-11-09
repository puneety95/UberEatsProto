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
//handleTopicRequest("rest_dishes_add",RestDishesAdd);


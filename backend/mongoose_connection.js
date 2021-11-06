const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://UberEatsUser:Sputnik12@ubereats.atuet.mongodb.net/UberEats?retryWrites=true&w=majority',()=>{
    console.log('Connected to Database');
});


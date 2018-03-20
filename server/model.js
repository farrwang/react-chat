const DB_URL='mongodb://127.0.0.1:27017/wangybg';
const mongoose=require('mongoose');

mongoose.connect(DB_URL,{useMongoClient:true});
mongoose.connection.on('connected', function () {    
    console.log('Mongoose connection open to ' + DB_URL);  
}); 

const models={
    user:{
        'user':{'type':String,'require':true},
        'pwd':{'type':String,'require':true},
        'type':{'type':String,'require':true},
        'avatar':{'type':String},
        'desc':{'type':String},
        'title':{'type':String},
        'company':{'type':String},
        'money':{'type':String}
    },
    chat:{
        'charid':{'type':String,'require':true},
        'from':{'type':String,'require':true},
        'to':{'type':String,'require':true},
        'read':{'type':Boolean,'default':false},
        'content':{'type':String,'require':true,'default':''},
        'create_time':{'type':Number,'default':new Date().getTime()}

    }
}
for(let m in models){
    mongoose.model(m,new mongoose.Schema(models[m]));
}
module.exports={
    getModel:function(name){
        return mongoose.model(name);
    }
}
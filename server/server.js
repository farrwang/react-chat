const express=require('express');
const userRouter=require('./user');
//引入插件处理post请求中的参数和cookie
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const app=express();

const server=require('http').Server(app);
const io=require('socket.io')(server);
const Model=require('./model');
const Chat=Model.getModel('chat');
io.on('connection',function(socket){
    socket.on('sendmsg',function(data){
     const {from,to,msg}=data;
     console.log(data);
     const chatid=[from,to].sort().join('_');
     Chat.create({chatid,from,to,content:msg},function(err,doc){
         if(!err){
             io.emit('recvmsg',Object.assign({},doc._doc));
         }
     })
    })
});
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/user',userRouter);
app.get('/',(req,res)=>{
    res.send("<h1>hello world</h1>")
})
server.listen('9527',()=>{
    console.log('node app start at port 9527');
})
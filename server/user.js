const express = require('express');
const Router = express.Router();
const Model=require('./model');
//实现字符串加密
const utils=require('utility');
const User=Model.getModel('user');
const Chat=Model.getModel('chat');
Router.get('/info',function(req,res){
    const {userid}=req.cookies;
    if(!userid){
        return res.json({code:1});
    }
    User.findOne({_id:userid},function(err,doc){
        if(err){
            return res.json({code:1,msg:'后端出错了！'});
        }
       if(doc){
        return res.json({code:0,data:doc});
       }
    })
    
})
Router.get('/getmsglist',function(req,res){
    const userid=req.cookies.userid;
    User.find({},function(err,udoc){
        let users={}
        udoc.forEach(v=>{
            users[v._id]={user:v.user,avatar:v.avatar};
        })
        Chat.find({$or:[{from:userid},{to:userid}]},function(err,doc){
            if(!err){
                res.json({code:0,msgs:doc,users:users});
            }
        })
    })
})
Router.get('/list',function(req,res){
    // User.remove({},function(e,d){});
    const {type}=req.query
    User.find({type},function(err,doc){
        return res.json({code:0,data:doc});
    })
})
Router.post('/update',function(req,res){
    const userid=req.cookies.userid;
    if(!userid){
        return res.json({code:1,msg:'登录信息过期，请重新登录！'})
    }
    const body=req.body;
    User.findByIdAndUpdate(userid,body,function(err,doc){
        const data=Object.assign({},body,{
            user:doc.user,
            type:doc.type
        })
        return res.json({code:0,data});
    })
})
Router.post('/login',function(req,res){
    const {user,pwd}=req.body;
    User.findOne({user,pwd:myMd5(pwd)},{'pwd':0},function(err,doc){
        if(!doc){
            return res.json({code:1,msg:'用户名或者密码错误！'})
        }
        res.cookie('userid',doc._id);
        return res.json({code:0,data:doc});
    })
})
Router.post('/register',function(req,res){
    const {user,pwd,type}=req.body;
    User.findOne({user},function(err,doc){
        if(doc){
            return res.json({code:1,msg:'用户名已存在'});
        }
        const userModel=new User({user,type,pwd:myMd5(pwd)});
        userModel.save(function(e,d){
            if(e){
                return res.json({code:1,msg:'注册时后台报错了'});
            }
            const {user,type,_id}=d;
            res.cookie('userid',_id);
            return res.json({code:0,data:{user,type,_id}});
        })
    })
})
//md5加盐
function myMd5(pwd){
    const salt='wangybg-is-a-Handsome-￥#……&%￥#';
    return utils.md5(utils.md5(pwd+salt));

}
module.exports=Router;
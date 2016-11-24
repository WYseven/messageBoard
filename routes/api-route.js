/**
 * Created by wangyun on 16/11/20.
 */
var express = require("express");
var router = express.Router();

var handle = require("../model/handle");
var M = handle.M;

function getDate() {
    var date = new Date();
    return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();

}

function random(){
    return Math.floor(Math.random() * 1000000000);
}


//登录API请求
router.post("/login",function(req,res){
    var userName = encodeURI(req.body.userName);
    var usersColletion =  db.collection("user");

    usersColletion.findOne({userName:userName},function(err,data){
        if( err ) throw err;
        if(data){
            res.setHeader("Set-Cookie",'mb-userName='+userName + ";domain=localhost;path=/;expires=" + new Date(2016,12,12).toUTCString());
            res.json({
                status: 0,
                message:"可以登录"
            });
        }else{
            res.json({
                status: 1,
                message:"用户不存在"
            });
        }

    })
})

//注册API请求

router.post("/reg",function (req,res) {
    var userName = encodeURI(req.body.userName);
    var usersColletion =  db.collection("user");
    usersColletion.findOne({userName:userName},function(err,data){
        if( err ){
            throw err;
        }else{
            if(data){
                res.json({
                    status: 1,
                    message:"已经存在"
                });
            }else{
                usersColletion.insertOne({
                    userName:userName
                }).then(function(){
                    res.json({
                        status: 0,
                        message:"注册成功"
                    });
                }).catch(function(err){
                    console.log(err);
                });

            }
        }
    })
});
//退出
router.get("/exit",function(req,res){
    res.setHeader("Set-Cookie","mb-userName='';domain=localhost;path=/;expires=" + new Date(2013,12,12).toUTCString());
    //res.setHeader("Set-Cookie","mb-userName='';domain=localhost;path=/api;expires=" + new Date(2013,12,12).toUTCString());

    res.json({
        status: 0,
        message: "退出成功"
    })
})

//留言
router.post("/message",function(req,res){
    var message = req.body.content;
    var userName = req.cookies["mb-userName"];
    //发过来后，获取到cookie，根据cookie确定用户名

    var messageColletion =  db.collection("message");
    messageColletion.insertOne({
        id:random()+"",
        userName:userName,
        message:message,
        date:getDate()
    })
        .then(function(){
            res.json({
                status: 0,
                message: "提交成功"
            })
        })
        .catch(function(err){
            throw err;
        })


})
//评论
router.post("/comment",function(req,res){
    var id = req.body.id;
    var message = req.body.content;
    var userName = req.cookies["mb-userName"];
    //发过来后，获取到cookie，根据cookie确定用户名

    var messageColletion =  db.collection("comment");
    messageColletion.insertOne({
        id:random()+"",
        userName:userName,
        cooment:message,
        date:getDate(),
        message_id:id
    })
        .then(function(){
            res.json({
                status: 0,
                message: "提交成功"
            })
        })
        .catch(function(err){
            throw err;
        })


})
//更新留言
router.post("/updateMessage",function(req,res){
    var message = req.body.content;
    var id = req.body.id;
    var userName = req.cookies["mb-userName"];
    //发过来后，获取到cookie，根据cookie确定用户名

    var messageColletion =  db.collection("message");
    messageColletion
        .updateOne(
            {id:id},
            {$set:{message:message}},
            {upsert:true}
        )
        .then(function(){
            res.json({
                status: 0,
                message: "更新成功"
            })
        })
        .catch(function(err){
            throw err;
        })


})

//删除留言
router.get("/deleteMessageById",function(req,res){
    var id = req.query.id;
    var messageColletion =  db.collection("message");
    var commentColletion =  db.collection("comment");
    //删除留言和评论
    messageColletion.deleteOne({id:id})
        .then(function(data){
            if(data.result.ok === 1){
                return commentColletion.deleteMany({message_id:id})
            }
        })
        .then(function(data){
            if(data.result.ok === 1){
                res.json({
                    status:0,
                    message:"删除成功"
                })
            }
        })
        .catch(function(err){
            throw err;
        })

})

//获取所有的点子
router.get("/getMessage",function(req,res){

    M("message").find().toArray()
        .then(function(data){
            console.log(data[0]);
            res.json(data)
        })
        .catch(function(err){
            throw err;
        })


})




module.exports = router;
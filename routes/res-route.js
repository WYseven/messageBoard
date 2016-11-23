/**
 * Created by wangyun on 16/11/20.
 */
var express = require("express");
var router = express.Router();

//中间件，用来获取cookie

router.use(function(req,res,next){
    req.cookieUserName = req.cookies["mb-userName"];
    next();
});


//中间件处理，如果是已经登录，则不跳转到登录注册上,直接跳转到首页

router.use(["/login","/reg"],function(req,res,next){
    if( !!req.cookieUserName ){
        res.redirect("/");
    }else{
        next();
    }
});

//如果没有登录，访问页面跳转到登录页

router.use(["/users-list"],function(req,res,next){
    if( !req.cookieUserName ){
        res.redirect("/login");
    }else{
        next();
    }
});


router.get("/",function (req,res) {
    var messageColletion =  db.collection("message");
    var commentColletion =  db.collection("comment");

    messageColletion.find().toArray()
        .then(function(data){

            //找每一个id对应的评论

            data.forEach(function(item,index){
                commentColletion.find({message_id:data.id}).toArray().
            })

            res.render("index",{
                cookieUserName:req.cookieUserName,
                messages:data,
                comments:[]
            });
        })
        .catch(function(err){
            throw err;
        })
});

router.get("/login",function (req,res) {
    res.render("login",{hello:"abc"});
});

router.get("/reg",function (req,res) {
    res.render("reg",{hello:"abc"});
});

router.get("/users-list",function (req,res) {

    var usersColletion =  db.collection("user");
    usersColletion.find().toArray(function(err,data){
        if(err) throw err;
        res.render("users-list",{list:data});
    })

});

module.exports = router;
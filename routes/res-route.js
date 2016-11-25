/**
 * Created by wangyun on 16/11/20.
 */
var express = require("express");
var router = express.Router();

//中间件，用来获取cookie

router.use(function(req,res,next){
    req.cookieUserName = decodeURI(req.cookies["mb-userName"] || "");
    console.log(typeof req.cookieUserName)
    next();
});


//中间件处理，如果是已经登录，则不跳转到登录注册上,直接跳转到首页

/*router.use(["/login","/reg"],function(req,res,next){
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
});*/

//首页
router.get("/",function (req,res) {
    res.render("index");
});

router.get("/login",function (req,res) {
    res.render("login");
});

router.get("/reg",function (req,res) {
    res.render("reg");
});

router.get("/users-list",function (req,res) {
    res.render("users-list",{list:data});
});

module.exports = router;
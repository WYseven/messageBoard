/**
 * Created by wangyun on 16/11/20.
 */
var express = require("express");
var router = express.Router();


router.get("/",function (req,res) {
   // res.send("hello,router");

    res.render("index",{hello:"abc"});
});

router.get("/login",function (req,res) {
    res.render("login",{hello:"abc"});
});

router.get("/reg",function (req,res) {
    res.render("reg",{hello:"abc"});
});

router.get("/users-list",function (req,res) {
    console.log(req.cookies);
    var usersColletion =  db.collection("user");
    usersColletion.find().toArray(function(err,data){
        if(err) throw err;
        res.render("users-list",{list:data});
    })

});

module.exports = router;
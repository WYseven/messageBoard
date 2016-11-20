/**
 * Created by wangyun on 16/11/20.
 */
var express = require("express");
var router = express.Router();


router.get("/",function (req,res) {
   // res.send("hello,router");

    res.render("index",{hello:"abc"});
});

router.get("/home",function (req,res) {
    res.send("hello,home");
});

module.exports = router;
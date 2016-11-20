/**
 * Created by wangyun on 16/11/20.
 */
var express = require("express");
var router = express.Router();


router.get("/username",function (req,res) {
    res.send("hello,router");
});


module.exports = router;
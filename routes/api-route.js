/**
 * Created by wangyun on 16/11/20.
 */
var express = require("express");
var router = express.Router();


router.get("/login",function (req,res) {

    db.collection("user").findOne(function(err,data){
        console.log(data);
    })

    res.json({
        status: 'ok'
    });
});

router.get("/reg",function (req,res) {
    var userName = req.query.userName;
    console.log(req.query);
    var usersColletion =  db.collection("user");
    usersColletion.findOne({userName:userName},function(err,data){
        if( err ){
            throw err;
        }else{
            console.log(data);
            if(data){
                res.json({
                    status: '已经存在'
                });
            }else{
                usersColletion.insert({
                    userName:userName
                }).then(function(){
                    res.json({
                        status: '注册成功'
                    });
                }).catch(function(err){
                    console.log(err);
                });

            }
        }
    })


});


module.exports = router;
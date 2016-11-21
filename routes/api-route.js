/**
 * Created by wangyun on 16/11/20.
 */
var express = require("express");
var router = express.Router();


router.get("/login",function(req,res){
    var userName = req.query.userName;
    var usersColletion =  db.collection("user");

    usersColletion.findOne({userName:userName},function(err,data){
        if( err ) throw err;
        res.json({
            status: 1,
            message:"已经存在"
        });
    })
})
router.get("/reg",function (req,res) {
    var userName = req.query.userName;
    var usersColletion =  db.collection("user");
    usersColletion.findOne({userName:userName},function(err,data){
        if( err ){
            throw err;
        }else{
            console.log(data);
            if(data){
                res.json({
                    status: 1,
                    message:"已经存在"
                });
            }else{
                usersColletion.insert({
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




module.exports = router;
var path = require("path");
var express = require("express");
var app = express();

var swig = require("swig");

//设置静态目录
app.use(express.static(__dirname + '/static'));

//设置模板引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.engine("html",swig.renderFile);

//连接mongodb

var mongodb = require("mongodb");
var server = mongodb.server;
var MongoClient = mongodb.MongoClient;

var url = 'mongodb://localhost:27017/messageBoard';

MongoClient.connect(url, function(err, db) {

    if(err){
        console.log(errr);
    }

    db.collection("col").insert({"a":1},function(err,result){
        console.log(err,result);
    });

    db.collection("col").findOne({},function (err,data) {
        if(err){
            console.log(err);
        }
        console.log("data:"+data);
    })

    console.log("正确连接数据库");

    db.close();
});




//引入访问路由
var resRoute = require('./routes/res-route.js');

//引入请求路由
var apiRoute = require("./routes/api-route.js");

app.use('/',resRoute);
app.use('/api',apiRoute);

app.listen(8888,function () {
    console.log("服务器开启成功");
})
var path = require("path");
var express = require("express");
var app = express();

var swig = require("swig");

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


var db = require("./model/connect.js");

//连接数据库
db.connect().then(function(db){
     global.db = db;
}).catch(function(err){
    console.log(err);
});

app.set('view cache', false);
swig.setDefaults({ cache: false });

//设置静态目录
app.use(express.static(__dirname + '/static'));

//设置模板引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.engine("html",swig.renderFile);



//引入访问路由
var resRoute = require('./routes/res-route.js');

//引入请求路由
var apiRoute = require("./routes/api-route.js");

app.use('/',resRoute);
app.use('/api',apiRoute);

app.listen(8080,function () {
    console.log("服务器开启成功");
})
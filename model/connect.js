/**
 * Created by wangyun on 16/11/20.
 *///连接mongodb

var mongodb = require("mongodb");
var Db = mongodb.Db;
var Server = require('mongodb').Server;

const url = 'mongodb://localhost:27017/';

var db = new Db('messageBoard', new Server('localhost', 27017));




function connect(){
    return new Promise(function(resolve,reject){
        db.open().then(function( db) {
            resolve(db)
            // Get an additional db
            console.log("open 数据库");
        }).catch(function(err){
            reject(err);
        });
    })
}

exports.connect = connect;




var express = require('express');
var router = express.Router();
var  mongodb = require("mongodb-curd");//引入mongodb-curd 模块
/* GET users listing. */
router.get('/', function(req, res, next) {
  mongodb.insert("mymonth","colmonth",function(obj){//添加成功返回一个对象如果对象里面有系统自动生成的id 失败返回空
  	if(obj){
  		res.send({
  			code:0,
  			mes:"添加成功"
  		})
  	}else{
  		res.send({code:1,mes:"添加失败"})
  	}
  })
});

module.exports = router;

var express = require('express');
var path = require('path');
var indexRouter = require('./routes/index'); //添加自定义图标
var usersRouter = require('./routes/users');
var bill = require("./routes/bill"); //账单
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/addicon/add', indexRouter); //添加自定义图标 获取/addicon/add/searchicon 获取系统图标"/addicon/add/findicon
app.use('/users', usersRouter);
app.use("/bill/bill", bill); //  /bill/bill/addname 添加用户 /bill/bill/findbill 查找用户
module.exports = app;
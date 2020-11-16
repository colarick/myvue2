var express = require('express');
var router = express.Router();
var mongodb = require("mongodb-curd");
//添加自定义图标
var addlist = function(req, res, next) {
        var params = req.body,
            cname = params.cname,
            uid = params.uid,
            type = params.type * 1,
            icon = params.icon;
        if (!cname || !uid || !type || !icon) {
            res.send({
                code: 1,
                "mes": "参数不完整"
            })
        } else {
            findlist();
        }

        //查找
        function findlist() {
            mongodb.find("lemons", "classify", {
                    cname: cname,
                    type: type,
                    uid: { $in: ["*", uid] }
                },
                function(item) {
                    if (item.length > 0) {
                        res.send({
                            code: 1,
                            "mes": "该图标已(存在"
                        })
                    } else {
                        insertlist({
                            icon: icon,
                            cname: cname,
                            type: type,
                            uid: uid
                        })
                    }
                })
        }
        //插入
        function insertlist(data) {
            mongodb.insert("lemons", "classify", data, function(result) {
                if (result) {
                    res.send({ code: 0, "mes": "添加成功" })
                } else {
                    res.send({ code: 1, "mes": "添加失败" })
                }
            })
        }
    }
    //所有查找图标
var findicon = function(req, res, next) {
        mongodb.find("lemons", "iconlist", function(result) {
            if (result.length > 0) {
                res.send({ code: 0, "data": result })
            } else {
                res.send({ code: 1, "mes": "查找失败" })
            }
        });
    }
    //查询支出或收入图标
var searchicon = function(req, res, next) {
    var params = req.body,
        type = params.type * 1,
        uid = params.uid;

    mongodb.find("lemons", "classify", { type: type, uid: { $in: ["*", uid] } },
        function(result) {
            if (result.length > 0) {
                res.send({ code: 0, data: result })
            } else {
                res.send({ code: 1, "mes": "获取失败" })
            }
        })
}
module.exports = {
    addlist: addlist,
    findicon: findicon,
    searchicon: searchicon
}
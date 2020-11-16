var express = require("express");
var router = express.Router();
var mongodb = require("mongodb-curd");

//添加账单
var addbill = function(req, res, next) {
        var params = req.body,
            type = params.type,
            money = params.money,
            icon = params.icon,
            cname = params.cname,
            time = params.time,
            uid = params.uid,
            cid = params.cid; //分类的id classify集合 里面的_id
        if (!type || !money || !icon || !cname || !time || !uid || !cid) {
            res.send({ code: 0, "mes": "缺少参数" })
        } else {
            //判断用户是否在集合里
            userexit();
        }

        function userexit() {
            mongodb.find("lemons", "user", { _id: uid }, function(result) {
                if (result.length > 0) {
                    //用户存在 判断分类是否存在
                    itemexit();
                } else {
                    res.send({ code: 1, "mes": "该用户不存在" })
                }
            })
        }

        function itemexit() {
            mongodb.find("lemons", "classify", { _id: cid }, function(result) {
                if (result.length > 0) {
                    addbill()
                } else {
                    res.send({
                        code: 1,
                        "mes": "没有该分类"
                    })
                }
            })
        }

        function addbill() {
            params.time = new Date(params.time);
            mongodb.insert("lemons", "billlist", params, function(result) {
                if (result) {
                    res.send({ code: 0, "mes": "添加账单成功" })
                } else {
                    res.send({ code: 1, "mes": "添加账单失败" })
                }
            })
        }
    }
    //查询账单

var findbill = function(req, res, next) {
        var params = req.body,
            uid = params.uid,
            type = params.type * 1,
            time = params.time, //时间 按年 或月
            cname = params.cname.split(","),
            maxtime = "";

        if (!uid || !type || !cname || !time) {
            res.send({ code: 1, "mes": "参数不完整" })
        } else {
            //按月
            if (time.indexOf("-") != -1) {
                var arrtime = time.split("-");
                if (arrtime[1] == "12") {
                    maxtime = (arrtime[0] * 1 + 1) + "-01";
                } else {
                    maxtime = arrtime[0] * 1 + "-" + (arrtime[1] * 1 + 1);
                }
            } else { //按年
                maxtime = (time * 1 + 1).toString();
            }
            console.log(maxtime)
            mongodb.find("lemons", "billlist", {
                time: { $lt: new Date(maxtime), $gte: new Date(time) },
                uid: uid,
                type: type,
                cname: { $in: cname }
            }, function(result) {
                console.log(result)
                if (result.length > 0) {
                    res.send({ "code": 0, "data": result })
                } else {
                    res.send({ "code": 1, "mes": "没有查询结果" })
                }
            }, {
                sort: { time: 1 }
            })
        }
    }
    //添加 用户

var addname = function(req, res, next) {
    if (req.body.username) {
        mongodb.insert("lemons", "user", {
            username: req.body.username
        }, function(result) {
            console.log(result.ops[0]._id)
            res.send({ code: "0", uid: result.ops[0]._id })
        })
    }
}


module.exports = {
    addbill: addbill,
    findbill: findbill,
    addname: addname
}
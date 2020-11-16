var express = require('express');
var router = express.Router();
var iconlist = require("./classfiy/index")
router.post('/addicon', iconlist.addlist);
router.post("/findicon", iconlist.findicon);
router.post("/searchicon", iconlist.searchicon);
module.exports = router;
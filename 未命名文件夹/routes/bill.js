var express = require("express");
var router = express.Router();
var billlist = require("./billlist/index.js");
router.post("/addbill", billlist.addbill);
router.post("/findbill", billlist.findbill);
router.post("/addname", billlist.addname);
module.exports = router
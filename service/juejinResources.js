var http = require('http');
var express = require('express');
var router = express.Router();
var request = require('./request')

//express自带路由分配
router.get('/getInfoList', function(req, res) {
    var url = "http://test-logideltaiot.vip56.cn/device/getInfoList?workshopCode=1&skip=0&count=-1";
    request.get( res, url );
})

router.get('/getPlan', function(req, res) {
    var url ="https://test-logideltaiot.vip56.cn/device/getPlan/?skip=0&count=-1";
    request.get(res, url);
})

module.exports = router;
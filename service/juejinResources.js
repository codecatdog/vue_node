//juejinResources.js
var http = require('http');
var express = require('express');
var router = express.Router();

//这样的地址获取方式跟baidu的一样，慢慢试；
var url = "https://test-logideltaiot.vip56.cn/device/getInfoList?workshopCode=1&skip=0&count=-1";

//express自带路由分配
router.get('/', function(req, res) {
    http.get(url, function(resquest) {
        var html = '';
        resquest.setEncoding('utf-8'); //防止中文乱码

        //监听data事件，每次取一块数据
        resquest.on('data', function(chunk) {
            html += chunk;
        });

        //监听end事件，如果接口返回获取完毕，就执行回调函数
        resquest.on('end', function() {
            //接口返回的是字符串，中文是unicode码，做了处理才返回给前端
            html=JSON.parse(unescape(html.replace(/\\u/g, '%u')))
            res.status(200)
            res.json(html)
        })
    })
})

module.exports=router;
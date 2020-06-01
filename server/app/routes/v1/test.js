var express = require('express');
var router = express.Router();
var moment = require('moment');

// GET  http://localhost:3000/api/v1/article/test
router.get('/', function (req, res) {
    var reqTime = moment().format('x');
    res.set({ 'Access-Control-Allow-Origin': '*' }); // ここでヘッダーにアクセス許可の情報を追加
    res.json({
        requestTime:reqTime,
        responseTime:moment().format('x')
    });
});

//routerをモジュールとして扱う準備
module.exports = router;

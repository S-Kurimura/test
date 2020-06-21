// nodeのコアモジュールのhttpを使う
var http = require('http');
var ejs  = require('ejs');
var qs   = require('querystring');
var fs     = require('fs');
var config = require('./config');
var server = http.createServer();
var moment = require('moment');
var posts = [];

const axiosBase = require('axios');
const axios = axiosBase.create({
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  },
  responseType: 'json'  
});

// フォームを表示する
function renderForm(posts, res) {
    var data = ejs.render(template, {
        posts: posts
    });

    res.writeHead(200, {'Content-Type' : 'text/html'});
    res.write(data);
    res.end();
}

// テンプレートを使うときはreadFileSyncを使う
var template = fs.readFileSync(__dirname + '/hello.ejs', 'utf-8');

server.on('request', function(req, res) {
    if (req.method === 'POST') {
        req.data = "";
        // フォームからのデータを受信
        req.on("readable", function() {
            // read()はnullが来る場合もあるので空文字にする
            req.data += req.read() || '';
            console.log("readable" + req.data);
        });
        req.on("end", function() {
            // パースすると、formから入力された値をquery.nameのように使えるようになる
            var query = qs.parse(req.data);
            console.log(query);
            posts[0] = moment().format('x');
            axios.get(query.ibm)
            .then(function(response) {
                posts[3] = moment().format('x');
                posts[1] = response.data.requestTime
                posts[2] = response.data.responseTime
                posts.push(response);
                posts[4] = moment().format('x');
                axios.get(query.aws)
                .then(function(response) {
                    posts[7] = moment().format('x');
                    posts[5] = response.data.requestTime
                    posts[6] = response.data.responseTime
                    posts.push(response);
                    renderForm(posts, res);
                })
            })
        });
    } else {
        renderForm(posts, res);
    }
});

// サーバを待ち受け状態にする
// 第1引数: ポート番号
// 第2引数: IPアドレス
server.listen(config.port);
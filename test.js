var express = require('express');
var db = require('./connect');
var app = express();
var bodyParser = require('body-parser');

app.use(express.static('public'));

// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get('/', function (req, res) {
    console.log(res);
    res.sendFile( __dirname + "/web/" + "index.html" );
});

app.get('/login', function (req, res) {
    res.sendFile( __dirname + "/web/" + "test.html" );
});

let login = function (req,res) {
    let response = {
        "username":req.body.username,
        "password":req.body.password
    };
    console.log("response",response);
    if(response.username && response.password){
        let _sql = "select * from user where username="+response.username +" and password="+response.password;
        db.query(_sql,function (rows) {
            let _data = {
                errcode : 0,
                msg:"login success"
            };
            if(rows.length > 0){
                _data.data = rows[0];
            }else {
                _data.data = {};
            }

            res.end(JSON.stringify(_data));
        })
    }else {
        let _data = {
            errcode : -2,
            msg:"login filed"
        };
        res.end(JSON.stringify(_data));
    }
};


let getUserInfo = function (req,res) {
    let response = {
        "username":req.query.username,
        "password":req.query.password
    };
    console.log("response",response);
    if(response.username && response.password){
        let _sql = "select * from user where username="+response.username +" and password="+response.password;
        db.query(_sql,function (rows) {
            let _data = {
                errcode : 0,
                msg:"login success"
            };
            if(rows.length > 0){
                _data.data = rows[0];
            }else {
                _data.data = {};
            }
            res.end(JSON.stringify(_data));
        })
    }else {
        let _data = {
            errcode : -2,
            msg:"get user info filed"
        };
        res.end(JSON.stringify(_data));
    }
};

app.get('/process_get', function (req, res) {
    // 输出 JSON 格式
    getUserInfo(req,res);
});

app.post('/process_post', urlencodedParser, function (req, res) {
    // 输出 JSON 格式
    login(req,res);
});


var server = app.listen(8081, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

})
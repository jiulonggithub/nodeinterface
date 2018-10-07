let  mysql = require('mysql');
let db = {};

db.query = function (sql,callback) {
    let connection = mysql.createConnection({
        host : 'localhost',
        user : 'root',
        password : '123456',
        database : 'test'
    });
    connection.connect(function (err) {
        if(err){
            console.log(err);
            return
        }
    });

    if(!sql) return;
    connection.query(sql,function (err,rows,fields) {
        if(err){
            console.log(err);
            return
        }
        callback(rows)
    });
    connection.end(function (err) {
        if(err){
            console.log(err);
            return;
        }else {
            console.log("数据库连接关闭")
        }
    })

};


module.exports = db;
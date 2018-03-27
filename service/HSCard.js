var mysql = require('mysql');
var dbConfig = require('../dao/DBConfig');
var userSQL = require('../dao/Usersql');

// 使用DBConfig.js的配置信息创建一个MySQL连接池
var pool = mysql.createPool( dbConfig.mysql );
// 响应一个JSON数据
var responseJSON = function (res, ret) {
    if(typeof ret === 'undefined') { 
         res.json({     code:'-200',     msg: '操作失败'   
       }); 
   } else { 
     res.json(ret); 
 }};

// 查询卡牌
exports.list = function(req, res) {
    // 从连接池获取连接 
   pool.getConnection(function(err, connection) { 

    console.log("Connected!");

    // 获取前台页面传过来的参数  
    var param = req.query || req.params; 

    // 画面初始化
    if (param.currentpage == 'initall'){

        connection.query(userSQL.queryAll + userSQL.queryMaxPage, [0,parseInt(param.pagedata)], function(error, result, fields) {  
            
            if (error) throw error;

            // 查询结果返回  
            res.json(result);
    
            // 释放连接  
            connection.release();  
    
            });
        }
   else {
    // 翻页
        var currentdata = (parseInt(param.currentpage)-1)*parseInt(param.pagedata)
        connection.query(userSQL.queryAll, [currentdata,parseInt(param.pagedata)], function(error, result, fields) {

            if (error) throw error;

            // 查询结果返回  
            res.json(result);
    
            // 释放连接  
            connection.release();  
    
            });
        }
    }
)};

// exports.list = function(req, res) {
    // var cards = new Array();
    // var yanbao = new Object();
    // yanbao.Cdnm = '炎爆术';
    // yanbao.Classes = '法师';
    // yanbao.Cost = 10;
    // yanbao.Figure = null;
    // yanbao.Cdlvl = '史诗';
    // yanbao.describe = 10;

    // cards[0] = yanbao;
    // cards[1] = yanbao;
//     res.json(cards);
// }
var mysql = require('mysql');
var $conf = require('../config/db');
var $util = require('../utils/util');
var $sql = require('./userSqlMapping');

// 使用连接池
var pool = mysql.createPool($util.extend({}, $conf.mysql));

// 向前台返回JSON方法的简单封装
var jsonWrite = function(res, ret) {
  if (typeof ret === 'undefined') {
    res.json({
      code: '1',
      msg: '操作失败'
    });
  } else {
    res.json(ret);
  }
}

module.exports = {
  add: function (req, res, next) {
    pool.getConnection(function(err, connection) {
      // 获取前台页面传过来的参数
      var param = req.body;
      // 建立连接，向表中插入值
      console.log('param:================',param);
      connection.query($sql.insert, [
        param.name,
        param.nickName,
        param.password,
        param.email,
        param.headImage,
        param.telphone,
        param.qq,
        param.wechat
      ], function(err, result) {
        if (result) {
          result = {
            code: 200,
            msg: '增加成功'
          };
        }
        // 返回数据
        jsonWrite(res,result);
        // 释放资源
        connection.release();
      });
    });
  }
};

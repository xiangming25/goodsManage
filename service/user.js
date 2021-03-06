var $sql = require('./userSql');
var jwt = require('jsonwebtoken');
var tokenConfig = require('../config/token');
var errorCode = require('../config/errorCode');
var jsonWrite = require('../utils/jsonWrite');

module.exports = function(pool){
  return {
    add: function (req, res, next) {
      pool.getConnection(function(err, connection) {
        // 获取前台页面传过来的参数
        var params = req.body;
        // 建立连接，向表中插入值
        connection.query($sql.insert, [
          params.name,
          params.nickName,
          params.password,
          params.email,
          params.headImage,
          params.telphone,
          params.qq,
          params.wechat
        ], function(err, result) {
          if (err) jsonWrite(err);
          if (result) {
            result = {
              code: errorCode.SUCCESS,
              msg: '增加成功'
            };
            jsonWrite(res,result);
          }
          connection.release();
        });
      });
    },

    // 根据username and password查询数据
    queryByName: function(req, res, next) {
      pool.getConnection(function(err, connection) {
        var params = req.body;
        connection.query($sql.queryByName, [params.name,params.password], function(err, result) {
          var response;
          if( err) {
            response = {code: errorCode.QUERY_ERROR, data: '数据库查询错误'};
          } else if(result.length) {
            var token = jwt.sign(result[0], tokenConfig.superSecret, tokenConfig.expiresIn);
            response = {
              code: errorCode.SUCCESS,
              data: result[0],
              token: token
            };
          } else {
            response = {
              code: errorCode.NO_RESULT,
              data: '暂无数据'
            };
          };
          jsonWrite(res, response);
          connection.release();
        });
      });
    },

    /**
     * 查询所有用户
     * @param  {[type]}   req  [description]
     * @param  {[type]}   res  [description]
     * @param  {Function} next [description]
     * @return {[type]}        [description]
     */
    queryAll: function(req, res, next) {
      // console.log('req.userInfo:=================',req.userInfo);
      pool.getConnection(function(err, connection) {
        connection.query($sql.queryAll, function(err, result) {
          var response;
          if(result) {
            response = {
              code: errorCode.SUCCESS,
              data: result
            };
          } else {
            response = {
              code: errorCode.QUERY_ERROR,
              data: '数据库查询错误'
            }
          }
          jsonWrite(res, response);
          connection.release();
        });
      });
    }
  }
};

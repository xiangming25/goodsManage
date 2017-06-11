var $sql = require('./goodsSql'),
    jwt = require('jsonwebtoken'),
    tokenConfig = require('../config/token'),
    errorCode = require('../config/errorCode'),
    defaultConfig = require('../config/default'),
    jsonWrite = require('../utils/jsonWrite');

module.exports = function(pool) {
  return {
    // 新增
    add: function(req, res, next) {
      pool.getConnection(function(err, connection) {
        var params = req.body;
        params.userId = req.userInfo.id;
        var newParams = {
          name: params.name,
          unit: params.unit,
          image: params.image,
          inPrice: parseFloat(params.inPrice),
          outPrice: parseFloat(params.outPrice),
          type: params.type,
          remainder: parseInt(params.remainder),
          isShow: Boolean(params.isShow) ? 1 : 0,
          userId: params.userId
        };
        connection.query($sql.insert, newParams, function(err, result) {
          if (err) return jsonWrite(res, {code: errorCode.QUERY_ERROR, data: err});

          if (result) jsonWrite(res, {code: errorCode.SUCCESS, data: 'success'});
          connection.release();
        });
      });
    },
    // 删除
    delete: function(req, res, next) {
      pool.getConnection(function(err, connection) {
        var params = req.body;
        connection.query($sql.delete, [params.id], function(err, result) {
          if (err) {
            throw err;
            return jsonWrite(res,err);
          }
          if (result) return jsonWrite(res, {code: errorCode.SUCCESS, data: 'delete success'});
          connection.release();
        });
      });
    },
    // 分页查询数据
    queryByPage: function(req, res, next) {
      pool.getConnection(function(err, connection) {
        var params = req.query,
            userId = req.userInfo.id,
            page = params.page || defaultConfig.page,
            count = params.count || defaultConfig.count;
        var query = connection.query($sql.queryByPage, [
          userId,
          (page-1)*count,
          parseInt(count)
        ], function(err, result) {
          if (err) {
            console.log('query.sql:====',query.sql);
            jsonWrite(res, {code: errorCode.QUERY_ERROR, data: err});
          }
          if(result) jsonWrite(res,{code: errorCode.SUCCESS, data: result});
          connection.release();
        });
      });
    },
    // 查询总数量
    queryCount: function(req, res, next) {
      pool.getConnection(function(err, connection) {
        var userId = req.userInfo.id;
        connection.query($sql.queryCount,[userId], function(err, result) {
          if(err) {
            throw err;
            return jsonWrite(res, {code: errorCode.QUERY_ERROR, data: '删除失败'});
          }
          if (result) jsonWrite(res, {code: errorCode.SUCCESS, data: 'success'});
        });
        connection.release();
      });
    },
    // 修改
    modify: function(req, res, next) {
      pool.getConnection(function(err, connection) {
        var params = req.body;
        params.userId = req.userId.id;
        connection.query($sql.modify, params, function(err, result) {
          if(err) {
            throw err;
            return jsonWrite(res, {code: errorCode.QUERY_ERROR, data: '删除失败'});
          }
          if (result) {
            jsonWrite(res, {code: errorCode.SUCCESS, data: '删除成功'});
          }
          connection.release();
        });
      });
    }
  }
}

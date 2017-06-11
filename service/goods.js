var $sql = require('./goodsSql'),
    jwt = require('jsonwebtoken'),
    tokenConfig = require('../config/token'),
    errorCode = require('../config/errorCode'),
    defaultConfig = require('../config/default'),
    jsonWrite = require('../utils/jsonWrite');

module.exports = function(pool) {
  return {
    add: function(req, res, next) {
      pool.getConnection(function(err, connection) {
        var params = req.body;
        params.userId = req.userInfo.id;
        var newParams = {
          name: params.name,
          unit: params.unit,
          image: params.image,
          inPrice: params.inPrice,
          outPrice: params.outPrice,
          type: params.type,
          remainder: params.remainder,
          isShow: params.isShow,
          userId: params.userId
        };
        connection.query($sql.insert, params, function(err, result) {
          if (err) return jsonWrite({code: errorCode.QUERY_ERROR, data: err});
          if (result) return jsonWrite({code: errorCode.SUCCESS, data: result});
          connection.release();
        })
      });
    },
    // 分页查询数据
    queryByPage: function(req, res, next) {
      pool.getConnection(function(err, connection) {
        var params = req.body,
            userId = req.userInfo.id,
            page = params.page-1 || defaultConfig.page-1,
            count = params.count || defaultConfig.count;
        connection.query($sql.queryByPage, [
          userId,
          page-1,
          count
        ], function(err, result) {
          if (err) jsonWrite(res, {code: errorCode.QUERY_ERROR, data: err});
          if(result) jsonWrite(res,{code: errorCode.SUCCESS, data: result});
          connection.release();
        });
      });
    }
  }
}

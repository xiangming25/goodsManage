var $sql = require('./goodsSql'),
    jwt = require('jsonwebtoken'),
    tokenConfig = require('../config/token'),
    errorCode = require('../config/errorCode'),
    defaultConfig = require('../config/default'),
    jsonWrite = require('../utils/jsonWrite');

module.exports = function(pool) {
  return {
    add: add,
    deleteInfo: deleteInfo,
    queryByPage: queryByPage,
    queryCount: queryCount,
    modify: modify,
    searchInfo: searchInfo
  };

  // 新增
  function add(req, res, next) {
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
  }

  // 删除
  function deleteInfo(req, res, next) {
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
  }

  // 分页查询
  function queryByPage(req, res, next) {
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
  }

  // 查询总数量
  function queryCount(req, res, next) {
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
  }

  // 修改
  function modify(req, res, next) {
    pool.getConnection(function(err, connection) {
      var params = req.body;
      params.userId = req.userInfo.id;
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

  // 查询
  function searchInfo(req, res, next) {
    pool.getConnection(function(err, connection) {
      var params = req.query;
      var page = params.page || defaultConfig.page,
          count = params.count || defaultConfig.count,
          keyword = '%'+params.keyword+'%',
          userId = req.userInfo.id;
      var query = connection.query($sql.search, [userId, keyword, (page-1)*count, count], function(err, result) {
        if(err) {
          throw err;
          return jsonWrite(res,{code: errorCode.QUERY_ERROR, data: '查询失败'});
        }
        if(result) {
          jsonWrite(res, {code: errorCode.SUCCESS,data:result});
        }
        connection.release();
      });
      console.log('query"------',query.sql);
    });
  }
}

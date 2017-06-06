var jwt = require('jsonwebtoken');
var errorCode = require('../config/errorCode');
var tokenConfig = require('../config/token');

module.exports = function(req, res, next) {
  //检查post的信息或者url查询参数或者头信息
  var token = (req.body && req.body.token) || (req.query && req.query.token) || (req.headers['token']);
  var baseUrl = req.baseUrl;
  // 如果是登录页面，跳过
  if (baseUrl === '/api/signin') {
    next();
  } else if (token) {
    jwt.verify(token, tokenConfig.superSecret, function(err, decoded) {
      if (err) {
        if (err.message === 'jwt expired') {
          return res.json({code: errorCode.TOKEN_EXPIRED, message: 'token过期.' });
        }
        return res.json({code: errorCode.TOKEN_ERROR, message: 'token信息错误.' });
      } else {
        // 如果没问题就把解码后的信息保存到请求中，供后面的路由使用
        req.userInfo = decoded;
        next();
      }
    });
  } else {
    // 如果没有token，则返回错误
    return res.status(200).send({
        code: errorCode.NO_TOKEN,
        message: '没有提供token！'
    });
  }
};

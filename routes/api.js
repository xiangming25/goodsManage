var express = require('express');
var router = express.Router();

var user = require('../service/user');
var goods = require('../service/goods');

function api(pool) {
  // 用户管理
  router.post('/signin', user(pool).queryByName);
  router.post('/register', user(pool).add);
  router.get('/userInfo',user(pool).queryAll);

  // 商品管理
  router.post('/goods/add', goods(pool).add);
  router.get('/goods/list', goods(pool).queryByPage);
  return router;
}
module.exports = api;

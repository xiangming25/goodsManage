var express = require('express');
var router = express.Router();

var user = require('../service/user');

function api(pool) {
  router.post('/signin', user(pool).queryByName);
  router.post('/add/user', user(pool).add);
  router.get('/userInfo',user(pool).queryAll);
  return router;
}
module.exports = api;

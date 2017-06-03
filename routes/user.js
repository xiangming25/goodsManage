var express = require('express');
var router = express.Router();

var userDao = require('../dao/userDao');

/**
 * 登录页面
 */
router.get('/login',function(req,res,next){
	res.render('login/login');
});

/**
 * 注册页面
 */
router.get('/register',function(req,res,next){
	res.render('register/register');
});

/**
 * 添加一个用户
 */
router.post('/addUser', function(req, res, next) {
  userDao.add(req, res, next);
});

module.exports = router;

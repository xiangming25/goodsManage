var express = require('express');
var router = express.Router();

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

module.exports = router;

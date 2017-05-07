var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Hello world1111!');
});

router.get('/test', function(req, res, next) {
  res.send('test!');
});

router.get('/user', function(req, res, next) {
  res.render('index/index');
});
/*router.get('/test', function(req, res, next) {
  res.render('test');
});
router.get('/sign_in', function(req, res, next) {
  res.render('index');
});*/
router.get('/login',function(req,res,next){
	res.render('login/login');
});
router.get('/register',function(req,res,next){
	res.render('register/register');
});
router.get('/addgoods',function(req,res,next){
	res.render('addgoods/addgoods');
});
router.get('/goodsDetail',function(req,res,next){
	res.render('goodsDetail/goodsDetail');
});

module.exports = router;

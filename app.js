var express = require('express'),
	app = express(),
	path = require('path'),
	ejs = require('ejs'),
	bodyParser = require('body-parser'),
	jwt = require('jsonwebtoken'),
	checkToken = require('./utils/checkToken'),
	mysql = require('mysql'),
	$util = require('./utils/util'),
	$conf = require('./config/db');

// 视图访问路径
app.set('views', path.join(__dirname, 'client/public/modules/'));
app.set('view engine', 'ejs');

// 头部需要的内容
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
	next();
});

// 使用连接池
var pool = mysql.createPool($util.extend({}, $conf.mysql));

// 检查是否有token
app.use('/api/*',checkToken);

// 静态资源访问路径
app.use(express.static(path.join(__dirname,'client/public/')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 路由配置
var api = require('./routes/api');
var index = require('./routes/index');
var user = require('./routes/user');
app.use('/',index);
app.use('/api',api(pool));
app.use('/user',user);



// 处理404 以及 一些其他的异常处理
app.use(function(req,res,next){
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// 错误处理
app.use(function(err, req,res, next){
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	res.status(err.status || 500);
	res.render('error/error');
});


var server = app.listen(3000,function(){
	var host = server.address().address,
		port = server.address().port;

	console.log('app listening at http://0.0.0.0:%s',port);
});

/**
 * requirejs 配置文件
 * @return {[type]} [description]
 */
;(function(){
	require.config({
		baseUrl : '/assets/js',
		paths : {
			'jquery' : '/vendor/jquery',
			'default' : '/components/default',
			'network' : '/components/network',
			'errorCode' : '/components/errorCode',
			'errorCodeRev' : '/components/errorCodeRev'
		}
	});
})();

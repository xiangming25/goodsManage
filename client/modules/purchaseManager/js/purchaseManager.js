;(function(){
	require(['/vendor/main.js'],function(){
		require(['jquery','default'],function($,defaultObj){
			// $(".purchase-table tr td:gt(1)").attr("contenteditable","true");
			// $(".purchase-table tr td:gt(32)").attr("contenteditable","false");
			console.log($(".purchase-table tr td:gt(1):lt(32)"));
			$(".purchase-table tr td:gt(1):lt(31)").attr("contenteditable","true");
		});
	});
})();

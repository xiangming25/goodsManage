;(function(){
	require(['/vendor/main.js'],function(){
		require(['jquery','default'],function($,defaultObj){
			$(function(){
				$.get('/api/goods_detail.json',{id:1},function(data,status){
					if(data.code == 10000){
						var objData = data.data;
						var sellCount = objData.lastSurplus-objData.currentSurplus;
						var netPrice = ((objData.sellPrice-objData.bid)*sellCount).toFixed(2);
						$("#goodsName").text(objData.name);
						$("#goodsType").text(objData.type);
						$("#goodsUnit").text(objData.unit);
						$("#goodsQuantity").text(objData.quantity);
						$("#goodsBid").text(objData.bid);
						$("#goodsPrice").text(objData.sellPrice);
						$("#goodsSellNum").text(objData.lastSurplus-objData.currentSurplus);
						$("#lastSurplus").text(objData.lastSurplus);
						$("#currentSurplus").text(objData.currentSurplus);
						
						$("#netPrice").text(netPrice);
						$("#goodsImg").attr("src",objData.img);
					}
				});
			});
		});
	});
})();	
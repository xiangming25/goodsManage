;(function(){
	require(['/vendor/main.js'],function(){
		require(['jquery','default','network'],function($,defaultObj, network){
			$(function(){
				var params = {
					page: 1,
					count: 10
				};
				var response = network('GET','/api/goods/list', params);
				response.then(function(data) {
					console.log('data:====',data);
					var listData=data;
					var tbody=$(".goods-table>tbody");
					var dataStr = '';
					listData.forEach(function(item, index){
						item.isShow = item.isShow ? '是' : '否';
						dataStr += '<tr>'+
						'<td>'+item.name+'</td>'+
						'<td>'+item.unit+'</td>'+
						'<td><img src="'+item.image+'" alt=""></td>'+
						'<td>￥'+item.inPrice+'</td>'+
						'<td>￥'+item.outPrice+'</td>'+
						'<td>'+item.type+'</td>'+
						'<td>'+item.remainder+'</td>'+
						'<td>'+item.time+'</td>'+
						'<td>'+item.isShow+'</td>'+
						'<td>'+
						'	<a href="/goodsDetail?id='+item.id+'&name='+item.name+'">查看</a>'+
						'	<a href="">修改</a>'+
						'	<a href="">删除</a>'+
						'</td>'+
					'</tr>';
					});
					tbody.html(dataStr);
				});
			});
		});
	});
})();

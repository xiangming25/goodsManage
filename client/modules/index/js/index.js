;(function(){
	require(['/vendor/main.js'],function(){
		require(['jquery','default'],function($,defaultObj){
			$(function(){
				$.get("/api/goods_list.json",{
						page: 1,
						count: 15
					},
					function(data,status){
						var listData=data.data.list;
						var tbody=$(".goods-table>tbody");
						var dataStr = '';
						listData.forEach(function(item, index){
							item.isShow = item.isShow ? '是' : '否';
							dataStr += '<tr>'+
							'<td>'+item.name+'</td>'+
							'<td>'+item.unit+'</td>'+
							'<td><img src="'+item.img+'" alt=""></td>'+
							'<td>￥'+item.bid+'</td>'+
							'<td>￥'+item.sellPrice+'</td>'+
							'<td>'+item.type+'</td>'+
							'<td>'+item.count+'</td>'+
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
					}
				);
			});
		});
	});
})();
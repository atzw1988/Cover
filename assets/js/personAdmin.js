
$(function(){
	$('[data-father="7"]').addClass('active open');
	$('[data-child="13"]').addClass('active open');
	$('[data-child="13"]').parent().show();
	$('body').mLoading("show");
	var oRequestUrl = '/HuaXtentCover/admin/users';
	var oPs = 10;
	function __againLogin(data){
		var oMsg = data || '请重新登录';
        layer.msg('提示,' + oMsg,{
            shade: 0.3,
            shadeClose:true,
            time:2000,
            icon: 2
        },
        function(){
            window.location.href = 'login.html';
        });
	}

	var oData = {
		ps: oPs,
		cp: 1
	}
	common.ajax(oRequestUrl, 'GET', oData, function(res){
		console.log(res);
		if(res.success){
			if ( res.data.list.length > 0 ) {
				var detail=res.data;
				var model=$("#model").html();
				var template=_.template(model)(detail);
				$(".layui-table tbody").html(template);
				$('body').mLoading("hide");
			}else{
				layer.msg('暂无信息',{
					shade: 0.3,
					shadeClose:true,
					time:4000,
					icon: 1
				})
				$('body').mLoading("hide");
				$('.page-box').hide();
			}
			__page(res);
		}else{
			if(res.code == 2001){
				__againLogin(res.message);
			}else{
				var oMsg = res.message;
		        layer.msg('提示,' + oMsg,{
		            shade: 0.3,
		            shadeClose:true,
		            time:2000,
		            icon: 2
		        },
		        function(){
		        	$('body').mLoading("hide");
        			$('.page-box').hide();
		        });
			}
		}
		
	});

	function __page(res){
		Page({
			num: res.data.totalPage,					//页码数
			startnum:res.data.index,				//指定页码
			elem:$('#page1'),		//指定的元素
			callback:function(n){	//回调函数
				console.log(n);
				__pagesNext(n);
			}
		});
		var oText = '共有'+ res.data.totalCount +'条, 每页显示'+ res.data.size +'条';
		$('.pages').html(oText);
		if (res.data.totalPage > 1 ) {
			$('.pageJump').show();
		}else{
			$('.pageJump').hide();
		}
	}

	function __pagesNext(n){
		$('body').mLoading("show");
		var oData = {};
		oData.cp = n;
		oData.ps = oPs;
		// if ($('#imei').val().length > 0) {
		// 	oData.imei = $('#imei').val();
		// }
		// if ($('#mac').val().length > 0) {
		// 	oData.mac = $('#mac').val();
		// }
		__pageAll(oData)
	}
	function __pageAll(data){
		var oData = data;
		common.ajax(oRequestUrl, 'GET', oData, function(res){
			console.log(res);
			if(res.success){
				if ( res.data.list.length > 0 ) {
					var detail=res.data;
					var model=$("#model").html();
					var template=_.template(model)(detail);
					$(".layui-table tbody").html(template);
					$('body').mLoading("hide");
				}else{
					layer.msg('暂无信息',{
						shade: 0.3,
						shadeClose:true,
						time:4000,
						icon: 1
					})
					$('body').mLoading("hide");
				}
				__page(res);
			}else{
				if(res.code == 2001){
					__againLogin(res.message);
				}else{
					var oMsg = res.message;
			        layer.msg('提示,' + oMsg,{
			            shade: 0.3,
			            shadeClose:true,
			            time:2000,
			            icon: 2
			        },
			        function(){
			        	$('body').mLoading("hide");
	        			$('.page-box').hide();
			        });
				}
			}
		});
	}

	// // 搜索
	// $('body').on('click','.search-btn',function(e){
	// 	e.preventDefault();
	// 	$('body').mLoading("show");
	// 	var oData = {};
	// 	oData.cp = 1;
	// 	oData.ps = oPs;
	// 	if ($('#imei').val().length > 0) {
	// 		oData.imei = $('#imei').val();
	// 	}
	// 	if ($('#mac').val().length > 0) {
	// 		oData.mac = $('#mac').val();
	// 	}
	
	// 	common.ajax(oRequestUrl, 'GET', oData, function(res){
	// 		console.log(res);
	// 		if(res.success){
	// 			if ( res.data.list.length > 0 ) {
	// 				var detail=res.data;
	// 				var model=$("#model").html();
	// 				var template=_.template(model)(detail);
	// 				$(".layui-table tbody").html(template);
	// 				$('body').mLoading("hide");
	// 			}else{
	// 				layer.msg('暂无信息',{
	// 					shade: 0.3,
	// 					shadeClose:true,
	// 					time:4000,
	// 					icon: 1
	// 				})
	// 				$('body').mLoading("hide");
	// 			}
	// 			__page(res);
	// 		}else{
	// 			if(res.code == 2001){
	// 				__againLogin(res.message);
	// 			}else{
	// 				var oMsg = res.message;
	// 		        layer.msg('提示,' + oMsg,{
	// 		            shade: 0.3,
	// 		            shadeClose:true,
	// 		            time:2000,
	// 		            icon: 2
	// 		        },
	// 		        function(){
	// 		        	$('body').mLoading("hide");
	//         			$('.page-box').hide();
	// 		        });
	// 			}
	// 		}
	// 	});
	// });

	// 添加
	$('body').on('click', '.add-cover', function(){
        layer.open({
            title:"添加管理员",
            type: 2,
            shadeClose: false, //点击遮罩关闭
            area : ['400px' , '400px'],
            content: 'addPersonAdmin.html',
            end: function(){
            	window.location.reload();
            }
        });
	});

	// 编辑
	$('body').on('click', '.edit_btn', function(){
		var oName = $(this).parent().parent().find('td.username').text();
		var oCoverAdminUserId = $(this).parent().find('span.id').text();
		sessionStorage.oCoverAdminUserId = oCoverAdminUserId;
		layer.open({
            title: '编辑管理员【'+oName+'】信息',
            type: 2,
            shadeClose: false, //点击遮罩关闭
            area : ['400px' , '400px'],
            content: 'editPersonAdmin.html',
            end: function () {
                window.location.reload();
            }
        });
	});

	// 删除
	$('body').on('click', '.delete_btn', function(){
		var oData = {
			userId: $(this).next().text()
		}
		__removeCover(oData)
	});

	function __removeCover(data){
		swal({
		  	title: "是否删除？",
		  	text: "是否需要删除该管理员？",
		  	type: "warning",
		  	showCancelButton: true,
		  	cancelButtonColor:"#ccc",
			cancelButtonText: "取消",
		  	confirmButtonColor: "#3897fd",
		  	confirmButtonText: "是的",
		  	closeOnConfirm: true
		},

		function(){
			var oData = data;
			common.ajax('/HuaXtentCover/admin/users/del', 'POST', oData, function(res){
				if (res.success) {
					var oMsg = res.message || '删除成功';
			        layer.msg('提示,' + oMsg,{
			            shade: 0.3,
			            shadeClose:true,
			            time:2000,
			            icon: 1
			        },
			        function(){
			            location.reload();
			        });
					
				}else{
					if(res.code == 2001){
						__againLogin(res.message);
					}else{
						var oMsg = res.message || '删除失败';
				        layer.msg('提示,' + oMsg,{
				            shade: 0.3,
				            shadeClose:true,
				            time:2000,
				            icon: 2
				        });
				    }
				}
			});
		});
	}

});
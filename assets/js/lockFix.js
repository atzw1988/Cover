$(function(){
	$('[data-father="4"]').addClass('active open');
	$('[data-child="9"]').addClass('active open');
	$('[data-child="9"]').parent().show();
	$('body').mLoading("show");
	// 获取状态值接口modelOption
	common.ajax('/HuaXtentCover/devAlarm/selectStateTypes', 'GET', {
		type:2
	}, function(res){
		if(res.success){
			if(res.data.length > 0){
				var detail=res;
				var modelOption=$("#modelOption").html();
				var template=_.template(modelOption)(detail);
				$("#state").html(template);
			}else{
				layer.msg('暂无状态',{
					shade: 0.3,
					shadeClose:true,
					time:4000,
					icon: 1
				})
				$('body').mLoading("hide");
			}
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
		        });
			}
		}
	})


	var oRequestUrl = '/HuaXtentCover/devAlarm/query';
	var oPs = 15;
	var oProductType = 2;
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
		productType: oProductType,
		ps: oPs,
		cp: 1
	}
	common.ajax(oRequestUrl, 'GET', oData, function(res){
		if(res.success){
			if ( res.data.list.length > 0 ) {
				res.data.list.map(function(item){
					item.reportingTime = new Date(item.reportingTime).Format("yyyy-MM-dd hh:mm:ss");
					// item.voltage = parseFloat(item.voltage) / 10;
				})
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
		        	$(".pages").text('共有0条, 每页显示15条');
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
		oData.productType = oProductType;
		oData.cp = n;
		oData.ps = oPs;
		if ($('#imei').val().length > 0) {
			oData.imei = $('#imei').val();
		}
		if ($('#state').val().length > 0) {
			oData.state = $('#state').val();
		}
		if ($('#test10').val().length > 0) {
			var strStart = $('#test10').val().substring(0, 19).replace(/-/g,'/');
			var dateStart = new Date(strStart);
			oData.startTime = dateStart.getTime();
			var strEnd = $('#test10').val().substring(22, $('#test10').val().length).replace(/-/g,'/');
			var dateEnd = new Date(strEnd);
			oData.engTime = dateEnd.getTime();
		}
		__pageAll(oData)
	}
	function __pageAll(data){
		var oData = data;
		common.ajax(oRequestUrl, 'GET', oData, function(res){
			if(res.success){
				if ( res.data.list.length > 0 ) {
					res.data.list.map(function(item){
						item.reportingTime = new Date(item.reportingTime).Format("yyyy-MM-dd hh:mm:ss");
						// item.voltage = parseFloat(item.voltage) / 10;
					})
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
			        	$(".pages").text('共有0条, 每页显示15条');
			        });
				}
			}
		});
	}

	// 搜索
	$('body').on('click','.search-btn',function(e){
		e.preventDefault();
		$('body').mLoading("show");
		var oData = {};
		oData.productType = oProductType;
		oData.cp = 1;
		oData.ps = oPs;
		if ($('#imei').val().length > 0) {
			oData.imei = $('#imei').val();
		}
		if ($('#state').val().length > 0) {
			oData.state = $('#state').val();
		}
		if ($('#test10').val().length > 0) {
			var strStart = $('#test10').val().substring(0, 19).replace(/-/g,'/');
			var dateStart = new Date(strStart);
			oData.startTime = dateStart.getTime();
			var strEnd = $('#test10').val().substring(22, $('#test10').val().length).replace(/-/g,'/');
			var dateEnd = new Date(strEnd);
			oData.engTime = dateEnd.getTime();
		}
		common.ajax(oRequestUrl, 'GET', oData, function(res){
			if(res.success){
				if ( res.data.list.length > 0 ) {
					res.data.list.map(function(item){
						item.reportingTime = new Date(item.reportingTime).Format("yyyy-MM-dd hh:mm:ss");
						// item.voltage = parseFloat(item.voltage) / 10;
					})
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
			        });
				}
				var oHtml = ' ';
				$(".layui-table tbody").html(oHtml);
				$(".pages").text('共有0条, 每页显示15条');
				$('body').mLoading("hide");
			}
		});
	});

	// 详情
	$('body').on('click', '.detail_btn', function(){
		// console.log($(this).parent().find('span.LockId').text())
		// var oLockId = $(this).parent().find('span.LockId').text();
		var oCoverImei= $(this).parent().parent().find('td.imei').text();
		// common.setData('streetId', $(this).next().next('.id').text())
		sessionStorage.oCoverImei=oCoverImei;
		// sessionStorage.CheweiId=oCheweiId;
		layer.open({
            title: '查看imei号【' + oCoverImei + '】，详情',
            type: 2,
            shadeClose: false, //点击遮罩关闭
						area : ['850px', '750px'],
						offset: '100px',
            content: 'lockFixDetail.html',
            end: function () {
                window.location.reload();
            }

        });
	});

});
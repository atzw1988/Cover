(function () {
	// var oHtml = '<li>' +
	// 	'<a href="index.html" class="waves-effect waves-button">' +
	// 	'<span class="menu-icon icon-home"></span>' +
	// 	'<p>平台总览</p>' +
	// 	'<span class="active-page"></span>' +
	// 	'</a>' +
	// 	'</li>' +
	// 	'<li>' +
	// 	'<a href="coverMap.html" class="waves-effect waves-button">' +
	// 	'<span class="menu-icon icon-globe"></span>' +
	// 	'<p>井盖总览</p>' +
	// 	'<span class="active-page"></span>' +
	// 	'</a>' +
	// 	'</li>' +
	// 	'<li class="droplink active open">' +
	// 	'<a href="#" class="waves-effect waves-button">' +
	// 	'<span class="menu-icon icon-vector"></span>' +
	// 	'<p>井盖设备</p>' +
	// 	'<span class="arrow active-page"></span>' +
	// 	'</a>' +
	// 	'<ul class="sub-menu">' +
	// 	'<li><a href="coverList.html">列表数据</a></li>' +
	// 	'<li><a href="coverStateList.html">运维管理</a></li>' +
	// 	'</ul>' +
	// 	'</li>' +
	// 	'<li class="droplink">' +
	// 	'<a href="#" class="waves-effect waves-button">' +
	// 	'<span class="menu-icon icon-user-follow"></span>' +
	// 	'<p>人员管理</p>' +
	// 	'<span class="arrow"></span>' +
	// 	'</a>' +
	// 	'<ul class="sub-menu">' +
	// 	'<li><a href="personApp.html">用户列表</a></li>' +
	// 	'</ul>' +
	// 	'</li>' +
	// 	'<li>' +
	// 	'<a href="http://huatenlot.cn/envi/Page/ApplianceRepair.php" class="waves-effect waves-button" target="_blank">' +
	// 	'<span class="menu-icon icon-social-twitter"></span>' +
	// 	'<p>任务派工</p>' +
	// 	'<span class="active-page"></span>' +
	// 	'</a>' +
	// 	'</li>' +
	// 	'<li>' +
	// 	'<a href="branch.html" class="waves-effect waves-button">' +
	// 	'<span class="menu-icon icon-users"></span>' +
	// 	'<p>部门管理</p>' +
	// 	'<span class="active-page"></span>' +
	// 	'</a>' +
	// 	'</li>' +
	// 	'<li>' +
	// 	'<a href="visc.html" class="waves-effect waves-button" target="_blank">' +
	// 	'<span class="menu-icon icon-screen-desktop"></span>' +
	// 	'<p>智能管理</p>' +
	// 	'<span class="active-page"></span>' +
	// 	'</a>' +
	// 	'</li>'+
	// 	'<li class="droplink">' +
	// 	'<a href="#" class="waves-effect waves-button">' +
	// 	'<span class="menu-icon icon-vector"></span>' +
	// 	'<p>智能巡检</p>' +
	// 	'<span class="arrow"></span>' +
	// 	'</a>' +
	// 	'<ul class="sub-menu">' +
	// 	'<li><a href="checkpointManage.html">巡防点管理</a></li>' +
	// 	'<li><a href="coverStateList.html">巡防点位置</a></li>' +
	// 	'<li><a href="mission.html">巡防任务</a></li>' +
	// 	'<li><a href="mapNew.html">巡检地图</a></li>' +
	// 	'<li><a href="log.html">巡防日志</a></li>' +
	// 	'<li><a href="management-exception.html">运营管理异常</a></li>' +
	// 	'<li><a href="coverList.html">维修异常</a></li>' +
	// 	'<li><a href="coverStateList.html">异常处理</a></li>' +
	// 	'<li><a href="sopmanagement.html">SOP管理</a></li>' +
	// 	'</ul>' +
	// 	'</li>' +
	// 	'<li class="droplink">' +
	// 	'<a href="#" class="waves-effect waves-button">' +
	// 	'<span class="menu-icon icon-vector"></span>' +
	// 	'<p>巡检统计</p>' +
	// 	'<span class="arrow"></span>' +
	// 	'</a>' +
	// 	'<ul class="sub-menu">' +
	// 	'<li><a href="mis-completion.html">任务完成率统计</a></li>' +
	// 	'<li><a href="soptype.html">SOP类型异常统计</a></li>' +
	// 	'<li><a href="coverList.html">任务完成数量统计</a></li>' +
	// 	'<li><a href="coverStateList.html">任务异常统计</a></li>' +
	// 	'<li><a href="coverList.html">异常整改统计</a></li>' +
	// 	'<li><a href="coverStateList.html">任务完成率月度统计</a></li>' +
	// 	'<li><a href="coverList.html">点检数量统计</a></li>' +
	// 	'<li><a href="coverStateList.html">统计报告</a></li>' +
	// 	'</ul>' +
	// 	'</li>';
	$('.menu,.accordion-menu').html(oHtml);
})();
$(function(){
	$('[data-father="3"]').addClass('active open');
	$('[data-child="5"]').addClass('active open');
	$('[data-child="5"]').parent().show();
	$('body').mLoading("show");
	var oRequestUrl = '/HuaXtentCover/devMng/querys';
	var oStatusUrl = '/HuaXtentCover/devAlarm/selectStateTypes';
	var oPs = 10;
	var oProductType = 1;
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
		console.log(res);
		if(res.success){
			if ( res.data.list.length > 0 ) {
				res.data.list.map(function(item){
					item.installationTime = new Date(item.installationTime).Format("yyyy-MM-dd hh:mm:ss");
					item.updateTime = new Date(item.updateTime).Format("yyyy-MM-dd hh:mm:ss");
				});
				
				var detail=res.data;
				var model=$("#model").html();
				var template=_.template(model)(detail);
				$(".layui-table tbody").html(template);
				$('body').mLoading("hide");
				$('td img').zoomify();
			}else{
				layer.msg('暂无信息',{
					shade: 0.3,
					shadeClose:true,
					time:4000,
					icon: 1
				})
				$(".layui-table tbody").html('');
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
		        	$(".layui-table tbody").html('');
		        	$('body').mLoading("hide");
		        	$(".pages").text('共有0条, 每页显示10条');
		            // window.location.href = 'login.html';
		        });
			}
		}
		
	});
	//获取状态列表
	common.ajax(oStatusUrl, 'GET', {
				type: 1
			}, function (res) {
		console.log(res)
		var detail = res.data;
		var model_sel = $("#model_sel").html();
		var template = '<option value="">全部状态</option>' + 
		_.template(model_sel)(detail);
		$(".sel_status").html(template);
	})
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
		if ($('#cover_name').val().length > 0) {
			oData.name = $('#cover_name').val();
		}
		if ($('#add_name').val().length > 0) {
			oData.addMan = $('#add_name').val();
		}
		if ($('.sel_status').val()) {
			oData.state = $('.sel_status').val();
		}
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
					res.data.list.map(function(item){
						item.installationTime = new Date(item.installationTime).Format("yyyy-MM-dd hh:mm:ss");
						item.updateTime = new Date(item.updateTime).Format("yyyy-MM-dd hh:mm:ss");
					});
					
					var detail=res.data;
					var model=$("#model").html();
					var template=_.template(model)(detail);
					$(".layui-table tbody").html(template);
					$('body').mLoading("hide");
					$('td img').zoomify();
				}else{
					layer.msg('暂无信息',{
						shade: 0.3,
						shadeClose:true,
						time:4000,
						icon: 1
					})
					$(".layui-table tbody").html('');
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
			        	$(".layui-table tbody").html('');
			        	$('body').mLoading("hide");
			        	$(".pages").text('共有0条, 每页显示10条');
			            // window.location.href = 'login.html';
			        });
				}
			}
		});
	}

	// 搜索
	var export_odata = {

	}
	$('body').on('click','.search-btn',function(e){
		e.preventDefault();
		$('body').mLoading("show");
		var oData = {};
		oData.productType = oProductType;
		oData.cp = 1;
		oData.ps = oPs;
		if ($('#imei').val().length > 0) {
			oData.imei = $('#imei').val();
			export_odata.imei = $('#imei').val();
		}else{
			export_odata.imei = ''
		}
		if ($('#cover_name').val().length > 0) {
			oData.name = $('#cover_name').val();
			export_odata.name = $('#cover_name').val();
		}else{
			export_odata.name = ''
		}
		if ($('#add_name').val().length > 0) {
			oData.addMan = $('#add_name').val();
			export_odata.addMan = $('#add_name').val();
		}else{
			export_odata.addMan = ''
		}
		if ($('.sel_status').val()) {
			oData.state = $('.sel_status').val();
			export_odata.state = $('.sel_status').val();
		}else{
			export_odata.state = ''
		}
		// if ($('#mac').val().length > 0) {
		// 	oData.mac = $('#mac').val();
		// }
		console.log(oData)
		common.ajax(oRequestUrl, 'GET', oData, function(res){
			console.log(res);
			if(res.success){
				if ( res.data.list.length > 0 ) {
					res.data.list.map(function(item){
						item.installationTime = new Date(item.installationTime).Format("yyyy-MM-dd hh:mm:ss");
						item.updateTime = new Date(item.updateTime).Format("yyyy-MM-dd hh:mm:ss");
					});
					
					var detail=res.data;
					var model=$("#model").html();
					var template=_.template(model)(detail);
					$(".layui-table tbody").html(template);
					$('body').mLoading("hide");
					$('td img').zoomify();
				}else{
					layer.msg('暂无信息',{
						shade: 0.3,
						shadeClose:true,
						time:4000,
						icon: 1
					})
					$(".layui-table tbody").html('');
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
			        	$(".layui-table tbody").html('');
			        	$('body').mLoading("hide");
			        	$(".pages").text('共有0条, 每页显示10条');
			            // window.location.href = 'login.html';
			        });
				}
			}
		});
	});
	//导出
	$('.export-btn').click((e) => {
		console.log('导出')
		e.preventDefault()
		console.log($.cookie('coverToken'))
		let export_url = common.oUrl() + '/HuaXtentCover/devMng/export?productType=1&token=' + $.cookie('coverToken')
		let data = {
			productType: 1
		}
		if (export_odata.imei) {
			data.imei = export_odata.imei
			export_url = export_url + '&imei=' + export_odata.imei
		}
		if (export_odata.name) {
			data.name = export_odata.name
			export_url = export_url + '&name=' + export_odata.name
		}
		if (export_odata.addMan) {
			data.addMan = export_odata.addMan
			export_url = export_url + '&addMan=' + export_odata.addMan
		}
		if (export_odata.state) {
			data.state = export_odata.state
			export_url = export_url + '&state=' + export_odata.state
		}
		window.open(export_url)
		// common.ajax(export_url, 'POST', data, function (res) {
		// 	console.log(res)
		// })
	})
	// 添加
	$('body').on('click', '.add-cover', function(){
        layer.open({
            title:"添加井盖",
            type: 2,
            shadeClose: false, //点击遮罩关闭
            area : ['440px' , '460px'],
            content: 'addCover.html',
            end: function(){
            	window.location.reload();
            }
        });
	});

	// 编辑
	$('body').on('click', '.edit_btn', function(){
		var oImei = $(this).parent().parent().find('td.imei').text();
		sessionStorage.Imei = oImei;
		layer.open({
            title: '编辑井盖imei号【'+oImei+'】信息',
            type: 2,
            shadeClose: false, //点击遮罩关闭
            area : ['420px', '600px'],
            content: 'editCover.html',
            end: function () {
                window.location.reload();
            }
        });
	});

	// 删除
	$('body').on('click', '.delete_btn', function(){
		var oData = {
			deviceId: $(this).next().next('span.deviceId').text(),
			version: $(this).parent().find('span.version').text(),
			deviceType: $(this).parent().find('span.deviceType').text(),
			productType: oProductType
		}
		__removeCover(oData)
	});

	function __removeCover(data){
		swal({
		  	title: "是否删除？",
		  	text: "是否需要删除该设备？",
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
			common.ajax('/HuaXtentCover/devMng/delete', 'POST', oData, function(res){
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


	// 执行设备
	$('body').on('click', '.perform-btn', function(){
		if($('.num-item').text() == '0'){
			layer.msg('请选择设备,选择设备数不能为零!',{
				shade: 0.3,
				shadeClose:true,
				time:4000,
				icon: 2
			});
			return
		}
		var oData = {};
		if($('.checked_box').length > $(".layui-table tbody tr").length){
			oArr = [];
			for (var i = 0; i < $(".layui-table tbody tr").length; i++) {
				var oImei = $(".layui-table tbody tr").eq(i).find('td.imei').text();
				// var oDeviceId = $(".layui-table tbody tr").eq(i).find('span.deviceId').text();
				// var oItem = oImei + '/' + oDeviceId
				var oItem = oImei
				oArr.push(oItem);
			}
			oData.imei = oArr;
		}else{
			oArr = [];
			for (var i = 0; i < $(".layui-table tbody tr.checked_box").length; i++) {
				var oImei = $(".layui-table tbody tr.checked_box").eq(i).find('td.imei').text();
				var oItem = oImei
				oArr.push(oItem);
			}
			oData.imei = oArr;
		}
		__openPhone(oData);
	});

	function __openPhone(data){

		swal({
		  	title: "是否执行？",
		  	text: "是否添加手机通知？",
		  	type: "warning",
		  	showCancelButton: true,
		  	cancelButtonColor:"#ccc",
			cancelButtonText: "取消",
		  	confirmButtonColor: "#3897fd",
		  	confirmButtonText: "是的",
		  	closeOnConfirm: true
		},
		function(){
			console.log(data)
			layer.prompt({title: '请输入联系手机号。格式如:166xxxx6666,188xxxx8888(中间使用英文逗号隔开)', formType: 2, area: ['500px', '300px']}, function(text, index){
                // layer.msg('请求发送');
                
                // layer.msg('您最后写下了：'+text);
                var oRegex = /^(1[3456789]\d{9}\s*,\s*)*(1[3456789]\d{9}$)/
                if(!oRegex.test(text) && text.length > 0){
                	layer.msg('输入格式错误');
                	return
                }
                if(text.length > 119){
                	layer.msg('不能多于10个手机号码');
                	return
                }

                layer.load();
                layer.close(index);
                data.sharePhone = text;
                console.log(data)
                common.ajax('/HuaXtentCover/devMng/phoneNotify', 'POST', data, function(res){
                    layer.closeAll('loading');
                    if (res.success) {
                        layer.msg(res.data);
                        window.location.reload();
                    }else{
      //               	if(res.code == 401){
      //               		common.loginToken();
						// }
                        layer.msg(res.message, {icon: 2});
                    }
                });
            });
		});
	}

});
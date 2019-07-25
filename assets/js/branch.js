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
	// 	'<li class="droplink">' +
	// 	'<a href="#" class="waves-effect waves-button">' +
	// 	'<span class="menu-icon icon-vector"></span>' +
	// 	'<p>井盖设备</p>' +
	// 	'<span class="arrow"></span>' +
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
	// 	'<li class="active open">' +
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
	if($.cookie('coverDeptId') != 1){
		$('.search-toggle').hide();
	}
	$('[data-father="11"]').addClass('active open');
	// $('[data-child="5"]').addClass('active open');
	// $('[data-child="5"]').parent().show();
	$('body').mLoading("show");
	var oRequestUrl = '/HuaXtentCover/dept/querys';
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
				res.data.list.map(function(item){
					item.addTime = new Date(item.addTime).Format("yyyy-MM-dd hh:mm:ss");
				})
				var detail=res.data;
				var model=$("#model").html();
				var template=_.template(model)(detail);
				$(".layui-table tbody").html(template);
				$('body').mLoading("hide");
			}else{
				var oHtml = '<tr>目前暂无信息，可前往添加!</tr>'
				$(".layui-table tbody").html(oHtml);
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
		            // window.location.href = 'login.html';
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
					res.data.list.map(function(item){
						item.addTime = new Date(item.addTime).Format("yyyy-MM-dd hh:mm:ss");
					})
					var detail=res.data;
					var model=$("#model").html();
					var template=_.template(model)(detail);
					$(".layui-table tbody").html(template);
					$('body').mLoading("hide");
				}else{
					var oHtml = '<tr>目前暂无信息，可前往添加!</tr>'
					$(".layui-table tbody").html(oHtml);
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
			            // window.location.href = 'login.html';
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
	// 				res.data.list.map(function(item){
	// 					item.addTime = new Date(item.addTime).Format("yyyy-MM-dd hh:mm:ss");
	// 				})
	// 				var detail=res.data;
	// 				var model=$("#model").html();
	// 				var template=_.template(model)(detail);
	// 				$(".layui-table tbody").html(template);
	// 				$('body').mLoading("hide");
	// 			}else{
	// 				var oHtml = '<tr>目前暂无信息，可前往添加!</tr>'
	// 				$(".layui-table tbody").html(oHtml);
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
	// 	        		$('.page-box').hide();
	// 		            // window.location.href = 'login.html';
	// 		        });
	// 			}
	// 			var oHtml = '<tr>目前暂无信息，可前往添加!</tr>';
	// 			$(".layui-table tbody").html(oHtml);
	// 			__page(res);
	// 			$('body').mLoading("hide");
	// 		}
	// 	});
	// });

	// 添加
	$('body').on('click', '.add-cover', function(){
        layer.open({
            title:"添加部门",
            type: 2,
            shadeClose: false, //点击遮罩关闭
            area : ['440px' , '560px'],
            content: 'addBranch.html',
            end: function(){
            	window.location.reload();
            }
        });
	});

	// 编辑
	$('body').on('click', '.edit_btn', function(){
		var oDeptName = $(this).parent().parent().find('td.deptName').text();
		var oCoverDeptId = $(this).parent().find('span.id').text();
		sessionStorage.oCoverDeptId = oCoverDeptId;
		layer.open({
            title: '编辑部门【'+oDeptName+'】信息',
            type: 2,
            shadeClose: false, //点击遮罩关闭
            area : ['440px', '560px'],
            content: 'editBranch.html',
            end: function () {
                window.location.reload();
            }
        });
	});

	// 角色
	$('body').on('click', '.roles_btn', function(){
		var oDeptName = $(this).parent().parent().find('td.deptName').text();
		var oCoverDeptId = $(this).parent().find('span.id').text();
		sessionStorage.oCoverDeptId = oCoverDeptId;
		layer.open({
            title: '为部门【'+oDeptName+'】设置角色',
            type: 2,
            shadeClose: false, //点击遮罩关闭
            area : ['440px', '460px'],
            content: 'addRoles.html',
            end: function () {
                window.location.reload();
            }
        });
	});

	// 删除
	$('body').on('click', '.delete_btn', function(){
		var oData = {
			deptId: $(this).next().text()
		}
		__removeCover(oData)
	});

	function __removeCover(data){
		swal({
		  	title: "删除会清空部门名下所有用户！",
		  	text: "是否删除？",
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
			common.ajax('/HuaXtentCover/dept/del', 'POST', oData, function(res){
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
				        },
				        function(){
				            // location.reload();
				        });
					}
					
				}
			});
		});
	}

});
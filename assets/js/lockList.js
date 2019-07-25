
$(function(){
	$('[data-father="4"]').addClass('active open');
	$('[data-child="8"]').addClass('active open');
	$('[data-child="8"]').parent().show();
	$('body').mLoading("show");
	var oRequestUrl = '/HuaXtentCover/devMng/querys';
	var oStatusUrl = '/HuaXtentCover/devAlarm/selectStateTypes';
	var oPs = 10;
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
		console.log(res);
		if(res.success){
			if ( res.data.list.length > 0 ) {
				res.data.list.map(function(item){
					item.installationTime = new Date(item.installationTime).Format("yyyy-MM-dd hh:mm:ss");
					item.updateTime = new Date(item.updateTime).Format("yyyy-MM-dd hh:mm:ss");
				})
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
				$('body').mLoading("hide");
				$(".layui-table tbody").html('');
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
		        	$(".layui-table tbody").html('');
		        	$(".pages").text('共有0条, 每页显示10条');
		            // window.location.href = 'login.html';
		        });
			}
		}
		
	});
	//获取状态列表
	common.ajax(oStatusUrl, 'GET', {
		type: 2
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
					})
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
					$('body').mLoading("hide");
					$(".layui-table tbody").html('');
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
			        	$(".layui-table tbody").html('');
			        	$(".pages").text('共有0条, 每页显示10条');
			            // window.location.href = 'login.html';
			        });
				}
			}
		});
	}

	// 搜索
	var export_data = {}
	$('body').on('click','.search-btn',function(e){
		e.preventDefault();
		$('body').mLoading("show");
		var oData = {};
		oData.productType = oProductType;
		oData.cp = 1;
		oData.ps = oPs;
		if ($('#imei').val().length > 0) {
			oData.imei = $('#imei').val();
			export_data.imei = $('#imei').val();
		}else{
			export_data.imei = ''
		}
		if ($('#cover_name').val().length > 0) {
			oData.name = $('#cover_name').val();
			export_data.name = $('#cover_name').val();
		}else{
			export_data.name = ''
		}
		if ($('#add_name').val().length > 0) {
			oData.addMan = $('#add_name').val();
			export_data.addMan = $('#add_name').val();
		}else{
			export_data.addMan = ''
		}
		if ($('.sel_status').val()) {
			oData.state = $('.sel_status').val();
			export_data.state = $('.sel_status').val();
		}else{
			export_data.state = ''
		}
		// if ($('#mac').val().length > 0) {
		// 	oData.mac = $('#mac').val();
		// }
	
		common.ajax(oRequestUrl, 'GET', oData, function(res){
			console.log(res);
			if(res.success){
				if ( res.data.list.length > 0 ) {
					res.data.list.map(function(item){
						item.installationTime = new Date(item.installationTime).Format("yyyy-MM-dd hh:mm:ss");
						item.updateTime = new Date(item.updateTime).Format("yyyy-MM-dd hh:mm:ss");
					})
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
					$('body').mLoading("hide");
					$(".layui-table tbody").html('');
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
			        	$(".layui-table tbody").html('');
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
		let export_url = common.oUrl() + '/HuaXtentCover/devMng/export?productType=2&token=' + $.cookie('coverToken')
		let data = {
			productType: 1
		}
		if (export_data.imei) {
			data.imei = export_data.imei
			export_url = export_url + '&imei=' + export_data.imei
		}
		if (export_data.name) {
			data.name = export_data.name
			export_url = export_url + '&name=' + export_data.name
		}
		if (export_data.addMan) {
			data.addMan = export_data.addMan
			export_url = export_url + '&addMan=' + export_data.addMan
		}
		if (export_data.state) {
			data.state = export_data.state
			export_url = export_url + '&state=' + export_data.state
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

	var goEasy = new GoEasy({appkey:'BC-fc612021f70c4deab0053d74b3908295'});

	// 设/撤防
	$('body').on('click', '.set_off_btn', function(){
		var oData = {
			imei: $(this).parent().parent().find('td.imei').text(),
			deviceId: $(this).parent().find('span.deviceId').text(),
			productType: 2,
			deviceType: parseInt($(this).parent().find('span.deviceType').text())
		};
		__setOff(oData);
	});
	function __setOff(data){
		layer.confirm('是否设/撤防？', {
            btn: ['确定', '取消']
        }, function () {
            var oData = data
			layer.confirm('请选择设防或撤防？', {
				btn: ['设防', '撤防'] //可以无限个按钮
			}, function(index, layero){
				oData.cotrolType = 1;
				layer.close(index);
				common.ajax('/HuaXtentCover/devMng/cmd/control', 'post', oData, function(res){
					if (res.success) {
						if(res.code == 500){
							window.location.href = '500.html'
							return
						}
						var oMsg = res.message || '下发成功！';
				        layer.msg('提示,' + oMsg,{
				            shade: 0.3,
				            shadeClose:true,
				            time:2000,
				            icon: 1
				        },
				        function(){
				            // 监控
				        	goEasy.subscribe({
						        channel: res.data, //通道
						        onMessage: function(message){
						            if(window.location.pathname.indexOf('lockList.html') != -1){
						                var oResult = JSON.parse(message.content);
						                if(oResult){
						                	var oMsg = '设防成功！';
									        layer.msg('提示,' + oMsg,{
									            shade: 0.3,
									            shadeClose:true,
									            time:2000,
									            icon: 1
									        });
									        goEasy.unsubscribe({
							        			channel: res.data
							        		});
						                }else{
						                	var oMsg = '设防失败！';
									        layer.msg('提示,' + oMsg,{
									            shade: 0.3,
									            shadeClose:true,
									            time:2000,
									            icon: 2
									        });
						                }
						            }
						        }
						    });
				        });
					}else{
						if(res.code == 500){
							window.location.href = '500.html'
							return
						}
						var oMsg = res.message || '下发失败！';
				        layer.msg('提示,' + oMsg,{
				            shade: 0.3,
				            shadeClose:true,
				            time:2000,
				            icon: 2
				        });
					}
				});
			}, function(index){
				oData.cotrolType = 0;
				layer.close(index);
				common.ajax('/HuaXtentCover/devMng/cmd/control', 'post', oData, function(res){
					if (res.success) {
						if(res.code == 500){
							window.location.href = '500.html'
							return
						}
						var oMsg = res.message || '下发成功！';
				        layer.msg('提示,' + oMsg,{
				            shade: 0.3,
				            shadeClose:true,
				            time:2000,
				            icon: 1
				        },
				        function(){
				            // 监控
						    goEasy.subscribe({
						        channel: res.data, //通道
						        onMessage: function(message){
						            if(window.location.pathname.indexOf('lockList.html') != -1){
						                var oResult = JSON.parse(message.content);
						                if(oResult){
						                	var oMsg = '撤防成功！';
									        layer.msg('提示,' + oMsg,{
									            shade: 0.3,
									            shadeClose:true,
									            time:2000,
									            icon: 1
									        });
									        goEasy.unsubscribe({
							        			channel: res.data
							        		});
						                }else{
						                	var oMsg = '撤防失败！';
									        layer.msg('提示,' + oMsg,{
									            shade: 0.3,
									            shadeClose:true,
									            time:2000,
									            icon: 2
									        });
						                }
						            }
						        }
						    });
				        });
					}else{
						if(res.code == 500){
							window.location.href = '500.html'
							return
						}
						var oMsg = res.message || '下发失败！';
				        layer.msg('提示,' + oMsg,{
				            shade: 0.3,
				            shadeClose:true,
				            time:2000,
				            icon: 2
				        });
					}
				});
			});
        });
	}
	// 开/关锁
	$('body').on('click', '.switch_btn', function(){
		var oData = {
			imei: $(this).parent().parent().find('td.imei').text(),
			deviceId: $(this).parent().find('span.deviceId').text(),
			productType: 2,
			deviceType: parseInt($(this).parent().find('span.deviceType').text())
		};
		__switch(oData)
	});
	function __switch(data){
		layer.confirm('是否开/关锁？', {
            btn: ['确定', '取消']
        }, function () {
            var oData = data
			layer.confirm('请选择开锁或关锁？', {
				btn: ['开锁', '关锁'] //可以无限个按钮
			}, function(index, layero){
				oData.cotrolType = 3;
				layer.close(index);
				common.ajax('/HuaXtentCover/devMng/cmd/control', 'post', oData, function(res){
					if (res.success) {
						if(res.code == 500){
							window.location.href = '500.html'
							return
						}
						var oMsg = res.message || '下发成功！';
				        layer.msg('提示,' + oMsg,{
				            shade: 0.3,
				            shadeClose:true,
				            time:2000,
				            icon: 1
				        },
				        function(){
				            // 监控
						    goEasy.subscribe({
						        channel: res.data, //通道
						        onMessage: function(message){
						        	console.log(message.content);
						            if(window.location.pathname.indexOf('lockList.html') != -1){

						                var oResult = JSON.parse(message.content);
						                if(oResult){
						                	var oMsg = '开锁成功！';
									        layer.msg('提示,' + oMsg,{
									            shade: 0.3,
									            shadeClose:true,
									            time:2000,
									            icon: 1
									        });
						                    var oIemi = oData.imei
									        for(var i = 0; i < $('.imei').length; i++){
									        	if($('.imei').eq(i).text() == oIemi){
									        		$('.imei').eq(i).parent().find('td.lock').text('开启');
									        		$('.imei').eq(i).parent().find('td.lock').css({'color':'red'});
									        		goEasy.unsubscribe({
									        			channel: res.data
									        		});
									        		i = $('.imei').length;
									        	}
									        }
						                }else{
						                	var oMsg = '开锁失败！';
									        layer.msg('提示,' + oMsg,{
									            shade: 0.3,
									            shadeClose:true,
									            time:2000,
									            icon: 2
									        });
						                }
						            }
						        }
						    });
				        });
					}else{
						if(res.code == 500){
							window.location.href = '500.html'
							return
						}
						var oMsg = res.message || '下发失败！';
				        layer.msg('提示,' + oMsg,{
				            shade: 0.3,
				            shadeClose:true,
				            time:2000,
				            icon: 2
				        });
					}
				});
			}, function(index){
				oData.cotrolType = 2;
				layer.close(index);
				console.log(oData);
				common.ajax('/HuaXtentCover/devMng/cmd/control', 'post', oData, function(res){
					if (res.success) {
						if(res.code == 500){
							window.location.href = '500.html'
							return
						}
						var oMsg = res.message || '下发成功！';
				        layer.msg('提示,' + oMsg,{
				            shade: 0.3,
				            shadeClose:true,
				            time:2000,
				            icon: 1
				        },
				        function(){
				            goEasy.subscribe({
						        channel: res.data, //通道
						        onMessage: function(message){
						        	console.log(message.content);
						            if(window.location.pathname.indexOf('lockList.html') != -1){
						            	
						                var oResult = JSON.parse(message.content);
						                
						                if(oResult){
						                	var oMsg = '关锁成功！';
									        layer.msg('提示,' + oMsg,{
									            shade: 0.3,
									            shadeClose:true,
									            time:2000,
									            icon: 1
									        });
						                    var oIemi = oData.imei
									        for(var i = 0; i < $('.imei').length; i++){
									        	if($('.imei').eq(i).text() == oIemi){
									        		$('.imei').eq(i).parent().find('td.lock').text('关闭');
									        		$('.imei').eq(i).parent().find('td.lock').css({'color':'#30B19B'});
									        		goEasy.unsubscribe({
									        			channel: res.data
									        		});
									        		i = $('.imei').length;
									        	}
									        }
						                }else{
						                	var oMsg = '关锁失败！';
									        layer.msg('提示,' + oMsg,{
									            shade: 0.3,
									            shadeClose:true,
									            time:2000,
									            icon: 2
									        });
						                }
						            }
						        }
						    });
				        });
					}else{
						if(res.code == 500){
							window.location.href = '500.html'
							return
						}
						var oMsg = res.message || '下发失败！';
				        layer.msg('提示,' + oMsg,{
				            shade: 0.3,
				            shadeClose:true,
				            time:2000,
				            icon: 2
				        });
					}
				});
			});
        });
	}
});
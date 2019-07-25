(function () {
		// var oHtml = '<li class="active open">'+
		// 				'<a href="index.html" class="waves-effect waves-button">'+
		// 					'<span class="menu-icon icon-home"></span>'+
		// 					'<p>平台总览</p>'+
		// 					'<span class="active-page"></span>'+
		// 				'</a>'+
		// 			'</li>'+
		// 			'<li>'+
		// 				'<a href="coverMap.html" class="waves-effect waves-button">'+
		// 					'<span class="menu-icon icon-globe"></span>'+
		// 					'<p>井盖总览</p>'+
		// 					'<span class="active-page"></span>'+
		// 				'</a>'+
		// 			'</li>'+
		// 			'<li class="droplink">'+
	    //                 '<a href="#" class="waves-effect waves-button">'+
	    //                     '<span class="menu-icon icon-vector"></span>'+
	    //                     '<p>井盖设备</p>'+
	    //                     '<span class="arrow"></span>'+
	    //                 '</a>'+
	    //                 '<ul class="sub-menu">'+
	    //                     '<li><a href="coverList.html">列表数据</a></li>'+
	    //                     '<li><a href="coverStateList.html">运维管理</a></li>'+
	    //                 '</ul>'+
        //             '</li>'+
        //             '<li class="droplink">' +
        //                 '<a href="#" class="waves-effect waves-button">' +
        //                     '<span class="menu-icon icon-user-follow"></span>' +
        //                         '<p>人员管理</p>' +
        //                     '<span class="arrow"></span>' +
        //                 '</a>' +
        //                 '<ul class="sub-menu">' +
        //                     '<li><a href="personApp.html">用户列表</a></li>' +
        //                 '</ul>' +
        //             '</li>' +
		// 			'<li>'+
		// 				'<a href="http://huatenlot.cn/envi/Page/ApplianceRepair.php" class="waves-effect waves-button" target="_blank">'+
		// 					'<span class="menu-icon icon-social-twitter"></span>'+
		// 					'<p>任务派工</p>'+
		// 					'<span class="active-page"></span>'+
		// 				'</a>'+
		// 			'</li>'+
		// 			'<li>'+
		// 				'<a href="branch.html" class="waves-effect waves-button">'+
		// 					'<span class="menu-icon icon-users"></span>'+
		// 					'<p>部门管理</p>'+
		// 					'<span class="active-page"></span>'+
		// 				'</a>'+
		// 			'</li>'+
		// 			'<li>'+
		// 				'<a href="visc.html" class="waves-effect waves-button" target="_blank">'+
		// 					'<span class="menu-icon icon-screen-desktop"></span>'+
		// 					'<p>智能管理</p>'+
		// 					'<span class="active-page"></span>'+
		// 				'</a>'+
        //             '</li>'+
        //             '<li class="droplink">' +
        //                 '<a href="#" class="waves-effect waves-button">' +
        //                     '<span class="menu-icon icon-screen-desktop"></span>' +
        //                         '<p>智能巡检</p>' +
        //                     '<span class="arrow"></span>' +
        //                 '</a>' +
        //                 '<ul class="sub-menu">' +
        //                     '<li><a href="checkpointManage.html">巡防点管理</a></li>' +
        //                     '<li><a href="coverStateList.html">巡防点位置</a></li>' +
        //                     '<li><a href="mission.html">巡防任务</a></li>' +
        //                     '<li><a href="mapNew.html">巡检地图</a></li>' +
        //                     '<li><a href="log.html">巡防日志</a></li>' +
        //                     '<li><a href="management-exception.html">运营管理异常</a></li>' +
        //                     '<li><a href="coverList.html">维修异常</a></li>' +
        //                     '<li><a href="coverStateList.html">异常处理</a></li>' +
        //                     '<li><a href="sopmanagement.html">SOP管理</a></li>' +
        //                 '</ul>' +
        //             '</li>'+
        //             '<li class="droplink">' +
        //                 '<a href="#" class="waves-effect waves-button">' +
        //                     '<span class="menu-icon icon-vector"></span>' +
        //                         '<p>巡检统计</p>' +
        //                     '<span class="arrow"></span>' +
        //                 '</a>' +
        //                 '<ul class="sub-menu">' +
        //                     '<li><a href="mis-completion.html">任务完成率统计</a></li>' +
        //                     '<li><a href="soptype.html">SOP类型异常统计</a></li>' +
        //                     '<li><a href="coverList.html">任务完成数量统计</a></li>' +
        //                     '<li><a href="coverStateList.html">任务异常统计</a></li>' +
        //                     '<li><a href="coverList.html">异常整改统计</a></li>' +
        //                     '<li><a href="coverStateList.html">任务完成率月度统计</a></li>' +
        //                     '<li><a href="coverList.html">点检数量统计</a></li>' +
        //                     '<li><a href="coverStateList.html">统计报告</a></li>' +
        //                 '</ul>' +
        //             '</li>';
    	$('.menu,.accordion-menu').html(oHtml);
})();

// 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'));

    // 指定图表的配置项和数据
    option = {
	    title : {
	        text: '井盖故障原因比例',
	        subtext: '统计数据图',
	        x:'center'
	    },
	    tooltip : {
	        trigger: 'item',
	        formatter: "{a} <br/>{b} : {c} ({d}%)"
	    },
	    legend: {
	        orient: 'vertical',
	        left: 'left',
	        data: ['人为破坏','寿命损坏','电池耗尽','浸泡破坏','其他原因']
	    },
	    series : [
	        {
	            name: '故障原因',
	            type: 'pie',
	            radius : '55%',
	            center: ['50%', '60%'],
	            data:[
	                {value:335, name:'人为破坏'},
	                {value:310, name:'寿命损坏'},
	                {value:234, name:'电池耗尽'},
	                {value:135, name:'浸泡破坏'},
	                {value:1548, name:'其他原因'}
	            ],
	            itemStyle: {
	                emphasis: {
	                    shadowBlur: 10,
	                    shadowOffsetX: 0,
	                    shadowColor: 'rgba(0, 0, 0, 0.5)'
	                }
	            }
	        }
	    ]
	};


    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);

    // 图改变窗口自动刷新
	$(window).resize(function(){
        myChart.resize();
        foldLine.resize();
        columnar.resize();

    });

    /*排单向上轮回*/
	// var share=document.getElementById("share_content"),
	// 	oStart=true;
	// share.innerHTML+=share.innerHTML;
	// share.onmouseover=function(){oStart=false};
	// share.onmouseout=function(){oStart=true};
	// new function (){
	// 	var stop=share.scrollTop%55==0&&!oStart;
	// 	if(!stop)share.scrollTop==parseInt(share.scrollHeight/2)?share.scrollTop=0:share.scrollTop++;
	// 	setTimeout(arguments.callee,share.scrollTop%30?10:1500);
	// };

	/*帮助信息向上轮回*/
	var box=document.getElementById("problem_content"),
		can=true;
	box.innerHTML+=box.innerHTML;
	box.onmouseover=function(){can=false};
	box.onmouseout=function(){can=true};
	new function (){
		var stop=box.scrollTop%55==0&&!can;
		if(!stop)box.scrollTop==parseInt(box.scrollHeight/2)?box.scrollTop=0:box.scrollTop++;
		setTimeout(arguments.callee,box.scrollTop%30?10:1500);
	};

	// 基于准备好的dom，初始化echarts实例
    var foldLine = echarts.init(document.getElementById('foldLine'));

    // 指定图表的配置项和数据
    function randomData() {
    now = new Date(+now + oneDay);
    value = value + Math.random() * 21 - 10;
    return {
        name: now.toString(),
        value: [
            [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
            Math.round(value)
        ]
    }
}

var data = [];
var now = +new Date(2016, 3, 3);
var oneDay = 24 * 3600 * 1000;
var value = Math.random() * 1000;
for (var i = 0; i < 100; i++) {
    data.push(randomData());
}
// console.log(data);
option = {
    title: {
        text: '维修统计记录'
    },
    tooltip: {
        trigger: 'axis',
        formatter: function (params) {
            params = params[0];
            var date = new Date(params.name);
            return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
        },
        axisPointer: {
            animation: false
        }
    },
    xAxis: {
        type: 'time',
        splitLine: {
            show: false
        }
    },
    yAxis: {
        type: 'value',
        boundaryGap: [0, '100%'],
        splitLine: {
            show: false
        }
    },
    series: [{
        name: '模拟数据',
        type: 'line',
        showSymbol: false,
        hoverAnimation: false,
        data: data
    }]
};

setInterval(function () {
    for (var i = 0; i < 5; i++) {
        data.shift();
        data.push(randomData());
    }
    // console.log(data);
    foldLine.setOption({
        series: [{
            data: data
        }]
    });
}, 1000);


    // 使用刚指定的配置项和数据显示图表。
    foldLine.setOption(option);


    var columnar = echarts.init(document.getElementById('columnar'));
    // app.title = '坐标轴刻度与标签对齐';

option = {
    title: {
        text: '井盖区域分布数量'
    },
    color: ['#3398DB'],
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            data : ['宝安区', '龙岗区', '南山区', '福田区', '龙华区', '罗湖区'],
            axisTick: {
                alignWithLabel: true
            }
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'井盖数',
            type:'bar',
            barWidth: '60%',
            data:[10, 52, 200, 334, 390, 330]
        }
    ]
};

columnar.setOption(option);

$(function(){
	$('[data-father="1"]').addClass('active open')
});

// $(function(){
// 	$('body').mLoading("show");
// 	function __againLogin(data){
// 		swal({

// 		  	title: data,

// 		  	text: "请重新登录",

// 		  	type: "warning",

// 		  	showCancelButton: false,

// 		  	confirmButtonColor: "#3897fd",

// 		  	confirmButtonText: "确定",

// 		  	closeOnConfirm: false

// 		},

// 		function(isConfirm){
// 			var oData = data;
// 			if (isConfirm) {
// 				window.location.href = 'login.html';
// 			}else{
// 				window.location.href = 'login.html';
// 			}
// 		});
// 	}
// 	var oData = {
// 		gatewayId: '',
// 		pageIndex: 1
// 	}
// 	common.ajax('/lock/selectgateway',oData,function(res){
// 		// console.log(res);
// 		if(res.success){
// 			if ( res.data.length > 0 ) {
// 				var detail=res;
// 				var model=$("#model").html();
// 				var template=_.template(model)(detail);
// 				$(".layui-table tbody").html(template);
// 				$('body').mLoading("hide");
// 			}else{
// 				var oHtml = '<tr>目前暂无地锁信息，可前往添加!</tr>'
// 				$(".layui-table tbody").html(oHtml);
// 				$('body').mLoading("hide");
// 			}
// 			__page(res);
// 		}else{
// 			__againLogin(res.data.Msg);
// 		}
		
// 	});

// 	function __page(res){
// 		Page({
// 			num: res.tp,					//页码数
// 			startnum:res.pc,				//指定页码
// 			elem:$('#page1'),		//指定的元素
// 			callback:function(n){	//回调函数
// 				console.log(n);
// 				__pagesNext(n);
// 			}
// 		});
// 		var oText = '共有'+ res.tr +'条, 每页显示'+ res.ps +'条';
// 		$('.pages').html(oText);
// 		if (res.tp > 1 ) {
// 			$('.pageJump').show();
// 		}else{
// 			$('.pageJump').hide();
// 		}
// 	}

// 	function __pagesNext(n){
// 		$('body').mLoading("show");
// 		var oData = {};
// 		oData.pageIndex = n;
// 		if ($('#car_name').val().length > 0) {
// 			oData.gatewayId = $('#car_name').val();
// 		}else{
// 			oData.gatewayId = '';
// 		}
// 		__pageAll(oData)
// 	}
// 	function __pageAll(data){
// 		var oData = data;
// 		common.ajax('/lock/selectgateway',oData,function(res){
// 			console.log(res);
// 			if(res.success){
// 				if ( res.data.length > 0 ) {
// 					var detail=res;
// 					var model=$("#model").html();
// 					var template=_.template(model)(detail);
// 					$(".layui-table tbody").html(template);
// 					$('body').mLoading("hide");
// 				}else{
// 					var oHtml = '<tr>目前暂无地锁信息，可前往添加!</tr>'
// 					$(".layui-table tbody").html(oHtml);
// 					$('body').mLoading("hide");
// 				}
// 				__page(res);
// 			}else{
// 				__againLogin(res.data.Msg);
// 				// swal("提示", res.data.Msg, "error");
// 			}
// 		});
// 	}

// 	// 搜索
// 	$('body').on('click','.search-btn',function(e){
// 		e.preventDefault();
// 		$('body').mLoading("show");
// 		var oData = {};

// 		if($('#car_name').val().length > 0){
// 			oData.gatewayId = $('#car_name').val();
// 		}else{
// 			oData.gatewayId = '';
// 		}
// 		oData.pageIndex = 1;
// 		common.ajax('/lock/selectgateway',oData,function(res){
// 			console.log(res);
// 			if(res.success){
// 				if ( res.data.length > 0 ) {
// 					var detail=res;
// 					var model=$("#model").html();
// 					var template=_.template(model)(detail);
// 					$(".layui-table tbody").html(template);
// 					$('body').mLoading("hide");
// 				}else{
// 					var oHtml = '<tr>目前暂无地锁信息，可前往添加!</tr>'
// 					$(".layui-table tbody").html(oHtml);
// 					$('body').mLoading("hide");
// 				}
// 				__page(res);
// 			}else{
// 				__againLogin(res.data.Msg);
// 				// swal("提示", res.data.Msg, "error");
// 			}
// 		});
// 	});


// 	// 查看拥有地锁
// 	$('body').on('click', '.look_btn', function(){
// 		// console.log($(this).parent().find('span.LockId').text())
// 		var oGatewayId = $(this).parent().parent().find('td.gatewayId').text();
// 		// common.setData('streetId', $(this).next().next('.id').text())
// 		sessionStorage.GatewayId=oGatewayId;
// 		// sessionStorage.CheweiId=oCheweiId;
// 		layer.open({
//             title: '查看网关【' + oGatewayId + '】拥有的地锁',
//             type: 2,
//             shadeClose: false, //点击遮罩关闭
//             area : ['1000px', '800px'],
//             content: 'lookGateway.html',
//             end: function () {
//                 window.location.reload();
//             }
//         });
// 	});

// 	// 添加地锁
// 	$('body').on('click', '.add_btn', function(){
// 		var oGatewayId = $(this).parent().parent().find('td.gatewayId').text();
// 		sessionStorage.GatewayId=oGatewayId;
// 		layer.open({
//             title: '网关【' + oGatewayId + '】添加地锁',
//             type: 2,
//             shadeClose: false, //点击遮罩关闭
//             area : ['500px', '400px'],
//             content: 'addLock.html',
//             end: function () {
//                 window.location.reload();
//             }
//         });
// 	})

// 	// 关闭网关
// 	$('body').on('click', '.close_btn', function(){
// 		var oData = {
// 			gatewayId: $(this).parent().parent().find('td.gatewayId').text()
// 		}
// 		__closeGateway(oData);
// 	});

// 	function __closeGateway(data){
// 		swal({

// 		  	title: "是否关闭？",

// 		  	text: "是否需要关闭该网关？",

// 		  	type: "warning",

// 		  	showCancelButton: true,

// 		  	cancelButtonColor:"#ccc",

// 			cancelButtonText: "取消",

// 		  	confirmButtonColor: "#3897fd",

// 		  	confirmButtonText: "是的",

// 		  	closeOnConfirm: false

// 		},

// 		function(){
// 			var oData = data;
// 			common.ajax('/lock/closegateway',oData,function(res){
// 				if (res.data.Success) {
// 					swal({

// 						title: "提示",

// 						text: res.data.Msg,

// 						type: "success",

// 						showCancelButton: false,

// 						cancelButtonColor:"#ccc",

// 						cancelButtonText: "取消",

// 						confirmButtonColor: "#3897fd",

// 						confirmButtonText: "是的",

// 						closeOnConfirm: true,

// 						closeOnCancel: false

// 					},function(isConfirm){
// 						if (isConfirm) {
// 							location.reload();
// 						}else{
// 							location.reload();
// 						}
// 					});
					
// 				}else{
// 					swal("提示", res.data.Msg, "error");
// 				}
// 			});
// 		});
// 	}

// 	// 重启网关
// 	$('body').on('click', '.restarte_btn', function(){
// 		var oData = {
// 			gatewayId: $(this).parent().parent().find('td.gatewayId').text()
// 		}
// 		__restarteGateway(oData)
// 	});

// 	function __restarteGateway(data){
// 		swal({

// 		  	title: "是否重启？",

// 		  	text: "是否需要重启该网关？",

// 		  	type: "warning",

// 		  	showCancelButton: true,

// 		  	cancelButtonColor:"#ccc",

// 			cancelButtonText: "取消",

// 		  	confirmButtonColor: "#3897fd",

// 		  	confirmButtonText: "是的",

// 		  	closeOnConfirm: false

// 		},

// 		function(){
// 			var oData = data;
// 			common.ajax('/lock/rebootgateway',oData,function(res){
// 				if (res.data.Success) {
// 					swal({

// 						title: "提示",

// 						text: res.data.Msg,

// 						type: "success",

// 						showCancelButton: false,

// 						cancelButtonColor:"#ccc",

// 						cancelButtonText: "取消",

// 						confirmButtonColor: "#3897fd",

// 						confirmButtonText: "是的",

// 						closeOnConfirm: true,

// 						closeOnCancel: false

// 					},function(isConfirm){
// 						if (isConfirm) {
// 							location.reload();
// 						}else{
// 							location.reload();
// 						}
// 					});
					
// 				}else{
// 					swal("提示", res.data.Msg, "error");
// 				}
// 			});
// 		});
// 	}

// 	// 删除网关
// 	$('body').on('click', '.delete_btn', function(){
// 		var oData = {
// 			gatewayId: $(this).parent().parent().find('td.gatewayId').text()
// 		}
// 		__deleteGateway(oData);
// 	});

// 	function __deleteGateway(data){
// 		swal({

// 		  	title: "是否删除？",

// 		  	text: "是否需要删除该网关？",

// 		  	type: "warning",

// 		  	showCancelButton: true,

// 		  	cancelButtonColor:"#ccc",

// 			cancelButtonText: "取消",

// 		  	confirmButtonColor: "#3897fd",

// 		  	confirmButtonText: "是的",

// 		  	closeOnConfirm: false

// 		},

// 		function(){
// 			var oData = data;
// 			common.ajax('/lock/deletegateway',oData,function(res){
// 				if (res.data.Success) {
// 					swal({

// 						title: "提示",

// 						text: res.data.Msg,

// 						type: "success",

// 						showCancelButton: false,

// 						cancelButtonColor:"#ccc",

// 						cancelButtonText: "取消",

// 						confirmButtonColor: "#3897fd",

// 						confirmButtonText: "是的",

// 						closeOnConfirm: true,

// 						closeOnCancel: false

// 					},function(isConfirm){
// 						if (isConfirm) {
// 							location.reload();
// 						}else{
// 							location.reload();
// 						}
// 					});
					
// 				}else{
// 					swal("提示", res.data.Msg, "error");
// 				}
// 			});
// 		});
// 	}

// 	// 设置网关名
// 	$('body').on('click', '.setup_btn', function(){
// 		var oGatewayId = $(this).parent().parent().find('td.gatewayId').text();
// 		sessionStorage.GatewayId=oGatewayId;
// 		layer.open({
//             title: '设置网关【' + oGatewayId + '】名称',
//             type: 2,
//             shadeClose: false, //点击遮罩关闭
//             area : ['450px', '300px'],
//             content: 'gatewayName.html',
//             end: function () {
//                 window.location.reload();
//             }
//         });
// 	});

// });
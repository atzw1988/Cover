(function () {
	// var oHtml = '<li>' +
	// 	'<a href="index.html" class="waves-effect waves-button">' +
	// 	'<span class="menu-icon icon-home"></span>' +
	// 	'<p>平台总览</p>' +
	// 	'<span class="active-page"></span>' +
	// 	'</a>' +
	// 	'</li>' +
	// 	'<li class="active open">' +
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


var points,
	cluster,
	markers = [],
	district,
	polygons = [],
	citycode;
var citySelect = document.getElementById('city');
var districtSelect = document.getElementById('district');
var areaSelect = document.getElementById('street');
var map = new AMap.Map("container", {
    resizeEnable: true,
    expandZoomRange:true,
    // zoom:20,
    zooms:[3,20],
});


//行政区划查询
var opts = {
    subdistrict: 1,   //返回下一级行政区
    showbiz:false  //最后一级返回街道信息
};

district = new AMap.DistrictSearch(opts);//注意：需要使用插件同步下发功能才能这样直接使用
district.search('中国', function(status, result) {
    if(status=='complete'){
        getData(result.districtList[0]);
    }
});
function getData(data,level) {
    var bounds = data.boundaries;
    if (bounds) {
        for (var i = 0, l = bounds.length; i < l; i++) {
            var polygon = new AMap.Polygon({
                map: map,
                strokeWeight: 1,
                strokeColor: '#30b19b',
                fillColor: '#fff',
                fillOpacity: 0.1,
                path: bounds[i]
            });
            polygons.push(polygon);
        }
        map.setFitView();//地图自适应
    }
   
   
    
    //清空下一级别的下拉列表
    if (level === 'province') {
        citySelect.innerHTML = '';
        districtSelect.innerHTML = '';
        areaSelect.innerHTML = '';
    } else if (level === 'city') {
        districtSelect.innerHTML = '';
        areaSelect.innerHTML = '';
    } else if (level === 'district') {
        areaSelect.innerHTML = '';
    }

    var subList = data.districtList;
    if (subList) {
        var contentSub = new Option('--请选择--');
        var curlevel = subList[0].level;
        var curList =  document.querySelector('#' + curlevel);
        curList.add(contentSub);
        for (var i = 0, l = subList.length; i < l; i++) {
            var name = subList[i].name;
            var levelSub = subList[i].level;
            var cityCode = subList[i].citycode;
            contentSub = new Option(name);
            contentSub.setAttribute("value", levelSub);
            contentSub.center = subList[i].center;
            contentSub.adcode = subList[i].adcode;
            curList.add(contentSub);
        }
    }
    
}
function search(obj) {
    //清除地图上所有覆盖物
    for (var i = 0, l = polygons.length; i < l; i++) {
        polygons[i].setMap(null);
    }
    var option = obj[obj.options.selectedIndex];
    var keyword = option.text; //关键字
    var adcode = option.adcode;
    district.setLevel(option.value); //行政区级别
    // if(option.value == 'province'){
    // 	map.setZoom(8)
    // }else if(option.value == 'city'){
    // 	map.setZoom(12)
    // }else if(option.value == 'district'){
    // 	map.setZoom(14)
    // }
    district.setExtensions('all');
    //行政区查询
    //按照adcode进行查询可以保证数据返回的唯一性
    district.search(adcode, function(status, result) {
        if(status === 'complete'){
            getData(result.districtList[0],obj.id);
        }
    });
}
function setCenter(obj){
    map.setCenter(obj[obj.options.selectedIndex].center)
}

// 点击信息展示
var infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(0, -30)});

function markerClick(e) {
	
	common.ajax('/HuaXtentCover/devMng/query1', 'GET', {imei: e.target.imei}, function(res){
		console.log(res)
		if(res.success){
			if (res.data.deviceState == 8){
				var oDeviceState = '正常';
			} else if (res.data.deviceState == 15) {
				var oDeviceState = '信号弱';
			} else if (res.data.deviceState == 1) {
				var oDeviceState = '打开';
			} else if (res.data.deviceState == 2) {
				var oDeviceState = '松开';
			} else if (res.data.deviceState == 3) {
				var oDeviceState = '复位';
			} else if (res.data.deviceState == 6) {
				var oDeviceState = '电压低';
			} else if (res.data.deviceState == 7) {
				var oDeviceState = '溢水';
			} else if (res.data.deviceState == 16) {
				var oDeviceState = '离线';
			} else if (res.data.deviceState == 19) {
				var oDeviceState = '井盖锁未到位';
			} else if (res.data.deviceState == 20) {
				var oDeviceState = '电压低';
			} else if (res.data.deviceState == 21) {
				var oDeviceState = '电压高';
			} else if (res.data.deviceState == 22) {
				var oDeviceState = '信号弱';
			} else if (res.data.deviceState == 23) {
				var oDeviceState = '角度报警';
			} else if (res.data.deviceState == 24) {
				var oDeviceState = '正常';
			} else if (res.data.deviceState == 25) {
				var oDeviceState = '离线';
			} else {
				var oDeviceState = '未知';
			}
			var oHtml = '';
			oHtml += '<span style="display: inline-block; width: 70px;">imei号：</span>' + res.data.imei + '<br/>';
			oHtml += '<span style="display: inline-block; width: 70px;">设备名称：</span>' + res.data.deviceName + '<br/>';
			oHtml += '<span style="display: inline-block; width: 70px;">地址：</span>' + res.data.address + '<br/>';
			oHtml += '<span style="display: inline-block; width: 70px;">负责人：</span>' + res.data.username + '<br/>';
			oHtml += '<span style="display: inline-block; width: 70px;">部门名称：</span>' + res.data.deptName + '<br/>';
			oHtml += '<span style="display: inline-block; width: 70px;">信号强度：</span>' + res.data.gprsSignal + '<br/>';
			oHtml += '<span style="display: inline-block; width: 70px;">设备状态：</span>' + oDeviceState + '<br/>';
			oHtml += '<span style="display: inline-block; width: 70px;">更新时间：</span>' + new Date(res.data.updateTime).Format("yyyy-MM-dd hh:mm:ss") + '<br/>';
			infoWindow.setContent(oHtml);
	         // infoWindow.setContent(e.target.content);
	         console.log(e.target.imei)
	         console.log(e);
	        // infoWindow.open(map, e.target.getPosition());
	        infoWindow.open(map, e.target.getPosition());
		}
	});
    
}

$(function(){

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


	$('[data-father="2"]').addClass('active open');

	common.ajax('/HuaXtentCover/devMng/map', 'POST', {}, function(res){
		if(res.success){
			console.log(res)
			res.data.map(function(item,index){
				var arr = [item.lng, item.lat];
				item.lnglat = arr;
				if(item.productType == 1){
					if (item.state == '8' || item.state == '3' || item.state == '6' || item.state == '15' || item.state == '16') {
						item.state = 'assets/images/normal_ioc.png';
					}else{
						item.state = 'assets/images/abnormal_ico.png';
					}
				}else{
					if (item.state == '24' || item.state == '20' || item.state == '22' || item.state == '25') {
						item.state = 'assets/images/normal_close.png';
					}else{
						item.state = 'assets/images/abnormal_open.png';
					}
				}
				
				delete item.lng;
				delete item.lat;
				return item;
			});
			points = res.data
			for(var i=0;i<points.length;i+=1){
		    	var marker = new AMap.Marker({
		          	position:points[i]['lnglat'],
		          	icon: new AMap.Icon({            
			            size: new AMap.Size(25, 25),  //图标大小
			            image: points[i]['state']
			        }),
		            offset: new AMap.Pixel(-15,-15),
		            // content: '我是第' + (i + 1) + '个Marker',
		            // on: function('click', markerClick),
		            // emit: function('click', {target: markers})
		        })
		        
		        marker.imei = points[i]['imei'];
		        marker.on('click', markerClick);
		        // marker.emit('click', {target: marker});
		        markers.push(marker);

		  //       var position = new AMap.LngLat(113.91497745081784, 22.561892961571253);
				// infoWindow.open(map, );
				// openInfoWin()
		        // var count  = markers.length;
		    }
			addCluster();

			

			function addCluster(tag) {
			    if (cluster) {
			        cluster.setMap(null);
			    }
			    var sts = [{
	                url: "assets/images/m1.png",
	                size: new AMap.Size(53, 52),
	                // offset: new AMap.Pixel(-16, -16)
	            }, {
	                url: "assets/images/m2.png",
	                size: new AMap.Size(56, 55),
	                // offset: new AMap.Pixel(-16, -16)
	            }, {
	                url: "assets/images/m3.png",
	                size: new AMap.Size(66, 65),
	                // offset: new AMap.Pixel(-18, -18)
	            },{
	                url: "assets/images/m4.png",
	                size: new AMap.Size(78, 77),
	                // offset: new AMap.Pixel(-24, -24)
	            },{
	                url: "assets/images/m5.png",
	                size: new AMap.Size(90, 89),
	                // offset: new AMap.Pixel(-24, -24)
	            }];
			    cluster = new AMap.MarkerClusterer(map, markers,{styles: sts, gridSize: 50});
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
		
	});
});

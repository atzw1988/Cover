var points,
    cluster;
    // markers = [],
    // district,
    // polygons = [],
    // citycode;
// var citySelect = document.getElementById('city');
// var districtSelect = document.getElementById('district');
// var areaSelect = document.getElementById('street');
var map = new AMap.Map("containerMap", {
    resizeEnable: true,
    expandZoomRange:true,
    // zoom:20,
    zooms:[3,20],
});
map.setMapStyle('amap://styles/darkblue');
var e1Time,
    e4Time,
    e6Time;
//  //行政区划查询
// var opts = {
//     subdistrict: 1,   //返回下一级行政区
//     showbiz:false  //最后一级返回街道信息
// };
// district = new AMap.DistrictSearch(opts);//注意：需要使用插件同步下发功能才能这样直接使用
// district.search('中国', function(status, result) {
//     if(status=='complete'){
//         getData(result.districtList[0]);
//     }
// });
// function getData(data,level) {
//     var bounds = data.boundaries;
//     if (bounds) {
//         for (var i = 0, l = bounds.length; i < l; i++) {
//             var polygon = new AMap.Polygon({
//                 map: map,
//                 strokeWeight: 1,
//                 strokeColor: '#26336d',
//                 fillColor: '#26336d',
//                 fillOpacity: 0.3,
//                 path: bounds[i]
//             });
//             polygons.push(polygon);
//         }
//         map.setFitView();//地图自适应
//     }
   
   
    
    // //清空下一级别的下拉列表
    // if (level === 'province') {
    //     citySelect.innerHTML = '';
    //     districtSelect.innerHTML = '';
    //     areaSelect.innerHTML = '';
    // } else if (level === 'city') {
    //     districtSelect.innerHTML = '';
    //     areaSelect.innerHTML = '';
    // } else if (level === 'district') {
    //     areaSelect.innerHTML = '';
    // }

    // var subList = data.districtList;
    // if (subList) {
    //     var contentSub = new Option('--请选择--');
    //     var curlevel = subList[0].level;
    //     var curList =  document.querySelector('#' + curlevel);
    //     curList.add(contentSub);
    //     for (var i = 0, l = subList.length; i < l; i++) {
    //         var name = subList[i].name;
    //         var levelSub = subList[i].level;
    //         var cityCode = subList[i].citycode;
    //         contentSub = new Option(name);
    //         contentSub.setAttribute("value", levelSub);
    //         contentSub.center = subList[i].center;
    //         contentSub.adcode = subList[i].adcode;
    //         curList.add(contentSub);
    //     }
    // }
    
// }
// function search(obj) {
//     //清除地图上所有覆盖物
//     for (var i = 0, l = polygons.length; i < l; i++) {
//         polygons[i].setMap(null);
//     }
//     var option = obj[obj.options.selectedIndex];
//     var keyword = option.text; //关键字
//     var adcode = option.adcode;
//     district.setLevel(option.value); //行政区级别
//     district.setExtensions('all');
//     //行政区查询
//     //按照adcode进行查询可以保证数据返回的唯一性
//     district.search(adcode, function(status, result) {
//         if(status === 'complete'){
//             getData(result.districtList[0],obj.id);
//         }
//     });
// }
// function setCenter(obj){
//     map.setCenter(obj[obj.options.selectedIndex].center)
// }

// 点击信息展示
var infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(0, -30)});

function markerClick(e) {
    
    common.viscAjax('/HuaXtentCover/data/view/mapDetail', 'POST', {imei: e.target.imei}, function(res){
        if(res.success){
            if(res.data.deviceState == 1){
                var oDeviceState = '正常';
            }else if(res.data.deviceState == 2){
                var oDeviceState = '信号弱';
            }else if(res.data.deviceState == 3){
                var oDeviceState = '休眠';
            }else if(res.data.deviceState == 4){
                var oDeviceState = '报警';
            }else{
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
             // console.log(e.target.imei)
             // console.log(e);
            // infoWindow.open(map, e.target.getPosition());
            infoWindow.open(map, e.target.getPosition());
        }
    });
}

// 时间
function __newstime(){
    var today = new Date();  
    var year = today.getFullYear();
    var month = today.getMonth()+1;
    var day = today.getDate();
    var weekday = new Array(7);
    weekday[0] = "星期天"
    weekday[1] = "星期一"
    weekday[2] = "星期二"
    weekday[3] = "星期三"
    weekday[4] = "星期四"
    weekday[5] = "星期五"
    weekday[6] = "星期六";
    var hours = today.getHours();
    var minutes = today.getMinutes();
    var seconds = today.getSeconds();
    if(hours < 10)
    {
        hours = "0" + hours;
    }
    if(minutes < 10)
    {
        minutes = "0" + minutes;
    }
    if(seconds < 10)
    {
        seconds= "0" + seconds;
    }
    var dt = year + '年' + month + '月' + day + '日' + ' ' + hours + ':' + minutes + ':' + seconds + ' ' + weekday[today.getDay()];      
    document.getElementById('time-cycle').innerHTML = dt;
    setTimeout('__newstime()', 1000)
}
window.onload = __newstime;

$(function () {

    var markers = [];
    if($.cookie('coverName')){
        if($.cookie('coverName').length > 8){
            $('.title-center').text($.cookie('coverName'));
        }else{
            $('.title-center').text($.cookie('coverName') + '可视化平台');
        }
    }else{
        // window.location.href = 'login.html';
    }
    
    
    // 地图渲染
    common.viscAjax('/HuaXtentCover/data/view/map', 'POST', {deptId: $.cookie('coverDeptId')}, function(res){
        // console.log(Date.now(),res);
        if(res.success){
            res.data.map(function(item,index){
                var arr = [item.lng, item.lat];
                item.lnglat = arr;
                if(item.state == '1'){
                    item.state = 'assets/images/normal_ioc_visc.png';
                }else if(item.state == '2'){
                    item.state = 'assets/images/noonline_ico.png';
                }else if(item.state == '3'){
                    item.state = 'assets/images/smart_Manholecover.png';
                }else if(item.state == '4'){
                    item.state = 'assets/images/abnormal_ico.png';
                }else{
                    item.state = 'assets/images/abnormal_ico.png';
                }
                delete item.lng;
                delete item.lat;
                return item;
            });
            // console.log(Date.now(),res);
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
            // console.log(Date.now(),markers);
        }else{
            if(res.code == 2001){
                var oMsg = res.message || '请重新登录';
                layer.msg('提示,' + oMsg,{
                    shade: 0.3,
                    shadeClose:true,
                    time:2000,
                    icon: 2
                },
                function(){
                    // window.location.href = 'login.html';
                });
            }else{
                var oMsg = res.message;
                layer.msg('提示,' + oMsg,{
                    shade: 0.3,
                    shadeClose:true,
                    time:2000,
                    icon: 2
                });
            }
        }
        
    });


    statistics();
    echarts_1(''); // 部门
    // echarts_2();
    // map();
    // coverMap();
    echarts_3(''); //心跳
    echarts_4(''); //状态
    echarts_5(''); //省份
    echarts_6(''); //轮播


    // 实时统计
    function statistics() {
        common.viscAjax('/HuaXtentCover/data/view/realTimeSts', 'POST', {deptId: $.cookie('coverDeptId')}, function(res){
            if(res.success && res.code == '200'){
                $('.coverAllNum').text(res.data.total);
                $('.coverRunNum').text(res.data.run);
                $('.coverRunNumMap').text(res.data.total);
                $('.coverAddNum').text(res.data.newAdd);
                $('.coverAlarmNum').text(res.data.newAlarm);
            }else{
                $('.coverAllNum').text('3845');
                $('.coverRunNum').text('3845');
                $('.coverRunNumMap').text('3845');
                $('.coverAddNum').text('247');
                $('.coverAlarmNum').text('18');
            }
            // // 字体效果
            // $(".coverAllNum").animatext({speed: 150,
            //     effect: 'flipInX',
            //     infinite: true
            // });
            // $(".coverRunNum").animatext({speed: 150,
            //     mode: "words",
            //     effect: 'swing',
            //     infinite: true
            // });
            // $(".coverAddNum").animatext({speed: 150,
            //     effect: 'tada',
            //     random: true,
            //     infinite: true
            // });
            // $(".coverAlarmNum").animatext({speed: 150,
            //     effect: 'tada',
            //     random: true,
            //     infinite: true
            // });
        });
    }

    // 部门
    function echarts_1(isgoeasy) {
        // if(isgoeasy){
        //     clearTimeout(timeOut);
        // }
        common.viscAjax('/HuaXtentCover/data/view/deptClassify', 'POST', {deptId: $.cookie('coverDeptId')}, function(res){
            // console.log(res);
            if(res.success && res.code == '200'){

                // 基于准备好的dom，初始化echarts实例
                var myChart = echarts.init(document.getElementById('echarts_1'));

                var data = res.data;
                var oName = []
                res.data.map(function(item){
                    return oName.push(item.name)
                })
                // console.log(oName)
                var option = {
                    backgroundColor: 'rgba(0,0,0,0)',
                    tooltip: {
                        trigger: 'item',
                        formatter: "{b}: <br/>{c} ({d}%)"
                    },
                    color: ['#af89d6', '#4ac7f5', '#0089ff', '#f36f8a', '#f5c847'],
                    legend: { //图例组件，颜色和名字
                        type: 'scroll',
                        x: '60%',
                        // y: 'center',
                        orient: 'vertical',
                        itemGap: 6, //图例每项之间的间隔
                        selectedMode: false,
                        itemWidth: 5,
                        itemHeight: 5,
                        icon: 'rect',
                        bottom: 10,
                        data: oName,
                        textStyle: {
                            color: [],
                            fontStyle: 'normal',
                            fontFamily: '微软雅黑',
                            fontSize: 12,
                        }
                    },
                    series: [{
                        name: '部门占比',
                        type: 'pie',
                        // hoverAnimation: true,
                        clockwise: false, //饼图的扇区是否是顺时针排布
                        minAngle: 20, //最小的扇区角度（0 ~ 360）
                        center: ['30%', '50%'], //饼图的中心（圆心）坐标
                        radius: [50, 75], //饼图的半径
                        avoidLabelOverlap: true, ////是否启用防止标签重叠
                        itemStyle: { //图形样式
                            normal: {
                                borderColor: '#1e2239',
                                borderWidth: 2,
                            },
                            labelLine :{show:true}
                        },
                        label: { //标签的位置
                            normal: {
                                show: true,
                                position: 'inside', //标签的位置
                                formatter: "{d}%",
                                textStyle: {
                                    color: '#fff',
                                }
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        data: data
                    }, {
                        name: '',
                        type: 'pie',
                        clockwise: false,
                        silent: true,
                        minAngle: 20, //最小的扇区角度（0 ~ 360）
                        center: ['30%', '50%'], //饼图的中心（圆心）坐标
                        radius: [0, 40], //饼图的半径
                        itemStyle: { //图形样式
                            normal: {
                                borderColor: '#1e2239',
                                borderWidth: 1.5,
                                opacity: 0.21,
                            }
                        },
                        label: { //标签的位置
                            normal: {
                                show: false,
                            }
                        },
                        data: data
                    }]
                };
                myChart.resize();
                // 动态显示
                var count = 0;
                // var timeTicket = null;
                var timeOut = null;
                var dataLength = option.series[0].data.length;
                // timeTicket && clearInterval(timeTicket);
                if(!timeOut){
                    clearTimeout(timeOut)
                }
                clearInterval(e1Time);
                myChart.dispatchAction({
                    type: 'hideTip'
                });
                timeOut = setTimeout(function(){
                    e1Time = setInterval(function() {
                        myChart.dispatchAction({
                            type: 'pie',
                            seriesIndex: 0,
                        });
                        myChart.dispatchAction({
                            type: 'dataZoom',
                            seriesIndex: 0,
                        });
                        myChart.dispatchAction({
                            type: 'highlight',
                            seriesIndex: 0,
                            dataIndex: (count) % dataLength
                        });
                        myChart.dispatchAction({
                            type: 'showTip',
                            seriesIndex: 0,
                            dataIndex: (count) % dataLength
                        });
                        count++;
                    }, 3000);
                    myChart.on('mouseover', function(params) {
                        clearInterval(e1Time);
                        myChart.dispatchAction({
                            type: 'pie',
                            seriesIndex: 0
                        });
                        myChart.dispatchAction({
                            type: 'dataZoom',
                            seriesIndex: 0,
                        });
                        myChart.dispatchAction({
                            type: 'highlight',
                            seriesIndex: 0,
                            dataIndex: params.dataIndex
                        });
                        myChart.dispatchAction({
                            type: 'showTip',
                            seriesIndex: 0,
                            dataIndex: params.dataIndex,
                        });
                    });
                    myChart.on('mouseout', function(params) {
                        e1Time && clearInterval(e1Time);
                        e1Time = setInterval(function() {
                            myChart.dispatchAction({
                                type: 'pie',
                                seriesIndex: 0,
                            });
                            myChart.dispatchAction({
                                type: 'dataZoom',
                                seriesIndex: 0,
                            });
                            myChart.dispatchAction({
                                type: 'highlight',
                                seriesIndex: 0,
                                dataIndex: (count) % dataLength
                            });
                            myChart.dispatchAction({
                                type: 'showTip',
                                seriesIndex: 0,
                                dataIndex: (count) % dataLength
                            });
                            count++;
                        }, 3000);
                    });
                },500)
                

                // 使用刚指定的配置项和数据显示图表。
                // myChart.setOption(option);
                myChart.setOption(option, true);
                window.addEventListener("resize",function(){
                    myChart.resize();
                });
            }else{
                if(res.code == 2001){
                    var oMsg = res.message || '请重新登录';
                    layer.msg('提示,' + oMsg,{
                        shade: 0.3,
                        shadeClose:true,
                        time:2000,
                        icon: 2
                    },
                    function(){
                        // window.location.href = 'login.html';
                    });
                }else{
                    var oMsg = res.message;
                    layer.msg('提示,' + oMsg,{
                        shade: 0.3,
                        shadeClose:true,
                        time:2000,
                        icon: 2
                    });
                }
            }
        });
    }

    /*// 井盖分类
    function echarts_2() {

        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echarts_2'));

        option = {
            backgroundColor: 'rgba(0, 0, 0, 0)',
            calculable: true,
            "tooltip": {
                "trigger": "item",
                "formatter": "{b}  <br/>{c}个"
            },
            "legend": {
                "icon": "circle",
                "x": "center",
                "y": "5%",
                "data": ['井盖一', '井盖二', '井盖三', '井盖四', '井盖五'],
                "textStyle": {
                    "color": "#fff"
                }
            },
            "series": [{
                "name": "井盖",
                "type": "pie",
                "radius": [
                    30,
                    100
                ],
                "avoidLabelOverlap": false,
                "startAngle": 0,
                "center": [
                    "50%",
                    "20%"
                ],
                "roseType": "area",
                "selectedMode": "single",
                "label": {
                    "normal": {
                        "show": true,
                        "formatter": "{c}个"
                    },
                    "emphasis": {
                        "show": true
                    }
                },
                "labelLine": {
                    "normal": {
                        "show": true,
                        "smooth": false,
                        "length": 20,
                        "length2": 10
                    },
                    "emphasis": {
                        "show": true
                    }
                },
                "data": [
                    
                    {
                        "value": 1100,
                        "name": "井盖二",
                        "itemStyle": {
                            "normal": {
                                "color": "#ad46f3"
                            }
                        }
                    },
                    {
                        "value": 1200,
                        "name": "井盖三",
                        "itemStyle": {
                            "normal": {
                                "color": "#5045f6"
                            }
                        }
                    },
                    {
                        "value": 1300,
                        "name": "井盖四",
                        "itemStyle": {
                            "normal": {
                                "color": "#4777f5"
                            }
                        }
                    },
                    {
                        "value": 1400,
                        "name": "井盖五",
                        "itemStyle": {
                            "normal": {
                                "color": "#44aff0"
                            }
                        }
                    },
                    {
                        "value": 6000,
                        "name": "井盖一",
                        "itemStyle": {
                            "normal": {
                                "color": "#f845f1"
                            }
                        }
                    },
                    {
                        "value": 0,
                        "name": "",
                        "itemStyle": {
                            "normal": {
                                "label": {
                                    "show": false
                                },
                                "labelLine": {
                                    "show": false
                                }
                            }
                        }
                    },
                    {
                        "value": 0,
                        "name": "",
                        "itemStyle": {
                            "normal": {
                                "label": {
                                    "show": false
                                },
                                "labelLine": {
                                    "show": false
                                }
                            }
                        }
                    },
                    {
                        "value": 0,
                        "name": "",
                        "itemStyle": {
                            "normal": {
                                "label": {
                                    "show": false
                                },
                                "labelLine": {
                                    "show": false
                                }
                            }
                        }
                    },
                    {
                        "value": 0,
                        "name": "",
                        "itemStyle": {
                            "normal": {
                                "label": {
                                    "show": false
                                },
                                "labelLine": {
                                    "show": false
                                }
                            }
                        }
                    },
                    {
                        "value": 0,
                        "name": "",
                        "itemStyle": {
                            "normal": {
                                "label": {
                                    "show": false
                                },
                                "labelLine": {
                                    "show": false
                                }
                            }
                        }
                    },
                ]
            }]
        };

        // 动态显示
        var count = 0;
        var timeTicket = null;
        var dataLength = option.series[0].data.length / 2;
        timeTicket && clearInterval(timeTicket);
        timeTicket = setInterval(function() {
            myChart.dispatchAction({
                type: 'pie',
                seriesIndex: 0,
            });
            // myChart.dispatchAction({
            //     type: 'dataZoom',
            //     // seriesIndex: 0,
            // });
            myChart.dispatchAction({
                type: 'highlight',
                seriesIndex: 0,
                dataIndex: (count) % dataLength
            });
            myChart.dispatchAction({
                type: 'showTip',
                seriesIndex: 0,
                dataIndex: (count) % dataLength
            });
            count++;
        }, 1000);

        myChart.on('mouseover', function(params) {
            clearInterval(timeTicket);
            myChart.dispatchAction({
                type: 'pie',
                seriesIndex: 0,
            });
            // myChart.dispatchAction({
            //     type: 'dataZoom',
            //     // seriesIndex: 0
            // });
            myChart.dispatchAction({
                type: 'highlight',
                seriesIndex: 0,
                dataIndex: params.dataIndex
            });
            myChart.dispatchAction({
                type: 'showTip',
                seriesIndex: 0,
                dataIndex: params.dataIndex,
            });
        });
        myChart.on('mouseout', function(params) {
            timeTicket && clearInterval(timeTicket);
            timeTicket = setInterval(function() {
                myChart.dispatchAction({
                    type: 'pie',
                    seriesIndex: 0,
                });
                // myChart.dispatchAction({
                //     type: 'dataZoom',
                //     // seriesIndex: 0,
                // });
                myChart.dispatchAction({
                    type: 'highlight',
                    seriesIndex: 0,
                    dataIndex: (count) % dataLength
                });
                myChart.dispatchAction({
                    type: 'showTip',
                    seriesIndex: 0,
                    dataIndex: (count) % dataLength
                });
                count++;
            }, 1000);
        });
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize",function(){
            myChart.resize();
        });
    }*/

    /*function map() {

        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('map'));

        var nameColor = " rgb(55, 75, 113)"
        var name_fontFamily = '宋体'
        var name_fontSize = 35
        var mapName = 'china'
        var data = []
        var geoCoordMap = {};
        var toolTipData = [];

        //获取地图数据
        myChart.showLoading();
        var mapFeatures = echarts.getMap(mapName).geoJson.features;
        myChart.hideLoading();
        mapFeatures.forEach(function(v) {
            // 地区名称
            var name = v.properties.name;
            // 地区经纬度
            geoCoordMap[name] = v.properties.cp; //"台湾":[121.509062, 25.044332] 34省份
            data.push({ //{"name":"台湾", value: [5] }34省份
                name: name,
                // value: Math.round(Math.random() * 100 + 10)
                value: 55 //来显示地图点的大小，也需数据
            })
            
            toolTipData.push({
                name: name,
                // value: [
                //     {
                //         name: "井盖一",
                //         value: Math.round(Math.random() * 100 + 10) + '个'
                //     },
                //     {
                //         name: "井盖二",
                //         value: Math.round(Math.random() * 100 + 10)+ '个'
                //     },
                //     {
                //         name: "井盖三",
                //         value: Math.round(Math.random() * 100 + 10)+ '个'
                //     },
                //     {
                //         name: "井盖四",
                //         value: Math.round(Math.random() * 100 + 10)+ '个'
                //     }
                // ]
                value: [
                    {
                        name: "正常",
                        value: 5555
                    },
                    {
                        name: "异常",
                        value: 5 
                    }
                ]
            })
            // console.log('geoCoordMap',geoCoordMap); //"台湾":[121.509062, 25.044332] 34省份
        });

        var max = 480,
            min = 9; // todo
        var maxSize4Pin = 50,
            minSize4Pin = 20;

        // 合拼省份经纬度与数据 // {name:'台湾',value:[121.509062, 25.044332, 5]}
        var convertData = function(data) {
            //console.log('data',data) //{name: "台湾", value: 5} 34省份
            
            var res = [];
            for (var i = 0; i < data.length; i++) {
                var geoCoord = geoCoordMap[data[i].name];
                if (geoCoord) {
                    res.push({
                        name: data[i].name,
                        value: geoCoord.concat(data[i].value),
                    });
                    // console.log('value',data[i].value) //5
                }
            }
            // console.log('res',res) // {name:'台湾',value:[121.509062, 25.044332, 5]}
            return res;
        };

        option = {
            tooltip: {
                trigger: 'item',
                formatter: function(params) {
                    // console.log('params',params)
                    // console.log('toolTipData',toolTipData)
                    if (typeof(params.value)[2] == "undefined") {
                        var toolTiphtml = ''
                        for(var i = 0;i<toolTipData.length;i++){
                            if(params.name==toolTipData[i].name){
                                toolTiphtml += toolTipData[i].name+':<br>'
                                for(var j = 0;j<toolTipData[i].value.length;j++){
                                    toolTiphtml+=toolTipData[i].value[j].name+':'+toolTipData[i].value[j].value+"<br>"
                                }
                            }
                        }
                        // console.log(toolTiphtml)
                        // console.log(convertData(data))
                        return toolTiphtml;
                    } else {
                        var toolTiphtml = ''
                        for(var i = 0;i<toolTipData.length;i++){
                            if(params.name==toolTipData[i].name){
                                toolTiphtml += toolTipData[i].name+':<br>'
                                for(var j = 0;j<toolTipData[i].value.length;j++){
                                    // toolTiphtml+=toolTipData[i].value[j].name+':'+toolTipData[i].value[j].value+"<br>"
                                    toolTiphtml+=toolTipData[i].value[j].name+':'+toolTipData[i].value[j].value+"<br>"
                                }
                            }
                        }
                        // console.log(toolTiphtml)
                        // console.log(convertData(data))
                        return toolTiphtml;
                    }
                }
            },
            legend: {
                orient: 'vertical',
                y: 'bottom',
                x: 'right',
                data: ['credit_pm2.5'],
                textStyle: {
                    color: '#fff'
                }
            },
            visualMap: {
                show: false,
                min: 0,
                max: 600,
                left: 'left',
                top: 'bottom',
                text: ['高', '低'], // 文本，默认为数值文本
                calculable: true,
                seriesIndex: [1],
                inRange: {
                    color: ['#22e5e8', '#0035f9','#22e5e8'] // 蓝绿

                }
            },
            //工具按钮组
            toolbox: {
                show: false,
                orient: 'vertical',
                left: 'right',
                top: 'center',
                feature: {

                    dataView: {
                        readOnly: false
                    },
                    restore: {},
                    saveAsImage: {}
                }
            },
            geo: {
                show: true,
                map: mapName,
                label: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: false
                    }
                },
                roam: true,
                itemStyle: {
                    normal: {
                        areaColor: '#031525',
                        borderColor: '#097bba'
                    },
                    emphasis: {
                        areaColor: '#2B91B7'
                    }
                }
            },
            series: [
                {
                    name: '散点',
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    data: convertData(data),
                    symbolSize: function(val) {
                        return val[2] / 10; // 获取对应省份的数据，来显示点的大小
                    },
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'right',
                            show: false
                        },
                        emphasis: {
                            show: false
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: 'rgba(255,255,0,0.8)'
                        }
                    }
                },
                {
                    type: 'map',
                    map: mapName,
                    geoIndex: 0,
                    aspectScale: 0.75, //长宽比
                    showLegendSymbol: false, // 存在legend时显示
                    label: {
                        normal: {
                            show: true
                        },
                        emphasis: {
                            show: false,
                            textStyle: {
                                color: '#fff'
                            }
                        }
                    },
                    roam: true,
                    itemStyle: {
                        normal: {
                            areaColor: '#031525',
                            borderColor: '#3B5077',
                        },
                        emphasis: {
                            areaColor: '#2B91B7'
                        }
                    },
                    animation: false,
                    data: data
                },
                {
                    name: '点',
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    symbol: 'pin', //气泡
                    symbolSize: function(val) {
                        var a = (maxSize4Pin - minSize4Pin) / (max - min);
                        var b = minSize4Pin - a * min;
                        b = maxSize4Pin - a * max;
                        return a * val[2] + b;  // 获取对应省份的数据，来显示点的大小
                        // return a * val[0] + b;
                    },
                    label: {

                        normal: {
                            show: false,
                            formatter:function (params) { return params.data.value[2] },
                            textStyle: {
                                color: '#fff',
                                fontSize: 9,
                            }
                        }
                    },
                    itemStyle: {

                        normal: {
                            color: 'rgba(255,255,0,0)', //标志颜色
                        }
                    },
                    zlevel: 6,
                    data: convertData(data),
                },
                // {
                //     name: 'Top 5',
                //     type: 'effectScatter',
                //     coordinateSystem: 'geo',
                //     data: convertData(data.sort(function(a, b) {
                //         return b.value - a.value;
                //     }).slice(0, 5)),
                //     symbolSize: function(val) {
                //         return val[2] / 10;  // 获取对应省份的数据，来显示点的大小
                //         // console.log('val',val)
                //         // return val[0] / 10;
                //     },
                //     showEffectOn: 'render',
                //     rippleEffect: {
                //         brushType: 'stroke'
                //     },
                //     hoverAnimation: true,
                //     label: {
                //         normal: {
                //             formatter: '{b}',
                //             position: 'right',
                //             show: true
                //         }
                //     },
                //     itemStyle: {
                //         normal: {
                //             color: 'rgba(255,255,0,0.8)',
                //             shadowBlur: 10,
                //             shadowColor: '#05C3F9'
                //         }
                //     },
                //     zlevel: 1
                // },

            ]
        };

        // 动态显示
        var count = 0;
        var timeTicket = null;
        var dataLength = option.series[0].data.length;
        timeTicket && clearInterval(timeTicket);
        timeTicket = setInterval(function() {
            myChart.dispatchAction({
                type: 'downplay',
                seriesIndex: 0,
            });
            myChart.dispatchAction({
                type: 'highlight',
                seriesIndex: 0,
                dataIndex: (count) % dataLength
            });
            myChart.dispatchAction({
                type: 'showTip',
                seriesIndex: 0,
                dataIndex: (count) % dataLength
            });
            count++;
        }, 3000);

        myChart.on('mouseover', function(params) {
            clearInterval(timeTicket);
            myChart.dispatchAction({
                type: 'downplay',
                seriesIndex: 0
            });
            myChart.dispatchAction({
                type: 'highlight',
                seriesIndex: 0,
                dataIndex: params.dataIndex
            });
            myChart.dispatchAction({
                type: 'showTip',
                seriesIndex: 0,
                dataIndex: params.dataIndex,
            });
        });
        myChart.on('mouseout', function(params) {
            timeTicket && clearInterval(timeTicket);
            timeTicket = setInterval(function() {
                myChart.dispatchAction({
                    type: 'downplay',
                    seriesIndex: 0,
                });
                myChart.dispatchAction({
                    type: 'highlight',
                    seriesIndex: 0,
                    dataIndex: (count) % dataLength
                });
                myChart.dispatchAction({
                    type: 'showTip',
                    seriesIndex: 0,
                    dataIndex: (count) % dataLength
                });
                count++;
            }, 3000);
        });

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize",function(){
            myChart.resize();
        });
    }*/

    // 心跳
    function echarts_3(isgoeasy) {
        common.viscAjax('/HuaXtentCover/data/view/realTimeHeart', 'POST', {deptId: $.cookie('coverDeptId')}, function(res){
            // console.log(res)
            if(res.success && res.code == '200'){
                // var data = res.data.map(function(item){

                // })
                var data = [];
                for(var i = 0; i < res.data.length; i++){
                    var obj = {};
                    var arr = [];
                    obj.name = new Date(parseInt(res.data[i].time)).Format("yyyy-MM-dd hh:mm");
                    arr[0] = new Date(parseInt(res.data[i].time)).Format("yyyy-MM-dd hh:mm");
                    arr[1] = res.data[i].value;
                    obj.value = arr;
                    data.push(obj);
                }
                var dom = document.getElementById("echarts_3");
                // var dom = document.getElementById("container");
                var myChart = echarts.init(dom);

                var option = {
                    // title: {
                    //     text: '动态数据 + 时间坐标轴'
                    // },
                    color:['#a4d8cc','#25f3e6'],
                    tooltip: {
                        trigger: 'axis',
                        formatter: function (params) {
                            params = params[0];
                            var date = new Date(params.name); //getHours() getMinutes() getDate()
                            var hours = date.getHours();
                            var minutes = date.getMinutes();
                            if(hours < 10)
                            {
                                hours = "0" + hours;
                            }
                            if(minutes < 10)
                            {
                                minutes = "0" + minutes;
                            }
                            return (date.getMonth() + 1) + '-' + date.getDate() + ' ' + hours + ':' + minutes + '<br/>次数：' + params.value[1];
                        },
                        axisPointer: {
                            animation: false
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        top: '4%',
                        containLabel: true,
                        borderWidth: 0,
                        textStyle: {
                            color: "#fff"
                        }
                    },
                    xAxis: {
                        type: 'time',
                        axisLabel: {
                            textStyle: {
                                color: '#ccc',
                                fontSize:'12',
                            }
                        },
                        axisLine: {
                            lineStyle:{
                                color:'rgba(160,160,160,0.3)',
                            }
                        },
                        splitLine: {
                            show: false
                        }
                    },
                    yAxis: {
                        type: 'value',
                        // boundaryGap: [0, '100%'],
                        axisLabel: {
                            textStyle: {
                                color: '#ccc',
                                fontSize:'12',
                            }
                        },
                        axisLine: {
                            lineStyle:{
                                color:'rgba(160,160,160,0.3)',
                            }
                        },
                        splitLine: {
                            show: false
                        }
                    },
                    series: [{
                        // name: '',
                        type: 'line',
                        showSymbol: false,
                        hoverAnimation: false,
                        data: data
                    },
                    // {
                    //     name:'.anchor',
                    //     type:'line', 
                    //     showSymbol:false, 
                    //     data:anchor,
                    //     itemStyle:{normal:{opacity:0}},
                    //     lineStyle:{normal:{opacity:0}}
                    // }
                    ]
                };

                // for (var i = 0; i < 1; i++) {
                //     data.shift();
                //     data.push({name:'2016/12/18 07:18:18', value:['2016/12/18 20:18:18', 800]});
                // }
                // myChart.setOption({
                //     series: [{
                //         data: data
                //     }]
                // });

            }else{
                if(res.code == 2001){
                    var oMsg = res.message || '请重新登录';
                    layer.msg('提示,' + oMsg,{
                        shade: 0.3,
                        shadeClose:true,
                        time:2000,
                        icon: 2
                    },
                    function(){
                        // window.location.href = 'login.html';
                    });
                }else{
                    var oMsg = res.message;
                    layer.msg('提示,' + oMsg,{
                        shade: 0.3,
                        shadeClose:true,
                        time:2000,
                        icon: 2
                    });
                }
            }
            if(isgoeasy){
                var oName = new Date(parseInt(isgoeasy.time)).Format("yyyy-MM-dd hh:mm")
                var oValue = isgoeasy.value
                data.shift();
                data.push({name: oName, value:[oName, oValue]});
                myChart.setOption({
                    series: [{
                        data: data
                    }]
                });
            }
            if (option && typeof option === "object") {
                myChart.setOption(option, true);
            }
            // // 使用刚指定的配置项和数据显示图表。
            // myChart.setOption(option);
            myChart.setOption(option, true);
            window.addEventListener("resize",function(){
                myChart.resize();
            });
        });
    }

    // 状态
    function echarts_4(isgoeasy) {
        // if(isgoeasy){
        //     clearTimeout(timeOut);
        // }
        common.viscAjax('/HuaXtentCover/data/view/alarmStat', 'POST', {deptId: $.cookie('coverDeptId')}, function(res){
            if(res.success && res.code == '200'){
                var oData = res.data;
                // 基于准备好的dom，初始化echarts实例
                var myChart = echarts.init(document.getElementById('echarts_4'));
                var option = {
                    tooltip : {
                        trigger: 'item',
                        formatter: "{b}: <br/>  {c} ({d}%)"
                    },
                    toolbox: {
                        show : false,
                        feature : {
                            mark : {show: true},
                            dataView : {show: true, readOnly: false},
                            magicType : {
                                show: true,
                                type: ['pie', 'funnel']
                            },
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    },
                    calculable : true,
                    series : [
                        {
                            name:'排名',
                            type:'pie',
                            color: ['#af89d6', '#f5c847', '#ff999a', '#0089ff','#25f3e6'],
                            // radius : [20, 100],
                            center : ['50%', '50%'],
                            roseType : 'area',
                            data: oData
                        }
                    ]
                };
                myChart.resize();
                // 动态显示
                var count = 0;
                // var timeTicket = null;
                var timeOut = null;
                var dataLength = option.series[0].data.length;
                if(!timeOut){
                    clearTimeout(timeOut)
                }
                clearInterval(e4Time);
                myChart.dispatchAction({
                    type: 'hideTip'
                });
                timeOut =setTimeout(function(){
                    e4Time = setInterval(function() {
                        myChart.dispatchAction({
                            type: 'pie',
                            seriesIndex: 0,
                        });
                        // myChart.dispatchAction({
                        //     type: 'dataZoom',
                        //     seriesIndex: 0,
                        // });
                        myChart.dispatchAction({
                            type: 'highlight',
                            seriesIndex: 0,
                            dataIndex: (count) % dataLength
                        });
                        myChart.dispatchAction({
                            type: 'showTip',
                            seriesIndex: 0,
                            dataIndex: (count) % dataLength
                        });
                        count++;
                    }, 3000);

                    myChart.on('mouseover', function(params) {
                        clearInterval(e4Time);
                        myChart.dispatchAction({
                            type: 'pie',
                            seriesIndex: 0
                        });
                        // myChart.dispatchAction({
                        //     type: 'dataZoom',
                        //     seriesIndex: 0,
                        // });
                        myChart.dispatchAction({
                            type: 'highlight',
                            seriesIndex: 0,
                            dataIndex: params.dataIndex
                        });
                        myChart.dispatchAction({
                            type: 'showTip',
                            seriesIndex: 0,
                            dataIndex: params.dataIndex,
                        });
                    });
                    myChart.on('mouseout', function(params) {
                        e4Time && clearInterval(e4Time);
                        e4Time = setInterval(function() {
                            myChart.dispatchAction({
                                type: 'pie',
                                seriesIndex: 0,
                            });
                            // myChart.dispatchAction({
                            //     type: 'dataZoom',
                            //     seriesIndex: 0,
                            // });
                            myChart.dispatchAction({
                                type: 'highlight',
                                seriesIndex: 0,
                                dataIndex: (count) % dataLength
                            });
                            myChart.dispatchAction({
                                type: 'showTip',
                                seriesIndex: 0,
                                dataIndex: (count) % dataLength
                            });
                            count++;
                        }, 3000);
                    });
                },500)
                
                myChart.setOption(option, true);
                // 使用刚指定的配置项和数据显示图表。
                // myChart.setOption(option);
                window.addEventListener("resize",function(){
                    myChart.resize();
                });
            }else{
                if(res.code == 2001){
                    var oMsg = res.message || '请重新登录';
                    layer.msg('提示,' + oMsg,{
                        shade: 0.3,
                        shadeClose:true,
                        time:2000,
                        icon: 2
                    },
                    function(){
                        // window.location.href = 'login.html';
                    });
                }else{
                    var oMsg = res.message;
                    layer.msg('提示,' + oMsg,{
                        shade: 0.3,
                        shadeClose:true,
                        time:2000,
                        icon: 2
                    });
                }
            }
        });
    }

    // 省份
    function echarts_5(isgoeasy) {
        
        common.viscAjax('/HuaXtentCover/data/view/alarmsOfProTop5', 'POST', {deptId: $.cookie('coverDeptId')}, function(res){
            // console.log(res)
            if(res.success && res.code == '200'){
                var xData =  res.data.map(function(item){
                    return item.name || '湖南'
                })
                var data = res.data.map(function(item){
                    return item.value
                })
                // 基于准备好的dom，初始化echarts实例
                var myChart = echarts.init(document.getElementById('echarts_5'));

                var option = {
                    color: ['#3398DB'],
                    tooltip : {
                        show: "true",
                        trigger: 'item',
                        backgroundColor: 'rgba(0,0,0,0.4)', // 背景
                        padding: [8, 10], //内边距
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'line'        // 默认为直线，可选为：'line' | 'shadow'
                        },
                        formatter: function(params) {
                            if (params.seriesName !== "") {
                                return params.name + ' ：  ' + params.value + ' 次';
                            }
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        top: '0%',
                        containLabel: true,
                        borderWidth: 0,
                        textStyle: {
                            color: "#fff"
                        }
                    },
                    xAxis : [
                        {
                            type : 'category',
                            data : xData,
                            axisTick: {
                                alignWithLabel: true,
                                show: false
                            },
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    color: '#363e83',
                                }
                            },
                            axisLabel: {
                                inside: false,
                                textStyle: {
                                    color: '#bac0c0',
                                    fontWeight: 'normal',
                                    fontSize: '12',
                                },
                                // formatter:function(val){
                                //     return val.split("").join("\n")
                                // },
                            }
                        },
                        {
                            type: 'category',
                            axisLine: {
                                show: false
                            },
                            axisTick: {
                                show: false
                            },
                            axisLabel: {
                                show: false
                            },
                            splitArea: {
                                show: false
                            },
                            splitLine: {
                                show: false
                            },
                            data: xData
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            axisTick: {
                                show: false
                            },
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    color: '#32346c',
                                }
                            },
                            splitLine: {
                                show: true,
                                lineStyle: {
                                    color: '#32346c ',
                                }
                            },
                            axisLabel: {
                                textStyle: {
                                    color: '#bac0c0',
                                    fontWeight: 'normal',
                                    fontSize: '12',
                                },
                                formatter: '{value}',
                            },
                        },
                    ],
                    series : [

                        {
                            // name:'直接访问',
                            type:'bar',
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: true,
                                        position: 'top',
                                        textStyle: {
                                            color: '#fff'
                                        },
                                        formatter:function(params){
                                            if(params.value==0){
                                                return '';
                                            }else
                                            {
                                                return params.value;
                                            }
                                        }
                                    },
                                    show: true,
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: '#00c0e9'
                                    }, {
                                        offset: 1,
                                        color: '#3b73cf'
                                    }]),
                                    // barBorderRadius: 5,
                                    borderWidth: 0,
                                },
                                // emphasis: {
                                //     shadowBlur: 15,
                                //     shadowColor: 'rgba(105,123, 214, 0.7)'
                                // }
                            },
                            zlevel: 2,
                            barWidth: '20%',
                            data:data
                        },
                        // {
                        //     name: '',
                        //     type: 'bar',
                        //     xAxisIndex: 1,
                        //     zlevel: 1,
                        //     itemStyle: {
                        //         normal: {
                        //             label: {
                        //                 show: true,
                        //                 position: 'top',
                        //                 textStyle: {
                        //                     color: '#fff'
                        //                 },
                        //                 formatter:function(params){
                        //                     if(params.value==0){
                        //                         return '';
                        //                     }else
                        //                     {
                        //                         return params.value;
                        //                     }
                        //                 }
                        //             },
                        //             color: '#121847',
                        //             borderWidth: 0,
                        //             shadowBlur: {
                        //                 shadowColor: 'rgba(255,255,255,0.31)',
                        //                 shadowBlur: 10,
                        //                 shadowOffsetX: 0,
                        //                 shadowOffsetY: 2,
                        //             },
                        //         }
                        //     },
                        //     barWidth: '20%',
                        //     // data: [30, 30, 30, 30, 30]
                        // }
                    ]
                };
                // myChart.resize();
                // if(isgoeasy){
                //     clearTimeout(timeOut);
                //     clearInterval(timeTicket);
                // }
                // // 动态显示
                // var count = 0;
                // var timeTicket = null;
                // var timeOut = null;
                // var dataLength = option.series[0].data.length;
                // if(!timeOut){
                //     clearTimeout(timeOut)
                // }
                // clearInterval(timeTicket);
                // myChart.dispatchAction({
                //     type: 'hideTip'
                // });
                // // myChart.dispatchAction({
                // //     type: 'dataZoom',
                // //     seriesIndex: 0
                // // });
                // // myChart.dispatchAction({
                // //     type: 'highlight',
                // //     seriesIndex: 0,
                // //     dataIndex: 0
                // // });
                // // myChart.dispatchAction({
                // //     type: 'showTip',
                // //     seriesIndex: 0,
                // //     dataIndex: 0
                // // });
                // timeOut = setTimeout(function(){
                //     timeTicket = setInterval(function() {
                //         myChart.dispatchAction({
                //             type: 'dataZoom',
                //             seriesIndex: 0,
                //         });
                //         myChart.dispatchAction({
                //             type: 'highlight',
                //             seriesIndex: 0,
                //             dataIndex: (count) % dataLength
                //         });
                //         myChart.dispatchAction({
                //             type: 'showTip',
                //             seriesIndex: 0,
                //             dataIndex: (count) % dataLength
                //         });
                //         count++;
                //     }, 2000);

                //     myChart.on('mouseover', function(params) {
                //         clearInterval(timeTicket);
                //         myChart.dispatchAction({
                //             type: 'dataZoom',
                //             seriesIndex: 0
                //         });
                //         myChart.dispatchAction({
                //             type: 'highlight',
                //             seriesIndex: 0,
                //             dataIndex: params.dataIndex
                //         });
                //         myChart.dispatchAction({
                //             type: 'showTip',
                //             seriesIndex: 0,
                //             dataIndex: params.dataIndex,
                //         });
                //     });
                //     myChart.on('mouseout', function(params) {
                //         timeTicket && clearInterval(timeTicket);
                //         timeTicket = setInterval(function() {
                //             myChart.dispatchAction({
                //                 type: 'dataZoom',
                //                 seriesIndex: 0,
                //             });
                //             myChart.dispatchAction({
                //                 type: 'highlight',
                //                 seriesIndex: 0,
                //                 dataIndex: (count) % dataLength
                //             });
                //             myChart.dispatchAction({
                //                 type: 'showTip',
                //                 seriesIndex: 0,
                //                 dataIndex: (count) % dataLength
                //             });
                //             count++;
                //         }, 2000);
                //     });
                // },500)
                

                // 使用刚指定的配置项和数据显示图表。
                // myChart.setOption(option);
                myChart.setOption(option, true);
                window.addEventListener("resize",function(){
                    myChart.resize();
                });
            }else{
                if(res.code == 2001){
                    var oMsg = res.message || '请重新登录';
                    layer.msg('提示,' + oMsg,{
                        shade: 0.3,
                        shadeClose:true,
                        time:2000,
                        icon: 2
                    },
                    function(){
                        // window.location.href = 'login.html';
                    });
                }else{
                    var oMsg = res.message;
                    layer.msg('提示,' + oMsg,{
                        shade: 0.3,
                        shadeClose:true,
                        time:2000,
                        icon: 2
                    });
                }
            }  
        }); 
    }

    // 轮播信息
    function echarts_6(isgoeasy){
        if(isgoeasy){
            e6Time.autoplay.stop();
        }
        // var mySwiper = null;
        common.viscAjax('/HuaXtentCover/data/view/alarmTop10', 'POST', {deptId: $.cookie('coverDeptId')}, function(res){
            if (res.success && res.code == '200') {
                res.data.map(function(item){
                    item.reportingTime = new Date(item.reportingTime).Format("yyyy-MM-dd hh:mm:ss");
                })
                var detail=res.data;
                var model=$("#model").html();
                var template=_.template(model)(detail);
                $(".swiper-wrapper").html(template);
                e6Time = new Swiper ('.swiper-container', {
                    direction: 'vertical',
                    loop: true,
                    autoplay:{
                        delay: 3000,//3秒切换一次
                    },
                });

                // mySwiper.autoplay.stop();
                // mySwiper.autoplay.start();
                // 鼠标离开开启自动切换
                e6Time.el.onmouseleave = function(){
                    e6Time.autoplay.start();
                }
                // 鼠标覆盖停止自动切换
                e6Time.el.onmouseover = function(){
                    e6Time.autoplay.stop();
                }
            }else{
                if(res.code == 2001){
                    var oMsg = res.message || '请重新登录';
                    layer.msg('提示,' + oMsg,{
                        shade: 0.3,
                        shadeClose:true,
                        time:2000,
                        icon: 2
                    },
                    function(){
                        // window.location.href = 'login.html';
                    });
                }else{
                    var oMsg = res.message;
                    layer.msg('提示,' + oMsg,{
                        shade: 0.3,
                        shadeClose:true,
                        time:2000,
                        icon: 2
                    });
                }
            }
        });
    }


    // 基于websocket
    var goEasy = new GoEasy({appkey:'BC-fc612021f70c4deab0053d74b3908295'});

    // 实时部门分类，圆饼
    goEasy.subscribe({
        channel: 'deptClassify', //通道
        onMessage: function(message){
            if(window.location.pathname.indexOf('visc.html') != -1){
                var oResult = JSON.parse(message.content);
                if(oResult.success){
                    echarts_1(oResult.success);
                }
            }
        }
    });

    // 实时报警信息，轮播
    goEasy.subscribe({
        channel: 'alarmTop10', //通道
        onMessage: function(message){
            if(window.location.pathname.indexOf('visc.html') != -1){
                var oResult = JSON.parse(message.content);
                if(oResult.success){
                    echarts_6(oResult.success);
                }
            }
        }
    });

    // 实时状态统计，扇形
    goEasy.subscribe({
        channel: 'alarmStat', //用通道
        onMessage: function(message){
            if(window.location.pathname.indexOf('visc.html') != -1){
                var oResult = JSON.parse(message.content);
                if(oResult.success){
                    echarts_4(oResult.success)
                }
            }
        }
    });

    // 实时省份统计，柱状
    goEasy.subscribe({
        channel: 'alarmsOfProTop5', //通道
        onMessage: function(message){
            if(window.location.pathname.indexOf('visc.html') != -1){
                var oResult = JSON.parse(message.content);
                if(oResult.success){
                    echarts_5(oResult.success)
                }
            }
        }
    });

    // 实时心跳，曲线
    goEasy.subscribe({
        channel: $.cookie('coverDeptId') + '_realTimeHeart', //用户登陆的id
        onMessage: function(message){
            if(window.location.pathname.indexOf('visc.html') != -1){
                var oResult = JSON.parse(message.content);
                if(oResult.length > 0){
                    echarts_3(oResult)
                }
            }
        }
    });

    // 地图状态改变推送
    goEasy.subscribe({
        // channel: $.cookie('coverDeptId') + '_push2map' || '1_push2map', //用户登陆的id
        channel: $.cookie('coverDeptId') + '_push2map', //用户登陆的id
        onMessage: function(message){
            toastr.options = {
                "closeButton": false,    //关闭按钮
                "debug": true,  //调试
                "newestOnTop": true,    //最新在最上面
                "progressBar": false,   //进度条
                "positionClass": "toast-top-right",
                "preventDuplicates": true,  //是否开启防止重复
                "onclick": function(){__audioPause()},  //是否点击
                // "onclick": null,  //是否点击
                "showDuration": "300",  //出现时长
                "hideDuration": "1000", //消失时长
                "timeOut": "10000",      //显示多久  '10000'或'null'
                "extendedTimeOut": "3000",  //隐藏多久  '3000'或'null'
                "showEasing": "swing",  
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
            }
            if(window.location.pathname.indexOf('visc.html') != -1){
                // console.log(message)
                var oResult = JSON.parse(message.content);

                if(oResult.deviceState == 1){
                    var oState = '正常';
                    var oNewImg = 'assets/images/normal_ioc.png';
                }else if(oResult.deviceState == 2){
                    var oState = '信号弱';
                    var oNewImg = 'assets/images/noonline_ico.png';
                }else if(oResult.deviceState == 3){
                    var oState = '休眠';
                    var oNewImg = 'assets/images/smart_Manholecover.png';
                }else if(oResult.deviceState == 4){
                    var oState = '报警';
                    var oNewImg = 'assets/images/abnormal_ico.png';
                }else{
                    var oState = '未知';
                    var oNewImg = 'assets/images/abnormal_ico.png';
                }
                // console.log(oResult)
                var position = new AMap.LngLat(parseFloat(oResult.longitude), parseFloat(oResult.latitude));
                var oMsg = 'Imei号：' + oResult.imei + '；<br/>设备名称：' + oResult.deviceName + '；<br/>报警状态：' + oState + '；<br/>报警时间：' + new Date(parseInt(oResult.updateTime)).Format("yyyy-MM-dd hh:mm:ss");
                if(oResult.deviceState != 1){
                    Command: toastr["error"](oMsg);
                    // 打开
                    var infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(0, -30)});
                    var oHtml = '';
                        oHtml += '<span style="display: inline-block; width: 70px;">imei号：</span>'+ oResult.imei +'<br/>';
                        oHtml += '<span style="display: inline-block; width: 70px;">设备名称：</span>'+ oResult.deviceName +'<br/>';
                        oHtml += '<span style="display: inline-block; width: 70px;">部门区域：</span>'+ oResult.areaName +'<br/>';
                        oHtml += '<span style="display: inline-block; width: 70px;">地址：</span>'+ oResult.address +'<br/>';
                        oHtml += '<span style="display: inline-block; width: 70px;">负责人：</span>'+ oResult.username +'<br/>';
                        oHtml += '<span style="display: inline-block; width: 70px;">部门名称：</span>'+ oResult.deptName +'<br/>';
                        oHtml += '<span style="display: inline-block; width: 70px;">设备状态：</span>'+ oState +'<br/>';
                        oHtml += '<span style="display: inline-block; width: 70px;">更新时间：</span>'+ new Date(parseInt(oResult.updateTime)).Format("yyyy-MM-dd hh:mm:ss") +'<br/>';
                    infoWindow.setContent(oHtml);
                    infoWindow.open(map, position);
                    __audioPlay();
                    setTimeout(function(){
                        __audioPause();
                        infoWindow.close(map, position);
                    }, 10000);
                }

                // markers.map(function(item){
                //     if(item.imei == oResult.imei){
                //         item.setMap(null);
                //     }
                // });
                // var oNewMarkers = markers;
                // setTimeout(function(){
                    for(var i = 0; i < markers.length; i++){
                        if(markers[i].imei == oResult.imei){
                            // console.log(i);
                            markers[i].hide();
                            markers[i].setMap(null);
                            // map.remove(markers[i]);
                            markers.splice(i, 1);
                            // console.log(markers);
                            // console.log(markers.length);
                            // i = i - 1;
                            // markers.setMap(null);
                            // break;
                            // i = markers.length
                        }
                    }

                    
                    
                    var oNewMarker = new AMap.Marker({
                        icon: new AMap.Icon({
                                size: new AMap.Size(25, 25),  //图标大小
                                image: oNewImg
                            }),
                        offset: new AMap.Pixel(-15,-15),
                        position: position
                    });
                    oNewMarker.imei = oResult.imei;
                    oNewMarker.on('click', markerClick);
                    markers.push(oNewMarker);
                    // console.log(markers);
                    // map.add(oNewMarker);
                    oNewMarker.setMap(map);  //在地图上添加点
                
                
                    
                // },500)
                
            }
        }
    });
    
    // 实时统计
    goEasy.subscribe({
        channel: $.cookie('coverDeptId') + '_realTimeStat', //用户登陆的id
        onMessage: function(message){
            if(window.location.pathname.indexOf('visc.html') != -1){
                // console.log(message)
                var oResult = JSON.parse(message.content);
                // console.log(oResult)
                $('.coverAllNum').text(oResult.total);
                $('.coverRunNum').text(oResult.run);
                $('.coverRunNumMap').text(oResult.total);
                $('.coverAddNum').text(oResult.newAdd);
                $('.coverAlarmNum').text(oResult.newAlarm);
            }
        }
    });

    // 地图添加
    goEasy.subscribe({
        // channel: $.cookie('coverDeptId') + '_push2map' || '1_push2map', //用户登陆的id
        channel: $.cookie('coverDeptId') + '_push2Map4Add', //用户登陆的id
        onMessage: function(message){
            if(window.location.pathname.indexOf('visc.html') != -1){
                var oResult = JSON.parse(message.content);
                console.log(oResult)

                for(var i = 0; i < markers.length; i++){

                    if(markers[i].imei == oResult.imei){
                        // console.log(markers[i])
                        map.remove(markers[i]);
                        markers.splice(i, 1);
                        // console.log(markers);
                        // markers[i].hide();
                        // markers[i].setMap(null);
                        // isAdd = true
                        // break;
                        // i = markers.length
                    }
                }
                setTimeout(function(){
                    if(oResult.state == 1){
                        var oNewImg = 'assets/images/normal_ioc.png';
                    }else if(oResult.state == 2){
                        var oNewImg = 'assets/images/noonline_ico.png';
                    }else if(oResult.state == 3){
                        var oNewImg = 'assets/images/smart_Manholecover.png';
                    }else if(oResult.state == 4){
                        var oNewImg = 'assets/images/abnormal_ico.png';
                    }else{
                        var oNewImg = 'assets/images/abnormal_ico.png';
                    }

                    var oAddMarker = new AMap.Marker({                    
                        icon: new AMap.Icon({            
                                size: new AMap.Size(25, 25),  //图标大小
                                image: oNewImg
                            }),
                        offset: new AMap.Pixel(-15,-15),
                        position: new AMap.LngLat(parseFloat(oResult.lng), parseFloat(oResult.lat))  
                    });
                    oAddMarker.imei = oResult.imei;
                    oAddMarker.on('click', markerClick);
                    markers.push(oAddMarker);
                    map.add(oAddMarker);
                },500)
                
                // oAddMarker.setMap(map);  //在地图上添加点
            }
        }
    });

    // 地图删除推送
    goEasy.subscribe({
        channel: $.cookie('coverDeptId') + '_push2Map4Del', //用户登陆的id
        onMessage: function(message){
            if(window.location.pathname.indexOf('visc.html') != -1){
                var oResult = JSON.parse(message.content);
                console.log(oResult);
                // console.log(JSON.parse(oResult));
                for(var i = 0; i < markers.length; i++){
                    if(markers[i].imei == oResult.imei){
                        // console.log(i);
                        markers[i].hide();
                        markers[i].setMap(null);
                        // map.remove(markers[i]);
                        markers.splice(i, 1);
                        // console.log(markers);
                        // console.log(markers.length);
                        // i = i - 1;
                        // markers.setMap(null);
                        // break;
                        // i = markers.length
                    }
                }
            }
        }
    });
    
    function __audio(){
        var audio = document.getElementById('alarm_voice'); 
        if(audio!==null){             
            //检测播放是否已暂停.audio.paused 在播放器播放时返回false.
            console.log(audio.paused);
            if(audio.paused)                     {                 
                audio.play();//audio.play();// 这个就是播放
            }else{
                audio.pause();// 这个就是暂停
            }
        } 
    }

    function __audioPlay(){
        var audio = document.getElementById('alarm_voice'); 
        audio.play();
    }
    function __audioPause(){
        var audio = document.getElementById('alarm_voice'); 
        audio.pause();
    }
    $('body').on('click','.toast-close-button',function(){
         __audio();                            
    });
});

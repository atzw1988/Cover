// var $ip="https://www.lcgxlm.com/Manholecover/";
// var $newIp="https://www.lcgxlm.com/HuaXtentCover/";
(function () {
    var common = {
        init: function () {
//          this.addloading()//调用加载内容
//          this.ajaxSetting()//调用ajaxSetting方法
//          this.loadingFinish()//调用结束方法
            this.oUrl()
        },
        //存储数据
        setData: function (name, obj) {
            if (typeof obj == "object") {
                obj = JSON.stringify(obj);//将obj转化为string类型
            }
            localStorage.setItem(name, obj)
        },
        //获取数据
        getData: function (key) {
            var data;
            //尝试运行逻辑代码，一旦出现bug就执行catch()
            try {
                var obj = localStorage.getItem(key);
                data = JSON.parse(obj); //将obj转化为json， locastorage只能存储字符串，所以必须转化类型
                if (data == null) {
                    data = false;
                }

            } catch (e) {
                data = obj
                if (data == null) {
                    data = false;
                }
            }
            return data;
        },
        //清除对应的key
        rmkey: function (key) {
            localStorage.removeItem(key)
        },
        //访问后台服务
        /**
         *
         * @param {Object} url 是传过来的路径
         * @param {Object} data data是传过来的请求参数
         * @param {Object} callback 回调函数
         */
        oUrl: function(){
            return 'https://www.lcgxlm.com';
            // return 'http://112.33.13.149:8080';
            // return 'http://192.168.0.130:8080';
            // return 'http://192.168.0.116:8080'; //需要修改addBranch.html + editBranch.html里面的ip
         },
        oImageUrl: function(){
            return 'https://huateng-cover.oss-cn-shenzhen.aliyuncs.com/';
        },
        ajax: function (url, type, data, callback) {
            $.ajax({
                type: type,
                url: common.oUrl() + url,//服务器
                data: data,
                dataType: 'json',
                beforeSend: function(xhr){
                    xhr.setRequestHeader('token', $.cookie('coverToken'));
                },
                success : function(response){  
                    //成功执行    
                    callback(response);
                }
                ,error:function(request){
                    console.log(request);
                    $('body').mLoading("hide");
                    var oMsg = '登录超时或权限失效';
                    layer.msg('提示,' + oMsg,{
                        shade: 0.3,
                        shadeClose:true,
                        time:2000,
                        icon: 2
                    },
                    function(){
                        // var index = parent.layer.getFrameIndex(window.name);
                        // if(index){
                        //     parent.layer.close(index);
                        // }
                        // window.parent.location.href = 'login.html';
                    });

                }
            });
        },
        
        ajaxJson: function (url, type, data, callback) {
            $.ajax({
                type: type,
                url: common.oUrl() + url,
                beforeSend: function(xhr){
                    xhr.setRequestHeader('token', $.cookie('coverToken'));
                },
                contentType: "application/json",
                data: JSON.stringify(data),
                dataType: 'json',
                success : function(response){  
                    // if(response.code == 401){
                    //     layer.confirm('登录超时', {
                    //         btn: ['确定', '取消']
                    //     }, function () {
                    //         window.parent.location.href = 'login.html';
                    //     });
                    // }
                    //成功执行    
                    callback(response);
                }
                ,error:function(request){
                    console.log(request);
                }
            });
        },

        viscAjax: function (url, type, data, callback) {
            $.ajax({
                type: type,
                url: common.oUrl() + url,//服务器
                data: data,
                dataType: 'json',
                success : function(response){  
                    //成功执行    
                    callback(response);
                }
                ,error:function(request){
                    console.log(request);
                    $('body').mLoading("hide");
                    var oMsg = '登录超时或权限失效';
                    layer.msg('提示,' + oMsg,{
                        shade: 0.3,
                        shadeClose:true,
                        time:2000,
                        icon: 2
                    },
                    function(){
                        window.parent.location.href = 'login.html';
                    });

                }
            });
        }
    }
    common.init();
    window.common = common;

})();

// 日期转换
Date.prototype.Format = function (fmt) { //author: zhengsh 2016-9-5
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

    // $('body').mLoading("show");
    if(common.getData('oCoverResoList')){
        console.log(common.getData('oCoverResoList'))
        // var oDataList = JSON.parse(common.getData('oCoverResoList'))
        var oDataList = common.getData('oCoverResoList')
        var oCpnt = oDataList.sort(function(a,b){  
            return a.orderNum - b.orderNum;  
        })

        var oHtml = '';
        for(var i = 0; i < oCpnt.length; i++){
            if(oCpnt[i].secondNum > 0){
                oHtml += '<li class="droplink" data-father="'+oCpnt[i].id+'">'+
                                '<a href="javascript:;" class="waves-effect waves-button">'+
                                    '<span class="menu-icon '+oCpnt[i].htmlIcon+'"></span>'+
                                    '<p>'+oCpnt[i].name+'</p>'+
                                    '<span class="arrow"></span>'+
                                '</a>'+
                                '<ul class="sub-menu">';
                for(var j = 0; j < oCpnt[i].secondList.length; j++){
                    oHtml += '<li data-child="'+oCpnt[i].secondList[j].id+'"><a target="'+oCpnt[i].secondList[j].jumpMode+'" href="'+oCpnt[i].secondList[j].url+'">'+oCpnt[i].secondList[j].name+'</a></li>';
                }
                oHtml += '</ul>'+
                            '</li>';
            }else{
                oHtml += '<li data-father="'+oCpnt[i].id+'">'+
                            '<a href="'+oCpnt[i].url+'" class="waves-effect waves-button" target="'+oCpnt[i].jumpMode+'">'+
                                '<span class="menu-icon '+oCpnt[i].htmlIcon+'"></span>'+
                                '<p>'+oCpnt[i].name+'</p>'+
                                '<span class="active-page"></span>'+
                            '</a>'+
                        '</li>';
            }
        }
        $('.menu,.accordion-menu').html(oHtml);
        // $('body').mLoading("hide");
    }else{
        // $('body').mLoading("hide");
    }

$(function(){
    if($.cookie('coverLogo')){
        $('#logo-img').attr('src', common.oImageUrl() + $.cookie('coverLogo'));
    }
    if($.cookie('coverName')){
        var oLogoName = $.cookie('coverName') + ' -- '
        $('#logo-name').text(oLogoName);
    }
    $('.user-name').text($.cookie('coverUserName'));

    // 退出登录
    $('body').on('click','.pull_out',function(){
        swal({
            title: "你确定要退出系统吗？",
            text: " ",
            type: "warning",
            showCancelButton: true,
            cancelButtonColor:"#ccc",
            cancelButtonText: "取消",
            confirmButtonColor: "#30B19B",
            confirmButtonText: "是的",
            closeOnConfirm: true,
            closeOnCancel: true
        },function(isConfirm){
            if (isConfirm) {
                common.ajax('/HuaXtentCover/logout', 'POST', '',function(res){
                    if (res.success) {
                        $.cookie('coverToken', '',{ expires: -1 });
                        window.location.href = 'login.html';
                    }
                });
            }
        });
        
        // 后台提交,先模拟跳转
        // window.location.href = 'login.html';
    });

	
	//修改密码
	$("body").on("click", ".change_password",function(){
        layer.open({
            title:"修改密码",
            type: 2,
            shadeClose: false, //点击遮罩关闭
            area : ['380px', '400px'],
            content: 'pwd.html',
            end: function () {
                // window.location.reload();
            }

        });
    })

    // 确定修改密码 
    $('body').on('click','#comfirm_btn',function(e){
        e.preventDefault();
        var userPassword = $('#userPassword').val(),
            newpassword = $('#newpassword').val(),  
            confirmpassword = $('#confirmpassword').val(),
            oData = {},
            uPattern = /^[a-zA-Z0-9_-]{6,20}$/;
        console.log($.cookie('coverToken'));
        if (uPattern.test(newpassword)
            && uPattern.test(confirmpassword)
            && userPassword.length > 0
            && newpassword.length > 0
            && confirmpassword.length > 0
            && newpassword == confirmpassword) {
            oData.oldpwd = userPassword;
            oData.newpwd = newpassword;
            common.ajax('/HuaXtentCover/admin/users/cha_ps','POST', oData,function(res){
                if(res.success){
                    __pwd()
                    // swal("修改密码成功", " ", "success");
                }else{
                    // var oCode = res.code || '修改密码失败!';
                    // swal("提示", res.code, "error");
                    var oMsg = res.message || '修改密码失败';
                    layer.msg('提示,' + oMsg,{
                        shade: 0.3,
                        shadeClose:true,
                        time:2000,
                        icon: 2
                    });
                    
                }
            });
        }else{
            var oMsg = '修改密码失败';
            layer.msg('提示,' + oMsg,{
                shade: 0.3,
                shadeClose:true,
                time:2000,
                icon: 2
            });
        }
    
    });
    function __pwd(){
        var oMsg = '修改密码成功';
        layer.msg('提示,' + oMsg,{
            shade: 0.3,
            shadeClose:true,
            time:2000,
            icon: 1
        },
        function(){
            window.parent.location.href = 'login.html';
        });
        
    }
    function __reloadPage(argument) {
        window.location.reload();
    }

    function __audio(){
        var audio = document.getElementById('alarm_voice'); 
        // audio.play();
        // setTimeout(function(){
        //     audio.pause();
        // },10000)
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
    // __audio();
    // if(){
    //     var userId = ''
    // }
    $('body').on('click','.toast-close-button',function(){
         __audio();                            
    });
    var goEasy = new GoEasy({appkey:'BC-fc612021f70c4deab0053d74b3908295'});
        goEasy.subscribe({
            channel: $.cookie('coverDeptId') || '', //用户登陆的id
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
                    "timeOut": "null",      //显示多久  '10000'或'null'
                    "extendedTimeOut": "null",  //隐藏多久  '3000'或'null'
                    "showEasing": "swing",  
                    "hideEasing": "linear",
                    "showMethod": "fadeIn",
                    "hideMethod": "fadeOut"
                }
                // console.log(message)
                var oResult = JSON.parse(message.content);
                console.log(oResult)
                if(oResult.type == 1){ //弹框+状态
                    if(oResult.state == 1){
                        var oState = '正常';
                        var oColor = '#30B19B';
                    }else if(oResult.state == 2){
                        var oState = '信号弱';
                        var oColor = '#666';
                    }else if(oResult.state == 3){
                        var oState = '休眠';
                        var oColor = '#666';
                    }else if(oResult.state == 4){
                        var oState = '报警';
                        var oColor = 'red';
                    }else{
                        var oState = '未知';
                        var oColor = '#666';
                    }
                    var oMsg = 'Imei号：' + oResult.imei + '；<br/>报警信息为：' + oResult.alarmMsg + '；<br/>报警时间：' + new Date(parseInt(oResult.time)).Format("yyyy-MM-dd hh:mm:ss");
                    Command: toastr["error"](oMsg);
                    if(window.location.pathname.indexOf('coverList.html') != -1 ){
                        for(var i = 0; i < $('td.imei').length; i++){
                            var oHtml;
                            if($('td.imei').eq(i).text() == oResult.imei){
                                oHtml +='<td>'+$('td.imei').eq(i).parent().find('td').eq(0).html()+'</td>'+
                                        '<td class="imei">'+$('td.imei').eq(i).text()+'</td>'+
                                        '<td>'+$('td.imei').eq(i).parent().find('td').eq(2).text()+'</td>'+
                                        '<td>'+$('td.imei').eq(i).parent().find('td').eq(3).text()+'</td>'+
                                        '<td>'+$('td.imei').eq(i).parent().find('td').eq(4).text()+'</td>'+
                                        '<td>'+$('td.imei').eq(i).parent().find('td').eq(5).text()+'</td>'+
                                        '<td>'+$('td.imei').eq(i).parent().find('td').eq(6).text()+'</td>'+
                                        '<td>'+$('td.imei').eq(i).parent().find('td').eq(7).text()+'</td>'+
                                        '<td>'+$('td.imei').eq(i).parent().find('td').eq(8).text()+'</td>'+
                                        '<td>'+$('td.imei').eq(i).parent().find('td').eq(9).text()+'</td>'+
                                        '<td>'+new Date(parseInt(oResult.time)).Format("yyyy-MM-dd hh:mm:ss")+'</td>';
                                        if (oResult.state == 8) {
                                            oHtml += '<td style="color: #30B19B">正常</td>';
                                        } else if (oResult.state == 3) {
                                            oHtml += '<td style="color: #30B19B">复位</td>';
                                        }else{
                                            oHtml += '<td style="color: red">' + oResult.alarmMsg +'</td>'
                                        }
                                        // else if(oResult.state == 2){
                                        //     oHtml += '<td style="color: #f5df62">信号弱</td>';
                                        // }else if(oResult.state == 3){
                                        //     oHtml += '<td style="color: #ccc">休眠</td>';
                                        // }else if(oResult.state == 4){
                                        //     oHtml += '<td style="color: red">报警</td>';
                                        // }else{
                                        //     oHtml += '<td>未知</td>';
                                        // }
                                oHtml +='<td>'+$('td.imei').eq(i).parent().find('td').eq(12).html()+'</td>'+
                                        '<td>'+
                                            '<div class="edit_btn"><a href="javascript:;" style="color: #30B19B !important;">编辑</a></div>'+
                                            '<div class="delete_btn"><a href="javascript:;">删除</a></div>'+
                                            '<span class="hide id">'+$('span.id').eq(i).text()+'</span>'+
                                            '<span class="hide deviceId">'+$('span.deviceId').eq(i).text()+'</span>'+
                                            '<span class="hide deviceType">'+$('span.deviceType').eq(i).text()+'</span>'+
                                            '<span class="hide version">'+$('span.version').eq(i).text()+'</span>'+
                                        '</td>';
                                $('td.imei').eq(i).parent().html(oHtml);
                                i = $('td.imei').length;
                            }
                        }
                    }

                    if(window.location.pathname.indexOf('lockList.html') != -1){
                        // var oResult = JSON.parse(message.content);
                        for(var i = 0; i < $('.imei').length; i++){
                            if($('.imei').eq(i).text() == oResult.imei){
                                $('.imei').eq(i).parent().find('td.deviceState').text(oState);
                                $('.imei').eq(i).parent().find('td.deviceState').css({'color': oColor});
                                $('.imei').eq(i).parent().find('td.updateTime').text(new Date(oResult.time).Format("yyyy-MM-dd hh:mm:ss"));
                                i = $('.imei').length;
                            }
                        }
                    }
                    __audioPlay()
                }else if(oResult.type == 2){ //状态
                    if(window.location.pathname.indexOf('coverList.html') != -1 ){
                        for(var i = 0; i < $('td.imei').length; i++){
                            var oHtml;
                            if($('td.imei').eq(i).text() == oResult.imei){
                                oHtml +='<td>'+$('td.imei').eq(i).parent().find('td').eq(0).html()+'</td>'+
                                        '<td class="imei">'+$('td.imei').eq(i).text()+'</td>'+
                                        '<td>'+$('td.imei').eq(i).parent().find('td').eq(2).text()+'</td>'+
                                        '<td>'+$('td.imei').eq(i).parent().find('td').eq(3).text()+'</td>'+
                                        '<td>'+$('td.imei').eq(i).parent().find('td').eq(4).text()+'</td>'+
                                        '<td>'+$('td.imei').eq(i).parent().find('td').eq(5).text()+'</td>'+
                                        '<td>'+$('td.imei').eq(i).parent().find('td').eq(6).text()+'</td>'+
                                        '<td>'+$('td.imei').eq(i).parent().find('td').eq(7).text()+'</td>'+
                                        '<td>'+$('td.imei').eq(i).parent().find('td').eq(8).text()+'</td>'+
                                        '<td>'+$('td.imei').eq(i).parent().find('td').eq(9).text()+'</td>'+
                                        '<td>'+new Date(parseInt(oResult.time)).Format("yyyy-MM-dd hh:mm:ss")+'</td>';
                                        if (oResult.state == 8) {
                                            oHtml += '<td style="color: #30B19B">正常</td>';
                                        } else if (oResult.state == 3) {
                                            oHtml += '<td style="color: #30B19B">复位</td>';
                                        } else {
                                            oHtml += '<td style="color: red">' + oResult.alarmMsg + '</td>'
                                        }
                                        // else if(oResult.state == 2){
                                        //     oHtml += '<td style="color: #f5df62">信号弱</td>';
                                        // }else if(oResult.state == 3){
                                        //     oHtml += '<td style="color: #ccc">休眠</td>';
                                        // }else if(oResult.state == 4){
                                        //     oHtml += '<td style="color: red">报警</td>';
                                        // }else{
                                        //     oHtml += '<td>未知</td>';
                                        // }
                                oHtml +='<td>'+$('td.imei').eq(i).parent().find('td').eq(12).html()+'</td>'+
                                        '<td>'+
                                            '<div class="edit_btn"><a href="javascript:;" style="color: #30B19B !important;">编辑</a></div>'+
                                            '<div class="delete_btn"><a href="javascript:;">删除</a></div>'+
                                            '<span class="hide id">'+$('span.id').eq(i).text()+'</span>'+
                                            '<span class="hide deviceId">'+$('span.deviceId').eq(i).text()+'</span>'+
                                            '<span class="hide deviceType">'+$('span.deviceType').eq(i).text()+'</span>'+
                                            '<span class="hide version">'+$('span.version').eq(i).text()+'</span>'+
                                        '</td>';
                                $('td.imei').eq(i).parent().html(oHtml);
                                i = $('td.imei').length;
                            }
                        }
                    }

                    if(window.location.pathname.indexOf('lockList.html') != -1){
                        // var oResult = JSON.parse(message.content);
                        if(oResult.state == 1){
                            var oState = '正常';
                            var oColor = '#30B19B';
                        }else if(oResult.state == 2){
                            var oState = '信号弱';
                            var oColor = '#666';
                        }else if(oResult.state == 3){
                            var oState = '休眠';
                            var oColor = '#666';
                        }else if(oResult.state == 4){
                            var oState = '报警';
                            var oColor = 'red';
                        }else{
                            var oState = '未知';
                            var oColor = '#666';
                        }
                        var oIemi = oResult.imei
                        for(var i = 0; i < $('.imei').length; i++){
                            if($('.imei').eq(i).text() == oIemi){
                                $('.imei').eq(i).parent().find('td.deviceState').text(oState);
                                $('.imei').eq(i).parent().find('td.deviceState').css({'color': oColor});
                                $('.imei').eq(i).parent().find('td.updateTime').text(new Date(oResult.time).Format("yyyy-MM-dd hh:mm:ss"));
                                i = $('.imei').length;
                            }
                        }
                    }
                }
                
                
                // alert('接收到消息:'+message.content);//拿到了信息之后，你可以做你任何想做的事
            }
        });
});
$(function(){
	$("#user").focus();
	
	function __login(){
		if ($.cookie('coverUserName') != undefined && $.cookie('coverUserPassword') != undefined) {
			$('#user').val($.cookie('coverUserName'));
			$('#password').val($.cookie('coverUserPassword'));
		}
	}
	__login();

	
	
	$('body').on('click','#on_login',function(){
		var user = $('#user').val();
		var password = $('#password').val();
		var oData = {
			username: user,
			password: password
		}
		if($('#user').val()==''){
			alert("账号密码不能为空");
			$(".user").val('');
			$(".password").val('');
    }else if($("#user").val()==''){
			alert("账号密码不能为空");
			$(".password").val('');
			$(".user").val('');
    }else{
			common.ajax('/HuaXtentCover/login', 'POST', oData, function(res){
				console.log(res)
				if(res.success != false){
					if ($("#remember-password-checkbox").prop("checked")) {
						$.cookie('coverUserName',user,{expires:7});
						$.cookie('coverUserPassword',password,{expires:7});
						$.cookie('coverToken',res.data.token,{expires:1});
						$.cookie('coverDeptId',res.data.id,{expires:7});
						$.cookie('coverName',res.data.name,{expires:1});
						if(res.data.logo){
							$.cookie('coverLogo',res.data.logo,{expires:1});
						}
					}else{
						$.cookie('coverToken',res.data.token,{expires:1});
						$.cookie('coverDeptId',res.data.id,{expires:7});
						$.cookie('coverName',res.data.name,{expires:1});
						if(res.data.logo){
							$.cookie('coverLogo',res.data.logo,{expires:1});
						}
					}
					if($.cookie('coverToken')!=undefined){
						common.ajax('/HuaXtentCover/reso/quResos', 'POST', {fid: 0}, function(res){
							console.log(res);
							if(res.success){
								var oData = JSON.stringify(res.data.resoList)
								common.setData('oCoverResoList', oData)
								setTimeout(function(){
									window.location.href = 'coverMap.html';
								},500)
							}else{
								swal("提示", "该帐号暂无访问权限", "error");
							}	
						});
					}else{
						swal("登录出错", "请更换浏览器或者清理缓存后再尝试", "error");
					}
        }else{
					var message = res.message || '密码错误';
					swal("提示", message, "error");
        }
			});
    }		
	});
	
	// IE浏览器限制
	var browser=navigator.appName 
	var b_version=navigator.appVersion 
	var version=b_version.split(";"); 
	var trim_Version=version[1].replace(/[ ]/g,""); 
	if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE6.0") 
	{ 
		alert("请使用谷歌浏览器登录此管理平台！谢谢！"); 
	} 
	else if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE7.0") 
	{ 
	alert("请使用谷歌浏览器登录此管理平台！谢谢！"); 
	} 
	else if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE8.0") 
	{ 
	alert("请使用谷歌浏览器登录此管理平台！谢谢！"); 
	} 
	else if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE9.0") 
	{ 
	alert("请使用谷歌浏览器登录此管理平台！谢谢！"); 
	} 
	
});
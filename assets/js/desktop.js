var openID=null;
var wins = 0;
$(document).ready(function() {
	$(".start-menu").click(function() {
		$(".menu").stop();
		$(".menu").toggle(300);
	});
	$('.ullist li, .content, .open-app, .nav-apps, .app-icon').click(function() {
		$(".menu").hide(300);
	});
	$(".content").sortable({
		items: ".app-icon"
	});
	$(".col-desktop").disableSelection();
	wallpaperCookie = $.cookie("wallpaper");
	if($.removeCookie('wallpaper')){
		$('body').css('backgroundImage', 'url("assets/img/wallpapers/'+wallpaperCookie+'")');
		$.cookie("wallpaper", wallpaperCookie);
	}
	if($.cookie("css")) {
		$("#theme").attr("href",$.cookie("css"));
	}
});

function tocApp(id){
	if(openID!=null){
		if(openID!=id){
			minWindows(openID);
		}
	}
	openID=id;
	$('.app-'+id).toggleClass('selected');
	$('.window').css('z-index','1000');
	var zindex= $('#'+id).css('z-index');
	$('#'+id).css('z-index',++zindex);
	$("#"+id).toggle(0);	
}

function openApp(id, title, page, icon, width, height, resizable){
	if(openID!=null){
		minWindows(openID);
	}
	openID=id;
	tocApp(id);
	
	$('.window').css('z-index','1000');
	var test = $('.nav-apps div').is('.app-'+ id);
	if(test == true){
		//$('#'+id).effect( "bounce", {times:3}, 300 );
	} else{
		createWindows(id, title, page, icon, width, height, resizable);
		
		maxWindows(id);
	}
}
function createWindows(id, title, page, icon, width, height, resizable){
	wins += 1;
	if(wins > 7){
		wins = 7;
		alert("您打开了太多窗口，请关掉几个吧！");
		return; 
	}
	var titleApp = '<div class="open-app app-'+ id +' selected" onclick="tocApp(\''+ id +'\')"><div style="position: relative;"><i class="fa '+ icon +'"></i><span class="title"> '+ title +' </span></div></div>'
	$('.nav-apps').append(titleApp);
	var window = '<div class="window ui-widget-content" id="'+ id +'" onMouseOver="moveWindows()" onClick="firstWindows(\''+ id +'\')">'+
				'<div class="header">'+
					'<div class="title">'+
						'<h5><i class="fa '+ icon +'"></i> '+ title +'</h5>'+
					'</div>'+
					'<div class="action">'+
						'<a href="javascript:void(0);" class="minus" onclick="minWindows(\''+ id +'\')"><i class="fa fa-minus"></a></i>'+
						'<a href="javascript:void(0);" class="closer" onclick="closeWindows(\''+ id +'\')"><i class="fa fa-times"></a></i>'+
					'</div>'+
				'</div>'+
				'<div class="window-content-'+ id +'" style="height:calc(100% - 75px);width:100%; float: left;">'+
					'<iframe src="'+page+'" width="99.95%" height="100%" frameborder="0"></iframe>'+
				'</div>'+
			'</div>';
	$('.content').append(window);
	$('#'+id).css("width", width);
	$('#'+id).css("height", height);
	if(resizable == true){
		$( ".window" ).resizable();
	}
	$( "#"+id ).position({
		my: "center center",
		at: "center center",
		of: ".content"
	});
}
function closeWindows(id){
	wins -= 1;
	$('#'+id).hide(0, function(){$(this).detach();});
	$('.app-'+id).hide(0, function(){$(this).detach();});

}
function minWindows(id){
	$('.app-'+id).removeClass('selected');
	$("#"+id ).position({
		my: "center center",
		at: "center center",
		of: ".content"
	});
	$('#'+id).hide(0);
}
function maxWindows(id){
	$('#'+id).css("top", "");
	$('#'+id).css("left", "");
	$('#'+id).css("width", "");
	$('#'+id).css("height", "");
	$('#'+id).toggleClass('max');
	$( "#"+id ).position({
		my: "center center",
		at: "center center",
		of: ".content"
	});
}
function moveWindows(){
	$(".window" ).draggable({ containment: ".content" });
}
function firstWindows(id){
	$('.window').css('z-index','1000');
	$('#'+id).css('z-index','3000');
}
function submitForm(formId, action){
	var data = [];
	$("#"+formId+" :input").each(function(){
		var id = $(this).attr('id');
	 	data.push({name:$(this).attr('name'), value: $('#'+id).val()});
	});
	//alert(data[0][name]);
	//alert(action);
	
	$.ajax({
		type: "POST",
		url: 'pages/'+action,
		dataType: "html",
		data: data,
		success: function(data){
		   $('#content-'+formId).html(data);
		}
	});
}

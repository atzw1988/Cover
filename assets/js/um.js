$.umbrella = $.umbrella || {};
$.umbrella.loginUrl = "https://www.umehs.com";
$(function() {
	$(".fa-refresh.btnO").parent(".btnO").click(function() {
		window.location.href = window.location.href;
	});
	$.umbrella.page_init.init();
});
$.umbrella.xlsDownload = function(param) {
	$.ajax({
		url: $.umbrella.basepath + "/common/exportExcel",
		method:"post",
		dataType:"json",
		data:param,
		success:function(result, status) {
			if (result.success === true) {
				alert(result.errorMsg, $.umbrella.alerticon.success);
			} else {
				alert(result.errorMsg, $.umbrella.alerticon.error);
			}
		}
	});
};
$.umbrella.initXlsUpload = function(url, fileId, reloadFormId) {
	var fileElem = $("#" + fileId);
	fileElem.change(function() {
		var reg = /(\.xls|\.xlsx)$/;
		if (fileElem.val() != "" && !reg.test(fileElem.val())) {
			alert("文件错误，文件类型及数据格式请参照模板", $.umbrella.alerticon.error);
			return;
		}
		$.ajaxFileUpload({
			url: url,
			method:"post",
			fileElementId:fileId,
			dataType:"json",
			success:function(result, status) {
				if (result.success === true) {
					$.umbrella.dialog.open($.umbrella.basepath + "/common/processPage", null, {"processId":result.data}, function() {
						$.ajax({
							url: $.umbrella.basepath + "/common/getProcessMsg",
							type:"post",
							dataType:"json",
							global:false,
							data:{"processId":result.data},
							success:function(result, status) {
								if (result.success === true) {
									alert(result.errorMsg, $.umbrella.alerticon.success, function(e) {
										if (reloadFormId && reloadFormId != "") {
											$("#" + reloadFormId).reloadTableData();
										}
										layer.close(e);
									});
								} else {
									if (reloadFormId && reloadFormId != "") {
										$("#" + reloadFormId).reloadTableData();
									}
								}
							},
							error:function() {
								if (reloadFormId && reloadFormId != "") {
									$("#" + reloadFormId).reloadTableData();
								}
							}
						});
					}, {area:["550px", "60px"], closeBtn:0});
				} else {
					alert(result.errorMsg, $.umbrella.alerticon.error);
				}
			}
		});
	});
};
$.umbrella.systemWarning = function(message) {
	if (message && message != "") {
		var warning = $("<div style='width:300px; padding:10px 20px 20px; font-size:16px; text-align:left; text-indent:36px;'></div>");
		warning.text(message);
		var tempdiv = $("<div></div>");
		warning.appendTo(tempdiv);
		var options = {};
		options.title = ["紧急通知", 'font-size:20px; color:red;'];
		options.type = 1;
		options.offset = 'rb';
		options.anim = 2;
		options.closeBtn = 1;
		options.shade = 0;
		//options.shade = [0.8, '#393D49'];
		//options.shadeClose = true;
		options.area = "auto";
		options.maxWidth = 520;
		options.maxHeight = 520;
		options.content = tempdiv.html();
		options.resize = false;
		options.end = function() {
			$.umbrella.systemWarning_display = false;
		}
		layer.open(options);
		$.umbrella.systemWarning_display = true;
	}
};
$.umbrella.page_init = {
	init:function() {
		$("form").append("<input type='text' style='display:none;'/>");
		$.umbrella.page_init.top_body_click();
		if ($(".headpoint").length == 0) {
			$.umbrella.page_init.search_bar_toggle($("#headpoint"));
		} else {
			$.umbrella.page_init.search_bar_toggle($(".headpoint"));
		}
		$.umbrella.page_init.textarea_counter();	//textarea字数计数
		$.umbrella.page_init.create_search_bar();	//创建查询工具条
		$.umbrella.page_init.column_visible_setting();	//字段显示设置
		$.umbrella.sortOpt.addSortable();	//添加排序
		$("body").closeAutoComplete();
	},
	top_body_click:function() {//body点击时，隐藏开始菜单
		if ($(".content").length == 0) {
			$("body").click(function() {
				top.$('.content', top.document).trigger('click');
			});
		}
	},
	search_bar_toggle:function(target) {//查询工具条显示、隐藏
		$(target).click(function() {
			obj = $(this).parent().parent();
			$(this).find("#headerArrow").toggleClass('fa-angle-double-down');
			if(obj.hasClass("extsearch")) {
				obj.removeClass("extsearch");
				$(this).parent().find(".table-searchbar input:text").val("");
				$(this).parent().find(".table-searchbar input:hidden").val("");
				$(this).parent().find(".table-searchbar select option:selected").prop("selected", false);
				$(this).parent().find(".table-searchbar select option:first").prop("selected", true);
			} else {
				obj.addClass("extsearch");
				$(this).parent().find(".SA1 input:text").val("");
				$(this).parent().find(".SA1 select option:selected").prop("selected", false);
				$(this).parent().find(".SA1 select option:first").prop("selected", true);
			};
			if ($(target).attr("callbackfunc") && $(target).attr("callbackfunc") != "") {
				eval($(target).attr("callbackfunc"))();
			}
		});
	},
	textarea_counter:function(obj) {//Textarea字数计数
		if (!obj) {
			obj = $("body");
		}
		$(obj).find("textarea").each(function() {
			var maxlength = $(this).attr("maxlength");
			if (!maxlength) {
				return;
			}
			var counter = $('<label class="counter" style="position:absolute; font-weight:normal; color:gray; opacity:0.6; margin:0; padding:0;"><span>&nbsp;&nbsp;0</span>/' + maxlength + '</label>');
			$(this).after(counter);
			counter.attr("for", $(this).attr("id"));
			var counterWidth = (counter.outerWidth(true) + 10);
			var counterHeight = (counter.outerHeight(true));
			var width = $(this).innerWidth();
			var height = $(this).innerHeight();
			counter.css({"top":($(this).position().top + height - counterHeight), "left": ($(this).position().left + width - counterWidth)});
			$(this).keyup(function() {
				var text = $(this).val().length;
				if (text < 10) {
					text = "&nbsp;&nbsp;" + text
				} else if (text < 100) {
					text = "&nbsp;" + text
				}
				$(this).siblings(".counter").find("span").html(text);
			});
			$(this).trigger("keyup");
		});
	},
	create_search_bar:function(obj) {//添加查询工具条
		if (!obj) {
			obj = $("body");
		}
		var autoId_index = 0;
		$(obj).find("table[searchBar]").each(function() {
			var searchBar = $(this).attr("searchBar");
			if (searchBar.indexOf("#") <= 0) {
				return;
			}
			var rowKey = searchBar.split("#", 2)[0];
			var containerKey = searchBar.split("#", 2)[1];
			var barrow = $(this).find("tr#" + rowKey);
			var container = $("#" + containerKey);
			if (barrow && barrow.length > 0) {
				var table = $(this).clone();
				if (!$(this).attr("id") || $(this).attr("id") == "") {
					$(this).attr("id", "tbl_" + autoId_index++ + "_" + new Date().getTime());
				}
				table.removeAttr("id");
				table.attr("for", $(this).attr("id"));
				table.removeAttr("showFilter");
				table.removeAttr("searchBar");
				table.empty();
				table.addClass("table-searchbar");
				var row = $(barrow[0]).clone();
				row.removeAttr("id");
				row.appendTo(table);
				container.append(table);
				row.find("td,th").each(function() {
					var search = $(this).attr("search");
					var text = $(this).text();
					$(this).removeAttr("search");
					$(this).removeAttr("sort");
					//$(this).html("<input style='width:90%; float:left;'>");
					$(this).empty();
					if (search && search.length > 0) {
						if (search.indexOf("txt#") == 0) {
							var hiddenElem = $("<input type='hidden' name='filter[\"" + search.replace("txt#", "") + "\"]'>");
							hiddenElem.appendTo(this);
							var elem = $("<input type='text' _name='" + search.replace("txt#", "") + "' placeholder='请输入" + text + "'>");
							elem.appendTo(this);
						} else if (search.indexOf("sel#") == 0) {
							var hiddenElem = $("<input type='hidden' name='filter[\"" + search.split("#")[1] + "\"]'>");
							hiddenElem.appendTo(this);
							var elem = $("<select _name='" + search.split("#")[1] + "'></select>");
							elem.appendTo(this);
							var params = search.split("#");
							if (params[2] && params[2].length > 0) {
								eval($.trim(params[2]))(elem);
							}
						} else if (search.indexOf("date#") == 0) {
							var params = search.split("#");
							var hiddenElem = $("<input type='hidden' name='filter[\"" + params[1] + "\"]'>");
							hiddenElem.appendTo(this);
							var elem = $("<input type='text' _name='" + params[1] + "' placeholder='请选择" + text + "'>");
							elem.appendTo(this);
							var date_options = {};
							if (params.length > 2 && params[2].indexOf("hm") > 0) {
								date_options.time_24hr = true;
								date_options.enableTime = true;
								date_options.minuteIncrement = 1;
								if (params[2].indexOf("hms") > 0) {
									date_options.enableSeconds = true;
								}
							}
							elem.flatpickr(date_options);
						} else if (search.indexOf("btn#search") == 0) {
							var elem = $("<input type='button' value='搜索'>");
							elem.appendTo(this);
							elem.click(function() {
								$(this).closest("table").find("[_name]").each(function() {
									if ($(this).attr("_name") && $(this).attr("_name") != "") {
										$(this).prev(":hidden[name='filter[\"" + $(this).attr("_name") + "\"]']").val($(this).val());
									}
								});
								$(this).closest("form").reloadTableData();
							});
						}
					}
				});
				table.find("input:text, select").keypress(function(event) {
					if (event.keyCode == "13") {
						$(this).closest("table").find("input:button").click();
					}
				});
			}
		});
	},
	column_visible_setting:function(obj) {//添加字段显示设置
		if (!obj) {
			obj = $("body");
		}
		//添加字段显示设置
		$(obj).find("table[showFilter]").each(function() {
			var $table = $(this);
			var $searchbar = $("table[for='" + $(this).attr("id") + "']");
			//showFilter:是否显示数据列过滤
			if ($table.attr("showFilter") != "" && $table.closest("div").find(".filter-icon").length == 0) {
				$table.closest("div").css("position", "relative");
				var filter = $('<div class="table-col-filter"></div>');
				var filter_div = $('<div></div>');
				var filterIcon = $('<span class="fa fa-th filter-icon"></span>');
				filterIcon.appendTo(filter_div);
				filter_div.appendTo(filter);
				filter.appendTo($table.closest("div"));
				filterIcon.unbind("click").click(function() {
					var _table = $(this).closest("div.table-col-filter").parent().find("table[showFilter]");
					//如果没有字段列表，则加载
					var filterItems = filterIcon.parent().find(".filter-items");
					if (filterIcon.parent().find(".filter-items").length == 0) {
						filterItems = $('<ul class="filter-items"></ul>');
						filterIcon.after(filterItems);
						filterItems.unbind("click").click($.stopPropagation);
						var data = filterIcon.data("filter_items");
						for (var item in data) {
							var index = _table.find("td[propkey='" + data[item].code + "']").index();
							var itemLi = $("<li><input type='checkbox' value='" + index + "'/><span></span></li>");
							itemLi.find("span").text(data[item].name);
							itemLi.data("code", data[item].code);
							if (data[item].display != "none") {
								itemLi.find("input:checkbox").prop("checked", true);
							}
							itemLi.appendTo(filterItems);
							itemLi.click(function() {
								$(this).find("input:checkbox").click();
							});
							itemLi.find("input:checkbox").click(function() {
								if ($(this).prop("checked") === true) {
									var index = $(this).val();
									$(_table.find("tr:first th")[index]).show();
									_table.find("tr:gt(0)").each(function() {
										$($(this).find("td")[index]).show();
									});
									if ($searchbar) {
										$($searchbar.find("tr td, tr th")[index]).show();
									}
								} else {
									var index = $(this).val();
									$(_table.find("tr:first th")[index]).hide();
									_table.find("tr:gt(0)").each(function() {
										$($(this).find("td")[index]).hide();
									});
									if ($searchbar) {
										$($searchbar.find("tr td, tr th")[index]).hide();
									}
								}
								$.stopPropagation();
							});
						}
						
						if (data.length > 0) {
							var _btnSaveFilter = $('<div class="table-col-filter-save fa fa-save"></div>');
							filterItems.after(_btnSaveFilter);
							_btnSaveFilter.click(function() {
								var param = [];
								$(this).prev("ul.filter-items").find("li").each(function() {
									var item = {};
									//{"name":"员工号", "code":"staffCode", "display":"block"}
									item.name = $(this).find("span").text();
									item.code = $(this).data("code");
									if ($(this).find("input:checkbox").prop("checked") === true) {
										item.display = "block";
									} else {
										item.display = "none";
									}
									param.push(item);
								});
								$.ajax({
									url:$.umbrella.basepath + "/common/saveTableFilter",
									type: 'post',
									dataType:"json",
									data: {"tabelId":$table.attr("showFilter"), "filterValue":JSON.stringify(param)}
								});
								$.stopPropagation();
							});
						}
					}
					if (filterItems.next(".table-col-filter-save").is(":visible")) {
						filterItems.next(".table-col-filter-save").hide();
					}
					filterItems.toggle(300, function() {
						if (filterItems.is(":visible")) {
							filterItems.next(".table-col-filter-save").show();
						}
					});
					
					$.stopPropagation();
				});
				//获取字段列表
				$.ajax({
					url:$.umbrella.basepath + "/common/getTableFilter",
					type: 'post',
					dataType:"json",
					data: {"tabelId":$table.attr("showFilter")},
					success: function(result, status) {
						if (result.success == true && result.data && result.data.length > 0) {
							filterIcon.data("filter_items", result.data);
							var data = result.data;
							for (var item in data) {
								var index = $table.find("td[propkey='" + data[item].code + "']").index();
								$($table.find("tr:first th")[index]).text(data[item].name);
								if (data[item].display == "none") {
									$($table.find("tr:first th")[index]).hide();
									$table.find("td[propkey='" + data[item].code + "']").hide();
									if ($searchbar) {
										$($searchbar.find("tr td, tr th")[index]).hide();
									}
								}
							}
						} else {
							filterIcon.remove();
						}
					},
					error:function() {
						filterIcon.remove();
					}
				});
			}
			$("body").click(function() {
				$("ul.filter-items").stop();
				$(".table-col-filter-save").hide();
				$("ul.filter-items").hide();
			});
		});
	}
};
$.umbrella.systemWarning_display = false;
$.umbrella.sortOpt = {
	addSortable:function(obj) {//添加排序事件
		if (!obj) {
			obj = $("body");
		}
		$(obj).find("table th[sort], table td[sort]").each(function() {
			if ($(this).attr("sort") != "") {
				$(this).addClass("fa fa-sort-after");
				$(this).click(function() {
					$.umbrella.sortOpt.changeOrder(this, $(this).closest("table").find("~ div.pager_div:first"));
				});
				$(this).css("display", "table-cell");
			}
		});
	},
	changeOrder:function(obj, parentObj) {//改变排序
		parentObj = parentObj || ".pager_div";
		var oldSortCol = $(obj).closest("table").data("sortColumn");
		var oldSortVal = $(obj).closest("table").data("sortVal");
		var newSortCol = $(obj).attr("sort");
		var newSortVal = "asc";
		if (newSortCol == oldSortCol) {
			newSortVal = (oldSortVal == "asc" ? "desc" : "asc");
			$(obj).toggleClass("fa-sort-asc-after fa-sort-desc-after");
		} else {
			$(obj).closest("table").find("th.fa-sort-after,td.fa-sort-after").removeClass("fa-sort-asc-after fa-sort-desc-after");
			$(obj).addClass("fa-sort-asc-after");
		}
		$(obj).closest("table").data("sortColumn", newSortCol);
		$(obj).closest("table").data("sortVal", newSortVal);
		$(parentObj).find(".pager_first").trigger("clickresort");
	}
};
if (layer) {
	$.umbrella.dialog = {
		index : null,
		index_bak:null,
		callback:null,
		index_p:null,
		callback_p:null,
		saveParent:function() {
			$.umbrella.dialog.index_p = $.umbrella.dialog.index;
			$.umbrella.dialog.callback_p = $.umbrella.dialog.callback;
		},
		restoreParent:function() {
			if ($.umbrella.dialog.index_p != null) {
				$.umbrella.dialog.index = $.umbrella.dialog.index_p;
				$.umbrella.dialog.callback = $.umbrella.dialog.callback_p;
				$.umbrella.dialog.index_p = null;
				$.umbrella.dialog.callback_p = null;
			}
		},
		clearParent:function() {
			$.umbrella.dialog.index_p = null;
			$.umbrella.dialog.callback_p = null;
		},
		close:function(data) {
			layer.close($.umbrella.dialog.index);
			$.umbrella.dialog.index = null;
			$.umbrella.dialog.callback = $.umbrella.dialog.callback || function() {};
			$.umbrella.dialog.callback(data);
		},
		open : function(url, title, param, callback, options, loaded) {
			$(":focus").blur();
			param = param || {};
			options = options || {};
			$.umbrella.dialog.callback = callback;
			$.ajax({
				url:url,
				type: 'post',
				data: $.param(param),
				success: function(result, status) {
					if(status == "success"){
						var successFun = options.success || function() {};
						options.success = function(layero, index) {
							successFun();
							$(layero).find("textarea").each(function() {
								var maxlength = $(this).attr("maxlength");
								if (!maxlength) {
									return;
								}
								var counter = $('<label class="counter" style="position:absolute; font-weight:normal; color:gray; opacity:0.6; margin:0; padding:0;"><span>&nbsp;&nbsp;0</span>/' + maxlength + '</label>');
								$(this).after(counter);
								counter.attr("for", $(this).attr("id"));
								var counterWidth = (counter.outerWidth(true) + 10);
								var counterHeight = (counter.outerHeight(true));
								var width = $(this).innerWidth();
								var height = $(this).innerHeight();
								counter.css({"top":($(this).position().top + height - counterHeight), "left": ($(this).position().left + width - counterWidth)});
								$(this).keyup(function() {
									var text = $(this).val().length;
									if (text < 10) {
										text = "&nbsp;&nbsp;" + text
									} else if (text < 100) {
										text = "&nbsp;" + text
									}
									$(this).siblings(".counter").find("span").html(text);
								});
								$(this).trigger("keyup");
							});
							$(layero).closeAutoComplete();
							$(layero).find("form").append("<input type='text' style='display:none;'/>");
						};
						options.title = title;
						options.type = 1;
						options.content = result;
						options.resize = false;
						var oldEnd = options.end || function(){};
						options.end = function(){
							$.umbrella.dialog.index = null;
							oldEnd();
						};
						$.umbrella.dialog.index = layer.open(options);
						$.umbrella.dialog.index_bak = $.umbrella.dialog.index;
						loaded = loaded || function() {};
						loaded();
					}
				}
			});
		}
	};
	
	$.umbrella.alerticon = {
		warning:{icon:0, title:"警告"},
		success:{icon:1, title:"成功"},
		info:{icon:1, title:"信息"},
		error:{icon:2, title:"错误"},
		confirm:{icon:3, title:"确认"},
		lock:{icon:4, title:"锁定"},
		bad:{icon:5, title:"信息"},
		good:{icon:6, title:"信息"}
	};
	window.alert = layer.alert;
	window.confirm = layer.confirm;
}
window.addEventListener("resize", function() {
	$("textarea").each(function() {
		var $textarea = $(this);
		$(this).next("label.counter").each(function() {
			var counter = $(this);
			var counterWidth = (counter.outerWidth(true) + 10);
			var counterHeight = (counter.outerHeight(true));
			var width = $textarea.innerWidth();
			var height = $textarea.innerHeight();
			counter.css({"top":($textarea.position().top + height - counterHeight), "left": ($textarea.position().left + width - counterWidth)});
		});
	});
});

;(function($) {
	String.prototype.endWith = function(str) {
		var reg = new RegExp(str + "$");
		return reg.test(this);
	}
	String.prototype.startWith = function(str) {
		var reg = new RegExp("^" + str);
		return reg.test(this);
	}
	/**************************DATE方法扩展**********************************/
	/**
	 * 字符串转日期
	 * @param dateStr 要转换的字符串，字符串格式要求：yyyy-MM-dd HH:mm:ss.SSS、yyyy/MM/dd HH:mm:ss.SSS
	 * 				不一定年月日时分秒都有，但是各个位数、顺序、分隔符等要跟格式中保持一致，例如yyyy-MM也可以
	 * @returns 转换后的日期
	 */
	Date.parseDate = function(dateStr) {
		return new Date(Date.parse(dateStr.replace(/-/g,"/")));
	};
	
	/*********************  jQuery Validator   ***************************/
	if ($ && $.validator) {
		$.validator.setDefaults({
			errorElement:"img",
			errorClass:"error_validate"
		});
	}
	
	/**
	 * 字符串转日期
	 * @param dateStr 要转换的字符串
	 * @param pattern 格式，默认yyyy-MM-dd
	 * @returns 转换后的日期
	 */
	Date.parseDateByPattern = function(dateStr, pattern) {
		pattern = pattern || "yyyy-MM-dd";
		var yearStart = pattern.indexOf("y");
		var yearEnd = pattern.lastIndexOf("y");
		var monthStart = pattern.indexOf("M");
		var monthEnd = pattern.lastIndexOf("M");
		var dateStart = pattern.indexOf("d");
		var dateEnd = pattern.lastIndexOf("d");
		var hourStart = pattern.indexOf("H");
		var hourEnd = pattern.lastIndexOf("H");
		var minuteStart = pattern.indexOf("m");
		var minuteEnd = pattern.lastIndexOf("m");
		var secondStart = pattern.indexOf("s");
		var secondEnd = pattern.lastIndexOf("s");
	//	var miliSecondStart = pattern.indexOf("S");
	//	var miliSecondEnd = pattern.lastIndexOf("S");
		
		var yearStr = dateStr.substring(yearStart, yearEnd + 1);
		var monthStr = dateStr.substring(monthStart, monthEnd + 1);
		var dayStr = dateStr.substring(dateStart, dateEnd + 1);
		var hourStr = dateStr.substring(hourStart, hourEnd + 1);
		var minuteStr = dateStr.substring(minuteStart, minuteEnd + 1);
		var secondStr = dateStr.substring(secondStart, secondEnd + 1);
	//	var miliSecondStr = dateStr.substring(miliSecondStart, miliSecondEnd);
		
		var result = (yearStr==""?"2000":yearStr) + "/" + (monthStr==""?"01":monthStr)
					+ "/" + (dayStr==""?"01":dayStr) + " " + (hourStr==""?"00":hourStr)
					+ ":" + (minuteStr==""?"00":minuteStr) + ":" + (secondStr==""?"00":secondStr);
	//				+ "." + (miliSecondStr==""?"000":miliSecondStr);
		
		return Date.parseDate(result);
	};
	
	/**
	 * 日期格式化：yyyy-MM-dd HH:mm:ss.SSS
	 * @pattern 格式
	 * @return 格式化后的字符串
	 */
	Date.prototype.format = function(pattern) {
		pattern = pattern || "";
		if (pattern == "") {
			return this.toString();
		}
		var o = {
			"M+" : this.getMonth()+1,					//月份   
			"d+" : this.getDate(),						//日   
			"H+" : this.getHours(),				   		//小时   
			"m+" : this.getMinutes(),				 	//分   
			"s+" : this.getSeconds(),				 	//秒   
			"q+" : Math.floor((this.getMonth()+3)/3), 	//季度
			"S"  : this.getMilliseconds()				//毫秒   
		};
		if(/(y+)/.test(pattern)) {
			pattern = pattern.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
		} 
		for(var k in o) {
			if(new RegExp("("+ k +")").test(pattern)) {
				pattern = pattern.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
			} 
		}
		return pattern; 
	};
	/**
	 * 日期加减
	 * @param diff 加减的值，正数为加， 负数为减
	 * @returns 计算后的结果Date
	 */
	Date.prototype.addDays = function(diff) {
		if (!$.isNumeric(diff)) {
			return this;
		}
		return new Date(this.getTime() + 86400000 * diff);
	};
	/***********************   AJAX   ***************************/
	$(document).bind("ajaxStart.showloading", function () {
		//ajax请求执行之前调用
		//显示等待Loading
		if ($("html", top.document) && $("html", top.document).showLoading) {
			$("html", top.document).showLoading();
		}
	}).ajaxStop(function() {
		//ajax请求执行完成后调用
		//隐藏等待Loading
		if ($("html", top.document) && $("html", top.document).hideLoading) {
			$("html", top.document).hideLoading();
		}
	});
	$(document).ajaxError(function(evt, req, settings) {
		if (req.status == 379) {//自定义的Session过期
			top.location.href = $.umbrella.loginUrl;
//		} else if (req.status == 377) {//自定义的Session过期，会得到要跳转到的页面代码
		} else {
			alert("系统异常，请联系客服人员", $.umbrella.alerticon.error);
		}
	});
	$.ajaxSetup({
		beforeSend:function(a, b) {
			try {
				if (LRC) {
					var userInfo = LRC.readUserInfo();
					if (userInfo && userInfo != "") {
						var json = eval("(" + userInfo + ")");
						if (json.userID && json.userID != "") {
							var param = {};
							param._browserloginid = json.userID;
							param._browserpasswd = json.password;
							var paramStr = $.param(param);
							if (!b.data || b.data == "") {
								b.data = paramStr;
							} else {
								b.data += "&" + paramStr;	
							}
						}
					}
				}
			} catch (e) {
			}
		}
	});
/******************页面元素对象方法扩展*******************/
	$.fn.oldJQVal = $.fn.val;
	$.fn.extend({
		val:function(value) {
			var retVal = null;
			if (value === undefined) {
				retVal = $(this).oldJQVal();
			} else {
				retVal = $(this).oldJQVal(value);
				if ($(this).is("textarea") && $(this).attr("maxlength")) {
					$(this).trigger("keyup");
				}
			}
			return retVal;
		},
		/**
		 * 验证证件号码
		 */
		checkCardNo:function (cardType) {
			var value = $(this).val();
			if (cardType == "CARD_TYPE_010") {//身份证
				var result = checkCard(value);
				if (value != "" && result === false) {
					return "证件号码无效";
				}
			} else if (cardType == "CARD_TYPE_020") {//护照
				var re1 = /^[a-zA-Z]{5,17}$/;
				var re2 = /^[a-zA-Z0-9]{5,17}$/;
				if (value != "" && !re2.test(value) && !re1.test(value)) {
					return "证件号码无效";
				}
			}
			return "";
		},
		checkPassword:function() {
			var error = "";
			var safeLevel = 0;
			var password = $(this).val();
			if (/[a-z]/.test(password)) {
				safeLevel += 1;
			}
			if (/[A-Z]/.test(password)) {
				safeLevel += 2;
			}
			if (/[0-9]/.test(password)) {
				safeLevel += 4;
			}
			if (/[^a-zA-Z0-9]/.test(password)) {
				safeLevel += 8;
			}
			$(".passvalid ul.marker li").removeClass("access");
			if (password.length >= 8 && password.length <= 32) {
				if (safeLevel >= 1) {
					$(".passvalid ul.marker li:first").addClass("access");
				}
				if (safeLevel >= 7) {
					$(".passvalid ul.marker li:eq(1)").addClass("access");
				}
				if (safeLevel >= 15) {
					$(".passvalid ul.marker li:last").addClass("access");
				}
			} else {
				error += "长度为8-32个字符";
			}
			if (safeLevel != 7 && safeLevel != 15 && error == "") {
				if (error != "") {
					error += "\r\n";
				}
				error += "必须包含大小写字母及数字";
			}
			return error;
		},
		/**
		 * 验证方法，对指定元素，以及指定元素的子孙元素进行指定的验证
		 * 错误信息默认显示在元素之后，可以用msglocation属性指定ID，错误信息将显示在指定的元素之后
		 * 可以使用showicon来指定是否显示错误信息的icon：true-显示 false:默认/不显示
		 * 触发的验证种类：包含validate属性，则进行该属性指定的验证类型
		 * 例如：<input type="text" validate="required,maxlength=20,func=funcname"/>
		 * 验证类型枚举：
		 *  func:调用指定的方法进行验证，方法必须返回错误信息，多个错误信息之间用\r\n
		 *  required:必须输入
		 *  maxlength:最大长度
		 *  minlength:最小长度
		 *  idcard:身份证号
		 *  email:邮箱地址
		 *  mobile:手机号码
		 *  telephone:电话号码
		 *  number:浮点数（正负数）
		 *  plusnumber:正浮点数（不包含0）
		 *  plusnumber0:正浮点数（包含0）
		 *  digits:整数（包含正负数）
		 *  plusdigits:正整数（不包含0）
		 *  plusdigits0:正整数（包含0）
		 *  letterornum:英文字母或数字,只用于用户名
		 *  letterornum1:英文字母或数字
		 *  letter_num:英文字母、数字或_、-
		 *  ip:IP地址
		 *  mac:MAC地址
		 */
		validate:function(checkhidden) {
			//checkhidden 验证隐藏元素
			var validateResult = true;
			var validateArray = [];
			if ($(this).attr("validate")) {
				validateArray.push(this);
			}
			$(this).find("[validate][validate!='']").each(function() {
				if (checkhidden === false && $(this).is(":hidden")) {
					return;
				}
				validateArray.push(this);
			});
			if (validateArray.length > 0) {
				$(validateArray).each(function() {
					var value = null;
					if ($(this).is("input") || $(this).is("select") || $(this).is("textarea")) {
						value = $(this).val();
					} else {
						value = $(this).text();
					}
					var error = doValidate($(this), value);
					if (error && error != '') {
						$(this).resetValidIcon(true);
						$(this).showError(error);
						$(this).unbind("keyup.validate").bind("keyup.validate", $(this).validate);
						$(this).unbind("change.validate").bind("change.validate", $(this).validate);
						validateResult = false;
					}
				});
			}
			return validateResult;
		},
		/**
		 * 显示验证错误
		 */
		showError:function(msg) {
			$(this).after('<div class="validate-msg" style="width: 60%;height:12px;position: absolute;color: red;font-size:10px;">'+msg+'</div>');
		},
		/**
		 * 移除验证标识
		 */
		resetValidIcon:function() {
			$(this).next('div.validate-msg').remove();
		},
		/**
		 * 用企业字典项填充下拉框（清除原有选项）
		 * 调用示例：
		 * $("#selectId").initComDicItems({
		 * 		parentCode:"test",
		 * 		value:"testvalue",
		 * 		text:"testtext",
		 * 		attr:{"test1":"testid1", "test2":"testid2"},
		 * 		blank:{need:true, text:"----请选择----", value:""},
		 * 		callback:function(){xxxxx}
		 * });
		 * options如下：
		 * 	parentCode(必选):字典PARENTCODE
		 * 	value(可选):下拉框的value字段，默认为：dicCode
		 * 	text(可选):下拉框显示的内容字段，默认为：dicName
		 * 	attr(可选):下拉框option的自定义属性, 形式为：{"demo1":"xxx", "demo2":"xxxxx",......},demo为属性名 ，xxx为字段名
		 *	callback(可选):可选，在下拉框数据加载完成后执行
		 * 	blank(可选):空选项相关
		 * 		need(可选)：是否需要，默认为false
		 * 		text(可选)：空选项显示的内容，默认为"请选择"
		 * 		value(可选):空选项的值，默认为""
		 */
		initComDicItems:function(options) {
			var $this = $(this);
			$this.empty();
			options = options || {};
			options.blank = options.blank || {};
			if (options.blank.need) {
				var option = $("<option value='" + (options.blank.value || "") + "'>" + (options.blank.text || "请选择") + "</option>");
				$this.append(option);
			}
			if (!options.parentCode) {
				return;
			}
			options.callback = options.callback || function(){};
			$.post($.umbrella.basepath + "/common/getComDicItems", {"parentCode":options.parentCode}, function(result, status) {
				if (result.success) {
					$this.fillSelectOptions(result.data, options.value || "dicCode", options.text || "dicName", options.attr);
				}
				options.callback($this);
			}, "json");
		},
		/**
		 * 用字典项填充下拉框（清除原有选项）
		 * 调用示例：
		 * $("#selectId").initDicItems({
		 * 		parentCode:"test",
		 * 		value:"testvalue",
		 * 		text:"testtext",
		 * 		attr:{"test1":"testid1", "test2":"testid2"},
		 * 		blank:{need:true, text:"----请选择----", value:""},
		 * 		callback:function(){xxxxx}
		 * });
		 * options如下：
		 * 	parentCode(必选):字典PARENTCODE
		 * 	value(可选):下拉框的value字段，默认为：dicCode
		 * 	text(可选):下拉框显示的内容字段，默认为：dicName
		 * 	attr(可选):下拉框option的自定义属性, 形式为：{"demo1":"xxx", "demo2":"xxxxx",......},demo为属性名 ，xxx为字段名
		 *	callback(可选):可选，在下拉框数据加载完成后执行
		 * 	blank(可选):空选项相关
		 * 		need(可选)：是否需要，默认为false
		 * 		text(可选)：空选项显示的内容，默认为"请选择"
		 * 		value(可选):空选项的值，默认为""
		 */
		initDicItems:function(options) {
			var $this = $(this);
			$this.empty();
			options = options || {};
			options.blank = options.blank || {};
			if (options.blank.need) {
				var option = $("<option value='" + (options.blank.value || "") + "'>" + (options.blank.text || "请选择") + "</option>");
				$this.append(option);
			}
			if (!options.parentCode) {
				return;
			}
			options.callback = options.callback || function(){};
			$.post($.umbrella.basepath + "/common/getDicItems", {"parentCode":options.parentCode}, function(result, status) {
				if (result.success) {
					$this.fillSelectOptions(result.data, options.value || "dicCode", options.text || "dicName", options.attr);
				}
				options.callback($this);
			}, "json");
		},
		/**
		 * 将Form里的元素序列化，返回JSON类型的数据，key为name
		 * @return JSON 序列化后的JSON数据
		 */
		serializeJson:function() {
			var jsonResult = {};
			var arr = $(this).serializeArray();
			if (!$(this).is("form")) {
				arr = $(this).find("input").serializeArray();
				arr = arr.concat($(this).find("select").serializeArray());
				arr = arr.concat($(this).find("textarea").serializeArray());
			}
			$.each(arr, function(i, field) {
				var value = field.value;
				if (jsonResult[field.name] != undefined) {
					var _oldValue = jsonResult[field.name];
					if (_oldValue instanceof Array) {
						_oldValue.push(value);
						value = _oldValue;
					} else {
						value = [_oldValue, value];
					}
				}
				jsonResult[field.name] = value;
			});
			return jsonResult;
		},
		/**
		 * data:数据
		 * value：data中的字段名，用于填充在value中
		 * name：data中的字段名，用于显示
		 * attr:option自定义的属性
		 */
		fillSelectOptions:function(data, value, name, attr) {
			if ($.isArray(data)) {
				for (var i = 0; i < data.length; i++) {
					var option = $("<option></option>");
					option.val(data[i][value]).text(data[i][name]).appendTo($(this));
					if (attr) {
						for (var key in attr) {
							option.attr(key, data[i][attr[key]] || "");
						}
					}
				}
				$(this).initSelectedOption();
			}
		},
		/**
		 * 根据下拉框的dval，初始化下拉框的值
		 */
		initSelectedOption:function() {
			var defaultValue = $(this).attr("dval");
			if (defaultValue && defaultValue != "") {
				$(this).find("option").prop("selected", false);
				$(this).find("option[value='" + defaultValue + "']").prop("selected", true);
			} else {
				$(this).find("option:first").prop("selected", true);
			}
		},
		/**
		 * 添加日历控件
		 * @param options 参数，常用如下：
		 * dateFmt:日期格式，默认:yyyy-MM-dd
		 * defaultDate:默认日期，不写则无默认值，0为当天，负数为向前，正数为向后; 字符则直接显示
		 * enabledDays:只启用的所指定的日期（(1至7 分别代表 周一至周日），数组，例如[1,6]代表只启用周一周六，其他禁用
		 * enabledDates:只启用指定的日期，数组，如['05','15','25'],只有每月5号，15号，25号有效
		 * minDate_val:最小日期(值，如：2014-09-01)
		 * maxDate_val:最大日期(值，如：2014-09-01)
		 * minDate_diff:最小日期（0为当天，负数为向前，正数为向后）
		 * maxDate_diff:最大日期（0为当天，负数为向前，正数为向后）
		 * minDate_dyn:最小日期(页面元素的ID)，参照其他页面元素的值
		 * minDate_dyn_diff: minDate_dyn的补充，取得元素的值之后，再偏移minDate_dyn_diff天，为最小日期（0为当天，负数为向前，正数为向后）
		 * minDate_dyn_val:当minDate_dyn为空时，以minDate_dyn_val为最小日期
		 * maxDate_dyn:最大日期(页面元素的ID)，参照其他页面元素的值
		 * maxDate_dyn_diff: maxDate_dyn的补充，取得元素的值之后，再偏移maxDate_dyn_diff天，为最大日期（0为当天，负数为向前，正数为向后）
		 * maxDate_dyn_val:当maxDate_dyn为空时，以maxDate_dyn_val为最大日期
		 * 说明：三个最大/最小日期，只有一个生效，生效优先级：dyn > diff > val
		 * onpicked:日期选择后，触发的事件（function）
		 */
		my97DatePicker:function(options) {
			options = options || {};
			//有效星期几
			var enabledDays = options.enabledDays || [];
			if ($.isArray(enabledDays) && enabledDays.length > 0) {
				var disabledDays = [];
				for (var i = 1; i <= 7; i += 1) {
					if ($.inArray(i, enabledDays) == -1 && $.inArray(i + "", enabledDays) == -1) {
						disabledDays.push(i % 7);
					}
				}
				//禁用
				options.disabledDays = disabledDays;
				//高亮
				options.specialDays = enabledDays;
			}
			//有效日期
			if (options.enabledDates != undefined) {
				var enabledDates = [];
				for (var i = 0; i < options.enabledDates.length; i += 1) {
					var value = options.enabledDates[i];
					if ($.isNumeric(value)) {
						value = parseInt(value, 10);
						value = value > 9 ? value : "0" + value;
						enabledDates.push(value + "$");
					}
				}
				if (enabledDates.length > 0) {
					//启用
					options.disabledDates = enabledDates;
					//高亮
					options.specialDates = enabledDates;
					options.opposite = true;
				}
			}
			//最小日期
			var minDate_diff = options.minDate_diff;
			if (minDate_diff != undefined && $.trim(minDate_diff) != '' && $.isNumeric(minDate_diff)) {
				minDate_diff = parseInt(minDate_diff, 10);
				if (minDate_diff >= 0) {
					minDate_diff = " + " + minDate_diff;
				}
				minDate_diff = "%y-%M-{%d" + minDate_diff + "}";
			}
			var minDate_dyn = options.minDate_dyn;
			if (minDate_dyn != undefined && $.trim(minDate_dyn) != '') {
				minDate_dyn = "#F{$dp.$D('" + minDate_dyn + "', {d:" + (options.minDate_dyn_diff || 0) + "}) || '" + ___getRealData(options.minDate_dyn_val, "") + "'}";
			}
			options.minDate = ___getRealData(minDate_dyn || minDate_diff || options.minDate_val, "");
			//最大日期
			var maxDate_diff = options.maxDate_diff;
			if (maxDate_diff != undefined && $.trim(maxDate_diff) != '' && $.isNumeric(maxDate_diff)) {
				maxDate_diff = parseInt(maxDate_diff, 10);
				if (maxDate_diff >= 0) {
					maxDate_diff = " + " + maxDate_diff;
				}
				maxDate_diff = "%y-%M-{%d" + maxDate_diff + "}";
			}
			var maxDate_dyn = options.maxDate_dyn;
			if (maxDate_dyn != undefined && $.trim(maxDate_dyn) != '') {
				maxDate_dyn = "#F{$dp.$D('" + maxDate_dyn + "', {d:" + (options.maxDate_dyn_diff || 0) + "}) || '" + ___getRealData(options.maxDate_dyn_val, "") + "'}";
			}
			options.maxDate = maxDate_dyn || maxDate_diff || options.maxDate_val || "";
			//默认日期
			options.defaultDate = options.defaultDate || "";
			//日期格式
			options.dateFmt = options.dateFmt || "yyyy-MM-dd";
			options.enableInputMask = options.enableInputMask || false;
			if ($.isNumeric(options.defaultDate) && options.defaultDate != "") {
				var diff = parseInt(options.defaultDate);
				var date = new Date();
				date = date.addDays(diff);
				$(this).val(date.format(options.dateFmt) + "");
			} else {
				$(this).val(options.defaultDate + "");
			}
			$(this).attr("readonly", "readonly");
			$(this).prop("readonly", "readonly");
			$(this).bind("click.my97", function() {
				WdatePicker(options);
			});
		},
		/**
		 * 移除日历控件
		 */
		removeMy97DatePicker:function() {
			$(this).removeAttr("readonly");
			$(this).removeProp("readonly");
			$(this).unbind("click.my97");
		},
		/**
		 * 填充列表数据
		 * @param data JSONArray数据；页面table属性如下：
		 * 标题行的tr中要用th标签，th标签中要有propkey与dval属性，其中操作列的propkey="actopts"，其他行用td标签
		 * @param options 参数如下：
		 * JSONArray 除操作列以外的链接，具体如下：
		 * options.trDataBoundCallBack 行数据绑定完成后，调用的回调函数
		 * options.tableDataBoundCallBack table数据绑定完成后，调用的回调函数
		 * options.saveRowData 保存行数据，点击显示行详细时用，默认false
		 * options.rowCntPerPage 列表每页行数，默认为0，即不分页
		 * options.showAllRows:是否显示所有行，空行显示空白；默认为true
		 * options.{&propkey}：用于判断该列是否有链接，比如单位名称一列有链接，该列tr的propkey为"custName"，
		 * 											则options里面加一个参数custName；因此propkey不可重复。
		 * 		{&propkey}_propClass:结果集中带出来的样式，一般用于区分不同类型的数据
		 * 		displayContent：显示的名称，比如：多个联系人时，显示【查看联系人】
		 * 		name_EnableHtml:名称是否支持HTML,默认为false
		 * 		className: 链接样式
		 * 		condition: 显示链接的判断条件，可以为语句，可以为方法，只要结果为true或false就行,默认为true（显示）
		 * 		showLinkWithoutEvent:无事件（即condition判断不通过）时，是否显示链接，默认false（不显示）
		 * 		optActions:JSONArray 操作事件：
		 * 			actionName：事件名称
		 * 			actionFunc：事件方法
		 * 			actionParams：Array事件参数的key，用于从data中取值(如不存在，则取"")，回调时参数以JSON格式传递;如果无参数，默认传data
		 * 			paramFormData：是否从data中取得参数，默认为true
		 * 			如：actionFunc=test, actionParams=[a, b], 回调时：test({a:xxx, b:xxxx})
		 * options.opts JSONArray操作列，数组中每个元素具体如下：
		 * 		displayContent:显示的名称
		 *		name_EnableHtml:名称是否支持HTML,默认为false
		 * 		className: 链接样式
		 * 		condition: 显示链接的判断条件，可以为语句，可以为方法，只要结果为true或false就行,默认为true（显示）
		 * 		showLinkWithoutEvent:无事件（即condition判断不通过）时，是否显示链接，默认false（不显示）
		 * 		optActions:JSONArray 操作事件：
		 * 			actionName：事件名称
		 * 			actionFunc：事件方法
		 * 			actionParams：Array事件参数的key，用于从data中取值(如不存在，则取"")，回调时参数以JSON格式传递;如果无参数，默认传data
		 * 			paramFormData：是否从data中取得参数，默认为true
		 * 			如：actionFunc=test, actionParams=[a, b], 回调时：test({a:xxx, b:xxxx})
		 */
		fillListData:function(data, options) {
			data = data || [];
			options = options || {};
			options.saveRowData = options.saveRowData || false;
			options.showAllRows = ___getRealData(options.showAllRows, true);
			options.rowCntPerPage = options.rowCntPerPage || 0;
			options.trDataBoundCallBack = options.trDataBoundCallBack || function() {};
			options.tableDataBoundCallBack = options.tableDataBoundCallBack || function() {};
			
			var index = 0;
			//清空TD里面的内容
			//$(this).find("tr:gt(1)").remove();
			var trindex = 1;
			var $templateArr = $(this).find("tr#template");
			$templateArr.each(function() {
				if (this.rowIndex > trindex) {
					trindex = this.rowIndex;
				}
			});
			$(this).find("tr:gt(" + trindex + ")").remove();
			
			//页面上的行数与data里数据的行数，取较小的值为循环的基数
			var rowCnt = data.length;
			if (options.rowCntPerPage != 0 && data.length > options.rowCntPerPage) {
				rowCnt = options.rowCntPerPage;
			}
			var $template = $(this).find("tr#template");
			var $table = $template.closest("table");
			$table.data("rowCntPerPage", options.rowCntPerPage);
			$template.hide();
			//循环写数据
			var dataIndex = 0;
			for (var rowIndex = 0; rowIndex < rowCnt; rowIndex += 1) {
				//添加行
				var $tr = $template.clone(true);//获取table模板
				$table.append($tr);//添加新行
				$tr.removeAttr("id");
				$tr.show();
				
				//保存行数据
				if (options.saveRowData) {
					$tr.data("rowData", data[rowIndex]);
				}
				//设置行数据
				_setRowData($tr, options, data[rowIndex], (rowIndex * 100 + index), rowIndex);
				//调用行数据绑定回调函数
				options.trDataBoundCallBack.call($tr, data[dataIndex++]);
//				var returnRowIndex = options.trDataBoundCallBack.call($tr, data[dataIndex++], rowIndex);
//				if (returnRowIndex && !isNaN(returnRowIndex)) {
//					rowIndex = returnRowIndex;
//				}
//				if (dataIndex == data.length) {
//					rowCnt = rowIndex + 1;
//					break;
//				}
			}
			if (options.showAllRows) {
				for (var rowIndex = rowCnt; rowIndex < options.rowCntPerPage; rowIndex += 1) {
					//添加行
					var $tr = $template.clone(true);//获取table模板
					$table.append($tr);//添加新行
					$tr.removeAttr("id");
					$tr.find("input:checkbox").remove();;
					$tr.find(".hidewithoutdata:not(td)").remove();
					$tr.show();
				}
			}
			//调用table数据绑定回调函数
			options.tableDataBoundCallBack.call($table, data);
		},
		/**
		 * 取得行数据
		 * @return 行数据，前提是写列表数据的时候，保存了行数据，saveRowData:true
		 */
		getTableRowData:function() {
			return $(this).data("rowData");
		},
		/**
		 * 填充表单数据
		 * @param data JSON数据；支持元素类型：input,textarea,select,label,div,span,td；元素属性如下：
		 * 		propkey Json数据的key，用于从Json中取值，绑定到页面元素
		 * 		dval 默认值，Json中取值为空的情况下，填充dval
		 * @param filePath 有文件上传的话，需要传此参数，指明文件保存的路径，用于查看文件时使用
		 */
		fillFormData:function(data, filePath) {
			data = data || {};
			var idExist = true;
			var index = 0;
			if (!$(this).hasAttr("id")) {
				idExist = false;
				$(this).attr("id", "_myTempId_" + (new Date().getTime()) + "_" + (index++));
			}
			var $form = $(this);
			var $thisId = "#" + $(this).attr("id");
			//移除JS自动为File添加的隐藏字段
			$($thisId + " .hidfile").remove();
			$($thisId + " input, " + $thisId + " textarea, " + $thisId + " select").each(function() {
				var eleDval = _getDval($(this));
				if ($(this).hasAttr("type") && ($(this).attr("type") == "text" || $(this).attr("type") == "hidden" 
					|| $(this).attr("type") == "password") || !$(this).is("input")) {
					//输入框、textarea或select
					if ($(this).hasAttr("propkey")) {
						$(this).val("");
						var propkey = $(this).attr("propkey");
						var value = getPropValue(data, propkey);
						if (value != undefined) {
							$(this).val(value + "");
						} else if ($(this).hasAttr("dval")) {
							$(this).val(eleDval + "");
						}
					} else if ($(this).hasAttr("dval")) {
						$(this).val("");
						$(this).val(eleDval + "");
					}
					if($(this).is("select")) {
						if ($(this).hasAttr("propkey")) {
							var propkey = $(this).attr("propkey");
							var value = getPropValue(data, propkey);
							if (value != undefined) {
								$(this).attr("dval", value + "");
							}
						}
						$(this).initSelectedOption();
					}
				} else if ($(this).hasAttr("type") && ($(this).attr("type") == "radio" || $(this).attr("type") == "checkbox")) {
//					$(this).removeAttr("checked");
//					$(this).removeProp("checked");
					$(this).prop("checked", false);
					//radio或checkbox
					if ($(this).hasAttr("propkey")) {
						var propkey = $(this).attr("propkey");
						var value = getPropValue(data, propkey);
						if (value != undefined && _containsValue(value, $(this).val())) {
//							$(this).attr("checked", true);
							$(this).prop("checked", true);
						} else if (value == undefined && $(this).hasAttr("dval") && _containsValue($(this).attr("dval"), $(this).val())) {
//							$(this).attr("checked", true);
							$(this).prop("checked", true);
						}
					} else if ($(this).hasAttr("dval") && _containsValue($(this).attr("dval"), $(this).val())) {
//						$(this).attr("checked", true);
						$(this).prop("checked", true);
					}
				} else if ($(this).hasAttr("type") && ($(this).attr("type") == "file")) {
					//如果是文件上传，则添加隐藏的原文件，并判断是否有值。有值的情况下，显示“查看”“删除”按钮
					var _fileEleName = $(this).attr("name");
					var _hidOldFile = $("<input type='hidden' name='" + _fileEleName + "_OldFile' class='hidfile'/>");
					_hidOldFile.appendTo($form);
					var _hidOldFileDelFlg = $("<input type='hidden' name='" + _fileEleName + "_DelFlg' class='hidfile' value='0'/>");
					_hidOldFileDelFlg.appendTo($form);
					if ($(this).hasAttr("propkey")) {
						$(this).val("");
						_hidOldFile.val("");
						var propkey = $(this).attr("propkey");
						var value = getPropValue(data, propkey);
						if (value != undefined && value != "") {
							var $thisfile = $(this);
							_hidOldFile.val(value + "");
							var $view = $('<div class="button1 hidfile" style="padding:0px; margin:0 1px; cursor:pointer;" title="查看">查</div>');//"<a href='" + filePath + "/" + data[propkey] + "' class='hidfile' style='margin-left:5px;' target='_blank'>查看</a>");
							var $del = $('<div class="button1 hidfile" style="padding:0px; margin:0 1px; cursor:pointer;" title="删除">删</div>');
							$view.bind("click.delfile", function(){
								$.tabs.addTab({
									id: "file_" + value,
									title: "文件查看",
									url:filePath + "/" + value + "?1=1"
								});
							});
							$del.bind("click.delfile", function() {$view.remove(); $del.remove(); _hidOldFileDelFlg.val("1"); $thisfile.removeData("validateExclude_File");});
							var $btnCon = $("<div style='float:left; margin-top:4px;'></div>");
							$btnCon.append($view);
							$btnCon.append($del);
							$(this).after($btnCon);
							$(this).bind("change.chgfile", function(){$view.remove(); $del.remove(); _hidOldFileDelFlg.val("1"); $thisfile.removeData("validateExclude_File");});
							if (filePath == undefined) {
								$view.hide();
							}
							$(this).data("validateExclude_File", "required");
						} else if ($(this).hasAttr("dval")) {
							_hidOldFile.val(eleDval + "");
						}
					} else if ($(this).hasAttr("dval")) {
						$(this).val("");
						$(this).val(eleDval + "");
					}
				}
			});
			
			$($thisId + " label, " + $thisId + " div, " + $thisId + " span, " + $thisId + " td, " + $thisId + " li").each(function() {
				var eleDval = _getDval($(this));
				if (eleDval == "filelink") {
					if ($(this).hasAttr("propkey")) {
						$(this).html("");
						var title = $(this).attr("tabtitle");
						var propkey = $(this).attr("propkey");
						var value = getPropValue(data, propkey);
						if (value != undefined) {
							var link = $("<div style='cursor:pointer; color:#2B63F3;'>点击查看</div>");
							link.bind("click", function() {
								$.tabs.addTab({
									id: "file_" + value,
									title: title || "文件查看_" + value,
									url:filePath + "/" + value + "?1=1"
								});
							});
							link.appendTo($(this));
						}
					}
				} else {
					if ($(this).hasAttr("propkey")) {
						$(this).text("");
						var propkey = $(this).attr("propkey");
						var value = getPropValue(data, propkey);
						if (value != undefined) {
							$(this).text(value);
						} else if ($(this).hasAttr("dval")) {
							$(this).text(eleDval);
						}
					} else if ($(this).hasAttr("dval")) {
						$(this).text("");
						$(this).text(eleDval);
					}
				}
			});
			$($thisId + " img, " + $thisId + " image").each(function() {
				if (filePath != undefined) {
					var eleDval = _getDval($(this));
					if ($(this).hasAttr("propkey")) {
						var propkey = $(this).attr("propkey");
						var value = getPropValue(data, propkey);
						if (value != undefined && value != "") {
							$(this).attr("src", filePath + "/" + value);
						} else if ($(this).hasAttr("dval")) {
							$(this).attr("src", filePath + "/" + eleDval);
						}
					} else if ($(this).hasAttr("dval")) {
						$(this).attr("src", filePath + "/" + eleDval);
					}
					
				}
			});
			if (!idExist) {
				$(this).removeAttr("id");
			}
		},
		/**
		 * 验证元素是否有指定属性
		 * @param attrName 属性名称
		 * @return 有:true   没有:false
		 */
		hasAttr:function(attrName) {
			if ($(this).attr(attrName) == undefined) {
				return false;
			}
			return true;
		},
		/**
		 * 分页，以下为class
		 *			pager_totalrow：显示总行数
		 * 			pager_current：显示当前页
		 * 			pager_next：下一页
		 * 			pager_first：首页
		 * 			pager_last：末页
		 * 			pager_pre：上一页
		 * 			pager_turnto：跳转到指定页面的按钮
		 * 			pager_turnToPage：跳转到指定页面的输入框
		 * @param options 参数，具体如下：
		 * 			currentPage：页码，默认为1
		 * 			pageSize：每页显示的行数，默认为10
		 * 			url：请求URL
		 * 			paramFormId：查询参数所在Form的Id
		 * 			target：显示数据的Table的Id；查询成功的情况下，如果success为空，则默认显示数据到这个target
		 * 			searchbtn：查询按钮的ID
		 * 			success:成功执行的方法
		 * 			error：失败执行的方法
		 * 			searchOnLoad: 加载时执行查询，默认为false不加载
		 * 			loadBlankLines: 加载空白行，默认为true
		 * 			initpage:初始加载的页码
		 */
		pager:function(options) {
			options = options || {};
			options.currentPage = options.currentPage || 1;
			options.url = options.url || "";
			options.paramFormId = options.paramFormId || "";
			options.target = options.target || "";
			options.success = options.success || null;
			options.error = options.error || null;
			options.searchbtn = options.searchbtn || "";
			options.searchOnLoad = options.searchOnLoad || false;
			options.loadBlankLines = ___getRealData(options.loadBlankLines, true);
			if (options.url == "" || options.success == null && options.target == "") {
				$.setErrorMsg("分页控件初始化失败！");
				return;
			}
			var $this = $(this);
			if ($this.is("table")) {
				$this = $(this).find("~ div.pager_div:first");
			}
			options.pageSize = options.pageSize || $this.find(".pager_perpage_rowcnt").val();
			options.pageSize = options.pageSize || 10;

			$("<input type='hidden' class='_hid_pager_current' value='1'/>").appendTo($this);
			$("<input type='hidden' class='_hid_pager_totalpage' value='1'/>").appendTo($this);
			
			$this.find(".pager_current").text("1 / 1");
			//下一页
			$this.find(".pager_next").bind("click.pager", function() {
				//计算要跳转的页码
				var currentPage = $this.find("._hid_pager_current").val();
				var totalPage = $this.find("._hid_pager_totalpage").val();
				if (!$.isNumeric(currentPage) || !$.isNumeric(totalPage)) {
					currentPage = 1;
					totalPage = 1;
				}
				currentPage = parseInt(currentPage, 10) + 1;
				//已经是最后一页,没有下一页,不查询
				if (currentPage > parseInt(totalPage, 10)) {
					currentPage = totalPage;
					return;
				}
				//设置要跳转的页码
				options.currentPage = currentPage;
				_turnToPage(options, $this);
			});
			//重新排序时，查询用
			$this.find(".pager_first").bind("clickresort", function() {
				//设置要跳转的页码
				options.currentPage = 1;
				_turnToPage(options, $this);
			});
			//首页
			$this.find(".pager_first").bind("click.pager", function() {
				var currentPage = $this.find("._hid_pager_current").val();
				//已经是第一页,则不查询
				if (currentPage == "1") {
					return;
				}
				//设置要跳转的页码
				options.currentPage = 1;
				_turnToPage(options, $this);
			});
			//如果查询按钮ID不为空，处理查询按钮的点击事件
			if (options.searchbtn != "") {
				//移除查询按钮的click事件，绑定分页查询事件
				$("#" + options.searchbtn).removeAttr("onclick").unbind("click").bind("click.pager", function() {
					//设置查询参数
					options.param = "";
					if (options.paramFormId != "") {
						options.param = $("#" + options.paramFormId).serialize();
					}
					//设置要跳转的页码
					options.currentPage = 1;
					_turnToPage(options, $this);
				});
				//移除查询按钮子元素的click事件，防止click事件不是绑定在查询按钮上
				$("#" + options.searchbtn).children().removeAttr("onclick").unbind("click");
			}
			//定义一个隐藏的按钮在页面上，用于在任何情况下重新加载table数据
			var hidBtnSearch = $("<input type='button' id='__hidBtnSearch' style='display:none'/>");
			hidBtnSearch.bind("click.pager", function(obj, curpage) {
				if (!curpage) {
					curpage = 1;
				}
				//设置查询参数
				options.param = "";
				if (options.paramFormId != "") {
					options.param = $("#" + options.paramFormId).serialize();
				}
				//设置要跳转的页码
				options.currentPage = curpage;
				_turnToPage(options, $this);
			});
			hidBtnSearch.appendTo($this);
			
			//末页
			$this.find(".pager_last").bind("click.pager", function() {
				//计算要跳转的页码
				var currentPage = $this.find("._hid_pager_current").val();
				var totalPage = $this.find("._hid_pager_totalpage").val();
				if (!$.isNumeric(totalPage)) {
					totalPage = 1;
				}
				//已经是最后一页，则不查询
				if (currentPage >= totalPage) {
					return;
				}
				//设置要跳转的页码
				options.currentPage = totalPage;
				_turnToPage(options, $this);
			});
			//上一页
			$this.find(".pager_pre").bind("click.pager", function() {
				//计算要跳转的页码
				var currentPage = $this.find("._hid_pager_current").val();
				if (!$.isNumeric(currentPage)) {
					currentPage = 1;
				}
				currentPage = parseInt(currentPage, 10) - 1;
				//已经是第一页，没有上一页，不查询
				if (currentPage < 1) {
					currentPage = 1;
					return;
				}
				//设置要跳转的页码
				options.currentPage = currentPage;
				_turnToPage(options, $this);
			});
			//跳转-回车事件
			$this.find(".pager_turnToPage").bind("keypress.pager", function(event) {
				//回车事件
				if(event.keyCode == "13") {
					_turnToPageClick(options, $this);
				}
			});
			//跳转-按钮点击
			$this.find(".pager_turnto").bind("click.pager", function() {_turnToPageClick(options, $this);});
			if (options.loadBlankLines) {
				$("#" + options.target).fillListData(null, {"rowCntPerPage":options.pageSize});
			}
			
			$this.find(".pager_perpage_rowcnt").change(function() {
				options.pageSize = $(this).val();
				hidBtnSearch.trigger("click.pager");
			});
			if (options.searchOnLoad) {
				//设置要跳转的页码
//				options.currentPage = 1;
//				_turnToPage(options, $this);
				hidBtnSearch.trigger("click.pager", options.initpage);
			}
		},
		getCurrentPage:function() {
			var $this = $(this);
			if ($this.is("table")) {
				$this = $(this).find("~ div.pager_div:first");
			}
			if ($this && $this.find("._hid_pager_current")) {
				return $this.find("._hid_pager_current").val();
			}
			return '0';
		},
		/**
		 * 重新加载分页对应的Table的数据
		 */
		reloadTableData:function() {
			var $this = $(this);
			if ($(this).is("table")) {
				$this = $(this).find("~ div.pager_div:first");
			}
			$this.find("#__hidBtnSearch").trigger("click.pager");
		},
		clearTableData:function() {
			var $pager = $(this).find("~ div.pager_div:first");
			var $table = $(this);
			if (!$(this).is("table")) {
				$pager = $(this).find("div.pager_div:first");
				$table = $(this).find("table:first");
			}
			$pager.find("._hid_pager_totalpage").val("1");
			$pager.find("._hid_pager_current").val("1");
			$pager.find(".pager_current").text("1 / 1");
			$pager.find(".pager_totalrow").text("0");
			$table.fillListData(null);
		},
		closeAutoComplete:function() {
			if ($(this).is("input") || $(this).is("textarea") || $(this).is("select")) {
				$(this).prop("autocomplete", "off");
			} else {
				$(this).find("input").prop("autocomplete", "off");
				$(this).find("textarea").prop("autocomplete", "off");
				$(this).find("select").prop("autocomplete", "off");
			}
//		},
//		loadPage: function(url, param) {
//			if (!url || url == "") {
//				return;
//			}
//			var $this = $(this);
//			param = param || {};
//			$.ajax({
//				url: $.umbrella.basepath + url,
//				method:"post",
//				data:$.param(param),
//				success:function(result, status) {
//					if (status == "success") {
//						$this.html(result);
//						$this.find("textarea").each(function() {
//							var maxlength = $(this).attr("maxlength");
//							if (!maxlength) {
//								return;
//							}
//							var counter = $('<label class="counter" style="position:absolute; font-weight:normal; color:gray; opacity:0.6; margin:0; padding:0;"><span>&nbsp;&nbsp;0</span>/' + maxlength + '</label>');
//							$(this).after(counter);
//							counter.attr("for", $(this).attr("id"));
//							var counterWidth = (counter.outerWidth(true) + 10);
//							var counterHeight = (counter.outerHeight(true));
//							var width = $(this).innerWidth();
//							var height = $(this).innerHeight();
//							counter.css({"top":($(this).position().top + height - counterHeight), "left": ($(this).position().left + width - counterWidth)});
//							$(this).keyup(function() {
//								var text = $(this).val().length;
//								if (text < 10) {
//									text = "&nbsp;&nbsp;" + text
//								} else if (text < 100) {
//									text = "&nbsp;" + text
//								}
//								$(this).siblings(".counter").find("span").html(text);
//							});
//							$(this).trigger("keyup");
//						});
//						$this.closeAutoComplete();
//					}
//				}
//			});
		}
	});
	
/*******************jQuery方法扩展****************************/
	$.extend({
		delConfirm:function(options) {
			options = options || {};
			var content = options.content || "确认删除该记录？";
			var ensureCallback = options.ensureCallback || function() {};
			var cancelCallback = options.cancelCallback || function() {};
			var config = $.extend($.umbrella.alerticon.confirm, {btn: ['确认','取消']});
			confirm(content, config, function(e) {
				ensureCallback();
				layer.close(e);
			}, function(e) {
				cancelCallback();
				layer.close(e);
			});
		},
		disConfirm:function(options) {
			options = options || {};
			var content = options.content || "确认停用该记录？";
			var ensureCallback = options.ensureCallback || function() {};
			var cancelCallback = options.cancelCallback || function() {};
			var config = $.extend($.umbrella.alerticon.confirm, {btn: ['确认','取消']});
			confirm(content, config, function(e) {
				ensureCallback();
				layer.close(e);
			}, function(e) {
				cancelCallback();
				layer.close(e);
			});
		},
		closeAutoComplete:function() {
			$("input").prop("autocomplete", "off");
			$("textarea").prop("autocomplete", "off");
			$("select").prop("autocomplete", "off");
		},
		basePath : function () {
			//获取当前网址，如： http://localhost:8080/ems/Pages/Basic/Person.jsp
			var curWwwPath = window.document.location.href;
			//获取主机地址之后的目录，如： /ems/Pages/Basic/Person.jsp
			var pathName = window.document.location.pathname;
			var pos = curWwwPath.indexOf(pathName);
			//获取主机地址，如： http://localhost:8080
			var localhostPath = curWwwPath.substring(0, pos);
			//获取带"/"的项目名，如：/ems
			var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
			//获取项目的basePath   http://localhost:8080/ems/
			var basePath = localhostPath + projectName;
			return basePath;
		},
		toUtf8:function(str) {
			var out, i, len, c;
			out = "";
			len = str.length;
			for(i = 0; i < len; i++) {
				c = str.charCodeAt(i);
				if ((c >= 0x0001) && (c <= 0x007F)) {
					out += str.charAt(i);
				} else if (c > 0x07FF) {
					out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
					out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F));
					out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
				} else {
					out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F));
					out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
				}
			}
			return out;
		},
		/**
		 * ajax执行完成后，执行。仅一次有效
		 * @param fun    ajax执行完成后执行的后续操作
		 */
		ajaxStopOnce:function(fun) {
			$(document).one("ajaxStop.once", function() {
				fun();
			});
		},
		//HTML标签字符转换成转意符
		html2Escape : function (str) {
			return str.replace(/[<>&"]/g, function (c) { return { '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;'}[c]; });
		},
		//转意符换成HTML标签
		escape2Html : function (str) {
			var arrEntities = { 'lt': '<', 'gt': '>', 'nbsp': ' ', 'amp': '&', 'quot': '"' };
			return str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) { return arrEntities[t]; });
		},
		stopPropagation : function(e) {
			e = e || window.event;
			if(e.stopPropagation) { //W3C阻止冒泡方法
				e.stopPropagation();
			} else {
				e.cancelBubble = true; //IE阻止冒泡方法
			}
		} 
	});
/*************************私有方法,文件内部使用*******************************/
	function doValidate(obj, value) {
		var error = "";
		var validationStr = $(obj).attr("validate");
		var validations = validationStr.split(",");
		if (validations && validations.length > 0) {
			var cnt = validations.length;
			for (var i = 0; i < cnt; i++) {
				var item = $.trim(validations[i]);
				if (item && item != '') {
					if ($.trim(item) == 'required') {
						if ($.trim(value) == '') {
							if (error != "") {
								error += "\r\n";
							}
							error += "必须输入";
						}
					} else if ($.trim(item) == 'password') {
						var checkResult = $(obj).checkPassword();
						if (checkResult != "") {
							if (error != "") {
								error += "\r\n";
							}
							error += checkResult;
						}
					} else if ($.trim(item).indexOf('maxlength') == 0) {
						var rules = item.split("=");
						if (rules.length == 2 && !isNaN($.trim(rules[1])) && value.length > parseInt($.trim(rules[1]), 10)) {
							if (error != "") {
								error += "\r\n";
							}
							error += "最大长度: " + $.trim(rules[1]);
						}
					} else if ($.trim(item).indexOf('minlength') == 0) {
						var rules = item.split("=");
						if (rules.length == 2 && !isNaN($.trim(rules[1])) && value.length < parseInt($.trim(rules[1]), 10)) {
							if (error != null) {
								error += "\r\n";
							}
							error += "最小长度: " + $.trim(rules[1]);
						}
					} else if ($.trim(item) == 'idcard') {
						var result = checkCard(value);
						if (value != "" && !result) {
							if (error != "") {
								error += "\r\n";
							}
							error += "身份证号码无效";
						}
					} else if ($.trim(item) == 'email') {
						var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
						if(value != "" && !reg.test(value)){
							if (error != "") {
								error += "\r\n";
							}
							error += "邮箱不正确";
						}
					} else if ($.trim(item) == 'mobile') {
//						var reg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})(16[0-9]{1})||(17[0-9]{1})|(18[0-9]{1})|(19[0-9]{1})){1}\d{8})|m5\d{9}$/;
						var reg = /^((1[3-9][0-9]){1}\d{8})|m5\d{9}$/;
						if(value != "" && !reg.test(value)){
							if (error != "") {
								error += "\r\n";
							}
							error += "手机号码不正确";
						}
					} else if ($.trim(item) == 'telephone') {
						var reg = /(^(m5\d{9})$)|(^((1[3-9][0-9]){1}\d{8})$)|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$/
						if(value != "" && !reg.test(value)){
							if (error != "") {
								error += "\r\n";
							}
							error += "电话号码不正确";
						}
					} else if ($.trim(item) == 'number') {
						if (value != "" && !$.isNumeric(value)) {
							if (error != "") {
								error += "\r\n";
							}
							error += "只能输入数字";
						}
					} else if ($.trim(item) == 'plusnumber') {
						if (value != "" && !($.isNumeric(value) && parseFloat(value, 10) > 0)) {
							if (error != "") {
								error += "\r\n";
							}
							error += "只能输入正数(不包括0)";
						}
					} else if ($.trim(item) == 'plusnumber0') {
						if (value != "" && !($.isNumeric(value) && parseFloat(value, 10) >= 0)) {
							if (error != "") {
								error += "\r\n";
							}
							error += "只能输入正数或0";
						}
					} else if ($.trim(item) == 'digits') {
						if (value != "" && !($.isNumeric(value) && value.indexOf(".") < 0)) {
							if (error != "") {
								error += "\r\n";
							}
							error += "只能输入整数";
						}
					} else if ($.trim(item) == 'plusdigits') {
						if (value != "" && !($.isNumeric(value) && value.indexOf(".") < 0 && parseInt(value, 10) > 0)) {
							if (error != "") {
								error += "\r\n";
							}
							error += "只能输入正整数(不包括0)";
						}
					} else if ($.trim(item) == 'plusdigits0') {
						if (value != "" && !($.isNumeric(value) && value.indexOf(".") < 0 && parseInt(value, 10) >= 0)) {
							if (error != "") {
								error += "\r\n";
							}
							error += "只能输入正整数或0";
						}
					} else if ($.trim(item) == 'letterornum') {
						var reg = /^[a-zA-Z0-9]*$/;
						var mailReg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+\.){1,63}[a-z0-9]+$/;
						if(value != "" && !reg.test(value) && !mailReg.test(value)){
							if (error != "") {
								error += "\r\n";
							}
							error += "只能输入英文字母、数字或邮箱地址";
						}
					} else if ($.trim(item) == 'letterornum1') {
						var reg = /^[a-zA-Z0-9]*$/;
						if(value != "" && !reg.test(value)){
							if (error != "") {
								error += "\r\n";
							}
							error += "只能输入英文字母或数字";
						}
					} else if ($.trim(item) == 'letter_num') {
						var reg = /^[a-zA-Z0-9_-]*$/;
						if(value != "" && !reg.test(value)){
							if (error != "") {
								error += "\r\n";
							}
							error += "只能输入英文字母、数字、中划线（-）或下划线（_）";
						}
					} else if ($.trim(item) == 'ip') {
						var reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
						if(value != "" && !reg.test(value)){
							if (error != "") {
								error += "\r\n";
							}
							error += "IP地址不正确";
						}
					} else if ($.trim(item) == 'mac') {
						var reg = /^[A-F0-9]{2}([-:][A-F0-9]{2}){5}$/;
						if(value != "" && !reg.test(value)){
							if (error != "") {
								error += "\r\n";
							}
							error += "MAC地址不正确";
						}
					} else if ($.trim(item).indexOf('func') == 0) {
						var rules = item.split("=");
						if (rules.length == 2 && $.isFunction(eval($.trim(rules[1])))) {
							var checkResult = eval($.trim(rules[1]))();
							if (checkResult && checkResult != "") {
								if (error != "") {
									error += "\r\n";
								}
								error += checkResult;
							}
						}
					}
				}
				if (error != "") {
					break;
				}
			}
		}
		return error;
	}
	/**
	 * 分页，转到指定页码
	 */
	function _turnToPage(options, $this) {
		options.param = ___getRealData(options.param, "");
		var pagerParam = {};
		pagerParam["page"] = options.currentPage;
		pagerParam["rows"] = options.pageSize;
		pagerParam["sortCol"] = $("#" + options.target).data("sortColumn");
		pagerParam["sort"] = $("#" + options.target).data("sortVal");
		var pagerParamStr = $.param(pagerParam);
		if (options.param != "") {
			pagerParamStr = options.param + "&" + pagerParamStr;
		}
		$.ajax({
			url: options.url,
			method:"post",
			dataType:"json",
			data:pagerParamStr,
			success:function(result, status) {
				if (result.success == true) {
					$this.find("._hid_pager_totalpage").val(result.data.allPage + "");
					$this.find("._hid_pager_current").val(result.data.page + "");
					$this.find(".pager_current").text(result.data.page + " / " + result.data.allPage);
					if (result.data.allPage == 0) {
						$this.find(".pager_current").text("1 / 1");
					}
					$this.find(".pager_totalrow").text(result.data.totalRows + "");
					
					//查询成功
					if (options.success != null) {
						options.success(result.data);
					} else if (options.target != "") {
						$("#" + options.target).fillListData(result.data.data, {"rowCntPerPage": options.pageSize});
					}
				} else {
					$this.find("._hid_pager_totalpage").val("1");
					$this.find("._hid_pager_current").val("1");
					$this.find(".pager_current").text("1 / 1");
					$this.find(".pager_totalrow").text("0");
					
					//查询失败
					if (options.error != null) {
						options.error(result);
					}
				}
			}
		});
	}
	
	function _turnToPageClick(options, $this) {
		//计算要跳转的页码
		var currentPage = $.trim($this.find(".pager_turnToPage").val());
		var totalPage = $this.find("._hid_pager_totalpage").val();
		if (!$.isNumeric(currentPage) || !$.isNumeric(totalPage)) {
			currentPage = 1;
			totalPage = 1;
		}
		if (parseInt(currentPage, 10) > parseInt(totalPage, 10)) {
			currentPage = totalPage;
		}
		
		if (parseInt(currentPage, 10) < 1) {
			currentPage = 1;
		}
		//设置要跳转的页码
		$this.find(".pager_turnToPage").val("");
		//页码没有变化，不查询
		if (currentPage  == $this.find("._hid_pager_current").val()) {
			return;
		}
		options.currentPage = parseInt(currentPage, 10);
		_turnToPage(options, $this);
	}
	
	function _containsValue(target, value) {
		while (target.indexOf(", ") != -1) {
			target = target.replace(/, /g, ",");
		}
		target = "," + target + ",";
		var result = (target.indexOf("," + value + ",") != -1);
		return result;
	}
	
	function ___getRealData(data, replace) {
		if (data === 0 || data === false) {
			return data;
		}
		return data || replace;
	}
	
	function _setRowData(tableRow, options, data, index, rowIndex) {
		opts = options.opts || [];
		//如果有checkbox，则先绑定checkbox的值
		if (tableRow.find("input:checkbox").length > 0) {
			var rowcheck = $(tableRow.find("input:checkbox")[0]);
			if (rowcheck.hasAttr("propkey")) {
				var propkey = rowcheck.attr("propkey");
				var value = getPropValue(data, propkey);
				rowcheck.val(value + "");
			} else if (rowcheck.hasAttr("dval")) {
				rowcheck.val(rowcheck.attr("dval") + "");
			}
		}
		//如果有radio，则先绑定radio的值
		if (tableRow.find("input:radio").length > 0) {
			var rowRadio = $(tableRow.find("input:radio")[0]);
			if (rowRadio.hasAttr("propkey")) {
				var propkey = rowRadio.attr("propkey");
				var value = getPropValue(data, propkey);
				rowRadio.val(value + "");
			} else if (rowRadio.hasAttr("dval")) {
				rowRadio.val(rowRadio.attr("dval") + "");
			}
		}
		var cells = tableRow.find("td");
		//写列数据
		for (var colIndex = 0; colIndex < cells.length; colIndex += 1) {
			if ($(cells[colIndex]).hasAttr("propkey") || $(cells[colIndex]).hasAttr("dval")) {
				if ($(cells[colIndex]).hasAttr("propkey") && $(cells[colIndex]).attr("propkey") == "_autorownumber") {
					$(cells[colIndex]).text((rowIndex + 1) + "");
				}
				if ($(cells[colIndex]).hasAttr("propkey") && $(cells[colIndex]).attr("propkey") != "actopts") {
					var propkey = $(cells[colIndex]).attr("propkey");
					var value = getPropValue(data, propkey);
					if (options[propkey] != undefined) {
						var opt = options[propkey];
						var _oldDisplayContent = opt.displayContent;
						opt.displayContent = ___getRealData(opt.displayContent || (value) || (data[propkey.replace("___text", "")]),  "");
						var _linkId = "_myLinkId_" + (index++);
						_addLinkEvent(opt, _linkId, cells[colIndex], data, ___getRealData(value || data[propkey.replace("___text", "")], ""));
						opt.displayContent = _oldDisplayContent;
					} else {
						if (value != undefined && value != null) {
							if ($(cells[colIndex]).attr("enablehtml") == 'enabled') {
								$(cells[colIndex]).html(value + "");
								//$(cells[colIndex]).attr("title", (data[propkey] + "").replace(/<br\/>/g, '\r\n'));
							} else {
								$(cells[colIndex]).text(value + "");
								$(cells[colIndex]).attr("title", value + "");
							}
							if (data[options[propkey + "_propClass"]]) {
								$(cells[colIndex]).addClass(data[options[propkey + "_propClass"]]);
							}
						} else if ($(cells[colIndex]).hasAttr("dval")) {
							if ($(cells[colIndex]).attr("enablehtml") == 'enabled') {
								$(cells[colIndex]).html($(cells[colIndex]).attr("dval"));
								//$(cells[colIndex]).attr("title", $(cells[colIndex]).attr("dval").replace(/<br\/>/g, '\r\n'));
							} else {
								$(cells[colIndex]).text($(cells[colIndex]).attr("dval"));
								$(cells[colIndex]).attr("title", $(cells[colIndex]).attr("dval"));
							}
							if (data[options[propkey + "_propClass"]]) {
								$(cells[colIndex]).addClass(data[options[propkey + "_propClass"]]);
							}
						}
					}
				} else if ($(cells[colIndex]).hasAttr("propkey") && $(cells[colIndex]).attr("propkey") == "actopts") {
					$(cells[colIndex]).css("white-space", "nowrap").html("");
					for (var optIndex = 0; optIndex < opts.length; optIndex += 1) {
						var opt = opts[optIndex];
						var _linkId = "_myLinkId_" + (index++);
						_addLinkEvent(opt, _linkId, cells[colIndex], data);
					}
				} else if ($(cells[colIndex]).hasAttr("dval")) {
					if ($(cells[colIndex]).attr("enablehtml") == 'enabled') {
						$(cells[colIndex]).html($(cells[colIndex]).attr("dval"));
						//$(cells[colIndex]).attr("title", $(cells[colIndex]).attr("dval").replace(/<br\/>/g, '\r\n'));
					} else {
						$(cells[colIndex]).text($(cells[colIndex]).attr("dval"));
						$(cells[colIndex]).attr("title", $(cells[colIndex]).attr("dval"));
					}
				}
			} else if ($(cells[colIndex]).find("input:text").length > 0) {
				var tdInput = $($(cells[colIndex]).find("input:text")[0]);
				if (tdInput.hasAttr("propkey")) {
					var propkey = tdInput.attr("propkey");
					var value = getPropValue(data, propkey);
					if (value != undefined && value != null) {
						tdInput.val(value + "");
					} else if (tdInput.hasAttr("dval")) {
						tdInput.val(tdInput.attr("dval") + "");
					}
				} else if (tdInput.hasAttr("dval")) {
					tdInput.val(tdInput.attr("dval") + "");
				}
				if (data[options[propkey + "_propClass"]]) {
					$(cells[colIndex]).find("input:text").addClass(data[options[propkey + "_propClass"]]);
				}
			} else if ($(cells[colIndex]).find("span").hasAttr("propkey") || $(cells[colIndex]).find("span").hasAttr("dval")) {
				var propkey = $(cells[colIndex]).find("span").attr("propkey");
				var value = getPropValue(data, propkey);
				var itemData = value?value:"-";
				if ($(cells[colIndex]).find("span").attr("enablehtml") == 'enabled') {
					$(cells[colIndex]).find("span").text(itemData + "");
					//$(cells[colIndex]).find("span").attr("title", (itemData + "").replace(/<br\/>/g, '\r\n'));
				} else {
					$(cells[colIndex]).find("span").text(itemData + "");
					$(cells[colIndex]).find("span").attr("title", itemData + "");
				}
				if (data[options[propkey + "_propClass"]]) {
					$(cells[colIndex]).find("span").addClass(data[options[propkey + "_propClass"]]);
				}
			}
		}
		
		return index;
	}
	
	function _addLinkEvent(opt, _linkId, target, data, content) {
		opt.displayContent = ___getRealData(opt.displayContent, '');
		opt.name_EnableHtml = opt.name_EnableHtml || false;
		opt.className = opt.className || "";
		opt.optActions = opt.optActions || [];
		opt.showLinkWithoutEvent = opt.showLinkWithoutEvent || false;
		opt.condition = ___getRealData(opt.condition, true);
//		if (opt.condition == undefined) {
//			opt.condition = true;
//		}
		opt.paramFormData = ___getRealData(opt.paramFormData, true);
//		if (opt.paramFormData == undefined) {
//			opt.paramFormData = true;
//		}
		//添加操作元素
		var optHtml = "<div id='" + _linkId + "' class='" + opt.className + "' style='cursor:pointer'></div>";
		$(target).append(optHtml);
		//添加操作元素的名称
		if (opt.name_EnableHtml) {
			$(target).find("#" + _linkId).html(opt.displayContent);
		} else {
			$(target).find("#" + _linkId).html("<a href='###'></a>");
			$(target).find("#" + _linkId + " a").text(opt.displayContent + "");
		}
		//判断链接是否有事件及是否显示链接
		if (typeof(opt.condition) == "function" && opt.condition(data) || typeof(opt.condition) != "function" && opt.condition) {
			//添加操作元素的事件
			for (var actionIndex = 0; actionIndex < opt.optActions.length; actionIndex += 1) {
				var action = opt.optActions[actionIndex];
				action.actionName = action.actionName || "";
				action.actionFunc = action.actionFunc || "";
				action.actionParams = action.actionParams || [];
				if (action.actionName != "" && action.actionFunc != "") {
					$(target).find("#" + _linkId).data("actionIndex", actionIndex);
					$(target).find("#" + _linkId).bind(action.actionName + ".autobind", function() {
						var _itemActionIndex = $(this).data("actionIndex");
						_itemOpt = opt;
						var _itemAction = _itemOpt.optActions[_itemActionIndex];
						var _itemParam = {};
						for (var paramIndex = 0; paramIndex < _itemAction.actionParams.length; paramIndex += 1) {
							if (_itemOpt.paramFormData) {
								_itemParam[_itemAction.actionParams[paramIndex]] = ___getRealData(data[_itemAction.actionParams[paramIndex]], "");
							} else {
								_itemParam[_itemAction.actionParams[paramIndex]] = _itemAction.actionParams[paramIndex];
							}
						}
						if (action.actionParams.length == 0) {
							_itemParam = data;
						}
						_itemOpt.optActions[_itemActionIndex].actionFunc(_itemParam, this);
					});
				}
			}
		} else if (!opt.showLinkWithoutEvent) {
			$(target).find("#" + _linkId).hide();
//		} else if (opt.showLinkWithoutEvent && !opt.name_EnableHtml) {
		} else {
			$(target).find("#" + _linkId).css("cursor", "auto");
			$(target).find("#" + _linkId).html("");
			$(target).find("#" + _linkId).text(content);
		}
	}
	
	function _getDval($this) {
		var eleDval = "";
		//针对日期的默认值，特殊处理
		if ($this.hasAttr("dval")) {
			eleDval = $this.attr("dval");
			if (eleDval.indexOf("date:") == 0) {
				eleDval = $.trim(eleDval.replace("date:", ""));
				eleDval = eval("(" + eleDval + ")") || {};
				if (eleDval.date != undefined && $.isNumeric(eleDval.date) && eleDval.date != "") {
					var diff = parseInt(eleDval.date);
					var date = new Date();
					date = date.addDays(diff);
					eleDval = date.format(eleDval.format || "yyyy-MM-dd");
				} else if (eleDval.date != undefined) {
					eleDval = eleDval.date;
				}
			}
		}
		return eleDval;
	}
	
	function checkCard(card) {
		//是否为空
		if(card === '') {
			return false;
		}
		//校验长度，类型
		if(isCardNo(card) === false) {
			return false;
		}
		//检查省份
		if(checkProvince(card) === false) {
			return false;
		}
		//校验生日
		if(checkBirthday(card) === false) {
			return false;
		}
		//检验位的检测
		if(checkParity(card) === false) {
			return false;
		}
		return true;
	}

	//检查号码是否符合规范，包括长度，类型
	function isCardNo(card) {
		//身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
		var reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/;
		if(reg.test(card) === false) {
			return false;
		}
	
		return true;
	}
	//取身份证前两位,校验省份
	function checkProvince (card) {
		var vcity = {
			11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",
			21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",
			33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",
			42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",
			51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",
			63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"
		};
		var province = card.substr(0,2);
		if(vcity[province] == undefined) {
			return false;
		}
		return true;
	}

	//检查生日是否正确
	function checkBirthday(card) {
		var len = card.length;
		//身份证15位时，次序为省（3位）市（3位）年（2位）月（2位）日（2位）校验位（3位），皆为数字
		if(len == '15') {
			var re_fifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/; 
			var arr_data = card.match(re_fifteen);
			var year = arr_data[2];
			var month = arr_data[3];
			var day = arr_data[4];
			var birthday = new Date('19'+year+'/'+month+'/'+day);
			return verifyBirthday('19'+year,month,day,birthday);
		}
		//身份证18位时，次序为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位），校验位末尾可能为X
		if(len == '18') {
			var re_eighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
			var arr_data = card.match(re_eighteen);
			var year = arr_data[2];
			var month = arr_data[3];
			var day = arr_data[4];
			var birthday = new Date(year+'/'+month+'/'+day);
			return verifyBirthday(year,month,day,birthday);
		}
		return false;
	}

	//校验日期
	function verifyBirthday(year,month,day,birthday) {
		var now = new Date();
		var now_year = now.getFullYear();
		//年月日是否合理
		if(birthday.getFullYear() == year && (birthday.getMonth() + 1) == month && birthday.getDate() == day) {
			//判断年份的范围（3岁到100岁之间)
			var time = now_year - year;
			if(time >= 3 && time <= 100) {
				return true;
			}
			return false;
		}
		return false;
	}

	//校验位的检测
	function checkParity(card) {
		//15位转18位
		card = changeFivteenToEighteen(card);
		var len = card.length;
		if(len == '18') {
			var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2); 
			var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'); 
			var cardTemp = 0, i, valnum; 
			for(i = 0; i < 17; i ++) 
			{ 
				cardTemp += card.substr(i, 1) * arrInt[i]; 
			} 
			valnum = arrCh[cardTemp % 11]; 
			if (valnum == card.substr(17, 1)) 
			{
				return true;
			}
			return false;
		}
		return false;
	}

	//15位转18位身份证号
	function changeFivteenToEighteen(card) {
		if(card.length == '15') {
			var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2); 
			var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'); 
			var cardTemp = 0, i;   
			card = card.substr(0, 6) + '19' + card.substr(6, card.length - 6);
			for(i = 0; i < 17; i ++)  {
				cardTemp += card.substr(i, 1) * arrInt[i]; 
			} 
			card += arrCh[cardTemp % 11]; 
			return card;
		}
		return card;
	}
	
	function getPropValue(data, propkey) {
		var value = data[propkey];
		if (propkey.indexOf(".") != -1) {
			var keys = propkey.split(".");
			for (var i = 0; i < keys.length; i++) {
				if (keys[i] != "" && data) {
					data = data[keys[i]];
				}
			}
			if (data) {
				value = data;
			}
		}
		return value;
	}
})(jQuery);
function FullScreen(){
	var el = document.documentElement;
	var isFullscreen=document.fullScreen||document.mozFullScreen||document.webkitIsFullScreen;
	if(!isFullscreen){//进入全屏,多重短路表达式
		(el.requestFullscreen&&el.requestFullscreen())||
		(el.mozRequestFullScreen&&el.mozRequestFullScreen())||
		(el.webkitRequestFullscreen&&el.webkitRequestFullscreen())||(el.msRequestFullscreen&&el.msRequestFullscreen());
	}else{	//退出全屏,三目运算符
		document.exitFullscreen?document.exitFullscreen():
		document.mozCancelFullScreen?document.mozCancelFullScreen():
		document.webkitExitFullscreen?document.webkitExitFullscreen():'';
	}
}
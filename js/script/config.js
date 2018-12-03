//var http="http://zhangpeng.s1.natapp.cc/";//张鹏
//var http="http://120.224.39.10:8090/";//正式
var http = "http://118.190.209.255:8090/"; //服务器
//var http = "http://192.168.1.237:8091/"; //林雨
var token = sessionStorage.getItem("user_token");
var userName = sessionStorage.getItem("userName");
$('.userName').text(userName);
$(function() {
	$.DemoPost = function(url, data, success, error) {
		$.ajax({
			type: "post",
			url: http + url,
			async: false, // 使用同步方式
			// 1 需要使用JSON.stringify 否则格式为 a=2&b=3&now=14...
			// 2 需要强制类型转换，否则格式为 {"a":"2","b":"3"}
			data: JSON.stringify(data),
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function(data) {
				success(data);
			}, // 注意不要在此行增加逗号
			error: function(e) {
				error(e);
			}
		});

	};

	$.DemoGet = function(url, success, error) {
		$.ajax({
			type: "get",
			url: http + url,
			async: false, // 使用同步方式
			// 1 需要使用JSON.stringify 否则格式为 a=2&b=3&now=14...
			// 2 需要强制类型转换，否则格式为 {"a":"2","b":"3"}
			dataType: "json",
			success: function(data) {
				success(data);
			},
			error: function(e) {
				error(e);
			}
		});
	};

	// $.ip = "http://139.129.213.125:8084";
	// $.ip = "http://192.168.1.175:8090";
});
var loginUrl = "/index/index/login.html";

function userToken(xhr, msg) {
	if(xhr == 4011 || xhr == 4012 || xhr == 4013 || xhr == 4014 || xhr == 4017) {
		layer.msg(msg, {
			time: 1000, //2秒关闭（如果不配置，默认是3秒）//设置后不需要自己写定时关闭了，单位是毫秒
			zIndex: layer.zIndex
		}, function() {
			setTimeout(function() {
				window.location.href = loginUrl;
			}, 1000);
		});
	}
}
//分页
function paging(elem, curPage, pageTotal, pageAmount, dataTotal, showPageTotalFlag, showSkipInputFlag, fun) {
	new myPagination({
		id: elem,
		curPage: curPage, //初始页码
		pageTotal: pageTotal, //总页数
		pageAmount: pageAmount, //每页多少条
		dataTotal: dataTotal, //总共多少条数据
		pageSize: 5, //可选,分页个数
		showPageTotalFlag: showPageTotalFlag, //是否显示数据统计
		showSkipInputFlag: showSkipInputFlag, //是否支持跳转
		getPage: function(page) {
			//获取当前页
			pageNumber = page;
			fun();
		}
	})
}
//小时转换成秒
function makeDurationToSeconds(time) {
	var str = time;
	var arr = str.split(':');
	var hs = parseInt(arr[0] * 3600);
	var ms = parseInt(arr[1] * 60);
	var seconds = hs + ms;
	return seconds;
}
//gap  小时转换成秒
function makeDurationToSeconds2(time) {
	var s = parseInt(time * 60);
	return s;
}
//转换成小时
function makeDurationToH(time) {
	var h = time / 60;
	var m = parseInt(h / 60);
	var s = h % 60;
	if(m < 10) {
		m = "0" + m;
	}
	if(s < 10) {
		s = "0" + s;
	}
	console.log(m + ":" + s);
	return m + ":" + s;
}
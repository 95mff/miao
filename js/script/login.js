$(document).ready(function() {
	sessionStorage.setItem("token", "");
});

function login() {
	var userName = $("#userName").val();
	var password = $("#password").val();
	if(userName == "") {
		layer.msg("请输入用户名");
		return false;
	}
	if(password == "") {
		layer.msg("请输入密码");

		return false;
	}
	var load = layer.load(1);
	$.DemoPost("sysuser/login", {
			'userName': userName,
			'password': password,
			"classification": "t_manager"
		},
		function(data) {
			console.log(data);
			if(data.success) {
				layer.close(load);
				sessionStorage.setItem("user_token", data.obj.user_token);
				sessionStorage.setItem("userName", data.obj.userName);
				location.href = "index.html";
			} else {
				layer.close(load);
				layer.msg(data.msg);
			}
		},
		function(e) {
			layer.close(load);
			console.log(e);
			layer.msg("登录失败");
			
		});
};

function keydownLogin() {
	if(event.keyCode == 13) {
		login();
	}
}

var index='';
$(window).load(function() {
	zuzhi();
	searchStaff();
})
var id;
var name;
var sort;
var pageNum = 1;
var pageSize = 10;

var startTime = $('#start').val();
var endTime = $('#end').val();
var departmentId = '';
var findCondition = $('#name').val();
var modelFlag = $("#modelFlag  option:selected").val();
//获取员工组织架构
function zuzhi() {
	$.ajax({
		type: "post",
		url: http + "department/findAllByPid",
		contentType: "application/json;charset=utf-8",
		dataType: "json",
		beforeSend: function(XMLHttpRequest) {
			XMLHttpRequest.setRequestHeader("user_token", token);
		},
		success: function(data) {
			layer.close(index);
			userToken(data.restCode, data.msg);
			if(data.restCode == 200) {
				var treeTitle = data.attributes.schoolName;
				var treeObj = data.obj;
				var treeItem = [];
				if(!jQuery.isEmptyObject(treeObj)) {
					for(var i = 0; i < treeObj.length; i++) {
						var treeItems = {};
						treeItems['sort'] = treeObj[i].sort;
						treeItems['id'] = treeObj[i].id;
						treeItems['text'] = treeObj[i].name+'('+ treeObj[i].employeeCounts+')';
						treeItems['name'] = treeObj[i].name;
						treeItems['managerId'] = treeObj[i].managerId;
						treeItems['managerName'] = treeObj[i].managerName;
						treeItems['icon'] = "iconfont icon-yuangongguanli-copy";
						treeItem.push(treeItems)

					}
				} else {
					treeItem.push({
						"text": "暂无部门，请添加"
					})
				}
				var treeData = [{
					text: treeTitle,
					backColor: "#47C8AF",
					color: '#fff',
					nodes: treeItem,
					icon: "iconfont icon-bumenrenyuanguanli"
				}];
				$("#personnal").treeview({
					color: "#666",
					enableLinks: !0,
					data: treeData,
					selectedColor: "#fff",
					selectedBackColor: "#47C8AF",
					state: [{
						expanded: true
					}],
					onNodeSelected: function(e, treeData) {
						console.log(treeData)
						if(treeData.text == treeTitle) {
							id = '';
							$('#departName').text("部门名称");
							departmentId = '';
							startTime = $('#start').val();
							endTime = $('#end').val();
							findCondition = $('#name').val();
							
							modelFlag = $("#modelFlag  option:selected").val();
							searchStaff();

						}else {
							
							sort = treeData.sort;
							name = treeData.name;
							id = treeData.id;
							managerName = treeData.managerName;
							$('#departName').text(name);
							if(managerName == null) {
								$('#managerName').text("暂无");
							} else {
								$('#managerName').text(managerName);
							}
							departmentId = id;
							startTime = $('#start').val();
							endTime = $('#end').val();
							findCondition = $('#name').val();
							modelFlag = $("#modelFlag  option:selected").val();
							searchStaff();
						}
					}
				})
			}

		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			layer.close(index);
			layer.msg('程序错误,请重试！');
		}
	});

}
//输入名字或工号搜索
$('#nameSerch').click(function() {
	findCondition = $("#name").val();
	searchStaff();
})
//条件查询
$('#searchBtn').click(function() {
	startTime = $('#start').val();
	endTime = $('#end').val();
	findCondition = $("#name").val();
	modelFlag = $("#modelFlag  option:selected").val();
	searchStaff();
})
//员工列表
function searchStaff() {

	index = layer.load();
	
	$.ajax({
		type: "post",
		url: http + "employee/findAllByCondition",
		contentType: "application/json;charset=utf-8",
		dataType: "json",
		beforeSend: function(XMLHttpRequest) {
			XMLHttpRequest.setRequestHeader("user_token", token);
		},
		data: JSON.stringify({
			"startTime": startTime,
			"endTime": endTime,
			"findCondition": findCondition,
			"modelFlag": modelFlag,
			"pageSize": pageSize,
			"pageNumber": pageNum,
			"departmentId": departmentId
		}),
		success: function(data) {
			console.log(data);
			if(data.success == false) {
				layer.msg(data.msg);
				return false;
			}
			if(data.success) {
				layer.close(index);
				userToken(data.restCode, data.msg);
				if(data.restCode == 200) {
					var list = data.obj.list;
					if(!jQuery.isEmptyObject(list)) {
						$('#pagination').show();
						$('#tableInfo tbody').html('');
						for(var i = 0; i < list.length; i++) {

							var tdItems = '';
							tdItems += '<tr data-id="' + list[i].id + '"  data-name="' + list[i].name + '">';
							tdItems += '<td><input type="checkbox" class="i-checks" name="personnal[]" value="' + list[i].id + '"></td>';
							tdItems += '<td>' + list[i].name + '</td>';
							tdItems += '<td>' + list[i].departName + '</td>';
							if(list[i].jobName == null) {
								tdItems += '<td>暂无</td>';
							} else {
								tdItems += '<td>' + list[i].jobName + '</td>';
							}

							tdItems += '<td>' + list[i].jobNumber + '</td>';
							tdItems += '<td>' + list[i].phone + '</td>';
							tdItems += '<td>' + list[i].entryTime + '</td>';
							if(list[i].modelFlag == 0) {
								tdItems += '<td>未建模</td>';
							}
							if(list[i].modelFlag == 1) {
								tdItems += '<td>已建模</td>';
							}
							if(list[i].modelFlag == null) {
								tdItems += '<td>暂无</td>';
							}
							tdItems += '<td style="text-align: center;">';
							tdItems += '<button class="btn btn-sm btn-primary" onclick="updataPersonnal(this)" style="margin-right:10px;">建模</button>';
							tdItems += '<button class="btn btn-sm btn-primary" onclick="editorPersonnal(this)">编辑</button>';

							tdItems += '</td>';

							tdItems += '</tr>';
							$('#tableInfo tbody').append(tdItems);
							$(".i-checks").iCheck({
								checkboxClass: "icheckbox_square-green",
								radioClass: "iradio_square-green",
							})
							//全选
							$('#allOptionId').on('ifChecked', function(event) {
								$("#tableInfo tbody tr td input[name='personnal[]']:checkbox").iCheck('check');

							});
							//反选
							$('#allOptionId').on('ifUnchecked', function(event) {
								$("#tableInfo tbody tr td input[name='personnal[]']:checkbox").iCheck('uncheck');

							});
							new myPagination({
								id: 'pagination',
								curPage: data.obj.pageNum, //初始页码
								pageTotal: data.obj.pages, //总页数
								pageAmount: data.obj.pageSize, //每页多少条
								dataTotal: data.obj.total, //总共多少条数据
								pageSize: 5, //可选,分页个数
								showPageTotalFlag: true, //是否显示数据统计
								showSkipInputFlag: false, //是否支持跳转
								getPage: function(page) {
									//获取当前页
									pageNum = page;
									searchStaff();
								}
							})
						}
					} else {
						$('#pagination').hide();
						$('#tableInfo tbody').html('');
						var tdItems = '<tr><th colspan="8" style="text-align: center;">暂无数据</th></tr>';
						$('#tableInfo tbody').append(tdItems);
					}
				}

			}

		},
		error: function(error) {
			console.log(error)
			layer.close(index);
			layer.msg("程序错误，请重试！");
		}
	});
}
function checkNodeEvent(nodeId){
	if(nodeId!=undefined){
		var node = $('#tpersonnal').treeview("getNode",nodeId);
		var childNodes = new Array();
		childNodes = node.nodes;
		for(var i=0;i<childNodes.length;i++){
		// $('#treeview-checkable').treeview("checkNode",childNodes[i]);
		childNodes[i].state.checked = true;
		/*
		var nodeid = childNodes[i].nodeId;
		var liObj = $("li[data-nodeid='"+nodeid+"']");
		$(liObj).addClass("node-checked");
		var child = $(liObj).child("span.glyphicon-unchecked").eq(0);
		$(child).attr("class",
		"icon check-icon glyphicon glyphicon-check");
		*/
		checkNodeEvent(checkNodeEvent.nodeId);
		}
	}
}
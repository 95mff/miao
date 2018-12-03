function addDeparment() {
				$.validator.setDefaults({
					highlight: function(e) {
						$(e).closest(".form-group").removeClass("has-success").addClass("has-error")
					},
					success: function(e) {
						e.closest(".form-group").removeClass("has-error").addClass("has-success")
					},
					errorElement: "span",
					errorPlacement: function(e, r) {
						e.appendTo(r.is(":radio") || r.is(":checkbox") ? r.parent().parent().parent() : r.parent())
					},
					errorClass: "help-block m-b-none",
					validClass: "help-block m-b-none"
				}), $().ready(function() {
					$("#addDepartment").validate({
						rules: {

							name: {
								required: !0,
								minlength: 2
							},
							bianhao: {
								required: !0
							},

						},
						messages: {

							name: {
								required: "请输入部门名称",
								minlength: "部门名称必须两个字符以上"
							},
							bianhao: {
								required: "排序号不能为空",

							},
						}
					})

				});
				if(!$("#addCompany").valid()) {

					return;
				}

				$.ajax({
					url: "/basecompany/AddCompanyxx",
					data: {
						CompanyName: name,
						PId: $("#pid").val()
					},

					success: function(data) {

					}
				});
			};
			//手机号
			jQuery.validator.addMethod("isMobile", function(value, element) {
				var length = value.length;
				var mobile = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/;
				return this.optional(element) || (length == 11 && mobile.test(value));
			}, "请正确填写您的手机号码");
			// 身份证号码验证 
			jQuery.validator.addMethod("isIdCardNo", function(value, element) {
				return this.optional(element) || idCardNoUtil.checkIdCardNo(value);
			}, "请正确输入您的身份证号码");
			//日期
			jQuery.validator.addMethod("isDate", function(value, element) {
				var ereg = /^(\d{1,4})(-|\/)(\d{1,2})(-|\/)(\d{1,2})$/;
				var r = value.match(ereg);
				if(r == null) {
					return false;
				}
				var d = new Date(r[1], r[3] - 1, r[5]);
				var result = (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[5]);

				return this.optional(element) || (result);
			}, "请输入正确的日期");
			//添加成员
			function addpeople() {
				$.validator.setDefaults({
					highlight: function(e) {
						$(e).closest(".form-group").removeClass("has-success").addClass("has-error")
					},
					success: function(e) {
						e.closest(".form-group").removeClass("has-error").addClass("has-success")
					},
					errorElement: "span",
					errorPlacement: function(e, r) {
						e.appendTo(r.is(":radio") || r.is(":checkbox") ? r.parent().parent().parent() : r.parent())
					},
					errorClass: "help-block m-b-none",
					validClass: "help-block m-b-none"
				}), $().ready(function() {
					$("#addPeople").validate({
						rules: {

							name: {
								required: true,
								minlength: 2
							},
							phone: {
								required: true,
								minlength: 11,
								isMobile: true
							},
							IDCard: {
								required: true,
								isIdCardNo: true
							},
							gonghao: {
								required: true
							},
							ruzhitime: {
								required: true,
								isDate: true
							}

						},
						messages: {

							name: {
								required: "请输入姓名",
								minlength: "姓名必须两个字符以上"
							},
							phone: {
								required: "请输入手机号",
								minlength: "确认手机不能小于11个字符",
								isMobile: "请正确填写您的手机号码"
							},
							IDCard: {
								required: '请输入身份证号',
								isIdCardNo: '请正确填写您的身份证号'
							},
							gonghao: {
								required: "请输入您的工号"
							},
							ruzhitime: {
								required: "请选择入职日期",
								isDate: '请输入正确的日期格式'
							}

						}
					})

				});
				if(!$("#addPeople").valid()) {

					return;
				}

				$.ajax({
					url: "/basecompany/AddCompanyxx",
					data: {
						CompanyName: name,
						PId: $("#pid").val()
					},

					success: function(data) {

					}
				});
			};
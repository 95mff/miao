//$('.nav_list>li').mouseover(function(){
//	$(this).addClass('nav_listActive').siblings().removeClass('nav_listActive');
//	
//	if($(this).is('.nav_listActive')){
//		$(this).find('.nav_list_menu').addClass('show');
//		$(this).siblings().find('.nav_list_menu').removeClass('show');
//	}
//})
//$('.nav_list_menu>li').mouseover(function(){
//	$(this).addClass('nav_list_menuActive').siblings().removeClass('nav_list_menuActive');
//})
function getFormData(form) {
	var unindexed_array = $(form).serializeArray();
	var indexed_array = {};

	$.map(unindexed_array, function(n, i) {
		indexed_array[n['name']] = n['value'];
	});

	return indexed_array;
}
var a = getFormData('#addClassPersonnalForm');
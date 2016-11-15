var linkObj = {
	search_text : "",
	link_country : "",
	link_region : "",
	link_zone : "",
	link_venue : "",
	category_id : "",
	listlinks : function(search_type, current_page, page_url){
				
		if(current_page == 1){
			var search_text = linkObj.search_text = $('.link_search_box').val();
			var link_country = linkObj.link_country = $('.link_country').val();
			var link_region = linkObj.link_region = $('.link_region').val();
			var link_zone = linkObj.link_zone = $('.link_zone').val();
			var link_venue = linkObj.link_venue = $('.link_venue').val();
			var category_id = linkObj.category_id = $('#link_tab_list ul.documents_menu li a.active').attr('data-cat');
		}else{
			var search_text = linkObj.search_text;
			var link_country = linkObj.link_country;
			var link_region = linkObj.link_region;
			var link_zone = linkObj.link_zone;
			var link_venue = linkObj.link_venue;
			var category_id = linkObj.category_id;
		}
		
		if(current_page == 1){
			$('#link_tab_list .documents_wrap').html('').addClass('loading_content');
		}

		switch(search_type){
			case 1:
				var dataToSend = {
					"type" : search_type,
		        	"search-text" : search_text
		       	};
			break;
			case 2:
				var dataToSend = {
					"type" : search_type,
		        	"link-country" : link_country,
					"link-region" : link_region,
					"link-zone" : link_zone,
					"link-venue" : link_venue,
					"category-id" : category_id
		       	};
			break;
			case 3:
				var dataToSend = {
					"type" : search_type,
		        	"link-country" : link_country,
					"link-region" : link_region,
					"link-zone" : link_zone,
					"link-venue" : link_venue,
					"category-id" : category_id
		       	};
			break;
		}
		
		appObj.custom_ajax({
			"dataType" 		: "JSON",
			"type" 			: "GET",
			"loader"		: false,
			"customUrl"		: page_url,
			"data"			: dataToSend,
			"customData"	: {
				"type": search_type,
				"current_page" : current_page,
				"tab" : "link"
			},
			"success"		: {"linkObj" : "load_content"},
			"error"			: {"appObj" : "list_tab_error"}
		});
		
	},
	load_content : function(data, param){
		var content = "";
			    	
    	$.each(data.data, function(key, value) {
			content += '<div class="document_row"><div class="icon"><a onclick="window.open(\''+value.url_lks+'\', \'_system\');" href="javascript:void(0);"><img src="'+value.image_lks+'" alt=""></a></div><div class="text"><h3><a onclick="window.open(\''+value.url_lks+'\', \'_system\');" href="javascript:void(0);">'+value.title_lks+'</a></h3><p><span>'+value.label+'</span><span>'+value.dateadded_lks+'</p></div><div class="clr"></div></div>';
		});
		    	
    	if(param.current_page == 1){
			$('#link_tab_list .documents_wrap').html(content).removeClass('loading_content');
		}else{
			$('#link_tab_list .documents_wrap').append(content);
		}
		
		$('#link_tab_list .next_page_url').val(data.next_page_url);
    	$('#link_tab_list .current_page').val(data.current_page);
		$('#link_tab_list .search_type').val(param.type);
		
		if(data.next_page_url != null){
			$('#link_tab_list .linkLoadMore').show();
		}else{
			$('#link_tab_list .linkLoadMore').hide();
		}
		
		$('#link_tab_list .linkajaxloader').hide();
  	
	},
	load_more : function(){
		var next_page_url = $('#link_tab_list .next_page_url').val();
		var current_page = "";
		if(next_page_url != null ){
			var search_type = $('#link_tab_list .search_type').val();
			$('#link_tab_list .linkajaxloader').show();
			$('#link_tab_list .linkLoadMore').hide();
			linkObj.listlinks(search_type, current_page, next_page_url);
		}
	},
	insert_link_success : function(data, param){
		
	},
	init: function(){
		this.bind();		
	},
	bind: function(){
		
		$('#link_tab_list').on('click', '.link_search_button', function(){
			$('#link_tab_list .staff_select_wrapper select+button').parent('.col_select').find('select').multiselect("uncheckAll");
			$('#link_tab_list .documents_menu li a').removeClass('active');
			$('#link_tab_list .documents_menu li:first-child a').addClass('active');
			var url = appObj.api_url+appObj.routes.list.tab.link;
			linkObj.listlinks(1, 1, url);
		});
		
		$('#link_tab_list').on('click', '.link_filter_button', function(){
			$('#link_tab_list .link_search_box').val('');
			var url = appObj.api_url+appObj.routes.list.tab.link;
			linkObj.listlinks(2, 1, url);
		});
		
		$('#link_tab_list').on('click', 'ul.documents_menu li a', function(){
			$('#link_tab_list ul.documents_menu li a').removeClass('active');
			$(this).addClass('active');
			$('#link_tab_list .link_search_box').val('');
			var url = appObj.api_url+appObj.routes.list.tab.link;
			linkObj.listlinks(3, 1, url);
		});
				
		$('#link_tab_list').on('click', '.linkLoadMore', function(){
			linkObj.load_more();
		});
		
		$('#link_tab_add').on('click', '#link_submit_button', function(){			
			var link_data = $('#link_add_form').serializeArray();	

			appObj.custom_ajax({
				"dataType" 		: "JSON",
				"type" 			: "POST",
				"loader"		: false,
				"url"  			: appObj.routes.add.link,
				"data"			: link_data,
				"customData"	: {},
				"success"		: {"linkObj" : "insert_link_success"}
			});		
		});
		
		
	}
};
var newsObj = {
	search_text : "",
	news_country : "",
	news_region : "",
	news_zone : "",
	news_venue : "",
	category_id : "",
	listnewss : function(search_type, current_page, page_url){
				
		if(current_page == 1){
			var search_text = newsObj.search_text = $('.news_search_box').val();
			var news_country = newsObj.news_country = $('.news_country').val();
			var news_region = newsObj.news_region = $('.news_region').val();
			var news_zone = newsObj.news_zone = $('.news_zone').val();
			var news_venue = newsObj.news_venue = $('.news_venue').val();
			var category_id = newsObj.category_id = $('#news_tab_list ul.documents_menu li a.active').attr('data-cat');
		}else{
			var search_text = newsObj.search_text;
			var news_country = newsObj.news_country;
			var news_region = newsObj.news_region;
			var news_zone = newsObj.news_zone;
			var news_venue = newsObj.news_venue;
			var category_id = newsObj.category_id;
		}
		
		if(current_page == 1){
			$('#news_tab_list .documents_wrap').html('').addClass('loading_content');
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
		        	"news-country" : news_country,
					"news-region" : news_region,
					"news-zone" : news_zone,
					"news-venue" : news_venue,
					"category-id" : category_id
		       	};
			break;
			case 3:
				var dataToSend = {
					"type" : search_type,
		        	"news-country" : news_country,
					"news-region" : news_region,
					"news-zone" : news_zone,
					"news-venue" : news_venue,
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
				"tab" : "news"
			},
			"success"		: {"newsObj" : "load_content"},
			"error"			: {"appObj" : "list_tab_error"}
		});
		
	},
	load_content : function(data, param){
		var content = "";
			    	
    	$.each(data.data, function(key, value) {
			content += '<div class="document_row"><div class="icon"><a href="javascript:void(0);" data-id="'+value.id+'"><img src="'+value.icon+'" alt=""></a></div><div class="text"><h3><a href="javascript:void(0);" data-id="'+value.id+'">'+value.title+'</a></h3><p>'+value.label+value.date+'</p></div><div class="clr"></div></div>';
		});
		    	
    	if(param.current_page == 1){
			$('#news_tab_list .documents_wrap').html(content).removeClass('loading_content');
		}else{
			$('#news_tab_list .documents_wrap').append(content);
		}
		
		$('#news_tab_list .next_page_url').val(data.next_page_url);
    	$('#news_tab_list .current_page').val(data.current_page);
		$('#news_tab_list .search_type').val(param.type);
		
		if(data.next_page_url != null){
			$('#news_tab_list .newsLoadMore').show();
		}else{
			$('#news_tab_list .newsLoadMore').hide();
		}
		
		$('#news_tab_list .newsajaxloader').hide();
  	
	},
	load_more : function(){
		var next_page_url = $('#news_tab_list .next_page_url').val();
		var current_page = "";
		if(next_page_url != null ){
			var search_type = $('#news_tab_list .search_type').val();
			$('#news_tab_list .newsajaxloader').show();
			$('#news_tab_list .newsLoadMore').hide();
			newsObj.listnewss(search_type, current_page, next_page_url);
		}
	},
	load_news_detail : function($this){
		var id = $this.attr('data-id');
		
		appObj.custom_ajax({
			"dataType" 		: "JSON",
			"type" 			: "GET",
			"loader"		: false,
			"url"  			: appObj.routes.detail.news+'/'+id,
			"data"			: {},
			"customData"	: {},
			"success"		: {"newsObj" : "news_detail_success"}
		});
	},
	news_detail_success : function(data, param){
		$('.news_view_holder .news_view_title').html(data.title);
		if(data.image != ""){
			$('.news_view_holder .news_view_image').html('<img src="'+data.image+'" alt="image" />');
		}
    	$('.news_view_holder .model_content_text').removeClass('loading_content');
    	$('.news_view_holder .news_view_detail').html(data.detail);
	},
	insert_news_success : function(data, param){
	},
	init: function(){
		this.bind();		
	},
	bind: function(){
		
		$('#news_tab_list').on('click', '.news_search_button', function(){
			$('#news_tab_list .staff_select_wrapper select+button').parent('.col_select').find('select').multiselect("uncheckAll");
			$('#news_tab_list .documents_menu li a').removeClass('active');
			$('#news_tab_list .documents_menu li:first-child a').addClass('active');
			var url = appObj.api_url+appObj.routes.list.tab.news;
			newsObj.listnewss(1, 1, url);
		});
		
		$('#news_tab_list').on('click', '.news_filter_button', function(){
			$('#news_tab_list .news_search_box').val('');
			var url = appObj.api_url+appObj.routes.list.tab.news;
			newsObj.listnewss(2, 1, url);
		});
		
		$('#news_tab_list').on('click', 'ul.documents_menu li a', function(){
			$('#news_tab_list ul.documents_menu li a').removeClass('active');
			$(this).addClass('active');
			$('#news_tab_list .news_search_box').val('');
			var url = appObj.api_url+appObj.routes.list.tab.news;
			newsObj.listnewss(3, 1, url);
		});
				
		$('#news_tab_list').on('click', '.newsLoadMore', function(){
			newsObj.load_more();
		});
		
		$('#news_tab_list').on('click', '.document_row a', function(){
			$('.news_view_holder').fadeIn(300);
			$(window).resize();
			newsObj.load_news_detail($(this));
		});
		
		$('#news_tab_list').on('click', '.news_view_cancel_button', function(event){
			$('.news_view_holder').fadeOut(300, function(){
				$('.news_view_holder .news_view_title').html('');
			    $('.news_view_holder .news_view_image').html('');
			    $('.news_view_holder .news_view_detail').html('');
			    $('.news_view_holder .model_content_text').addClass('loading_content');
			});
			event.stopPropagation();
		});
		
		$('#news_tab_add').on('click', '#news_submit_button', function(){			
			var news_data = $('#news_add_form').serializeArray();	

			appObj.custom_ajax({
				"dataType" 		: "JSON",
				"type" 			: "POST",
				"loader"		: false,
				"url"  			: appObj.routes.add.news,
				"data"			: news_data,
				"customData"	: {},
				"success"		: {"newsObj" : "insert_news_success"}
			});		
		});
		
		
	}
};
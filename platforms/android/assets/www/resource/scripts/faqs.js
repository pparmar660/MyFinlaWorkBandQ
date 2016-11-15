var faqObj = {
	search_text : "",
	faq_country : "",
	faq_region : "",
	faq_zone : "",
	faq_venue : "",
	category_id : "",
	listfaqs : function(search_type, current_page, page_url){
				
		if(current_page == 1){
			var search_text = faqObj.search_text = $('.faq_search_box').val();
			var faq_country = faqObj.faq_country = $('.faq_country').val();
			var faq_region = faqObj.faq_region = $('.faq_region').val();
			var faq_zone = faqObj.faq_zone = $('.faq_zone').val();
			var faq_venue = faqObj.faq_venue = $('.faq_venue').val();
			var category_id = faqObj.category_id = $('#faq_tab_list ul.documents_menu li a.active').attr('data-cat');
		}else{
			var search_text = faqObj.search_text;
			var faq_country = faqObj.faq_country;
			var faq_region = faqObj.faq_region;
			var faq_zone = faqObj.faq_zone;
			var faq_venue = faqObj.faq_venue;
			var category_id = faqObj.category_id;
		}
		
		if(current_page == 1){
			$('#faq_tab_list .documents_wrap').html('').addClass('loading_content');
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
		        	"faq-country" : faq_country,
					"faq-region" : faq_region,
					"faq-zone" : faq_zone,
					"faq-venue" : faq_venue,
					"category-id" : category_id
		       	};
			break;
			case 3:
				var dataToSend = {
					"type" : search_type,
		        	"faq-country" : faq_country,
					"faq-region" : faq_region,
					"faq-zone" : faq_zone,
					"faq-venue" : faq_venue,
					"category-id" : category_id
		       	};
			break;
		}
		
		appObj.custom_ajax({
			"dataType" 		: "JSON",
			"type" 			: "GET",
			"customUrl"		: page_url,
			"data"			: dataToSend,
			"loader"		: false,
			"customData"	: {
				"type": search_type,
				"current_page" : current_page,
				"tab" : "faq"
			},
			"success"		: {"faqObj" : "load_content"},
			"error"			: {"appObj" : "list_tab_error"}
		});
		
	},
	load_content : function(data, param){
		var content = "";
			    	
    	$.each(data.data, function(key, value) {
			content += '<div class="document_row"><div class="icon"><a href="javascript:void(0);" data-id="'+value.id+'"><img src="'+value.icon+'" alt=""></a></div><div class="text"><h3><a href="javascript:void(0);" data-id="'+value.id+'">'+value.title+'</a></h3><p><span>'+value.label+'</span><span>'+value.date+'</span></p></div><div class="clr"></div></div>';
		});
		    	
    	if(param.current_page == 1){
			$('#faq_tab_list .documents_wrap').html(content).removeClass('loading_content');
		}else{
			$('#faq_tab_list .documents_wrap').append(content);
		}
		
		$('#faq_tab_list .next_page_url').val(data.next_page_url);
    	$('#faq_tab_list .current_page').val(data.current_page);
		$('#faq_tab_list .search_type').val(param.type);
		
		if(data.next_page_url != null){
			$('#faq_tab_list .faqLoadMore').show();
		}else{
			$('#faq_tab_list .faqLoadMore').hide();
		}
		
		$('#faq_tab_list .faqajaxloader').hide();
  	
	},
	load_more : function(){
		var next_page_url = $('#faq_tab_list .next_page_url').val();
		var current_page = "";
		if(next_page_url != null ){
			var search_type = $('#faq_tab_list .search_type').val();
			$('#faq_tab_list .faqajaxloader').show();
			$('#faq_tab_list .faqLoadMore').hide();
			faqObj.listfaqs(search_type, current_page, next_page_url);
		}
	},
	load_faq_detail : function($this){
		var id = $this.attr('data-id');
		
		appObj.custom_ajax({
			"dataType" 		: "JSON",
			"type" 			: "GET",
			"loader"		: false,
			"url"  			: appObj.routes.detail.faq+'/'+id,
			"data"			: {},
			"customData"	: {},
			"success"		: {"faqObj" : "faq_detail_success"}
		});
	},
	faq_detail_success : function(data, param){
		$('.faq_view_holder .faq_view_title').html(data.title);
		if(data.image != ""){
			$('.faq_view_holder .faq_view_image').html('<img src="'+data.image+'" alt="image" />');
		}
    	$('.faq_view_holder .model_content_text').removeClass('loading_content');
    	$('.faq_view_holder .faq_view_detail').html(data.detail);
	},
	insert_faq_success : function(data, param){
		
	},
	init: function(){
		this.bind();		
	},
	bind: function(){
		
		$('#faq_tab_list').on('click', '.faq_search_button', function(){
			$('#faq_tab_list .staff_select_wrapper select+button').parent('.col_select').find('select').multiselect("uncheckAll");
			$('#faq_tab_list .documents_menu li a').removeClass('active');
			$('#faq_tab_list .documents_menu li:first-child a').addClass('active');
			var url = appObj.api_url+appObj.routes.list.tab.faq;
			faqObj.listfaqs(1, 1, url);
		});
		
		$('#faq_tab_list').on('click', '.faq_filter_button', function(){
			$('#faq_tab_list .faq_search_box').val('');
			var url = appObj.api_url+appObj.routes.list.tab.faq;
			faqObj.listfaqs(2, 1, url);
		});
		
		$('#faq_tab_list').on('click', 'ul.documents_menu li a', function(){
			$('#faq_tab_list ul.documents_menu li a').removeClass('active');
			$(this).addClass('active');
			$('#faq_tab_list .faq_search_box').val('');
			var url = appObj.api_url+appObj.routes.list.tab.faq;
			faqObj.listfaqs(3, 1, url);
		});
				
		$('#faq_tab_list').on('click', '.faqLoadMore', function(){
			faqObj.load_more();
		});
		
		$('#faq_tab_list').on('click', '.document_row a', function(){
			$('.faq_view_holder').fadeIn(300);
			$(window).resize();
			faqObj.load_faq_detail($(this));
		});
		
		$('#faq_tab_list').on('click', '.faq_view_cancel_button', function(){
			$('.faq_view_holder').fadeOut(300, function(){
				$('.faq_view_holder .faq_view_title').html('');
			    $('.faq_view_holder .faq_view_image').html('');
			    $('.faq_view_holder .faq_view_detail').html('');
			    $('.faq_view_holder .model_content_text').addClass('loading_content');
			});
		});
		
		$('#faq_tab_add').on('click', '#faq_submit_button', function(){			
			var faq_data = $('#faq_add_form').serializeArray();	

			appObj.custom_ajax({
				"dataType" 		: "JSON",
				"type" 			: "POST",
				"loader"		: false,
				"url"  			: appObj.routes.add.faq,
				"data"			: faq_data,
				"customData"	: {},
				"success"		: {"faqObj" : "insert_faq_success"}
			});		
		});
		
		
	}
};

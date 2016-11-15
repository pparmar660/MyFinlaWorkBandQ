var videoObj = {
	search_text : "",
	video_country : "",
	video_region : "",
	video_zone : "",
	video_venue : "",
	category_id : "",
	download_url : "",
	download_file_name : "",
	download_type : "",
	listvideos : function(search_type, current_page, page_url){
				
		if(current_page == 1){
			var search_text = videoObj.search_text = $('.video_search_box').val();
			var video_country = videoObj.video_country = $('.video_country').val();
			var video_region = videoObj.video_region = $('.video_region').val();
			var video_zone = videoObj.video_zone = $('.video_zone').val();
			var video_venue = videoObj.video_venue = $('.video_venue').val();
			var category_id = videoObj.category_id = $('#video_tab_list ul.documents_menu li a.active').attr('data-cat');
		}else{
			var search_text = videoObj.search_text;
			var video_country = videoObj.video_country;
			var video_region = videoObj.video_region;
			var video_zone = videoObj.video_zone;
			var video_venue = videoObj.video_venue;
			var category_id = videoObj.category_id;
		}
		
		if(current_page == 1){
			$('#video_tab_list .documents_wrap').html('').addClass('loading_content');
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
		        	"video-country" : video_country,
					"video-region" : video_region,
					"video-zone" : video_zone,
					"video-venue" : video_venue,
					"category-id" : category_id
		       	};
			break;
			case 3:
				var dataToSend = {
					"type" : search_type,
		        	"video-country" : video_country,
					"video-region" : video_region,
					"video-zone" : video_zone,
					"video-venue" : video_venue,
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
				"tab" : "video"
			},
			"success"		: {"videoObj" : "load_content"},
			"error"			: {"appObj" : "list_tab_error"}
			
		});
		
	},
	load_content : function(data, param){
		var content = "";
			    	
    	$.each(data.data, function(key, value) {
			content += '<div class="document_row"><div class="icon"><a href="javascript:void(0);" data-id="'+value.id+'"><img src="'+value.icon+'" alt=""></a></div><div class="text"><h3><a href="javascript:void(0);" data-id="'+value.id+'">'+value.title+'</a></h3><p><span>'+value.date_label+'</span><span>'+value.date+'</span><span>'+value.size_label+value.size+'</span><span>'+'</span></p></div><div class="clr"></div></div>';
		});
		    	
    	if(param.current_page == 1){
			$('#video_tab_list .documents_wrap').html(content).removeClass('loading_content');
		}else{
			$('#video_tab_list .documents_wrap').append(content);
		}
		
		$('#video_tab_list .next_page_url').val(data.next_page_url);
    	$('#video_tab_list .current_page').val(data.current_page);
		$('#video_tab_list .search_type').val(param.type);
		
		if(data.next_page_url != null){
			$('#video_tab_list .videoLoadMore').show();
		}else{
			$('#video_tab_list .videoLoadMore').hide();
		}
		
		$('#video_tab_list .videoajaxloader').hide();
  	
	},
	load_more : function(){
		var next_page_url = $('#video_tab_list .next_page_url').val();
		var current_page = "";
		if(next_page_url != null ){
			var search_type = $('#video_tab_list .search_type').val();
			$('#video_tab_list .videoajaxloader').show();
			$('#video_tab_list .videoLoadMore').hide();
			videoObj.listvideos(search_type, current_page, next_page_url);
		}
	},
	load_video_detail : function($this){
		var id = $this.attr('data-id');
		
		appObj.custom_ajax({
			"dataType" 		: "JSON",
			"type" 			: "GET",
			"loader"		: false,
			"url"  			: appObj.routes.detail.video+'/'+id,
			"data"			: {},
			"customData"	: {},
			"success"		: {"videoObj" : "video_detail_success"}
		});
	},
	video_detail_success : function(data, param){
		$('.video_view_holder .video_view_title').html(data.title);
		if(data.source == 1){
			videoObj.download_url = data.download_url;
			videoObj.download_file_name = data.file_name;
			videoObj.download_type = data.type;
			videoObj.checkVideo();
		}else{
			$('.video_view_holder .video_view_detail').html(data.detail);
		}
	},
	video_detail_paint : function(){
		var fileURL = cordova.file.externalRootDirectory+"jll/videos/"+videoObj.download_file_name;
		var type = videoObj.download_type;
		$('.video_view_holder .video_view_detail').html('<video style="width:100%; height:100%;" controls><source src="'+fileURL+'" type="'+type+'"></video>');
	},
	downloadVideo: function(){
    	var fileTransfer = new FileTransfer();
		var uri = encodeURI(videoObj.download_url);
		var fileURL = cordova.file.externalRootDirectory+"jll/videos/"+videoObj.download_file_name;
		fileTransfer.download(
		    uri,
		    fileURL,
		    function(entry) {
		        $('.video_view_holder .model_content_text').removeClass('loading_content');
		        videoObj.video_detail_paint();
		    },
		    function(error) {
		        $('.video_view_holder .model_content_text').removeClass('loading_content');
		        $('.video_view_holder .video_view_detail').html('<p>Error downloading video from server. Please try again later.</p>');
		    }
		);
    },
    checkVideo: function($this){
		var local_file_URL = cordova.file.externalRootDirectory+"jll/videos/"+videoObj.download_file_name;	
		window.resolveLocalFileSystemURL(local_file_URL, videoObj.video_detail_paint, videoObj.downloadVideo);
    },
	insert_video_success : function(data, param){
		
	},
	init: function(){
		this.bind();		
	},
	bind: function(){
		
		$('#video_tab_list').on('click', '.video_search_button', function(){
			$('#video_tab_list .staff_select_wrapper select+button').parent('.col_select').find('select').multiselect("uncheckAll");
			$('#video_tab_list .documents_menu li a').removeClass('active');
			$('#video_tab_list .documents_menu li:first-child a').addClass('active');
			var url = appObj.api_url+appObj.routes.list.tab.video;
			videoObj.listvideos(1, 1, url);
		});
		
		$('#video_tab_list').on('click', '.video_filter_button', function(){
			$('#video_tab_list .video_search_box').val('');
			var url = appObj.api_url+appObj.routes.list.tab.video;
			videoObj.listvideos(2, 1, url);
		});
		
		$('#video_tab_list').on('click', 'ul.documents_menu li a', function(){
			$('#video_tab_list ul.documents_menu li a').removeClass('active');
			$(this).addClass('active');
			$('#video_tab_list .video_search_box').val('');
			var url = appObj.api_url+appObj.routes.list.tab.video;
			videoObj.listvideos(3, 1, url);
		});
				
		$('#video_tab_list').on('click', '.videoLoadMore', function(){
			videoObj.load_more();
		});
		
		$('#video_tab_list').on('click', '.document_row a', function(){
			$('.video_view_holder').fadeIn(300);
			$(window).resize();
			videoObj.load_video_detail($(this));
		});
		
		$('#video_tab_list').on('click', '.video_view_cancel_button', function(){
			$('.video_view_holder').fadeOut(300, function(){
				$('.video_view_holder .video_view_title').html('');
			    $('.video_view_holder .video_view_image').html('');
			    $('.video_view_holder .video_view_detail').html('');
			    $('.video_view_holder .model_content_text').addClass('loading_content');
			});
		});
		
		$('#video_tab_add').on('click', '#video_submit_button', function(){			
			var video_data = $('#video_add_form').serializeArray();	

			appObj.custom_ajax({
				"dataType" 		: "JSON",
				"type" 			: "POST",
				"loader"		: false,
				"url"  			: appObj.routes.add.video,
				"data"			: video_data,
				"customData"	: {},
				"success"		: {"videoObj" : "insert_video_success"}
			});		
		});
		
		
	}
};

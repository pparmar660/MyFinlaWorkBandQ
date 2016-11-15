//$(document).ready(function(){
//		
//	/*alert header Toggle*/
//	$('.message-notification').hide();
//		$('.inbox_msg').click(function(e){
//			e.preventDefault();
//			// hide all span
//			var $this = $(this).parent().find('.message-notification');
//			$(".alert_tip .message-notification").not($this).slideUp();
//			
//			// here is what I want to do
//			$this.slideToggle();
//	});
//	/*offender.html*/
//	$('.plus-view').click(function(){
//		$(this).parents('.offenders-pic').toggleClass('active');
//		$(this).parents('.vehicles-col').toggleClass('active');
//	});
//
//	/*task details v2b*/
//	$('.acc_btn').click(function(){
//		$(this).parents(".btn-group").next('.notes_aacordion').slideToggle();
//	});
//	/*incident report 16, 16b*/
//	
//	$('.info_icon').click(function(){
//		$('.prod_stock_pop_wrap').fadeIn(300);
//		$('.info_icon').fadeOut(300);
//	});
//	$('.info_open').click(function(){
//		$('.info_icon').fadeIn(300);
//	});
//	/*check box type for incident report 6 page*/
//	// $(".cb_type button").click(function(){
//	// 	$(this).toggleClass('active');
//	// });
//	// $(".rb_type .button").click(function(){
//	// 	$(this).parent('.col-4').find('.button').addClass('active');
//	// 	$(this).parent('.col-4').siblings('.col-4').find('.button').removeClass('active');
//	// });
//
//		/*footer js for mobile*/
//		
//		$('.primary-trigger').click(function() { //slide menu 
//		  $("ul.mobie-menu").slideToggle();
//		  $(".desktop-only.mobile-toggle").hide();
//		});
//		
//		
//			if ($(window).width() < 768) {
//  			$('.mobie-menu li').click(function() {
//				$('.footer-active li').empty();
//				var activeMenu = $(this).html();
//				$('.footer-active li').addClass('active').append(activeMenu);
//				$("ul.mobie-menu").slideToggle(800);
//				});
//		}
//		
//	
//
//		$('.mobile-trigger a').click(function() { //slide menu 
//		  $(".desktop-only.mobile-toggle").slideToggle();
//		  $("ul.mobie-menu").hide();
//		});
//		
//		
//		/*left navigation*/		
//		jQuery(".click-slide li a").click(function(e){
//				
//				var href = jQuery(this).attr('href');
//				if(jQuery(this).parent().hasClass('active')){
//					//console.log('hello');
//					jQuery(this).parent().removeClass('active');
//					jQuery(".side-panel").removeClass('active');
//					setTimeout(function(){
//						jQuery(href).hide();
//					},1000);
//					jQuery(".cust-overlay").fadeOut(300);
//				}
//				else{
//
//					if(jQuery(".side-panel").hasClass('active')){
//						jQuery(".cust-overlay").fadeIn(300);
//						jQuery(this).parent().siblings().removeClass('active');
//						jQuery(this).parent().addClass('active');
//						jQuery(".side-panel").addClass('active');
//						jQuery(href).siblings().hide();
//						jQuery(href).show();
//					}
//					else{
//						jQuery(".cust-overlay").fadeIn(300);
//						jQuery(this).parent().addClass('active');
//						jQuery(".side-panel").addClass('active');
//						jQuery(href).show();	
//					}
//						
//				}
//			e.preventDefault();	
//		});
//
//		jQuery(".cust-overlay").click(function(){
//			closeNav();
//		});
//		jQuery(".close-nav").click(function(e){
//			closeNav();
//			e.preventDefault();
//		});
//		
//		function closeNav(){
//			jQuery(".side-panel").removeClass('active');
//			jQuery(".click-slide li").removeClass('active');
//			setTimeout(function(){
//				jQuery(".inner-side-panel .divs").hide();	
//			} ,1000);
//			jQuery(".cust-overlay").fadeOut(300);	
//		}	
//	
//	/*left navigation end*/
//	
//	
//	
//	var h = $('.side-panel').height();
//	$(".inner-side-inner").height();
//        
//        $(".crossDiv").on("click", function() { //modelpopup hide js
//            $('.alert_pop_wrap').hide();
//        });
//
//		var header = $('#header').outerHeight() + 30;//get header height and gave same amount of padding from top of content section
//		$("#content").css("padding-top", header);
//	
//	
//	$(".ot_tip .newtip").click(function(){
//		$(this).parents('.ot_tip').find('.tooltip').fadeIn(400);	
//	});
//
//	$(".close").click(function(){
//		$(this).parents('.close-parent').fadeOut(400);
//	});
//	$(function(){
//		$('.primary-nav a').click(function(){
//			$(this).parent().addClass('active').siblings().removeClass('active')	
//		});
//	})
//	
//	$('.loading_location').percentcircle({
//					fillColor: '#f7761b'
//	});
//	$('.logout_circle').percentcircle({	
//					fillColor: '#b20000'
//	});
//	$('.loading-detail').percentcircle({
//					fillColor: '#f7761b'
//	});
//
//
//	if(Modernizr.touch){
//		$('.keypad_key').bind('touchstart touchend', function(e) {
//	        e.preventDefault();
//	        $(this).toggleClass('key_hover');
//	    });
//	}
//	else{
//		$('.keypad_key').hover(function(){    
//        	$(this).addClass("key_hover");
//        	$(this).siblings().removeClass("key_hover");
//	    },function(){
//	        $(this).removeClass("key_hover");
//	    });
//	}
//	
//	
//		/*checkbox js*/
//		$(".checkboxMe > .checkme").change(function(){
//			$(this).parent('.checkboxMe').toggleClass("checkon", this.checked);
//		});
//		$(".checkboxMe2 > .checkme2").change(function(){
//			$(this).parent('.checkboxMe2').toggleClass("checkon02", this.checked);
//			$(this).parent('.checkboxMe2').parent('.asignList').toggleClass("disabled", this.checked);
//		});
//        
//		
//	/* model popup vertically align js and inbox, message auto resize width js*/
//	$(window).resize(function() {
//		var getHeight = $(".getHeight").height();
//		var widGetAuto = $(".widGetAuto").width();
//		$(".getHeight").css('marginTop', -getHeight/2 - 50);	
//		$(".mail_main_container").width(widGetAuto - 166);
//		
//		if ($(window).width() < 992) {
//			$(".mail_main_container").width(100 + '%');
//		}  
//	});
//	$(window).resize();
//		
//		
//		
//	/*custom scroll bar*/
//	
//        $(".aoculli li a").on("click", function() {
//            var id = $(this).attr("data-related");
//            
//            $('.aoculli li span').removeClass('active');
//            $(".AOC_ContentDiv .AOC_Content" ).removeClass("displayBLock").addClass("displayNone");
//            $(this).parent('span').addClass('active');
//            $(".AOC_ContentDiv .AOC_Content[id=" + id + "]").removeClass("displayNone").addClass("displayBLock");
//        });
//		
//		$('.q-tooltip').hover(function(){			
//			$('.tooltip').fadeIn();
//		},function(){
//			$('.tooltip').fadeOut();
//				})
//
//        $(".cross").click(function(){
//        	$(this).parents(".col_4").fadeOut();
//        });
//		
//		
//		/*offenders*/
//			$('.slide-t').click(function() { //slide menu 
//			  $(".toggle-d").slideToggle();
//			});
//			
//			
//			jQuery(".filter-icon").click(function(){			
//			jQuery(this).toggleClass("filter-hovr", 2000);
//		});
//			
//						
//			/*offenders end*/
//			
//			/*employment staff directory*/
//			$('.staff_cols li a').click(function(e){
//			   $('.staff_cols li a').removeClass('active');
//				$(this).addClass('active');
//			});
//			
//			/*comms inbox*/
//			$('.checkboxMe input:checkbox').change(function(){
//				if($(this).is(":checked")) {
//					$(this).closest('.table tbody tr').addClass("active");
//				} else {
//					$(this).closest('.table tbody tr').removeClass("active");
//				}
//			});
//			
//			$(".smallCell .icon-star").click(function(){			
//				$(this).toggleClass("fa-star");
//			});
//			
//			$('.col_01 > ul li').click(function(e){
//			   $('.col_01 > ul li').removeClass('active');
//				$(this).addClass('active');
//			});
//
//			
//			
//});
//
//

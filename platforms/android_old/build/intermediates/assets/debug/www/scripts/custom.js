$(document).ready(function () {


    //    var picker = new Pikaday({
    //        field: document.getElementById('datepicker'),
    //        firstDay: 1,
    //        minDate: new Date(2000, 0, 1),
    //        maxDate: new Date(),
    //        yearRange: [2000, 2050],
    //        format: 'DD-MM-YYYY'
    //    });
    //    var picker = new Pikaday({
    //        field: document.getElementById('addOffenderdatepicker'),
    //        firstDay: 1,
    //        minDate: new Date(2000, 0, 1),
    //        maxDate: new Date(2020, 12, 31),
    //        yearRange: [2000, 2050],
    //        format: 'YYYY-MMM-DD'
    //    });
    /*alert header Toggle*/
//    $('.message-notification').hide();
	  $('body').click(function () {
		
		
		if(angular.element($("#header")).scope()){
		
		var scope=angular.element($("#header")).scope();
		if(scope.callFromHeader){
			scope.callFromHeader=false;
			return;
		}
		scope.openInbox=false;
		scope.openAlert=false;
		scope.openTask=false;
		
		}
	}); 
    /*  $('.inbox_msg').click(function (e) {
        var cur = $(this);
        e.preventDefault();
        //e.stopPropagation();
        //$(cur).parent().siblings().find('.message-notification').slideUp();  
    }); */
	
	
   /*  $('#inbox_msg2').click(function (e) {
        var cur = $(this);
        e.preventDefault();
        e.stopPropagation();
        $(cur).parent().siblings().find('.message-notification').slideUp();  
        $(cur).next().slideDown();        
        
    }); */ 
    /*  $('#inbox_msg3').click(function (e) {
        var cur = $(this);
        e.preventDefault();
        e.stopPropagation();
        $(cur).parent().siblings().find('.message-notification').slideUp();  
        $(cur).next().slideDown();        
        
    }); */
    
	
    /*offender.html*/
    $('.plus-view').click(function () {
        $(this).parents('.offenders-pic').toggleClass('active');
        $(this).parents('.vehicles-col').toggleClass('active');
    });

    /*task details v2b*/
    $('.acc_btn').click(function () {
        $(this).parents(".btn-group").next('.notes_aacordion').slideToggle();
    });
    /*incident report 16, 16b*/

    $('.info_icon').click(function () {
        $('.prod_stock_pop_wrap').fadeIn(300);
        $('.info_icon').fadeOut(300);
    });
    $('.info_open').click(function () {
        $('.info_icon').fadeIn(300);
    });
    /*check box type for incident report 6 page*/
    $(".cb_type button").click(function () {
        $(this).toggleClass('active');
    });
    $(".rb_type .button").click(function () {
        $(this).parent('.col-4').find('.button').addClass('active');
        $(this).parent('.col-4').siblings('.col-4').find('.button').removeClass('active');
    });

	
	/*  $('.primary-trigger').click(function () { //slide menu 
        $("ul.mobie-menu").slideToggle();
        $(".desktop-only.mobile-toggle").hide();
    });


    
    $('.mobie-menu li').click(function () {
		if ($(window).width() < 768) {
            $('.footer-active li').empty();
            var activeMenu = $(this).html();
            $('.footer-active li').addClass('active').append(activeMenu);
            $("ul.mobie-menu").slideToggle(800);
		}
	});
    



    $('.mobile-trigger a').click(function () { //slide menu 
        $(".desktop-only.mobile-toggle").slideToggle();
        $("ul.mobie-menu").hide();
    }); */
    /*footer js for mobile*/

    $('.primary-trigger').click(function () { //slide menu 
        $("ul.mobie-menu").slideToggle();
        //$(".desktop-only.mobile-toggle").hide();
    });


    
    $('.mobie-menu li').click(function () {
		if ($(window).width() < 768) {
            $('.footer-active li').empty();
            var activeMenu = $(this).html();
            $('.footer-active li').addClass('active').append(activeMenu);
            $("ul.mobie-menu").hide();
		}
	});
    



   // $('.mobile-trigger a').click(function () { //slide menu 
        //$(".desktop-only.mobile-toggle").slideToggle();
        //$("ul.mobie-menu").hide();
    //});


    /*left navigation*/
//    jQuery("ul.click-slide li a.links").click(function(e){
//		//alert('click');
//        var href = jQuery(this).attr('href');
//        if (jQuery(this).parent().hasClass('active')) {
//            ////console.log('hello');
//            jQuery(this).parent().removeClass('active');
//            jQuery(".side-panel").removeClass('active');
//            setTimeout(function () {
//                jQuery(href).hide();
//            }, 1000);
//            jQuery(".cust-overlay").fadeOut(300);
//        } else {
//
//            if (jQuery(".side-panel").hasClass('active')) {
//                jQuery(".cust-overlay").fadeIn(300);
//                jQuery(this).parent().siblings().removeClass('active');
//                jQuery(this).parent().addClass('active');
//                jQuery(".side-panel").addClass('active');
//                jQuery(href).siblings().hide();
//                jQuery(href).show();
//            } else {
//                jQuery(".cust-overlay").fadeIn(300);
//                jQuery(this).parent().addClass('active');
//                jQuery(".side-panel").addClass('active');
//                jQuery(href).show();
//            }
//
//        }
//        e.preventDefault();
//    });

    jQuery(".cust-overlay").click(function () {
        closeNav();
    });
    jQuery(".close-nav").click(function (e) {
        closeNav();
        e.preventDefault();
    });

    function closeNav() {
        jQuery(".side-panel").removeClass('active');
        jQuery(".click-slide li").removeClass('active');
        setTimeout(function () {
            jQuery(".inner-side-panel .divs").hide();
        }, 1000);
        jQuery(".cust-overlay").fadeOut(300);
    }

    /*left navigation end*/

    var h = $('.side-panel').height();
    $(".inner-side-inner").height();

    $(".crossDiv").on("click", function () { //modelpopup hide js
        $('.alert_pop_wrap').hide();
    });

    var header = $('#header').outerHeight() + 30; //get header height and gave same amount of padding from top of content section
    $("#content").css("padding-top", header);
    // $(".employee_wrap").css("padding-top", header);

    var header = $('#header').outerHeight() + 30; //get header height and gave same amount of padding from top of content section
    $(".securityContent").css("padding-top", header);

    $("span.ot_tip span.tooltip").hide();
    $(".ot_tip .newtip").click(function () {
        $(this).parents('.ot_tip').find('.tooltip').fadeIn(400);
    });

    $(".close").click(function () {
        $(this).parents('.close-parent').fadeOut();
    });


    /* $(function () {
        $('.primary-nav a').click(function () {
            $(this).parent().addClass('active').siblings().removeClass('active')
        });
    });
 */
    $('.loading_location').percentcircle({
        fillColor: '#f7761b'
    });
    $('.logout_circle').percentcircle({
        fillColor: '#b20000'
    });
    $('.loading-detail').percentcircle({
        fillColor: '#f7761b'
    });


    if (Modernizr.touch) {
        $('.keypad_key').bind('touchstart touchend', function (e) {
            e.preventDefault();
            $(this).toggleClass('key_hover');
        });
         /* bind events */
        // $(document)
        // .on('focus', 'input', function() {
        //     $("body").addClass('fixfixed');
        // })
        // .on('blur', 'input', function() {
        //     $("body").removeClass('fixfixed');
          
        // })
      
    }
    else {
        $('.keypad_key').hover(function () {
            $(this).addClass("key_hover");
            $(this).siblings().removeClass("key_hover");
        }, function () {
            $(this).removeClass("key_hover");
        });
    }


    /*checkbox js*/
    $(".checkboxMe > .checkme").change(function () {
        $(this).parent('.checkboxMe').toggleClass("checkon", this.checked);
    });
    $(".checkboxMe2 > .checkme2").change(function () {
        $(this).parent('.checkboxMe2').toggleClass("checkon02", this.checked);
        $(this).parent('.checkboxMe2').parent('.asignList').toggleClass("disabled", this.checked);
    });


    /* model popup vertically align js and inbox, message auto resize width js*/
		
		inboxWidth();
   
    



    /*custom scroll bar*/

    $(".aoculli li a").on("click", function () {
        var id = $(this).attr("data-related");

        $('.aoculli li span').removeClass('active');
        $(".AOC_ContentDiv .AOC_Content").removeClass("displayBLock").addClass("displayNone");
        $(this).parent('span').addClass('active');
        $(".AOC_ContentDiv .AOC_Content[id=" + id + "]").removeClass("displayNone").addClass("displayBLock");
    });

    $('.q-tooltip').hover(function () {
        $('.tooltip').fadeIn();
    }, function () {
        $('.tooltip').fadeOut();
    })

    $(".cross").click(function () {
        $(this).parents(".col_4").fadeOut();
    });


    /*offenders*/
    $('.slide-t').click(function () { //slide menu 
        $(".toggle-d").slideToggle();
    });
	$('.incident_btn_wrap .btn-block').click(function(){
		$(".toggle-d").slideUp();
		$('.filter-icon').removeClass('filter-hovr');
	});


    jQuery(".filter-icon").click(function () {
        jQuery(this).toggleClass("filter-hovr", 2000);
    });

	
	$('.mobile-trigger').click(function(){
		$(this).next().slideToggle();
	});
	
    /*offenders end*/

    /*employment staff directory*/
    $('.staff_cols li a').click(function (e) {
		e.preventDefault();
		
        $('.staff_cols li a').removeClass('active');
        $(this).addClass('active');
    });
    $('.search-icon, .se_btn, .custom-checkbox, .staff_tabs').click(function(){   
         $('.staff_cols li a').removeClass('active');
    });

    /*comms inbox*/
    $('.checkboxMe input:checkbox').change(function () {
        if ($(this).is(":checked")) {
            $(this).closest('.table tbody tr').addClass("active");
        } else {
            $(this).closest('.table tbody tr').removeClass("active");
        }
    });

    $(".smallCell .icon-star").click(function () {
        $(this).toggleClass("fa-star");
    });

    $('.col_01 > ul li').click(function (e) {
        $('.col_01 > ul li').removeClass('active');
        $(this).addClass('active');
    });

//$(document).on("click", "#ftDashbord", function () {
//    window.location.href = "dashboard.html";
//});
//$(document).on("click", "#ftSecurity", function () {
//    window.location.href = "dashboard.html#/security";
//});
//$(document).on("click", "#ftComms", function () {
//    window.location.href = "dashboard.html#/commsTasks";
//});
//
//$(document).on("click", "#ftResource", function () {
//    window.location.href = "dashboard.html#/resources";
//});
//$(document).on("click", "#ftReporting", function () {
//    window.location.href = "dashboard.html#/reporting";
//});
//$(document).on("click", "#mainDashboaPage", function () {
//    window.location.href = "dashboard.html";
//});
//$(document).on("click", "#link_1", function () {
//    window.location.href = "dashboard.html#/security";
//});

//    $("#link_2").click(function () {
//        $("#securitySidePanelController").addClass('active');
//    });
	setLoder();
});

$(window).load(function(){
	
	
	setInterval(function(){ inboxWidth() }, 1000)
	setLoder();
});
 $(window).resize(function () {
    inboxWidth();
	setLoder();
});
function inboxWidth(){
	var getHeight = $(".getHeight").height();
	var widGetAuto = $(".widGetAuto").width();
	$(".getHeight").css('marginTop', -getHeight / 2 - 18);	
}

function setLoder(){
	var header = $('#header').outerHeight();
	var footer = $('#footer').outerHeight();
	var sidePanel = $('.menu-wrapper').outerWidth();
	var popupWidht = $(window).width()-sidePanel;
	var popupHeight = $(window).height()-header-footer;

	//$('.page-loader').css({'width':popupWidht, 'height':popupHeight, 'top':header, 'left':sidePanel, 'bottom':footer });
}







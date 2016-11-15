var delay = (function(){
  var timer = 0;
  return function(callback, ms){
    clearTimeout (timer);
    timer = setTimeout(callback, ms);
  };
})();

// Find the right method, call on correct element
function launchIntoFullscreen(element) {
  if(element.requestFullscreen) {
    element.requestFullscreen();
  } else if(element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if(element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if(element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}

// Whack fullscreen
function exitFullscreen() {
  if(document.exitFullscreen) {
    document.exitFullscreen();
  } else if(document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if(document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

function change_password_validate() {
	var password_original = $("#password_original").val();
	var password_copy = $("#password_copy").val();
	
	if((password_original!="") && (password_copy!="")){
		if(password_copy == password_original) {
			$("#match_password").css("display",'none');	
			$("#password_copy").next('.check_tick').removeClass('cross_tick').addClass('right_tick');
		}else {
			$("#match_password").css("display",'block');
			$("#password_copy").next('.check_tick').removeClass('right_tick').addClass('cross_tick');
		}
	}else {
		$("#match_password").css("display",'none');
		$("#password_copy").next('.check_tick').removeClass('cross_tick').addClass('right_tick');
	}	
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function checkCurrentPassword(){
	var password_current = $('#change_password_current').val();
	var path = $('#hidden_path').val();
	
	if(password_current != ''){
		$.ajax({
			type: "POST",
			dataType:"json",
			url: path+"/ajax_action.php",
			data:{action: 'check_current_password', password_current: password_current},
			success: function(data) {
				if(data['success'] == '1') {
					$("#change_password_current").next('.check_tick').addClass('right_tick').removeClass('cross_tick');
				}else {
					$("#change_password_current").next('.check_tick').addClass('cross_tick').removeClass('right_tick');
				}
			}
		});
	}else{
		$("#change_password_current").next('.check_tick').removeClass('cross_tick').removeClass('right_tick');
	}
}

function checksecurity() {
    var str = $('#password_original').val();
    var sec_error = 0;
    
    // cond 1 : Minimum Characters: 8
    if( str.length >= 8 ){ 
    	$("#valicond1").removeClass("red").addClass("green") ; 
    }else{ 
    	$("#valicond1").removeClass("green").addClass("red") ;  
    	sec_error = 1;
    }
    
    // cond 2 : Maximum Characters: 15
    if( str.length <= 15 ){ 
    	$("#valicond2").removeClass("red").addClass("green") ; 
    }else{ 
    	$("#valicond2").removeClass("green").addClass("red") ; 
    	sec_error = 1; 
    }
    
    // c 3 : Minimum Alphabetic Characters: 5
    if( str.match(/[a-zA-Z]/g) != null ){
    	if( str.match(/[a-zA-Z]/g).length >= 5 ){ 
    		$("#valicond3").removeClass("red").addClass("green") ; 
    	}else{ 
    		$("#valicond3").removeClass("green").addClass("red") ;  
    		sec_error = 1;
    	}
    }else{ 
    	$("#valicond3").removeClass("green").addClass("red") ;
    	sec_error = 1;  
    }
    
    // c 4 : Minimum Numeric Characters 1
    if( str.match(/[0-9]/g) != null ){
    	if( str.match(/[0-9]/g).length >= 1 ){ 
    		$("#valicond4").removeClass("red").addClass("green") ; 
    	}else{ 
    		$("#valicond4").removeClass("green").addClass("red") ;
    		sec_error = 1;  
    	}
    }else{ 
    	$("#valicond4").removeClass("green").addClass("red") ; 
    	sec_error = 1; 
    }

    // c 5 : Maximum Repeated Characters: 2
    s= str.split('');
    t = {};
    flag=true;
    s.forEach( function(i){ 
      if( flag == true){ 
         if( !t[i] ){ 
              t[i] = 1; 
         }else{ 
              t[i] += 1; 
              if( t[i] > 2 ){ flag = false ; }
         }  
      } 
   	});
   	
    if( flag ){ 
    	$("#valicond5").removeClass("red").addClass("green") ; 
    }else{ 
    	$("#valicond5").removeClass("green").addClass("red") ;
    	sec_error = 1;  
    }

    patt = /["Â£%\*\(\)_¬\{\}:~\>\<\?/|\[\\\]]/g
    if( str.match(patt) === null ){ 
    	$("#valicond6").removeClass("red").addClass("green") ; 
    }else{ 
    	$("#valicond6").removeClass("green").addClass("red") ; 
    	sec_error = 1; 
    }
    
    if(sec_error == 1){
    	$("#password_original").next('.check_tick').addClass('cross_tick').removeClass('right_tick');
    }else{
    	$("#password_original").next('.check_tick').removeClass('cross_tick').addClass('right_tick');
    }

}

function checksecurityonformsubmit() {
    var str = $('#password_original').val();
    // cond 1 : Minimum Characters: 8
    if( str.length >= 8 ){ f1=true ; }else{ f1=false ;  }
    // cond 2 : Maximum Characters: 15
    if( str.length <= 15 ){ f2=true ; }else{ f2=false ;  }
    // c 3 : Minimum Alphabetic Characters: 5
    if( str.match(/[a-zA-Z]/g) != null ){
    if( str.match(/[a-zA-Z]/g).length >= 5 ){ f3=true ; }else{ f3=false ;   }
    }else{ f3=false ; }
    // c 4 : Minimum Numeric Characters 1

    if( str.match(/[0-9]/g) != null ){
    if( str.match(/[0-9]/g).length >= 1 ){ f4=true ; }else{ f4=false ;  }
    }else{ f4=false ;  }


    // c 5 : Maximum Repeated Characters: 2
    s= str.split('');
    t = {};f5=true;
    s.forEach( function(i){ 
      if( f5 == true){ 
         if( !t[i] ){ 
              t[i] = 1; 
         }else{ 
              t[i] += 1; 
              if( t[i] > 2 ){ f5 = false ; }
         }  
      } 
   })
    
    patt = /["'£%\*\(\)_¬\{\}:~\>\<\?/|\[\\\]]/g
    		if( str.match(patt) === null ){ f6 = true ; }else{ f6 = false;  }

    if( f1 && f2 && f3 && f4 && f5 && f6 ){
      return true;
    } else { return false; }
}

function sendValidate(){
	var password_current = $('#change_password_current').val();
	var password_original = $('#password_original').val();
	var password_copy = $('#password_copy').val();
	var path = $('#hidden_path').val();
	
	var success_template = `<div class="alertvalidate close-parent success">
								<span class="success-icon"></span>
								<h4>Success! Password has been changed. Now you will be redirected to login page in 10 seconds. If not, <a href="`+path+`/logout.php">click here</a> to logout.</h4>
							</div>`;
	var error_template = `<div class="alertvalidate close-parent error">
								<span class="error-icon"></span>
								<h4>Something went wrong! Please check all fields and try again.</h4>
						  </div>`;
	
	if((password_original == password_copy) && password_current != '' && password_original != '' && password_copy != ''){
		$.ajax({
			type: "POST",
			dataType:"json",
			url: path+"/ajax_action.php",
			data:{action: 'change_password', password_current: password_current, password_original: password_original, password_copy: password_copy},
			success: function(data) {
				if(data['success'] == '1') {
					$(".modal_messages").html(success_template);
					setTimeout(function(){
						window.location.href = path+'/logout.php';
					}, 10000);
				}else {
					$(".modal_messages").html(error_template);
					setTimeout(function(){
						$('.alertvalidate').remove();
					}, 5000);
				}
			}
		});
	}else{
		$(".modal_messages").html(error_template);
		setTimeout(function(){
			$('.alertvalidate').remove();
		}, 5000);
	}
}

function checkForValidation(data) {

	if (data == 'onload') {
		console.log($('#username').val());
		if ($('#username').val() != '') {
			$('#submit_btn').addClass('btn-login');
		}
	} else {
		if ($('#username').val() != '' && $('#password').val() != '') {
			$('#submit_btn').addClass('btn-login');
		} else {
			$('#submit_btn').removeClass('btn-login');
		}
	}

}

function loginCheck() {
	var path = $('#hidden_path').val();
	$.ajax({
		"dataType" : 'json',
		"type" : "POST",
		"url" : path + '/login_check.php',
		data : {
			"username" : $('#username').val(),
			"password" : $('#password').val(),
			"login_token" : $('#login_token').val()
		},
		"success" : function(jdata) {
			if (jdata['success'] == 1) {
				window.location = path;
			} else {
				$('.error_message').html(jdata['error_message']);
			}
		}
	});
	return false;
}

function checkForForgotValidation(data){
	if($('#forgot_email').val() != ''){
		$('#submit_btn').addClass('btn-login');
	}else{
		$('#submit_btn').removeClass('btn-login');
	}
}

function forgotpasswordCheck(){
	var emailf = $('#forgot_email').val();
	var path = $('#hidden_path').val();
	$.ajaxSetup({
		headers: {
		  "X-CSRFToken": $('#login_token').val()
		}
	});
	
	$.ajax({
		"dataType": 'json',
        "type": "POST",
        "url": path + '/forgot_password_check.php',
        data: { 
	        "forgot_email": $('#forgot_email').val(),
	        "CSRFtoken": $('#login_token').val()
	    },
        "success": function (jdata) {
        	if(jdata['success'] == 1){
        		
        		$('.login_profile_icon').html('<img src="images/forgot_active.png" alt="profile image">');
				
				$('.login_profile_heading').html('<h1 class="forgot_green">Reset Password Sent</h1><h2>Please check '+ emailf +'</h2>');
				
				$('.forgot_wrapper').append(`<div class="login_ag">
					<div class="btn-group action-button action-nxt icon-btn">
						<div class="wrap-btn">
							<button onclick="window.location='login.php'" class="button btn-action btn-block radius" type="button">
								<div class="v-flex">
									<span class="btn-txt">Login</span>
									<div class="circle-flex">
										<span class="s-btn-icon"><i class="fa fa-chevron-right"></i></span>
									</div>
								</div>
						   </button>
						</div>
					</div>
				</div>`);
				
				$('.login_form-wrap').hide();
				
        	}else{
        		
        		$('.error_message').html(jdata['error_message']);
        		
        	}
        	
        }
	});
	return false;
}
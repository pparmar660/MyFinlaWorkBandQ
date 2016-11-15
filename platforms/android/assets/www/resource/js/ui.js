$(document).ready(function() {
			// $('#basic-usage-demo').fancySelect();
			// $('.basic-usage-demo1').fancySelect();
   //                      $('select.fancySelectBox').fancySelect();

			// // Boilerplate
			// var repoName = 'fancyselect'

			// $.get('https://api.github.com/repos/octopuscreative/' + repoName, function(repo) {
			// 	var el = $('#top').find('.repo');

			// 	el.find('.stars').text(repo.watchers_count);
			// 	el.find('.forks').text(repo.forks_count);
			// });

			// var menu = $('#top').find('menu');

			// /* function positionMenuArrow() {
			// 	var current = menu.find('.current');

			// 	menu.find('.arrow').css('left', current.offset().left + (current.outerWidth() / 2));
			// } */

			// //$(window).on('resize', positionMenuArrow);

			// menu.on('click', 'a', function(e) {
			// 	var el = $(this),
			// 		href = el.attr('href'),
			// 		currentSection = $('#main').find('.current');

			// 	e.preventDefault();

			// 	menu.find('.current').removeClass('current');

			// 	el.addClass('current');

			// 	positionMenuArrow();

			// 	if (currentSection.length) {
			// 		currentSection.fadeOut(300).promise().done(function() {
			// 			$(href).addClass('current').fadeIn(300);
			// 		});
			// 	} else {
			// 		$(href).addClass('current').fadeIn(300);
			// 	}
			// });

			// menu.find('a:first').trigger('click')

			$(".close_btn").click(function(){
				$(this).parents(".sp_wrap").fadeOut(500);
			});
		});
		
		
		/*click to close tooltip*/	
		$(document).ready(function() {	
			/*$(".close").click(function(){
			$(this).parents('.close-parent').fadeOut();
		});*/

		  // tabbed content
			
			
	//Horizontal Tab
        // $('.parentHorizontalTab').easyResponsiveTabs({
        //     type: 'default', //Types: default, vertical, accordion
        //     width: 'auto', //auto or any width like 600px
        //     fit: true, // 100% fit in a container
        //     tabidentify: 'hor_1', // The tab groups identifier
        //     activate: function(event) { // Callback function if tab is switched
        //         var $tab = $(this);
        //         var $info = $('#nested-tabInfo');
        //         var $name = $('span', $info);
        //         $name.text($tab.text());
        //         $info.show();
        //     }
        // });	
			
	
		
	});
	

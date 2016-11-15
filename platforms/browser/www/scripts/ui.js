$(document).ready(function () {
    $(".close_btn").click(function () {
        $(this).parents(".sp_wrap").fadeOut(500);
    });
});

/*click to close tooltip*/
$(document).ready(function () {
    $(".close").click(function () {
        $(this).parents('.close-parent').fadeOut();
    });

    // tabbed content


    //Horizontal Tab
    $('.parentHorizontalTab').easyResponsiveTabs({
        type: 'default', //Types: default, vertical, accordion
        width: 'auto', //auto or any width like 600px
        fit: true, // 100% fit in a container
        tabidentify: 'hor_1', // The tab groups identifier
        activate: function (event) { // Callback function if tab is switched
            var $tab = $(this);
            var $info = $('#nested-tabInfo');
            var $name = $('span', $info);
            $name.text($tab.text());
            $info.show();
        }
    });
    
    

    
    

    /* if in accordian mode */
    $(".accordian").click(function () {
        $(".tab_content").slideUp();
        var d_activeTab = $(this).attr("rel");
        $("#" + d_activeTab).slideDown();

        $(".accordian").removeClass("accord_active");
        $(this).addClass("accord_active");

        $("ul.tabs li").removeClass("active");
        $("ul.tabs li[rel^='" + d_activeTab + "']").addClass("active");
    });
    /* Extra class "tab_last" 
     to add border to right side
     of last tab */
    $('ul.tabs li').last().addClass("tab_last");
});
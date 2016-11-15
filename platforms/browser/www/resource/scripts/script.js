var appObj = {
    api_url: "https://apitest.admin247.org/v1/", //'https://api247.org/v1/',
    routes: {
        "login": "login",
        "logout": "logout",
        "forgotPassword": "forgotPassword",
        "GetAppConfig": "GetAppConfig",
        "changePassword": "changePassword",
        "validatePassword": "validatePassword",
        "validateEmployeeReference": "validateEmployeeReference",
        "securityQuestions": "firstLoginSecurityQuestion",
        "list": {
            "tab": {
                "document": "list-documents",
                "video": "list-videos",
                "link": "list-links",
                "news": "list-news",
                "faq": "list-faqs"
            },
            "category": {
                "document": "list-document-categories",
                "video": "list-video-categories",
                "link": "list-link-categories",
                "news": "list-news-categories",
                "faq": "list-faq-categories"
            },
            "filter": {
                "countries": "list-countries",
                "regions": "list-regions",
                "zones": "list-zones",
                "venues": "list-venues",
                "access_levels": "list-access-levels"
            },
        },
        "add": {
            "document": "insertDocument",
            "video": "list-videos",
            "link": "insertLink",
            "news": "list-news",
            "faq": "list-faqs"
        },
        "detail": {
            "video": "get-video-detail",
            "news": "get-news-detail",
            "faq": "get-faq-detail"
        }
    },
    ajax_counter: "",
    onOffline: function () {
     
        if (!$('#no_internet_holder').is(':visible')) {
            $('#no_internet_overlay_holder').show();
        }
    },
    onOnline: function () {
        $('#no_internet_overlay_holder').hide();
        if ($('#no_internet_holder').is(':visible')) {
            initialise();
        }
    },
    checkConnection: function () {
        var networkState = navigator.connection.type;
        var states = {};
        states[Connection.UNKNOWN] = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI] = 'WiFi connection';
        states[Connection.CELL_2G] = 'Cell 2G connection';
        states[Connection.CELL_3G] = 'Cell 3G connection';
        states[Connection.CELL_4G] = 'Cell 4G connection';
        states[Connection.CELL] = 'Cell generic connection';
        states[Connection.NONE] = 'No network connection';

        return states[networkState];
    },
    custom_ajax: function ($param) {

        if (!("data" in $param)) {
            $param.data = "";
        }
        if (!("beforeSend" in $param)) {
            $param.beforeSend = "";
        }
        if (!("error" in $param)) {
            $param.error = "";
        }
        if (!("loader" in $param)) {
            $param.loader = true;
        }

        if ("customUrl" in $param) {
            $url = $param.customUrl;
        } else {
            $url = appObj.api_url + $param.url;
        }

        $url = $url.replace("/?", "?");
        $.ajax({
            "dataType": $param.dataType,
            "type": $param.type,
            "url": $url,
            "data": $param.data,
            "beforeSend": function (request) {
                appObj.ajax_counter++;
                var retrievedToken = localStorage.getItem('token');
                request.setRequestHeader("Authorization", "bearer " + retrievedToken);

                if ($param.loader == true) {
                    appObj.show_loader();
                }

                $.each($param.beforeSend, function (key, value) {
                    window[key][value](data, $param.customData);
                });
            },
            "complete": function () {
                appObj.ajax_counter--;
                if (appObj.ajax_counter == 0) {
                    appObj.hide_loader();
                }
            },
            "success": function (data) {
                $.each($param.success, function (key, value) {
                    window[key][value](data, $param.customData);
                });
            },
            "error": function (data) {
                $.each($param.error, function (key, value) {
                    window[key][value](data, $param.customData);
                });
            }
        });

    },
    getAppConfig: function () {

    },
    load_app_config: function (data, param) {

    },
    logout: function () {

    },
    show_loader: function () {
        $('#overlay_loader_holder').show();
    },
    hide_loader: function () {
        $('#overlay_loader_holder').hide();
    },
    logout_success: function () {
        window.location.reload(true);
    },
    load_login_error_messages: function () {

    },
    load_listing_tab: function ($this) {

        var tab = $this.attr('data-tab');
        var title = $this.attr('data-tabTitle');

        $('ul.main-menu li').removeClass('active');
        $('ul.main-menu a[data-tab="' + tab + '"]').closest('li').addClass('active');
        $('#content .layout').hide();
        $('#' + tab + '_tab_list').show();

        $('.current_tab').html(title);

        if ($('#' + tab + '_tab_list').hasClass('empty_container')) {
            $('#' + tab + '_tab_list').load("includes/" + tab + "_list.html", function () {
                $(this).removeClass('empty_container');

                $('#' + tab + '_tab_list .documents_wrap').addClass('loading_content');

                if (tab == 'document' || tab == 'video' || tab == 'link' || tab == 'news' || tab == 'faq') {

                    $.each(['countries', 'regions', 'zones', 'venues'], function (key, value) {
                        appObj.custom_ajax({
                            "dataType": "JSON",
                            "type": "GET",
                            "loader": false,
                            "url": appObj.routes.list.filter[value],
                            "customData": {
                                'tab': tab
                            },
                            "success": {"appObj": "list_" + value + "_success"}
                        });
                    });

                }

                appObj.custom_ajax({
                    "dataType": "JSON",
                    "type": "GET",
                    "loader": false,
                    "url": appObj.routes.list.category[tab],
                    "customData": {
                        'tab': tab
                    },
                    "success": {"appObj": "list_categories_success"}
                });

                appObj.custom_ajax({
                    "dataType": "JSON",
                    "type": "GET",
                    "loader": false,
                    "url": appObj.routes.list.tab[tab],
                    "customData": {
                        'tab': tab
                    },
                    "success": {"appObj": "list_tab_success"},
                    "error": {"appObj": "list_tab_error"}
                });

            });
        } else {
            $('#' + tab + '_tab_list .' + tab + 'LoadMore').hide();
            $('#' + tab + '_tab_list .documents_wrap').html('').addClass('loading_content');

            $('#' + tab + '_tab_list .staff_select_wrapper select+button').parent('.col_select').find('select').multiselect("uncheckAll");
            $('#' + tab + '_tab_list .documents_menu li a').removeClass('active');
            $('#' + tab + '_tab_list .documents_menu li:first-child a').addClass('active');
            $('#' + tab + '_tab_list .' + tab + '_search_box').val('');

            appObj.custom_ajax({
                "dataType": "JSON",
                "type": "GET",
                "loader": false,
                "url": appObj.routes.list.tab[tab],
                "customData": {
                    'tab': tab
                },
                "success": {"appObj": "list_tab_success"},
                "error": {"appObj": "list_tab_error"}
            });

        }
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    },
    headerinit: function () {
        var now = new Date();
        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        d = now.getDate();
        if (d > 3 && d < 21)
            dth = 'th'; // thanks kennebec
        dth = '';
        switch (d % 10) {
            case 1:
                dth = "st";
            case 2:
                dth = "nd";
            case 3:
                dth = "rd";
            default:
                dth = "th";
        }
        var formattedDate = days[now.getDay()] + " " + now.getDate() + dth + " " + months[now.getMonth()] + " " + now.getFullYear();
        $('.month-date').html(formattedDate);
    },
    list_countries_success: function (data, param) {
        var content = "";
        $.each(data.data, function (key, value) {
            content = content + '<option value="' + value.id_cnt + '">' + value.name_cnt + '</option>';
        });

        if (content != "") {
            $('#' + param.tab + '_tab_list .' + param.tab + '_country, #' + param.tab + '_tab_add .' + param.tab + '_country').parent('.col_select').show();

            $('#' + param.tab + '_tab_list .' + param.tab + '_country, #' + param.tab + '_tab_add .' + param.tab + '_country').html(content).multiselect({
                selectedText: "# of # selected",
                noneSelectedText: 'All Countries'
            });
        }
    },
    list_regions_success: function (data, param) {
        var content = "";
        $.each(data.data, function (key, value) {
            content = content + '<option value="' + value.id_rgs + '">' + value.name_rgs + '</option>';
        });

        if (content != "") {
            $('#' + param.tab + '_tab_list .' + param.tab + '_region, #' + param.tab + '_tab_add .' + param.tab + '_region').parent('.col_select').show();

            $('#' + param.tab + '_tab_list .' + param.tab + '_region, #' + param.tab + '_tab_add .' + param.tab + '_region').html(content).multiselect({
                selectedText: "# of # selected",
                noneSelectedText: 'All Regions'
            });

        }

    },
    list_zones_success: function (data, param) {
        var content = "";
        $.each(data.data, function (key, value) {
            content = content + '<option value="' + value.pk_zone + '">' + value.zone_name + '</option>';
        });

        if (content != "") {
            $('#' + param.tab + '_tab_list .' + param.tab + '_zone, #' + param.tab + '_tab_add .' + param.tab + '_zone').parent('.col_select').show();

            $('#' + param.tab + '_tab_list .' + param.tab + '_zone, #' + param.tab + '_tab_add .' + param.tab + '_zone').html(content).multiselect({
                selectedText: "# of # selected",
                noneSelectedText: 'All Zones'
            });
        }
    },
    list_venues_success: function (data, param) {
        var content = "";
        $.each(data.data, function (key, value) {
            content = content + '<option value="' + value.id + '">' + value.name + '</option>';
        });

        if (content != "") {
            $('#' + param.tab + '_tab_list .' + param.tab + '_venue, #' + param.tab + '_tab_add .' + param.tab + '_venue').parent('.col_select').show();

            $('#' + param.tab + '_tab_list .' + param.tab + '_venue, #' + param.tab + '_tab_add .' + param.tab + '_venue').html(content).multiselect({
                selectedText: "# of # selected",
                noneSelectedText: 'All Venues'
            });
        }
    },
    list_access_levels_success: function (data, param) {
        var content = "";
        $.each(data.data, function (key, value) {
            content = content + '<option value="' + value.id_ulv + '">' + value.level_ulv + '</option>';
        });
        $('#' + param.tab + '_tab_list .' + param.tab + '_access_level, #' + param.tab + '_tab_add .' + param.tab + '_access_level').html(content).multiselect({
            selectedText: "# of # selected",
            noneSelectedText: 'All Access Levels'
        });
    },
    list_categories_success: function (data, param) {
        var content = "<li><a class='active' href='javascript:void(0);' data-cat='0' data-tab='" + param.tab + "'>All</a></li>";
        $.each(data.data, function (key, value) {

            switch (param.tab) {
                case "document":
                    content = content + '<li><a href="javascript:void(0);" data-cat="' + value.id_dwnctg + '" data-tab="' + param.tab + '">' + value.category_dwnctg + '</a></li>';
                    break;

                case "news":
                    content = content + '<li><a href="javascript:void(0);" data-cat="' + value.id_nwsctg + '" data-tab="' + param.tab + '">' + value.category_nwsctg + '</a></li>';
                    break;

                case "video":
                    content = content + '<li><a href="javascript:void(0);" data-cat="' + value.id_vdoctg + '" data-tab="' + param.tab + '">' + value.category_vdoctg + '</a></li>';
                    break;

                case "faq":
                    content = content + '<li><a href="javascript:void(0);" data-cat="' + value.id_faqctg + '" data-tab="' + param.tab + '">' + value.category_faqctg + '</a></li>';
                    break;

                case "link":
                    content = content + '<li><a href="javascript:void(0);" data-cat="' + value.id_lksctg + '" data-tab="' + param.tab + '">' + value.category_lksctg + '</a></li>';
                    break;
            }

        });
        $('#' + param.tab + '_tab_list .documents_menu').html(content);
    },
    list_tab_success: function (data, param) {
        var content = "";
        $.each(data.data, function (key, value) {

            switch (param.tab) {
                case "document":
                    content += '<div class="document_row"><div class="icon"><a class="downloadFile" data-private="' + value.private_dwn + '" data-url="' + value.url + '" data-file="' + value.file_dwn + '" href="javascript:void(0);"><img src="' + value.icon + '" alt=""></a></div><div class="text"><h3><a class="downloadFile" data-url="' + value.url + '" data-file="' + value.file_dwn + '" href="javascript:void(0);">' + value.title + '</a></h3><p><span>' + value.date_label + '</span><span>' + value.date + '</span><span>' + value.size_label + '</span><span>' + value.size + '</span></p></div><div class="clr"></div></div>';
                    break;

                case "news":
                    content += '<div class="document_row"><div class="icon"><a href="javascript:void(0);" data-id="' + value.id + '"><img src="' + value.icon + '" alt=""></a></div><div class="text"><h3><a href="javascript:void(0);" data-id="' + value.id + '">' + value.title + '</a></h3><p><span>' + value.label + '</span><span>' + value.date + '</span></p></div><div class="clr"></div></div>';
                    break;

                case "video":
                    content += '<div class="document_row"><div class="icon"><a href="javascript:void(0);" data-id="' + value.id + '"><img src="' + value.icon + '" alt=""></a></div><div class="text"><h3><a href="javascript:void(0);" data-id="' + value.id + '">' + value.title + '</a></h3><p><span>' + value.date_label + '</span><span>' + value.date + '<span>' + value.size_label + '</span><span>' + value.size + '</span></p></div><div class="clr"></div></div>';
                    break;

                case "faq":
                    content += '<div class="document_row"><div class="icon"><a href="javascript:void(0);" data-id="' + value.id + '"><img src="' + value.icon + '" alt=""></a></div><div class="text"><h3><a href="javascript:void(0);" data-id="' + value.id + '">' + value.title + '</a></h3><p><span>' + value.label + '</span><span>' + value.date + '</span></p></div><div class="clr"></div></div>';
                    break;

                case "link":
                    content += '<div class="document_row"><div class="icon"><a onclick="window.open(\'' + value.url_lks + '\', \'_system\');" href="javascript:void(0);"><img src="' + value.image_lks + '" alt=""></a></div><div class="text"><h3><a onclick="window.open(\'' + value.url_lks + '\', \'_system\');" href="javascript:void(0);">' + value.title_lks + '</a></h3><p><span>' + value.label + '</span><span>' + value.dateadded_lks + '</span></p></div><div class="clr"></div></div>';
                    break;
            }

        });

        $('#' + param.tab + '_tab_list .documents_wrap').html(content).removeClass('loading_content');
        $('#' + param.tab + '_tab_list .next_page_url').val(data.next_page_url);
        $('#' + param.tab + '_tab_list .current_page').val(data.current_page);
        $('#' + param.tab + '_tab_list .search_type').val(3);

        if (data.next_page_url != null) {
            $('#' + param.tab + '_tab_list .' + param.tab + 'LoadMore').show();
        } else {
            $('#' + param.tab + '_tab_list .' + param.tab + 'LoadMore').hide();
        }

    },
    list_tab_error: function (data, param) {
        var dat = data.responseJSON;
        var content = '<div style="width: 100%; text-align: center; font-size: 24px;">' + dat.error + '</div>';
        $('#' + param.tab + '_tab_list .documents_wrap').html(content).removeClass('loading_content');
        $('#' + param.tab + '_tab_list .' + param.tab + 'LoadMore').hide();
    },
    load_adding_tab: function ($this) {
        var tab = $this.attr('data-tab');

        $('ul.main-menu li').removeClass('active');
        $('ul.main-menu a[data-tab="' + tab + '"]').closest('li').addClass('active');
        $('#content .layout').hide();
        $('#' + tab + '_tab_add').show();

        if ($('#' + tab + '_tab_add').hasClass('empty_container')) {
            $('#' + tab + '_tab_add').load("includes/" + tab + "_add.html", function () {
                $(this).removeClass('empty_container');


                if (tab == 'document' || tab == 'video' || tab == 'link' || tab == 'news' || tab == 'faq') {

                    $.each(['countries', 'regions', 'zones', 'venues', 'access_levels'], function (key, value) {
                        appObj.custom_ajax({
                            "dataType": "JSON",
                            "type": "GET",
                            "loader": false,
                            "url": appObj.routes.list.filter[value],
                            "customData": {
                                'tab': tab
                            },
                            "success": {"appObj": "list_" + value + "_success"}
                        });
                    });

                    $('#' + tab + '_tab_add .datepicker').datepicker({
                        changeMonth: true,
                        changeYear: true,
                        dateFormat: 'dd-mm-yy'
                    });

                }

            });
        }

        document.body.scrollTop = document.documentElement.scrollTop = 0;

    },
    dashboardCallback: function () {
        $('.logged_in_user').html(localStorage.getItem("loginUsername"));
    },
    init: function () {

        $('*[data-include]').each(function () {
            var $this = $(this);
            var file = $this.attr('data-include');
            $(this).load(file, function () {
                if ($this.attr('data-callback')) {
                    if ($this.attr('data-callback') != "") {
                        appObj[$this.attr('data-callback')]()
                    }
                }
            });
        });

        this.bind();
    },
    bind: function () {

        $("form").bind("keypress", function (event) {
            if (event.which == 13) {
                if (event.target.nodeName != 'TEXTAREA') {
                    document.activeElement.blur();
                    event.preventDefault();
                    return false;
                }
            }
        });

        $('.side-panel').on('touchstart, click', 'li a', function () {
            appObj.load_listing_tab($(this));
        });

        $('.page').on('touchstart, click', '.list_button', function () {
            appObj.load_listing_tab($(this));
        });

        $('.page').on('touchstart, click', '.add_button', function () {
            appObj.load_adding_tab($(this));
        });
        $('.page').on('touchstart click', 'a[href!="javascript:void(0);"]', function () {
            window.open($(this).attr('href'), '_self');
        });

        $('.page').on('touchstart, click', '.filter_show_hide_button', function () {
            var $this = $(this);
            $this.prev('.staff_select_wrapper').slideDown();
            $this.addClass('filter_hide_button').removeClass('filter_show_button');
        });


    }
};
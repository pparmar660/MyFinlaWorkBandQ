BandQModule.service("appMenuConfig", function () {
    var section_menu ;
    var module_menus;
    
    this.setAppMenuConfig = function () {
        dataBaseObj.getDatafromDataBase("SELECT * FROM " + TABLE_APP_MENU_CONFIG, function (result) {
            section_menu = angular.copy(result.section_menue);
            module_menus = angular.copy(result.module_menue);
            //console.log("section_menu : "+JSON.stringify(section_menu));
        }, true);
    };
    this.getAppMenuConfig = function () {
        
        return section_menu;
    };
    
    this.getModuleMenus = function(){
         if(!module_menus){
             this.setAppMenuConfig();
             return false;
         }
        return module_menus;
    };
});


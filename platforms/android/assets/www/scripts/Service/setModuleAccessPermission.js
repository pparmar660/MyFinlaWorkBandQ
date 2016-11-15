BandQModule.service("moduleAccessPermission", function () {

    var permissions = {
        1: "Full Access",
        2: "Manage",
        3: "Read Only",
        4: "No Access"
    };
    var NEWS_MANAGER = 5,
            FAQ_MANAGER = 8,
            LINKS_MANAGER = 10,
            DOCUMENTS_LIBRARY = 11,
            VIDEO_GALLERIES_MANAGER = 17,
            VENUES_MANAGER = 33,
            ALERT_NOTIFICATION = 35,
            VICTIM_WITNESS = 257,
            OFFENDER = 258,
            STAFF = 145,
            STAFF_INMAIL = 203,
            TASK_CHECKLISTS = 204,
            INCIDENT_REPORTS = 213,
            COMMS = 249,
            VEHICLE_TRACKING = 265,
            MY_PROFILE = 272;
    var module_permissions = {};


    this.setModuleAccess = function () {
        //console.log("modules_permission : " + JSON.stringify(modules_permission));
        dataBaseObj.getDatafromDataBase("SELECT * FROM " + TABLE_USER_INFO, function (result) {
            var modulesPermission = result.app_access_restrictions_user;

            angular.forEach(modulesPermission, function (val, key) {
                //console.log("KEY : " + key + ">>Value : " + val);
                if (key == NEWS_MANAGER) {
                    module_permissions.newsManager = permissions[val];
                }
                else if (key == FAQ_MANAGER) {
                    module_permissions.faqManager = permissions[val];
                }
                else if (key == LINKS_MANAGER) {
                    module_permissions.linksManger = permissions[val];
                }
                else if (key == DOCUMENTS_LIBRARY) {
                    module_permissions.documentsLibrary = permissions[val];
                }
                else if (key == VIDEO_GALLERIES_MANAGER) {
                    module_permissions.videoGalleriesManager = permissions[val];
                }
                else if (key == VENUES_MANAGER) {
                    module_permissions.venuesManager = permissions[val];
                }
                else if (key == ALERT_NOTIFICATION) {
                    module_permissions.alertNotification = permissions[val];
                }
                else if (key == VICTIM_WITNESS) {
                    module_permissions.victimWitness = permissions[val];
                }
                else if (key == OFFENDER) {
                    module_permissions.offender = permissions[val];
                }
                else if (key == STAFF) {
                    module_permissions.staff = permissions[val];
                }
                else if (key == STAFF_INMAIL) {
                    module_permissions.inMail = permissions[val];
                }
                else if (key == TASK_CHECKLISTS) {
                    module_permissions.taskChecklists = permissions[val];
                }
                else if (key == INCIDENT_REPORTS) {
                    module_permissions.incidentReport = permissions[val];
                }
                else if (key == COMMS) {
                    module_permissions.comms = permissions[val];
                }
                else if (key == VEHICLE_TRACKING) {
                    module_permissions.vehicle = permissions[val];
                }
                else if (key == MY_PROFILE) {
                    module_permissions.myProfile = permissions[val];
                }
            });
            //console.log("module_permissions : " + JSON.stringify(module_permissions));
        }, true);


    };
    this.getModulePermission = function(){
          if(!module_permissions){
             this.setModuleAccess();
             return false;
         }
        return module_permissions;
    };
});
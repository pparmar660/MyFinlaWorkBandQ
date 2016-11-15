//alert('ps');
BandQModule.service("permissionService", function () {

    var initCounter = 0;
    var raw_data = [];
    var access = -1; // 1 ( Full Access ), 2 ( View ), 3 ( Edit ) , 4 ( No Access)

    this.init = function(page_id, action, callback) {
//        //console.log('permission access init');
//        if (initCounter == 0) {
        if(initCounter > 0) return;
            var getQuestionQuery = "SELECT * from " + TABLE_USER_INFO;
            dataBaseObj.getDatafromDataBase(getQuestionQuery, function (result) {
//                //console.log("Permission Service::: "+result);
                raw_data = result.app_access_restrictions_user;
//                //console.log(raw_data);
                initCounter++;
                callback(checkAction(page_id, action))
//                accessResolver();
            }, function (error) {
                //console.log(error.message);
            });

    };

    this.checkAccess = function (page_id) {
        
        if (initCounter == 0) {
            return init();
        } else {
            return accessResolver();
        }
    }
    
    var checkAction = function(page_id, action){
     
        access = raw_data[page_id];
//        accessResolver();
//        //console.log("access : "+access);
        
        switch(action){
            case 'add':
                if(access == 1 || access == 2) return true;
                else    return false;
                break;
            
            case 'edit':
                if(access == 1 || access == 2) return true;
                else    return false;
                break;
            
            case 'delete':
                if(access == 1 || access == 2) return true;
                else    return false;
                break;
            
            case 'view':
                if(access == 1 || access == 2 || access == 4) return true;
                else    return false;
                break;
            
            default :
                return false;
                break;
        }
    }

});
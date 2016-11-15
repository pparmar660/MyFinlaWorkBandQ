BandQModule.service('TaskAndCheckList', function ($http) {

    this.getTaskList = function (module, userid, callback) {
        var moduleID = getModuleIdByModule(module);
        var URL = constanObject.TASK_CHECKLIST + moduleID + "/" + userid;
        webRequestObject.postRequest(this, "GET", URL,null, 10111, true);
        this.webRequestResponse = function (requestType, status, response) {
            if (status == constanObject.ERROR) {
                return callback(false, JSON.parse(response.responseText).error);
            }
            switch (requestType) {
                case 10111:
                    {
                        var data=response.data;
                        data.forEach(function(obj){
                            obj.image=getImageFromType(obj.type);
                        });
                        callback(true, data);
                    }

                    break;
            }
        };
        
    function getImageFromType(type) {
            switch (type) {
                case "Overdue":
                    return "images/icons/tasks-overdue.png";
                    break;
                case "Pending":
                    return "images/icons/tasks-pending.png";
                    break;
                case "Completed":
                    return "images/icons/tasks-completed.png";
                    break;
                case "In Progress":
                    return "images/icons/tasks-complete.png";
                    break;
                    default :
                        return null;
                    break;

            }
        }

        function getModuleIdByModule(modeleName) {
            switch (modeleName) {
                case "Incident":
                    return "213";
                    break;
                case "Offender":
                    return "258";
                    break;
                case "Vehicle":
                    return "265";
                    break;
                case "Victims & Witness":
                    return "257";
                    break;

            }
        }

    };

});
BandQModule.controller("taskAndCheckList", function ($scope, $rootScope, checkInternetConnectionService, imageService) {

    webRequestObject = new WebRequestApi();
    $scope.tasks = [];
    $scope.taskDetails = null;
    $scope.taskCount = 0;
    $scope.venueList = [];
    var isLoading = true;
    $scope.taskIcon = null;
    $scope.isTaskDetails = false;
    $scope.isTaskMandatory = false;
    $scope.isAddComms = false;
    $scope.showErrorNotePopUp = false;
    $scope.currentTask = null;
    $scope.isNotePopUp = false;
    $scope.comms = [];
    $scope.ListStaff = [];
    $scope.isNoteDesc = false;
    $scope.isDeadLine = false;
    $scope.isRemind = false;
    $scope.isWith = false;
    $scope.isPhotoLibrary = false;
    $scope.isDuration = false;
    $scope.isMethod = false;
    $scope.isCameraOption = false;
    $scope.notes = {};
    $scope.CommsImages = [];
    var row_id = 0;
    var moduleId = 204;
    $scope.isUploadSuccess = false;
    $scope.commsNote = [];
    $scope.staffImage = "";
    $scope.internetConnection = false;
    $scope.isCompletedTask = false;
    $scope.isTaskAndCheckListMain = false;
    //$scope.completedTime = null;
    $scope.searchText = "";
    $scope.venue_id = "";
    $scope.taskOwner = localStorage.getItem("loginUsername");
    $scope.isNoInterStrip = false;
    $scope.isOnlineForm = false;
    var search = {task_search: $scope.searchText, venue: ""};
    $scope.myOptions = [
//        {
//            name: 'option #1',
//            value: 0
//        },
//        {
//            name: 'option #2',
//            value: 1
//        }
    ];
    $scope.errorMsg = null;
    $scope.init = function () {
        $rootScope.menuTitle = 'Comms & Tasks';
        $rootScope.subMenuTitle = 'Tasks & Checklists';
        $rootScope.subMenuTitle1 = '';
        $rootScope.calssSet = true;
        $rootScope.homeClass = "";
        $rootScope.inboxClass = "";
        $rootScope.alertAndNotificationClass = "";
        $rootScope.commsClass = "";
        $rootScope.taskAndCheckListClass = "active";
        if (!checkInternetConnectionService.checkNetworkConnection()) {
            $scope.internetConnection = true;
            $scope.isTaskAndCheckListMain = false;
            return;
        } else {
            $scope.internetConnection = false;
            $scope.isTaskAndCheckListMain = true;
            $scope.staffImage = constanObject.GetStaffImage + localStorage.getItem("userId") + "/1";
            $scope.getVenueList();
            $scope.getAllTask();
            $scope.getTaskCount();
        }

    };
    $scope.getAllTask = function () {
        if (!checkInternetConnectionService.checkNetworkConnection()) {
            $scope.isNoInterStrip = true;
            return;
        }
        $scope.isNoInterStrip = false;
        $scope.isTaskDetails = false;
        $("#myTaskTab").addClass("active");
        $("#completedTaskTab").removeClass("active");
        $("#overdueTaskTab").removeClass("active");
        webRequestObject.postRequest($scope, "GET", constanObject.getTaskList, null, constanObject.CommsAndTaskWebRequestType.TaskList, isLoading);
    };

    $scope.getPendingTask = function () {
        if (!checkInternetConnectionService.checkNetworkConnection()) {
            $scope.isNoInterStrip = true;
            return;
        }
        $scope.isNoInterStrip = false;
        webRequestObject.postRequest($scope, "GET", constanObject.getPendingTask, null, constanObject.CommsAndTaskWebRequestType.PendingTask, isLoading);
    };

    $scope.getCompletedTask = function () {
        if (!checkInternetConnectionService.checkNetworkConnection()) {
            $scope.isNoInterStrip = true;
            return;
        }
        $scope.isNoInterStrip = false;
        $scope.isTaskDetails = false;
        $("#myTaskTab").removeClass("active");
        $("#completedTaskTab").addClass("active");
        $("#overdueTaskTab").removeClass("active");
        webRequestObject.postRequest($scope, "GET", constanObject.getCompleteTask, null, constanObject.CommsAndTaskWebRequestType.CompleteTask, isLoading);
    };

    $scope.getOverdueTask = function () {
        if (!checkInternetConnectionService.checkNetworkConnection()) {
            $scope.isNoInterStrip = true;
            return;
        }
        $scope.isNoInterStrip = false;
        $scope.isTaskDetails = false;
        $("#myTaskTab").removeClass("active");
        $("#completedTaskTab").removeClass("active");
        $("#overdueTaskTab").addClass("active");
        webRequestObject.postRequest($scope, "GET", constanObject.getOverdueTask, null, constanObject.CommsAndTaskWebRequestType.OverdueTask, isLoading);
    };

    $scope.getTaskCount = function () {
        if (!checkInternetConnectionService.checkNetworkConnection()) {
            $scope.isNoInterStrip = true;
            return;
        }
        $scope.isNoInterStrip = false;
        webRequestObject.postRequest($scope, "GET", constanObject.getTaskCount, null, constanObject.CommsAndTaskWebRequestType.TaskCount, isLoading);
    };

    $scope.getTaskDetails = function (task_id) {
        if (!checkInternetConnectionService.checkNetworkConnection()) {
            $scope.isNoInterStrip = true;
            return;
        }
        $scope.isNoInterStrip = false;
        webRequestObject.postRequest($scope, "GET", constanObject.getTaskDetails + "" + task_id, null, constanObject.CommsAndTaskWebRequestType.TaskDetails, isLoading);
    };

    $scope.getVenueList = function () {
        if (!checkInternetConnectionService.checkNetworkConnection()) {
            $scope.isNoInterStrip = true;
            return;
        }
        $scope.isNoInterStrip = false;
        webRequestObject.postRequest($scope, "GET", constanObject.getVenueList, null, constanObject.CommsAndTaskWebRequestType.VenueList, isLoading);
    };

    $scope.init();



    $scope.getVenue = function (selectedVenue) {
        if (!checkInternetConnectionService.checkNetworkConnection()) {
            $scope.isNoInterStrip = true;
            return;
        }
        $scope.isNoInterStrip = false;
        //console.log("selectedVenue : " + JSON.stringify(selectedVenue));
        $scope.venue_id = selectedVenue.id;
        search = {task_search: $scope.searchText, venue: $scope.venue_id};
        getTaskByVenue(search);
    };

    var getCommsDetails = function (rowId) {
        if (!checkInternetConnectionService.checkNetworkConnection()) {
            $scope.isNoInterStrip = true;
            return;
        }
        $scope.isNoInterStrip = false;
        webRequestObject.postRequest($scope, "GET", constanObject.GetCommsDetails + moduleId + "/" + rowId,
                null, constanObject.CommsAndTaskWebRequestType.CommsDetails, true);
    };
    $scope.addnote = {};
    $scope.showAddNotePopup = function (taskDetails) {
        if (!checkInternetConnectionService.checkNetworkConnection()) {
            $scope.isNoInterStrip = true;
            return;
        }

        $scope.ListStaff = new Array();
        $scope.addnote.selectedMethod = new Array();
        $scope.addnote.selectedStaff = new Array();
        $scope.notes.note_type_jnt = 0;

        $scope.isNoInterStrip = false;
        //console.log("taskDetails : " + JSON.stringify(taskDetails));
        $scope.selectedStaff = [];
        row_id = taskDetails.overview.task_id;
        //console.log("row_id : " + row_id);
        var url = constanObject.CommsConfig + moduleId + "/" + row_id;
        //function(classObject,type,webUrl,parameters,requestType,showProgress)
        webRequestObject.postRequest($scope, "GET", constanObject.ListStaff, null, constanObject.CommsAndTaskWebRequestType.ListStaff, true);
        webRequestObject.postRequest($scope, "GET", url, null, constanObject.CommsAndTaskWebRequestType.CommsConfigType, true);

        //$scope.isNotePopUp = true;
    };

    $scope.hideAddNotePopup = function () {
        $scope.isNotePopUp = false;
    };
    $scope.methodChange = function (method) {
        //console.log("Method : " + JSON.stringify(method));
       // $scope.$apply(function () {
            $scope.notes = {};
            $scope.isNoteDesc = method.detail == 1 ? true : false;
            $scope.isDeadLine = method.deadline == 1 ? true : false;
            $scope.isRemind = method.remind_me == 1 ? true : false;
            $scope.isWith = method.opt_with == 1 ? true : false;
            $scope.isPhotoLibrary = method.attachments == 1 ? true : false;
            $scope.isDuration = method.duration == 1 ? true : false;
            $scope.notes.note_type_jnt = method.id_comms;
       // });
    };

    $scope.staffChange = function (staff) {
        if (!checkInternetConnectionService.checkNetworkConnection()) {
            $scope.isNoInterStrip = true;
            return;
        }
        $scope.isNoInterStrip = false;
        $scope.notes.tagged_user = [];
        $scope.$apply(function () {
            if (staff.length > 1) {
                for (var i = 0; i < staff.length; i++) {

                    $scope.notes.tagged_user.push(staff[i].id_usr);

                }

            } else {
                $scope.notes.tagged_user.push(staff[0].id_usr);
            }
        });

        //console.log("Selected Staff : " + JSON.stringify(staff));


    };
    $scope.closeSuccess = function () {
        $scope.isSuccess = false;
    };
    $scope.uploadImage = function () {
        $scope.CommsImages = [];
        $scope.isCameraOption = true;
    };
    $scope.closeNoInternetStrip = function () {
        $scope.isNoInterStrip = false;
    };

    $scope.openCamera = function () {

        imageService.getCameraImage(function (item) {
            uploadPhoto(item);
        });
        $scope.isCameraOption = false;
    };

    $scope.openGallery = function () {

        imageService.getMediaImage(function (item) {
            uploadPhoto(item);
        });
        $scope.isCameraOption = false;
    };
    $scope.closeCameraOption = function () {
        $scope.isCameraOption = false;
    };
    function uploadPhoto(imageURI) {
        //console.log("imageURI : " + imageURI);
        $scope.isUploadSuccess = true;
        var arr = imageURI.src.split("/");
        var name = arr[arr.length - 1];
        $scope.$apply(function () {
            $scope.CommsImages.push({name: name, url: imageURI.src});
        });
        hideUploadSuccessMsg();
    }
    function hideUploadSuccessMsg() {
        $timeout(function () {
            $scope.isUploadSuccess = false;
        }, 5000);
    }

    $scope.AddNote = function () {
        if (!checkInternetConnectionService.checkNetworkConnection()) {
            $scope.isNoInterStrip = true;
            return;
        }
        $scope.isNoInterStrip = false;
        $scope.notes.module_id = moduleId;
        $scope.notes.id_jno_jnt = row_id;
        $scope.notes.id_usr_jnt = localStorage.getItem("userId");
        $scope.notes.note_by = localStorage.getItem("userId");
        $scope.notes.latitude = CURRENT_LATITUDE;
        $scope.notes.longitude = CURRENT_LONGITUDE;
        //console.log("Add Note Data : " + JSON.stringify($scope.notes));
        webRequestObject.postRequestJSON($scope, "POST", constanObject.InsertComms, JSON.stringify($scope.notes), constanObject.CommsAndTaskWebRequestType.AddComms, true);
    };

    $scope.taskSearch = function () {
        if (!checkInternetConnectionService.checkNetworkConnection()) {
            $scope.isNoInterStrip = true;
            return;
        }
        $scope.isNoInterStrip = false;
        //console.log("searchText : " + $scope.searchText);
        search = {task_search: $scope.searchText, venue: $scope.venue_id};
        getTaskByVenue(search);
    };

    function getTaskByVenue(searchParam) {
        if (!checkInternetConnectionService.checkNetworkConnection()) {
            $scope.isNoInterStrip = true;
            return;
        }
        $scope.isNoInterStrip = false;
        webRequestObject.postRequestJSON($scope, "GET", constanObject.getTaskList, searchParam, constanObject.CommsAndTaskWebRequestType.TaskList, true);
    }
    ;

    function getIcon(data) {
        for (var i = 0; i < data.length; i++) {
            if (data[i].type == "Overdue") {
                $scope.tasks[i].icon = "images/icons/tasks-overdue.png";
            } else if (data[i].type == "Pending") {
                $scope.tasks[i].icon = "images/icons/tasks-pending.png";
            } else if (data[i].type == "Completed") {
                $scope.tasks[i].icon = "images/icons/tasks-completed.png";
            } else if (data[i].type == "In Progress") {
                $scope.tasks[i].icon = "images/icons/tasks-complete.png";
            } else {
                $scope.tasks[i].icon = null;
            }
        }
        ////console.log("GET ICON : " + JSON.stringify($scope.tasks));
    }
    function getClass(data) {
        for (var i = 0; i < data.length; i++) {
            if (data[i].type == "Completed") {
                $scope.tasks[i].disabledClass = "disabled";
            } else {
                $scope.tasks[i].disabledClass = null;
            }
        }
    }
    $scope.formName = "";
    $scope.formFields = [];
    $scope.inputModel = {
        answer: [],
        field_type: "",
        field_id: "",
        placeholder: ""
    };
    $scope.textAriaModel = {
        answer: [],
        field_type: "",
        field_id: "",
        placeholder: ""
    };
    $scope.chkModel = {
        field_type: "",
        label: "",
        options: []
    };
    $scope.radioModel = {
        field_type: "",
        label: "",
        options: []
    };
    $scope.selection = [];

    var onLineFormRequest = {};
    var input = {};
    var textArea = {};
    var select = {};
    var chkBox = {
        answer: []
    };
    var radioBtn = {
        answer: []
    };

    $scope.selectBox = {
        answer: [],
        field_type: "",
        field_id: "",
        options: []
    };

    $scope.toggleSelection = function toggleSelection(value) {

        var idx = $scope.selection.indexOf(value);

        // is currently selected
        if (idx > -1) {
            $scope.selection.splice(idx, 1);
        }

        // is newly selected
        else {
            $scope.selection.push(value);
        }
        //console.log("$scope.selection : " + $scope.selection);
    };

    var taskId = 0;
    var isForm = false;
    function setOnlineFormData(formData, task_id, isOnlineForm) {
        $scope.selectBox.answer = {};
        $scope.inputModel.answer = {};
        $scope.textAriaModel = {};
        $scope.chkModel = {};

        taskId = task_id;
        isForm = isOnlineForm;
        onLineFormRequest.task_id = task_id;
        if (isOnlineForm != 0) {
            $scope.formName = formData.title;

            $scope.formFields = formData.fields;
            angular.forEach($scope.formFields, function (obj) {
                if (obj.field_type == "select") {
                    $scope.selectBox.answer = [];
                    $scope.selectBox.field_type = obj.field_type;
                    $scope.selectBox.field_id = obj.field_id;
                    $scope.selectBox.options = obj.options;
                    $scope.selectBox.label = obj.label;
                    select.field_id = obj.field_id;
                    $scope.selectBox.answer = obj.answer;
//                    angular.forEach(obj.answer,function(val){
//                        $scope.selectBox.answer.push(parseInt(val.keyval));
//                    });
                    console.log("$scope.selectBox.answer : " + JSON.stringify($scope.selectBox.answer));
                } else if (obj.field_type == "input") {
                    $scope.inputModel.field_type = obj.field_type;
                    $scope.inputModel.placeholder = obj.label;
                    $scope.inputModel.answer = obj.answer;
                    $scope.inputModel.field_id = obj.field_id;
                    input.field_id = obj.field_id;
                } else if (obj.field_type == "textarea") {
                    $scope.textAriaModel.field_type = obj.field_type;
                    $scope.textAriaModel.placeholder = obj.label;
                    $scope.textAriaModel.answer = obj.answer;
                    textArea.field_id = obj.field_id;
                    //textArea.answer = $scope.textAreaAnswer;
                } else if (obj.field_type == "checkbox") {
                    $scope.selection = [];
                    $scope.chkModel.field_type = obj.field_type;
                    $scope.chkModel.label = obj.label;
                    $scope.chkModel.options = obj.options;
                    chkBox.field_id = obj.field_id;
                    // $scope.selection = obj.answer;
                    angular.forEach(obj.answer, function (val) {
                        $scope.selection.push(val.keyval);
                    });
                    console.log("$scope.selection: " + JSON.stringify($scope.selection));

                } else if (obj.field_type == "radio") {
                    $scope.radioModel.field_type = obj.field_type;
                    $scope.radioModel.label = obj.label;
                    $scope.radioModel.options = obj.options;
                    if (obj.answer.length > 0) {
                        $scope.radioModel.answer = obj.answer[0].keyval;
                    }
                    radioBtn.field_id = obj.field_id;
                }
            });
        } else {

        }
    }
    $scope.optionChange = function (obj) {
        console.log("obj : " + JSON.stringify(obj));
        $scope.selectBox.answer = obj;
    };
    $scope.getRadioAnswer = function (obj) {
        $scope.radioAnswer = obj;
    };
    $scope.formStatus = function (status, currentTaskId) {
        $scope.currentTask = currentTaskId;
        onLineFormRequest.form_status = status;
        onLineFormRequest.form_response = [];
        if (isForm) {
            select.answer = $scope.selectBox.answer;
            input.answer = $scope.inputModel.answer;
            textArea.answer = $scope.textAriaModel.answer;
            chkBox.answer = [];
            radioBtn.answer = [];
            angular.forEach($scope.chkModel.options, function (obj) {
                angular.forEach($scope.selection, function (val) {
                    if (obj.keyval == val) {
                        chkBox.answer.push(obj);
                    }
                });
            });

            angular.forEach($scope.radioModel.options, function (obj) {
                if (obj.keyval == $scope.radioModel.answer) {
                    radioBtn.answer.push(obj);
                }
            });
            onLineFormRequest.form_response.push(input);
            onLineFormRequest.form_response.push(select);
            onLineFormRequest.form_response.push(textArea);
            onLineFormRequest.form_response.push(radioBtn);
            onLineFormRequest.form_response.push(chkBox);
        }


        //console.log("onLineFormRequest : " + JSON.stringify(onLineFormRequest));
        webRequestObject.postRequestJSON($scope, "POST", constanObject.updateOnLineForm + taskId, JSON.stringify(onLineFormRequest), constanObject.CommsAndTaskWebRequestType.OnLineFormUpdate, true);
    };
    $scope.webRequestResponse = function (requestType, status, responseData) {
        if (status == constanObject.ERROR) {
            if (requestType == constanObject.CommsAndTaskWebRequestType.CommsConfigType)
                $scope.showErrorNotePopUp = true;
            else
                $scope.showErrorNotePopUp = false;
            if (responseData.responseJSON.error == "No Results Found.") {
                $scope.$apply(function () {
                    $scope.tasks = [];
                    $scope.errorMsg = responseData.responseJSON.error;
                });

            } else {
                $scope.$apply(function () {
                    $scope.commsNote = [];
                    $scope.errorMsg = responseData.responseJSON.error;
                });

            }
            return;

        }

        switch (requestType) {
            case constanObject.CommsAndTaskWebRequestType.TaskList:
                $scope.tasks = [];
                $scope.isTaskDetails = false;
                $("#myTaskTab").addClass("active");
                $("#completedTaskTab").removeClass("active");
                $("#overdueTaskTab").removeClass("active");
                $scope.$apply(function () {
                    $scope.isTaskDetails = false;
                    $scope.tasks = responseData.data;

                    getIcon($scope.tasks);
                    getClass($scope.tasks);

                });

                if (localStorage.getItem("headerMessageType") == 'tasks') {
                    $scope.getTaskDetails(localStorage.getItem("headerMessageId"));
                } else if (localStorage.getItem("moduleId") == 204) {
                    $scope.getTaskDetails(localStorage.getItem("pushItemId"));
                } else if ($scope.currentTask) {
                    $scope.getTaskDetails($scope.currentTask);
                } else {
                    $scope.getTaskDetails($scope.tasks[0].task_id);
                }
                ////console.log("Task List : " + JSON.stringify($scope.tasks));
                break;
            case constanObject.CommsAndTaskWebRequestType.PendingTask:
                //console.log("Pending Task List : " + JSON.stringify(responseData));
                $scope.tasks = [];
                $scope.$apply(function () {
                    $scope.tasks = responseData.data;
                    getIcon($scope.tasks);
                    getClass($scope.tasks);
                });
                break;
            case constanObject.CommsAndTaskWebRequestType.CompleteTask:
                //console.log("Completed Task List : " + JSON.stringify(responseData));
                $scope.tasks = [];
                $scope.$apply(function () {
                    $scope.tasks = responseData.data;
                    getIcon($scope.tasks);
                    getClass($scope.tasks);
                });
                $scope.getTaskDetails($scope.tasks[0].task_id);
                break;
            case constanObject.CommsAndTaskWebRequestType.OverdueTask:
                //console.log("Overdue Task List : " + JSON.stringify(responseData));
                $scope.tasks = [];
                $scope.$apply(function () {
                    $scope.tasks = responseData.data;
                    getIcon($scope.tasks);
                    getClass($scope.tasks);
                });
                $scope.getTaskDetails($scope.tasks[0].task_id);
                break;
            case constanObject.CommsAndTaskWebRequestType.TaskCount:
                //console.log("Task Count : " + JSON.stringify(responseData));
                $scope.$apply(function () {
                    $scope.taskCount = responseData.count;
                });
                break;
            case constanObject.CommsAndTaskWebRequestType.TaskDetails:
                //console.log("Task Details : " + JSON.stringify(responseData));
                row_id = responseData.data.overview.task_id;
                $scope.$apply(function () {
                    $scope.taskDetails = responseData.data;
                    $scope.isTaskDetails = true;
                    $scope.isOnlineForm = responseData.data.display_form;
                    setOnlineFormData(responseData.data.online_form, responseData.data.overview.task_id, responseData.data.display_form);
                    // $scope.taskDetails.
                    if ($scope.taskDetails.overview.is_mandatory == 1) {
                        $scope.isTaskMandatory = true;
                    } else {
                        $scope.isTaskMandatory = false;
                    }

                    if ($scope.taskDetails.display_comms == 1) {
                        $scope.isAddComms = true;
                        getCommsDetails(row_id);
                    } else {
                        $scope.isAddComms = false;
                    }
                    if ($scope.taskDetails.overview.status == "Completed") {
                        $scope.isCompletedTask = true;
                    } else {
                        $scope.isCompletedTask = false;
                    }
                    $scope.currentTask = null;
                    localStorage.setItem("headerMessageType", "");
                    localStorage.setItem("headerMessageId", "");
                    localStorage.setItem("moduleId", "");
                    localStorage.setItem("pushItemId", "");
                });
                break;
            case constanObject.CommsAndTaskWebRequestType.VenueList:
                //console.log("Vennue List : " + JSON.stringify(responseData));
                $scope.$apply(function () {
                    $scope.venueList = responseData.data;
                });
                break;
            case constanObject.CommsAndTaskWebRequestType.CommsConfigType:
                //console.log("responseData : " + JSON.stringify(responseData));
                //console.log("responseData.data.comms.comm_row_title : " + responseData.data.comm_row_title);
                $scope.$apply(function () {
                    $scope.commsTitle = responseData.data.comm_row_title;
                    $scope.comms = responseData.data.comms;
                    if ($scope.comms.length < 2)
                        $scope.isMethod = false;
                    else
                        $scope.isMethod = true;

                    //console.log(" $scope.isMethod : " + $scope.isMethod);
                    $scope.isNotePopUp = true;
                });
                $scope.selectedMethod = responseData.data.comms[0];
                $scope.methodChange($scope.selectedMethod);
                break;
            case constanObject.CommsAndTaskWebRequestType.ListStaff:

                $scope.$apply(function () {
                    $scope.ListStaff = responseData.data;
                });
                //console.log("$scope.ListStaff : " + JSON.stringify($scope.ListStaff));

                break;
            case constanObject.CommsAndTaskWebRequestType.AddComms:

                //console.log("AddComms : " + JSON.stringify(responseData));
                //{"data":{"note_id":400,"message":" Comms Inserted Successfully"}}
                var note_id = responseData.data.note_id;
                successMsg = responseData.data.message;
                if ($scope.CommsImages.length > 0) {
                    for (var i = 0; i < $scope.CommsImages.length; i++) {

                        webRequestObject.fileUpload($scope, $scope.CommsImages[i].url, constanObject.UploadCommsFile + note_id, constanObject.COMMS_IMAGE_KEY, constanObject.CommsAndTaskWebRequestType.UploadCommsFile, true);
                    }
                } else {
                    $scope.$apply(function () {
                        $scope.isSuccess = true;
                        $scope.successMsg = successMsg;
                        $scope.isNotePopUp = false;
                        getCommsDetails(row_id);
                    });

                }
                break;
            case constanObject.CommsAndTaskWebRequestType.UploadCommsFile:
                //console.log(JSON.stringify(responseData));
                $scope.$apply(function () {
                    $scope.CommsImages = [];
                    $scope.isSuccess = true;
                    $scope.successMsg = successMsg;
                    $scope.isNotePopUp = false;
                    getCommsDetails(row_id);
                });

                break;
            case constanObject.CommsAndTaskWebRequestType.CommsDetails:
                //console.log("Comms Details : " + JSON.stringify(responseData));
                $scope.commsNote = [];
                $scope.$apply(function () {
                    $scope.commsNote = responseData.data.list_data;
                });
                //console.log("$scope.commsNote : " + JSON.stringify($scope.commsNote));
                break;
            case constanObject.CommsAndTaskWebRequestType.OnLineFormUpdate:
                //console.log("UPDATE FORM : " + JSON.stringify(responseData));
                $scope.getAllTask();
                $scope.getTaskCount();
                setOnlineFormData(responseData.data.online_form, responseData.data.overview.task_id, responseData.data.display_form);
                break;
        }


    };
    $scope.closePopup= function(){
      $scope.showErrorNotePopUp = false;  
    }
});




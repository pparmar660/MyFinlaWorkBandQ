function  Constant() {

    this.employmentWebRequestTypeInit = 200;

    this.WebRequestType = {
        LoginRequest: 0,
        LoginPinrequest: 1,
        UpdatePinRequest: 2,
        VechilePartialPlate: 3,
        VechileFullPlate: 4,
        VechileDetailsById: 5,
        AddNewVechile: 6,
        FilterData: 7,
        VechileSearch: 8,
        UpdateVechile: 9,
        SelectVechile: 10,
        FILE_UPLOAD: 11,
        VENUE_LIST: 12,
        LinkedStaffMember: 13,
        ReportCategory: 14,
        OutcomesByCatId: 15,
        UserInfo: 16,
        ListSwasArea: 17,
        PoliceList: 18,
        OFFENDER_FILTER: 20,
        ADD_NEW_WITNESS: 21,
        WITNESS_DETAILS: 22,
        WITNESS_LIST: 23,
        UPDATE_WITNESS: 24,
        WITNESS_FILE: 25,
        INCIDENT_REPORT_SUBMIT: 26,
        INCIDENT_REPORT_SAVE: 27,
        INCIDENT_REPORT_LOGIN: 28,
//        MOD: 2,ADMIN: 3,


        FORGOT_PASSWORD: 29,
        DYNAMIC_QUESTION: 30,
        INCIDENT_CONFIG: 31,
        COMMS_AND_TASK: 32,
        ListOffenderCategory: 33,
        DELETE_INMAIL_MESSAGE: 34,
        UNREAD_MESSAGE_COUNT: 35,
        VIEW_MESSAGE: 36,
        OFFENDER_SEARCH: 101,
        VEHICLE_COUNT: 102,
        MyDraftIncidentsCount: 103,
        SearchIncident: 104,
        appMenu: 105,
        logOut: 106,
        COMPOSS_MAIL: 107,
        COMPOSS_MAIL_ATTACHMENT: 108,
        DELETE_DRAFT_INCIDENT:109
        //employment module....

    };

    this.employmentWebRequestType = {
        STAFF_DETAIL: this.employmentWebRequestTypeInit,
        GET_STAFF_ACCESS_LEVEL: this.employmentWebRequestTypeInit + 1,
        GET_LIST_STAFF_MEMBERS: this.employmentWebRequestTypeInit + 2,
        GET_LIST_STAFF_CATEGORIES: this.employmentWebRequestTypeInit + 3,
        GET_LIST_VENUE_ALL: this.employmentWebRequestTypeInit + 4,
        GET_STAFF_CAT_FILTER: this.employmentWebRequestTypeInit + 5,
        GET_LOCATION_WISE_FILTER: this.employmentWebRequestTypeInit + 6,
        GET_LIST_VENUE_SECTOR: this.employmentWebRequestTypeInit + 7,
        GET_LIST_VENUE_CATEGORIES: this.employmentWebRequestTypeInit + 8,
        GET_LIST_VENUE_BY_CATEGORIES: this.employmentWebRequestTypeInit + 9,
        GET_VENUE_DETAIL: this.employmentWebRequestTypeInit + 10,
        GET_STAFF_IMAGE: this.employmentWebRequestTypeInit + 11,
        FILTER_DATA: this.employmentWebRequestTypeInit + 12,
        GET_VENUELIST_WISE_FILTER: this.employmentWebRequestTypeInit + 13,
        CHANGE_PASSWORD: this.employmentWebRequestTypeInit + 14,
        GET_VENUE_IMAGE: this.employmentWebRequestTypeInit + 15,
        STAFF_CATEGORIES: this.employmentWebRequestTypeInit + 16,
        ADD_STAFF: this.employmentWebRequestTypeInit + 17,
        UPDATE_STAFF: this.employmentWebRequestTypeInit + 18,
        UPDATE_VENUE:this.employmentWebRequestTypeInit + 19,
    };

    this.FileUploadModuleId = {
        FILE_UPLOAD: 1,
        DYNAMIC_QUESTION: 2,
        OFFENDER: 3,
        VICTIM: 4,
        WITNESS: 5,
        VECHILE: 6,
        STAFF: 7,
        VENUE:8

    };


    this.CommsAndTaskWebRequestInit = 300;
    this.CommsAndTaskWebRequestType = {
        CommsConfigType: this.CommsAndTaskWebRequestInit + 1,
        ListStaff: this.CommsAndTaskWebRequestInit + 2,
        AddComms: this.CommsAndTaskWebRequestInit + 3,
        UploadCommsFile: this.CommsAndTaskWebRequestInit + 4,
        CommsDetails: this.CommsAndTaskWebRequestInit + 5,
        TaskList: this.CommsAndTaskWebRequestInit + 6,
        OverdueTask: this.CommsAndTaskWebRequestInit + 7,
        CompleteTask: this.CommsAndTaskWebRequestInit + 8,
        PendingTask: this.CommsAndTaskWebRequestInit + 9,
        TaskDetails: this.CommsAndTaskWebRequestInit + 10,
        TaskCount: this.CommsAndTaskWebRequestInit + 11,
        VenueList: this.CommsAndTaskWebRequestInit + 12,
        NotificationCount: this.CommsAndTaskWebRequestInit + 13,
        ListNotificationTask: this.CommsAndTaskWebRequestInit + 14,
        ListNotificationAlerts: this.CommsAndTaskWebRequestInit + 15,
        ListAppAlerts: this.CommsAndTaskWebRequestInit + 16,
        ListNotificationOverlay: this.CommsAndTaskWebRequestInit + 17,
        ListNotificationEmails: this.CommsAndTaskWebRequestInit + 18,
        OnLineFormUpdate: this.CommsAndTaskWebRequestInit + 19
    };


    this.VEHICLE_IMAGE_KEY = "image_vehicle";
    this.COMMS_IMAGE_KEY = "image_comms";
    this.IncidentReportVenueRadius = 2; // 1 mile = 1.609344 km therefore rounding it to nearest digit i.e. 2

    this.SUCCESS = "success";
    this.ERROR = "error";
// http://api247.org/v1/forgotPassword
    this.MainUrl = "https://bqv2.admin247.org/";
    this.MainUrl1 = "https://apitest.admin247.org/"; //"https://api247.org/";
    this.MainUrl2 = "https://api.admin247.org/";
    this.VersionNo = "v1/";
    this.civilRecovery = this.MainUrl + this.VersionNo + "GetCivilRecoveryStatus";
    this.authenticateUser = this.MainUrl + this.VersionNo + "login";
    this.authenticatePin = this.MainUrl + this.VersionNo + "login";
    this.updatePin = this.MainUrl + this.VersionNo + "updatepin";
    this.forgotPassword = this.MainUrl + this.VersionNo + "forgotPassword";


    this.APP_MENU_CONFIG = this.MainUrl + this.VersionNo + "GetAppMenuConfig";
    this.GENERATE_INCIDENT_REPORT = this.MainUrl + this.VersionNo + "GenerateIncidentReport";
    this.OFFENDERS_LIST_URL = this.MainUrl + this.VersionNo + "ListOffenders";


    this.userInfo = this.MainUrl + this.VersionNo + "GetUserConfig";

    this.ListSwasArea = this.MainUrl + this.VersionNo + "Listvsp";
    this.LinkedStaffMember = this.MainUrl + this.VersionNo + "ListStaffMembers/all";
    this.Listcategory = this.MainUrl + this.VersionNo + "Listcot";

    this.VENUE_LIST = this.MainUrl + this.VersionNo + "ListVenues/all";
    this.FILTER_DATA = this.MainUrl + this.VersionNo + "GenerateFilters";
    this.EDIT_OFFENDER_URL = this.MainUrl + this.VersionNo + "updateoffender/";
    this.OFFENDER_DETAIL_URL = this.MainUrl + this.VersionNo + "GetOffenderDetails/";
    this.SEARCH_CINFIG_URL = this.MainUrl + this.VersionNo + "OffenderSearchConfig";
    this.ADD_OFFENDER_URL = this.MainUrl + this.VersionNo + "insertoffender";
    this.UPLOAD_OFFENDER_FILE_URL = this.MainUrl + this.VersionNo + "UploadOffenderFiles/";
    this.offenderImageBaseUrl = this.MainUrl + this.VersionNo + "getOffenderImage/";
    this.dynamicQuestionUrl = this.MainUrl + this.VersionNo + "GenerateDynamicQuestions";

    this.dynamicQuestionUrl_ = this.MainUrl + this.VersionNo + "GenerateDynamicQuestions";

    this.UNKNOWN_OFFENDER = this.MainUrl + this.VersionNo + "ListOffenders?selection=ContactType&selection_type=status&selection_id=0";
    this.UNKNOWN_OFFENDER_PARAMETERS = "?selection=ContactType&selection_type=status&selection_id=0";
    this.KNOWN_OFFENDER = this.MainUrl + this.VersionNo + "ListOffenders?selection=ContactType&selection_type=status&selection_id=3";
    this.KNOWN_OFFENDER_PARAMETERS = "?selection=ContactType&selection_type=status&selection_id=3";
    this.ListOffenderCategories = this.MainUrl + this.VersionNo + "ListOffenderCategories";

    this.OFFENDER = this.MainUrl + this.VersionNo + "ListOffenders?selection=ContactType&selection_type=status&selection_id=";
    this.OFFENDER_PARAMETERS = "?selection=ContactType&selection_type=status&selection_id=";

    this.UPLOAD_DO_YOU_HAVE_ANY_FILE_URL = this.MainUrl + this.VersionNo + "UploadAllIncidentFiles/";

    //////////////////////////VECHILS///////////////////////////////////////

    this.AddNewVechile = this.MainUrl + this.VersionNo + "insertvehicle";
    this.UpdateVechile = this.MainUrl + this.VersionNo + "updatevehicle/"
    this.GetVehicleByPlate = this.MainUrl + this.VersionNo + "getVehicleByPlateWithCount";
    this.GetVehicleByPartialPlate = this.MainUrl + this.VersionNo + "getVehicleByPartialPlateWithCount";
    this.GetVehicleDetailsById = this.MainUrl + this.VersionNo + "GetVehicleDetails/";
    this.vechileSearch = this.MainUrl + this.VersionNo + "ListVehicles";
    this.vechileFullPlate = this.MainUrl + this.VersionNo + "ListVehicles/fullplate";
    this.vechilePartial = this.MainUrl + this.VersionNo + "ListVehicles/partialplate";
    this.getVechileImages = this.MainUrl + this.VersionNo + "getVehicleImage/";
    this.UploadVechileFile = this.MainUrl + this.VersionNo + "UploadVehicleFiles/";
    this.VehicleCount = this.MainUrl + this.VersionNo + "GetVehicleCount";



////////////////////////////////////VICTIM////////////////////////////////////
    this.VICTIME_LIST = this.MainUrl + this.VersionNo + "ListVictims";
    this.ADD_NEW_VICTIME = this.MainUrl + this.VersionNo + "insertvictims";
    this.VICTIME_DETAILS = this.MainUrl + this.VersionNo + "GetVictimsDetails/";
    this.VICTIME_CATEGORY = this.MainUrl + this.VersionNo + "ListVictimsCategories";
    this.VICTIME_IMAGE_UPLOAD = this.MainUrl + this.VersionNo + "UploadVictimFiles/";
    this.VICTIME_CATEGORIES = this.MainUrl + this.VersionNo + "ListVictimsCategories"; //Also used for witness category. 
    this.VICTIME_EDIT = this.MainUrl + this.VersionNo + "updatevictims/";
    this.VICTIME_IMAGE = this.MainUrl + this.VersionNo + "getVictimsImage/";
    ////////////////////////////////////WITNESS////////////////////////////////////
    this.WITNESS_LIST = this.MainUrl + this.VersionNo + "ListWitnesses";
    this.ADD_NEW_WITNESS = this.MainUrl + this.VersionNo + "insertwitness";
    this.WITNESS_DETAILS = this.MainUrl + this.VersionNo + "GetWitnessDetails/";
    this.UPDATE_WITNESS = this.MainUrl + this.VersionNo + "updatewitness/";
    this.UPLOAD_WITNESS_FILES = this.MainUrl + this.VersionNo + "UploadWitnessFiles/";
    this.WITNESS_CATEGORIES = this.MainUrl + this.VersionNo + "ListWitnessCategories";
    this.WITNESS_IMAGE = this.MainUrl + this.VersionNo + "getWitnessImage/";

    //////////////////////////Police and Authority ///////////////////////
    this.POLICE_LIST = this.MainUrl + this.VersionNo + "ListPoliceandAuthority";
    this.INCIDENT_LOCATION_DISTANCE_MILE = 1;


    //////////////////////////INCIDENT REPORT ///////////////////////
    this.INCIDENT_REPORT_LIST = this.MainUrl + this.VersionNo + "ListIncidentReport";
    this.INCIDENT_DETAIL = this.MainUrl + this.VersionNo + "getIncidentDetails/";
    this.INCIDENT_STATUS = this.MainUrl + this.VersionNo + "ListIncidentReportStatuses";
    this.INCIDENT_REPORT_LIST_BY_STATUS = this.INCIDENT_REPORT_LIST + "/status/";


    //// Additional Comment //////////////
    this.INSERT_INCIDENT_REPORT = this.MainUrl + this.VersionNo + "insertincident";

    // error messge
    this.ValidationMessageIncidentCreate = "Insufficient Information: Please check the error messages displayed on the screen.";

    this.INCIDENT_LOCATION_DISTANCE_MILE = 1;
    this.CREATE_INCIDENT_TEMP_ID = -1;

    this.CREATE_INCIDENT_ID = -1;

    this.INCIDENT_FILE_URL = this.MainUrl + this.VersionNo + "getIncidentMedia";
    this.MyDraftIncidentsCount = this.MainUrl + this.VersionNo + "MyDraftIncidentsCount";


    this.GetAppMenuConfig = this.MainUrl + this.VersionNo + "GetAppMenuConfig";
    this.GetAllFieldLabels = this.MainUrl + this.VersionNo + "GetAllFieldLabels";


    ///////////////////////EMPLOYMENT//////////////////////////////////
    this.GET_STAFF_PROFILE = this.MainUrl + this.VersionNo + "StaffDetail/";
    this.GET_STAFF_ACCESS_LEVEL = this.MainUrl + this.VersionNo + "listStaffLevels";
    this.GET_LIST_STAFF_MEMBERS = this.MainUrl + this.VersionNo + "ListStaffMembers/all";//all
    this.GET_LIST_STAFF_CATEGORIES = this.MainUrl + this.VersionNo + "listStaffCategories";
    this.GET_LIST_VENUE_ALL = this.MainUrl + this.VersionNo + "ListVenues/all";
    this.GET_STAFF_CAT_FILTER = this.MainUrl + this.VersionNo + "ListStaffMembers/Category/";
    this.GET_LIST_VENUE_SECTOR = this.MainUrl + this.VersionNo + "ListVenueSector";
    this.GET_LIST_VENUE_CATEGORIES = this.MainUrl + this.VersionNo + "ListVenueCategories";
    this.GET_LIST_VENUE_BY_CATEGORIES = this.MainUrl + this.VersionNo + "ListVenuesByCategory/";
    this.GET_VENUE_DETAIL = this.MainUrl + this.VersionNo + "GetVenueDetails/";
    this.GET_STAFF_IMAGE = this.MainUrl + this.VersionNo + "getStaffImage/";
    this.GET_VENUE_IMAGE = this.MainUrl + this.VersionNo + "getVenueImage/";
    this.GET_LOCATION_WISE_FILTER = this.MainUrl + this.VersionNo + "ListStaffMembers";
    this.GET_VENUELIST_WISE_FILTER = this.MainUrl + this.VersionNo + "ListVenues";
    this.CHANGE_PASSWORD = this.MainUrl + this.VersionNo + "updatepassword";
    this.GET_STAFF_CATEGORIES = this.MainUrl + this.VersionNo + "listStaffCategories";
    this.ADD_STAFF = this.MainUrl + this.VersionNo + "insertstaff";
    this.UPDATE_STAFF = this.MainUrl + this.VersionNo + "updatestaff/";
    this.UPDATE_VENUE = this.MainUrl + this.VersionNo + "UpdateVenue/";
    this.UPLOAD_STAFF_IMAGE = this.MainUrl + this.VersionNo + "UploadStaffFiles/";
     this.UPLOAD_VENUE_IMAGE = this.MainUrl + this.VersionNo + "UploadVenueFiles/";

    /////////////Comms and Task/////////////////////////

    this.CommsConfig = this.MainUrl + this.VersionNo + "GetCommsConfig/";
    this.ListStaff = this.MainUrl + this.VersionNo + "ListStaffMembers/all";
    this.InsertComms = this.MainUrl + this.VersionNo + "insertComms";
    this.UploadCommsFile = this.MainUrl + this.VersionNo + "UploadCommsFiles/";
    this.GetCommsDetails = this.MainUrl + this.VersionNo + "GetCommsDetails/";//https://api247.org/v1/GetCommsDetails/213/40529
    this.GetStaffImage = this.MainUrl + this.VersionNo + "getStaffImage/";//https://api247.org/v1/getStaffImage/{:staffid}/1 

    this.getTaskList = this.MainUrl + this.VersionNo + "list-tasks-checklists";
    this.getOverdueTask = this.MainUrl + this.VersionNo + "list-tasks-checklists/overdue";
    this.getCompleteTask = this.MainUrl + this.VersionNo + "list-tasks-checklists/completed";
    this.getPendingTask = this.MainUrl + this.VersionNo + "list-tasks-checklists/pending";
    this.getTaskDetails = this.MainUrl + this.VersionNo + "tasks-checklists-detail/";
    this.getTaskCount = this.MainUrl + this.VersionNo + "get-task-checklist-count";
    this.getVenueList = this.MainUrl + this.VersionNo + "ListVenues/myvenues/all";
    this.ListIncidentReportFieldLabels = this.MainUrl + this.VersionNo + "ListIncidentReportFieldLabels";




    this.GET_ALL_MESSAGE = this.MainUrl + this.VersionNo + "listallmessages";
    this.COMMS_AND_TASK_INBOX = this.MainUrl + this.VersionNo + "listInmail";
    this.COMMS_AND_TASK_TRASH = this.MainUrl + this.VersionNo + "listtrash";
    this.COMMS_AND_TASK_SENT = this.MainUrl + this.VersionNo + "listsent";
    this.COMMS_AND_TASK_DRAFT = this.MainUrl + this.VersionNo + "listdraft";
    this.COMMS_AND_TASK_ALERT = this.MainUrl + this.VersionNo + "listalerts";
    this.COMMS_AND_TASK_COMMS = this.MainUrl + this.VersionNo + "listcomms";
    this.MESSAGE_UNREAD_COUNT = this.MainUrl + this.VersionNo + "get-notification-count";
    this.COMMS_AND_TASK_NOTIFICATION = this.MainUrl + this.VersionNo + "listnotifications";
    this.getNotificationCount = this.MainUrl + this.VersionNo + "get-notification-count";
    this.getListNotificationTask = this.MainUrl + this.VersionNo + "list-notification-tasks";
    this.getListNotificationAlerts = this.MainUrl + this.VersionNo + "list-notification-alerts";
    this.getListAppAlerts = this.MainUrl + this.VersionNo + "list-app-alerts";
    this.getListNotificationOverlay = this.MainUrl + this.VersionNo + "list-notification-overlay";
    this.getListNotificationEmails = this.MainUrl + this.VersionNo + "list-notification-emails";
    this.INMAIL_VIEW = this.MainUrl + this.VersionNo + "Readmessage/inbox";
    this.ALERT_VIEW = this.MainUrl + this.VersionNo + "Readmessage/alert";
    this.NOTIFICATION_VIEW = this.MainUrl + this.VersionNo + "Readmessage/notification";
    this.COMMS_VIEW = this.MainUrl + this.VersionNo + "Readmessage/comms";
    this.TRASH_VIEW = this.MainUrl + this.VersionNo + "Readmessage/archive";
    this.SENT_VIEW = this.MainUrl + this.VersionNo + "Readmessage/sent";
    this.DRAFTS_VIEW = this.MainUrl + this.VersionNo + "Readmessage/draft";
    this.MESSAGES_DELETE = this.MainUrl + this.VersionNo + "deletemessages";
    this.LOG_OUT = this.MainUrl + this.VersionNo + "logout";
    this.COMPOSS_MAIL = this.MainUrl + this.VersionNo + "SendMail";
    this.COMPOSS_MAIL_ATTACHMENT = this.MainUrl + this.VersionNo + "AttachMail/"
    this.GET_EDIT_DETAIL = this.MainUrl + this.VersionNo + "editIncidentDetails/"

    this.SendPushNotification = this.MainUrl + this.VersionNo + "pushnotifications";

    this.TASK_CHECKLIST = this.MainUrl + this.VersionNo + "list-tasks-checklists/";
    this.updateOnLineForm = this.MainUrl + this.VersionNo + "update-tasks-checklists/";
    
    this.DELETE_DRAFT_INCIDENT = this.MainUrl + this.VersionNo + "DeleteIncident/";
    
    this.APP_MENU = this.MainUrl + this.VersionNo + "GetAppMenuConfig";
    this.PushApiKey = "AIzaSyCNDEWGLyKpf-8nXw_pL9qejt_jSFI5d7U";
    this.PushServerKey = "AIzaSyB3sBygazehykRiu4HZaAOfEfYNerHEShM";
    this.PushSenderId = "134803807727";
    this.PushBrowserKey = "AIzaSyDYPCqteLYMBi8SL29GevKbcRL_EYTugcs";




}

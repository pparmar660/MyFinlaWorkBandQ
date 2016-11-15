var db = 0;
//database
var DATABASE_NAME = "BandQ";
var DATABASE_VERSION = "1.0";
var DATABSE_DISPLAY_NAME = "BandQ";
var DATABASE_SIZE = 200000; //SIZE IN BYTES

//tables
var TABLE_COUNTRY = "country";
var TABLE_REGIONS = "regions";
var TABLE_ZONE = "zone";
var TABLE_STATE = "state";
var TABLE_CITY = "city";
var TABLE_COUNTRY_STATE_REGION_CITY = "countryStateVenuZoneCity";
var TABLE_DYNAMIC_QUESTION = "dynamicQuestion";
var TABLE_CATEGORIES_OUTCOME_TYPE = "reportCategories";
var TABLE_USER_INFO = "userInfo";
var TABLE_APP_MENU_CONFIG = "appMenuConfig";
var TABLE_VENUE = "listVenues";
var TABLENAME = 'tablename';
var TABLE_SWAS_AREA = 'listSwasArea';
var TABLE_LINKED_STAFF = 'linkedStaffList';
var BANE_STATUS = 'banlist';
var VICTIME_WITNESS_CATAGORY = 'victimWitnessCatagory';
var ADVANCE_FILTER_DATA = 'advanceFilter';
var POLICE_AND_AUTHORITY = 'ListPoliceandAuthority';
//var TABLE_DYNAMIC_QUESTOIN_OUTCOME_RELATION = "dynamicQuestionOutcomeRelation";
var TABLE_DYNAMIC_QUESTOIN_OUTCOME_TYPE_RELATION = "dynamicQuestionOutcomeTypeRelation";
var TABLE_CREATE_INCIDENT_REPORT = 'createIncidentRequest';
var TABLE_CRETAE_OFFENDER = 'createOffender';
var TABLE_CRETAE_VEHICLE = 'createVehicle';
var TABLE_CRETAE_VICTIM = "createVictim";
var TABLE_CRETAE_WITNESS = "createWitness";
var TABLE_CREATE_INCIDENT_REPORT_FILE = "createReportFiles";
var TABLE_INCIDENT_CONFIG="incidentConfig";
var TABLE_FILTER_PRESELECTION = "filterPreSelection";

var TABLE_ListIncidentReportFieldLabels = "ListIncidentReportFieldLabels";  
var TABLE_GetAllFieldLabels = "AllFieldLabels";  

//field 


var FIELD_JSON_DATA = 'json_data';
var FIELD_TIME_STAMP = 'timeStamp';


//var VANUE_KEY = ["id", "venue_name", "address", "postcode", "Lat", "Lng", "telephone", "address2", "region_id", "zone_id", "venue_site_number", "venue_code", "venue_active", "sector_title", "organisation", "police_force", "swasareas"];
var COUNTRY_STATE_VENU_REGION_CITY_KEY = [FIELD_JSON_DATA, FIELD_TIME_STAMP];
var CATEGORY_KEYS = [FIELD_JSON_DATA, FIELD_TIME_STAMP];
var USER_INFO_KEY = [FIELD_JSON_DATA, FIELD_TIME_STAMP];
var MENU_CONFIG_KEY = [FIELD_JSON_DATA, FIELD_TIME_STAMP];
var VENUE_KEY = [FIELD_JSON_DATA, FIELD_TIME_STAMP];
var SWAS_AREA_KEY = [FIELD_JSON_DATA, FIELD_TIME_STAMP];
var LINKED_STAFF_KEY = [FIELD_JSON_DATA, FIELD_TIME_STAMP];
var JSON_DATA_KEY = [FIELD_JSON_DATA, FIELD_TIME_STAMP];

var FILES_UPLOAD_KEY = ["moduleId", "tempId", "incidentTempId", "filePath", "fileType", "status", "timeStamp", "userId", "orignalIncidentId"];
var CREATE_INCIDENT_REPORT_KEY = [FIELD_JSON_DATA, "temp_id", "insertType"];

var FILES_UPLOAD_DATATYPE = ["VARCHAR", "VARCHAR", "VARCHAR", "VARCHAR", "VARCHAR", "VARCHAR", "VARCHAR", "VARCHAR", "VARCHAR"];
// var CREATE_INCIDENT_REPORT_KEY = [FIELD_JSON_DATA,"temp_id"];
// >>>>>>> munendraWork
var DYNAMIC_QUESTION_KEY = ["question_id", "sort_order", "question_title", "option_type", "question_ctg", "question_type", "errmessage_opt", "question_hint",
    "question_man", "validate_opt", "location_countries", "location_venues", "location_regions", "location_zones", "questionIncidentCategory",
    "questionoptions", "childquestionsbyoption", "is_child", "location_option","fieldset_display_options","use_fieldsetoption","showStatus"];
//var QUESTOIN_OUTCOME_KEY = ["questionId", "outcomeId","typeId"];
var QUESTOIN_OUTCOME_TYPE_KEY = ["question_id", "outcomeId", "typeId"];


// var key = ["question_id", "question_title", "option_type", "question_ctg", "question_type", "question_man", "questionOutcomes", "validate_opt", "location_countries", "location_venues", "location_regions", "location_zones", "questionoptions", "childquestionsbyoption"];

var DATA_TYPE_ARRAY = ["VARCHAR", "TIMESTAMP"];
var JSON_FIELD_ARRAY = [FIELD_JSON_DATA];
function LocalDataBase() {

    if (!db) {
        db = window.openDatabase(DATABASE_NAME, DATABASE_VERSION, DATABSE_DISPLAY_NAME, DATABASE_SIZE);
        db.transaction(populateDB, errorCB, successCreateCB);
    }


    function populateDB(tx) {
        db.transaction(function (ctx) {
        }, function (er) {
            //console.log(er.message);
        });

        ////

        db.transaction(function (tx) {

            tx.executeSql(createQuery(TABLE_DYNAMIC_QUESTION, DYNAMIC_QUESTION_KEY, ["VARCHAR", "VARCHAR", "VARCHAR", "VARCHAR", "VARCHAR", "VARCHAR", "VARCHAR", "VARCHAR", "VARCHAR", "VARCHAR", "VARCHAR", "VARCHAR", "VARCHAR", "VARCHAR", "VARCHAR", "VARCHAR", "VARCHAR", "VARCHAR", "VARCHAR", "VARCHAR"]));
            tx.executeSql(createQuery(TABLE_COUNTRY_STATE_REGION_CITY, COUNTRY_STATE_VENU_REGION_CITY_KEY, DATA_TYPE_ARRAY));
            tx.executeSql(createQuery(TABLE_FILTER_PRESELECTION, COUNTRY_STATE_VENU_REGION_CITY_KEY, DATA_TYPE_ARRAY))
            tx.executeSql(createQuery(TABLE_VENUE, VENUE_KEY, DATA_TYPE_ARRAY));
            tx.executeSql(createQuery(TABLE_USER_INFO, USER_INFO_KEY, DATA_TYPE_ARRAY));           
            tx.executeSql(createQuery(TABLE_APP_MENU_CONFIG, MENU_CONFIG_KEY, DATA_TYPE_ARRAY));
            tx.executeSql(createQuery(TABLE_CATEGORIES_OUTCOME_TYPE, CATEGORY_KEYS, DATA_TYPE_ARRAY));
            tx.executeSql(createQuery(TABLE_SWAS_AREA, SWAS_AREA_KEY, DATA_TYPE_ARRAY));
            tx.executeSql(createQuery(TABLE_LINKED_STAFF, LINKED_STAFF_KEY, DATA_TYPE_ARRAY));
            //   tx.executeSql(createQuery(TABLE_DYNAMIC_QUESTOIN_OUTCOME_RELATION, QUESTOIN_OUTCOME_KEY, ["VARCHAR", "VARCHAR"]));
            tx.executeSql(createQuery(TABLE_DYNAMIC_QUESTOIN_OUTCOME_TYPE_RELATION, QUESTOIN_OUTCOME_TYPE_KEY, ["VARCHAR", "VARCHAR"]));
            tx.executeSql(createQuery(TABLE_CREATE_INCIDENT_REPORT, CREATE_INCIDENT_REPORT_KEY, ["VARCHAR", "VARCHAR", "VARCHAR"]));
           //tx.executeSql(createQuery(TABLE_CRETAE_OFFENDER, JSON_DATA_KEY, DATA_TYPE_ARRAY));
           // tx.executeSql(createQuery(TABLE_CRETAE_VEHICLE, JSON_DATA_KEY, DATA_TYPE_ARRAY));
           // tx.executeSql(createQuery(TABLE_CRETAE_VICTIM, JSON_DATA_KEY, DATA_TYPE_ARRAY));
           // tx.executeSql(createQuery(TABLE_CRETAE_WITNESS, JSON_DATA_KEY, DATA_TYPE_ARRAY));
            tx.executeSql(createQuery(TABLE_CREATE_INCIDENT_REPORT_FILE, FILES_UPLOAD_KEY, FILES_UPLOAD_DATATYPE));
            tx.executeSql(createQuery(BANE_STATUS, JSON_DATA_KEY, DATA_TYPE_ARRAY));
            tx.executeSql(createQuery(VICTIME_WITNESS_CATAGORY, JSON_DATA_KEY, DATA_TYPE_ARRAY));
            tx.executeSql(createQuery(ADVANCE_FILTER_DATA, JSON_DATA_KEY, DATA_TYPE_ARRAY));
            tx.executeSql(createQuery(POLICE_AND_AUTHORITY, JSON_DATA_KEY, DATA_TYPE_ARRAY));
            tx.executeSql(createQuery(TABLE_INCIDENT_CONFIG, JSON_DATA_KEY, DATA_TYPE_ARRAY));
            tx.executeSql(createQuery(TABLE_ListIncidentReportFieldLabels, JSON_DATA_KEY, DATA_TYPE_ARRAY));
            tx.executeSql(createQuery(TABLE_GetAllFieldLabels, JSON_DATA_KEY, DATA_TYPE_ARRAY));

        }, function (er) {
            //console.log(er.message);
        });
        //
    }
    ;



    //create table query
    function createTable(tx, tableName) {
        tx.executeSql("CREATE TABLE IF NOT EXISTS " + tableName + " (" + FIELD_JSON_DATA + "," + FIELD_TIME + ")");
    }
    ;

    function createQuery(table, colums, type) {
        var query = "CREATE TABLE IF NOT EXISTS " + table + " (";

        for (var i = 0; i < colums.length; i++) {
            if (i < colums.length - 1)
                query = query + colums[i] + " " + type[i] + "(250),";
            else
                query = query + colums[i] + " " + type[i] + "(250))";
        }
        return query;
    }
    ;


    function insertQuery(table, key, value) {
        var query = "INSERT INTO " + table + " (";
        //        if (key.length === value.length) {
        for (var i = 0; i < key.length; i++) {
            if (i < key.length - 1)
                query = query + key[i] + ",";
            else
                query = query + key[i] + ") VALUES (";
        }
        for (var i = 0; i < value.length; i++) {
            if (i < key.length - 1)
                query = query + "'" + value[i] + "'" + ",";
            else
                query = query + "'" + value[i] + "'" + ");";
        }
        //        }
        //       //console.log(query);
        return query;
    }







    function errorCB(err) {
        //console.log('error ' + err.code);
        //console.log("Error processing SQL: " + err.code);
    }
    ;

    function successCreateCB() {
        //  //console.log('success ' + DATABASE_VERSION);
        //console.log("Success creating Database " + DATABASE_VERSION);

    }
    ;

    //insert data in table
    this.insertData = function (tableName, keys, value, doStringfyData) {
        var data;
        if (doStringfyData) {
            var json_data = JSON.stringify(value, null, 2);
            json_data = json_data.replace(/'/g, '_');
             //json_data = json_data.replace("O'", "O");
           
            data = [json_data];

        } else
            data = value;



        var query = insertQuery(tableName, keys, data);
        db.transaction(function (tx) {
            tx.executeSql(query);
        }, function (er) {
            //console.log("error");
            //console.log(er.message);

        });

    };
    
        this.insertDataWithCallBack = function (tableName, keys, value, doStringfyData,callBack) {
        var data;
        if (doStringfyData) {
            var json_data = JSON.stringify(value, null, 2);
            json_data = json_data.replace("'", '_');
            data = [json_data];

        } else
            data = value;



        var query = insertQuery(tableName, keys, data);
        db.transaction(function (tx) {
            tx.executeSql(query);
        }, function (er) {
            //console.log("error");
            //console.log(er.message);

        },function(txt){return callBack();});

    };


    //insert data in table
    this.update = function (query) {

        db.transaction(function (tx) {
            tx.executeSql(query);
        }, function (er) {
            //console.log("error");
            //console.log(er.message);

        });

    };
    
    
        this.updateWithCallBack = function (query,callBack,tempId) {

        db.transaction(function (tx) {
            tx.executeSql(query);
        }, function (er) {
            //console.log("error");
            //console.log(er.message);

         },function(txt){return callBack(tempId);});

    };


    function errorDB() {
        //console.log('error');
        //console.log(er.message);
    }

    //get json data from database
    this.getDatafromDataBase = function (query, callback, mayConvertToJson) {


        db.transaction(function (tx) {
            tx.executeSql(query, [], function (tx, result) {
                var data = "";
                var arr = [];
                if (result != null && result.rows != null) {
                    for (var i = 0; i < result.rows.length; i++) {
                        var row = result.rows.item(i);
                        data = data + JSON.stringify(row);
                        arr.push(row);
                    }
                    ////console.log(data);
                    if (mayConvertToJson) {
                        try {
                            callback(JSON.parse(arr[0].json_data));
                        } catch (e) {
                            //console.log(e);
                        }
                    } else {
                        callback(arr);
                    }
                }
            }, function (er) {
                //console.log(er);
            });
        }, function (er) {
            //console.log(er);

        });
    };

    this.getDataFromDB = function (classObject, tableName) {
        TABLENAME = tableName;
        db.transaction(queryGetDataDB, errorCB);

        function queryGetDataDB(tx) {
            tx.executeSql('SELECT * FROM ' + TABLENAME, [], querySuccess, errorCB);
        }

        function querySuccess(tx, result) {
            var data = "";
            if (result != null && result.rows != null) {
                for (var i = 0; i < result.rows.length; i++) {
                    var row = result.rows.item(i);
                    data = row.json_data;
                }
                classObject.returnJson(data);
            }

        }
    };



    //delete query
    this.deleteTableData = function (tableName) {
        db.transaction(function (ctx) {
            ctx.executeSql("DELETE FROM " + tableName);
        }, errorCB);
    };
/// delete record with where condition
 this.deleteRecord = function (query) {

        db.transaction(function (tx) {
            tx.executeSql(query);
        }, function (er) {
            //console.log("error");
            //console.log(er.message);

        });

    };
    
     this.runQueryWithCallBack = function (query,callBack,tempId) {

        db.transaction(function (tx) {
            tx.executeSql(query);
        }, function (er) {
            //console.log("error");
            //console.log(er.message);

         },function(txt){return callBack(tempId);});

    };
    this.countNoOfRow = function (tableName, callback) {

        db.transaction(function (tx) {
            tx.executeSql("SELECT * FROM " + tableName, [], function (tx, results) {
                // this function is called when the executeSql is ended
                return callback(results.rows.length);
            });
        });
    }

    this.checkRecordIsExist = function (query, callback) {

        db.transaction(function (tx) {
            try {
                tx.executeSql(query, [], function (tx, results) {
                    // this function is called when the executeSql is ended
                    return callback(results.rows.item(0).c);
                });
            } catch (e) {
                //console.log(e);
            }
        });
    }







}
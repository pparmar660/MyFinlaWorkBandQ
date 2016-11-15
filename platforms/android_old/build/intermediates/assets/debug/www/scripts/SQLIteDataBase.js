
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

function insertQuery(table, key, value) {
    var query = "INSERT INTO " + table + " (";

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

    return query;
}

function openDataBase() {
    myDB = window.sqlitePlugin.openDatabase({name: "BandQDataBase.db"});
}

function createDataBaseTable() {

    if (myDB == 'undefind')
        openDataBase();

//        transaction.executeSql(transaction,TABLE_COUNTRY_QUERY);
//        transaction.executeSql(transaction,TABLE_REGIONS_QUERY);
//        transaction.executeSql(transaction,TABLE_ZONE_QUERY);
//        transaction.executeSql(transaction,TABLE_VANUE_QUERY);
    
    myDB.transaction(function (transaction) {
 
        transaction.executeSql(TABLE_DYNAMIC_QUESTION_QUERY);

    }, [], function (tx, result) {
        //console.log('Sqlite data base created');
    }, function (er) {
        alert("error in creating data base");
        //console.log(er.message);

    });

}

function insertData(tableName, keys, values) {
    var query = insertQuery(tableName, keys, values);

    myDB.transaction(function (tx) {
        tx.executeSql(query);
    }, [], function (tx, result) {
        alert("insert sucess "+result);
        //console.log('Inserted');
    }, function (er) {
        alert("data insert error ->"+er.message);
        //console.log(er.message);

    });
}

function getDataFromDB(tableName, Condition) {

    var data = [];

    myDB.transaction(function (tx) {
        tx.executeSql('SELECT * FROM ' + tableName, [], function (tx, result) {

               alert("Data get from table : "+JSON.stringify(result));
            if (result != null && result.rows != null) {
                for (var i = 0; i < result.rows.length; i++) {
                 
                    var row = result.rows.item(i);
                    data.push(row);
                }
                return data;
            }
        }, function (er) {
            alert("data get  error "+JSON.stringify(er));
            //console.log(er.message);

        });

    });

}


function  deleteTableData(tableName) {
    myDB.transaction(function (ctx) {
        ctx.executeSql("DELETE FROM " + tableName);
    }, errorCB);
}



var myDB;

//tables
var TABLE_LIST_OFFENDERS = "listOffenders";
var TABLE_LIST_POLICE_AND_AUTHORITY = "listPoliceAndAuthority";
var TABLE_LIST_VEHICLES = "listVehicles";
var TABLE_LIST_VENUES = "listVenues";
var TABLE_LIST_VICTIMS = "listVictims";
var TABLE_LIST_WITNESS = "listWitness";
var TABLE_COUNTRY = "country";
var TABLE_REGIONS = "regions";
var TABLE_ZONE = "zone";
var TABLE_VANUE = "vanue";
var TABLE_DYNAMIC_QUESTION = "dynamicQuestion";

// fields 

var FIELD_JSON_DATA = 'json_data';
var FIELD_TIME = 'time';
var FIELD_ID = 'id';
var FIELD_VENU_NAME = 'venu_name';
var FIELD_ADDRESS = "address";
var FIELD_POST_CODE = "postcode";
var FIELD_LATITUDE = "lat";
var FIELD_LONGITUDE = "lon";
var FIELD_ADDRESS_2 = "address2";
var FIELD_REGION_ID = "reginon_id";
var FIELD_ZONE_ID = "zone_id";
var FIELD_VENU_SITE_NUMBER = "venue_site_number";
var FIELD_VENU_CODE = "venu_code";
var FIELD_VENU_ACTIVE = "venue_active";
var FIELD_SECTOR_TITLE = "sector_title";
var FIELD_ORGANISATION = "organisation";
var FIELD_POLICE_FORCE = "police_force";
var FIELD_SWAS_AREA = "swasareas";



var VANUE_KEY = ["id", "venue_name", "address", "postcode", "Lat", "Lng", "telephone", "address2", "region_id", "zone_id",
    "venue_site_number", "venue_code", "venue_active", "sector_title", "organisation", "police_force", "swasareas"];
var ZONE_KEY = ["pk_zone", "zone_name", "fk_rid"];
var REGIONS_KEY = ["id_rgs", "name_rgs"];
var COUNTRY_KEY = ["id_cnt", "name_cnt"];
var DYNAMIC_QUESTION_KEY = ["question_id", "question", "optionType", "categories", "type", "outcome", "inputType", "location_validation", "loation_countries", "location_venue", "location_region", "location_zones", "mandatory", "subQuestion"]




var TABLE_COUNTRY_QUERY = createQuery(TABLE_COUNTRY, COUNTRY_KEY, ["VARCHAR", "VARCHAR"]);
var TABLE_REGIONS_QUERY = createQuery(TABLE_REGIONS, REGIONS_KEY, ["VARCHAR", "VARCHAR"]);
var TABLE_ZONE_QUERY = createQuery(TABLE_ZONE, ZONE_KEY, ["VARCHAR", "VARCHAR", "VARCHAR"]);
var TABLE_VANUE_QUERY = createQuery(TABLE_VANUE, VANUE_KEY, ["VARCHAR", "VARCHAR", "VARCHAR", "VARCHAR", "VARCHAR", "VARCHAR", "VARCHAR", "VARCHAR", "VARCHAR", "VARCHAR", "VARCHAR", "VARCHAR", "VARCHAR", "VARCHAR", "VARCHAR", "VARCHAR", "VARCHAR"]);
var TABLE_DYNAMIC_QUESTION_QUERY = createQuery(TABLE_DYNAMIC_QUESTION, DYNAMIC_QUESTION_KEY, ["VARCHAR", "VARCHAR", "VARCHAR", "VARCHAR", "VARCHAR", "VARCHAR", "VARCHAR", "VARCHAR", "VARCHAR", "VARCHAR", "VARCHAR", "VARCHAR", "VARCHAR", "VARCHAR"]);

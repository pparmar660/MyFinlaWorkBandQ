BandQModule.service("showHidePageService", ["$http", "globalService", "$rootScope", "manageDropDownFieldSet", function ($http, globalService, $rootScope, manageDropDownFieldSet) {

        this.pageArray = [];
        var fieldSetArray;
        var pagefieldSetArray;
        var outcomeTypeLink = [];
        //var hideFieldSetArray3=[];
        var venuRadius = 5;
        var tabData = [];
        var tabFieldIdArray
        var tabFieldSetArray;
        


        this.getVenuRadious = function () {
            return venuRadius;

        }
        this.setVenuRadious = function (n) {
            venuRadius = n;

        }

//  
//    this.getHideFieldSetArray = function(){
//       return hideFieldSetArray3;
//
//    }

        this.updateHideFieldsetArray = function () {

            var hideFieldSetArray3 = new Array(0);


            for (var i = 0 in outcomeTypeLink) {
                if (outcomeTypeLink[i].type_id == globalService.getTypeId() & outcomeTypeLink[i].outcome_id == globalService.getOutcomeId()) {
                    hideFieldSetArray3 = outcomeTypeLink[i].fieldset_id;
                    globalService.setStockLoad(outcomeTypeLink[i].load_stock_value);
                    globalService.setProductDefaultValue(outcomeTypeLink[i].load_stock_default_value);
                   
                }
            }
            //  debugger;
            //  alert("update serve: "+globalService.getOutcomeId()+"--"+globalService.getTypeId()+"--"+ JSON.stringify(hideFieldSetArray3));

            $rootScope.hideFieldSetArray = hideFieldSetArray3;


            manageDropDownFieldSet.setDropDownFieldSet(hideFieldSetArray3);


        }

        this.setFieldSetArray = function (data) {
            fieldSetArray = angular.copy(data);
        }

        this.setOutcomeTypeLink = function (data) {
            // //console.log('set outcome type link');
            // //console.log(data);
            outcomeTypeLink = angular.copy(data);
        }

        this.getOutcomeTypeLink = function () {
            return outcomeTypeLink;
        }

        this.setPageFieldSetArray = function (_pageFieldSetArray) {

            pagefieldSetArray = angular.copy(_pageFieldSetArray);
        }

        this.getPageFieldSetArray = function () {
            return pagefieldSetArray;
        }


        this.setTabArray = function (_tabArray) {

            tabData = angular.copy(_tabArray);
        }

        this.getTabArray = function () {
            return tabData;
        }



        this.setTabFieldSetArray = function (_tabArray) {

            tabFieldSetArray = angular.copy(_tabArray);
        }

        this.getTabFieldSetArray = function () {
            return tabFieldSetArray;
        }


        this.setTabFieldIdArray = function (_tabArray) {

            tabFieldIdArray = angular.copy(_tabArray);
        }

        this.getTabFieldIdArray = function () {
            return tabFieldIdArray;
        }



        this.setFieldSetArray = function (_fieldSetArray) {

            fieldSetArray = angular.copy(_fieldSetArray);
        }

        this.getFieldSetArray = function () {
            return fieldSetArray;
        }


        this.setPageArray = function (array) {
            this.pageArray = array;
        }
        this.showPage = function (no) {
            for (var i = 0; i < this.pageArray.length; i++) {
                if (no == i)
                    this.pageArray[i].showStatus = true;

            }
            return this.pageArray;
        }

//    this.getIncedentConfig = function (callback) {
//        var token = window.localStorage.getItem("token");
//        $http({
//            method: 'GET',
//            url: constanObject.GENERATE_INCIDENT_REPORT,
//            headers: {
//                Authorization: token
//            },
//        }).then(function successCallback(response) {
//            //console.log(JSON.stringify(response));
//            if (response.hasOwnProperty("data")) {
//                
//                var banArray=[];
//                var statusArray=[];
//                for(var ban in response.data.offender_ban_list){
//                    banArray.push({id:ban,val:response.data.offender_ban_list[ban]});
//                }
//                for(var sta in response.data.offender_status){
//                    statusArray.push(response.data.offender_status[sta]);
//                }
//                callback(true, banArray,statusArray);
//            }
//
//        }, function errorCallback(response) {
//            //console.log(response.data.error);
//            callback(false, null,null);
//        });
//    };

    }]);
BandQModule.directive("reportPage", ["$http", "$compile", function ($http, $compile) {


        var linker = function (scope, element, attr) {


            $http.get("views/page.html").then(function (response) {
                element.html(response.data);
                $compile(element.contents())(scope);
            });
        }

        return {
            restrict: "EA",
            scope: true,
            link: linker,
        }


    }]);

BandQModule.directive("fieldsDirective", ["$http", "$compile", function ($http, $compile) {

        var fieldsArray = {
            "10": "views/FieldTemplate/category_10.html",
            "31": "views/FieldTemplate/reportedBy_31.html",
            "32": "views/FieldTemplate/linkedStaff_32.html",
            "48": "views/FieldTemplate/incidentLocation_48.html",
            "55": "views/FieldTemplate/dateTime_55.html",
            "11": "views/FieldTemplate/outcome_11.html",
            "12": "views/FieldTemplate/type_12.html",
            "201": "views/FieldTemplate/actionTaken_201.html",
            "18": "views/FieldTemplate/policeInformed_18.html",
            "72": "views/FieldTemplate/respondingOfficer_72.html",
            "59": "views/FieldTemplate/issuingCivilRecovery_59.html",
            "60": "views/FieldTemplate/civilRecovery_60.html",
            "57": "views/FieldTemplate/productStock_57.html",
            "202": "views/FieldTemplate/offenderListTemplate_202.html",
            "203": "views/FieldTemplate/offenderDetailTemplate_203.html",
            "204": "views/FieldTemplate/offenderAddTemplate_204.html",
            "205": "views/FieldTemplate/selectedOffenderListTemplate_205.html",
            "54": "views/FieldTemplate/vechileInvolvedTemplate_54.html",
            "206": "views/FieldTemplate/addVehical_206.html",
            "207": "views/FieldTemplate/vehicleList_207.html",
            "310": "views/FieldTemplate/offenderTemplates_310.html",
            "208": "views/FieldTemplate/vehicleDetails_208.html",
            "209": "views/FieldTemplate/selectedVehicle_209.html",
            "210": "views/FieldTemplate/isOffenderInvolvedTemplate_210.html",
            "100": "views/FieldTemplate/doYouHaveAnyFile_100.html",
            "20": "views/FieldTemplate/additionalComment_20.html",
            "98": "views/FieldTemplate/isvictmsinvolved_98.html",
            "320": "views/FieldTemplate/vehicleTemplates_320.html",
            "330": "views/FieldTemplate/victimTemplates_330.html",
            "340": "views/FieldTemplate/witnessTemplates_340.html",
            212: "views/FieldTemplate/victimList_212.html",
            213: "views/FieldTemplate/SelectedVictim_213.html",
            214: "views/FieldTemplate/AddNewVictime_214.html",
            215: "views/FieldTemplate/VictimDetail_215.html",
            3: "views/FieldTemplate/dynamicQuestion_3.html",
            99: "views/FieldTemplate/isWitnessInvolved_99.html",
            217: "views/FieldTemplate/addNewWitness_217.html",
            218: "views/FieldTemplate/witnessList_218.html",
            219: "views/FieldTemplate/witnessDetails_219.html",
            220: "views/FieldTemplate/selectedWitness_220.html",
            221: "views/FieldTemplate/incidentList_221.html",
            225: "views/FieldTemplate/thankyouPage_225.html",
            //    222:"views/FieldTemplate/incidentdetail_222.html"
        };

        var linker = function (scope, element, attr) {
            //     //console.log("Field Id: " + scope.fieldId);
            if (scope.fieldId in fieldsArray) {
                
                $http.get(fieldsArray[scope.fieldId]).then(function (response) {
                    try{
                    element.html(response.data);
                    $compile(element.contents())(scope);
                }catch(e){
                    
                    console.log("error "+ JSON.stringify(e)+"- "+fieldsArray[scope.fieldId]);
                    console.log("error response data"+ JSON.stringify(response));
                }
                });
            }
        }

        return {
            restrict: "EA",
            scope: true,
            link: linker,
        }


    }]);


BandQModule.directive("uploadImagePreview", ["$compile", "$sce", function ($compile, $sce) {

        var linker = function (scope, element, attr) {
            //        //console.log("scope.src" + scope.src + "  scope.title " + scope.title + " scope.itemid " + scope.itemid);
            //        var itemSrc = "'"+ scope.src+"'";
            //        var innerHTML = '<div class="files_upload_wrap" ng-if="item.show != false"><div class="image"><a href="javascript:void(0);" class="cross" ng-click="spliceItem(' + scope.itemid + ')"><img src="images/cross.png"></a><img src="'+ scope.src +'" alt="docs" /></div><p>' + scope.title + '</p></div>';
            //        var innerHTML = '<div class="files_upload_wrap"><div class="image"><span class="cross" ng-click="' + scope.spliceItem(scope.itemid) + '"><img src="images/cross.png"></span><img src="'+ scope.src +'" alt="docs" /></div><p>' + scope.title + '</p></div>';

            var innerHTML = '<div class="files_upload_wrap"><div class="image"><span class="cross">';
            innerHTML += '<img src="images/cross.png"></span><img src="';
            innerHTML += $sce.trustAsResourceUrl(scope.src);
            innerHTML += '" alt="docs" /></div><p>';
            innerHTML += scope.title;
            innerHTML += '</p></div>';

            element.html($sce.trustAsHtml(innerHTML));
            $compile(element.contents())(scope);
        }

        return {
            restrict: "A",
            scope: {
                src: '@',
                title: '@',
                itemid: '@',
                spliceItem: '&'
            },
            link: linker
        }

    }]);
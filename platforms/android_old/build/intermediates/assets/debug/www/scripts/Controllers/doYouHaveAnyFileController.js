BandQModule.controller("doYouHaveAnyFileController", ['$sce', '$scope', '$rootScope', '$timeout', 'globalService', 'imageService', 'getUniqueId',
    function ($sce, $scope, $rootScope, $timeout, globalService, imageService, getUniqueId) {
        //    alert('do you have any file ctrl');

        var webUrl = constanObject.UPLOAD_DO_YOU_HAVE_ANY_FILE_URL + '10';
        var imageNum = 0;
        var uploadCount = 0;

        $scope.qmsg = "";
        $scope.pop = true;
        $scope.showAction = false;
        $scope.showUpload = 0;
        $scope.uploadStart = false;
        $scope.noUpload = false;
        $scope.items = [];
        var inOperation = false;
        var first = true;

        $scope.showHideUpload = function (it) {
            //        //console.log(it);
            if (it == 0) {
                $scope.noUpload = true;
                $scope.uploadStart = false;
            }
            $scope.showUpload = it;

        }

        $scope.spliceItem = function (id, ev) {
            //        //console.log(ev.target.attributes);
            if (ev.target.attributes[0].nodeValue != "images/cross.png")
                return false;
            //        alert('in spliceItem and id is ' + id);
            for (var i = $scope.items.length - 1; i > -1; i--) {
                if ($scope.items[i].id == id) {
                    $scope.items.splice($scope.items.indexOf($scope.items[i]), 1);
                    db.transaction(function (ctx) {
                        var query = "DELETE FROM ";
                        query += TABLE_CREATE_INCIDENT_REPORT_FILE;
                        query += " WHERE ";
                        query += FIELD_JSON_DATA;
                        query += "=";
                        query += item.src;
                        ctx.executeSql(query);
                    }, function (dbError) {
                        //console.log(dbError);
                    });
                    //                    //                    dataBaseObj.insertQuery(TABLE_CREATE_INCIDENT_REPORT_FILE, FIELD_JSON_DATA, item.src);
                    imageNum--;
                }
            }
        }

        $scope.showFileOptions = function () {
            //        pop = true;
        }

  

        $scope.pushFile = function () {
            $scope.noUpload = false;
            $scope.uploadStart = true;
            if (first) {
                first = false;
            } else if ($scope.showUpload != 1 & $scope.items.length > 0) {
                return false;
            }
            if (inOperation)
                return false;
            inOperation = true;
            $scope.showAction = true;
            //        //console.log('push file');
        }

        $scope.webRequestResponse = function (requestType, status, responseData) {
            //console.log('in web request response from doYouHaveAnyFileController.js');
            //        //console.log(responseData);

            var apiStatus = responseData.responseCode;

            if (apiStatus != 200) {
                //console.log(responseData.exception);
            } else {
                //console.log('apiStatus from  doYouHaveAnyFileController.js =  ' + apiStatus);
                uploadCount++;
                //console.log("updateCount = " + uploadCount + " $scope.items.length = " + $scope.items.length);

                if (uploadCount == $scope.items.length) {
                    //console.log('no more items to upload');
                    $scope.items = [];
                    //                break;
                } else if (uploadCount < $scope.items.length) {
                    //console.log($scope.items);
                    uploadFileUp();
                }
            }
        };

        function uploadFileUp() {
            //            if (uploadCount == $scope.items.length) return false;
            //            if (uploadCount > $scope.items.length) return false;
            //            //console.log($scope.items[uploadCount].src);
            //            var src = $scope.items[uploadCount].src;
            //            webRequestObject.fileUpload($scope, src, webUrl, constanObject.WebRequestType.FILE_UPLOAD, false);
        }

        $scope.nextButtonClicked = function () {
            //console.log("NEXT");
            //console.log('initial upload Count is ' + uploadCount);
            uploadFileUp();
            return callBack(true, 1);
        };

        $scope.action = function (n) {
            inOperation = false;
            var onlinePacket = new Array(0);
            switch (n) {
                case 1:
                    //gallary
                    showSpinner(true, true, SPINNER_MESSAGE);
                    imageNum++;

                    imageService.getMediaImage(function (item) {
                        $scope.$apply(function () {
                            $scope.showAction = false;
                            item.id = getUniqueId.getId();
                            $scope.items.push(item);


                            onlinePacket = [constanObject.FileUploadModuleId.FILE_UPLOAD.toString(), 
                                item.id.toString(), constanObject.CREATE_INCIDEN_TEMP_ID.toString(),
                                item.src.toString(), "image", "0", item.id.toString(), globalService.getUserId().toString(), "-1"];

                            //console.log(onlinePacket);

                            dataBaseObj.insertData(
                                    TABLE_CREATE_INCIDENT_REPORT_FILE,
                                    FILES_UPLOAD_KEY, onlinePacket
                                    );

                            globalService.setFileUploadsTempIds(item.id);
                            console.log("Stored Images Data : "+$scope.items);

                        });
                        window.plugins.spinnerDialog.hide();
                    });
                    break;

                case 2:
                    // camera
                    showSpinner(true, true, SPINNER_MESSAGE);
                    imageNum++;
                    imageService.getCameraImage(function (item) {
                        $scope.$apply(function () {
                            $scope.showAction = false;
                            //                        item.dSrc = item.dSrc.slice(6);
                            item.id = imageNum;
                            //                        //console.log(item);
                            $scope.items.push(item);
                            onlinePacket = [constanObject.FileUploadModuleId.FILE_UPLOAD.toString(), 
                                item.id.toString(), constanObject.CREATE_INCIDEN_TEMP_ID.toString(),
                                item.src.toString(), "image", "0", item.id.toString(), globalService.getUserId().toString(), "-1"];

                            //console.log(onlinePacket);

                            dataBaseObj.insertData(
                                    TABLE_CREATE_INCIDENT_REPORT_FILE,
                                    FILES_UPLOAD_KEY, onlinePacket
                                    );
                            //                        //console.log($scope.items);    
                        });
                        window.plugins.spinnerDialog.hide();
                    });

                    break;

                case 3:
                    // video
                    // start video capture
                    showSpinner(true, true, SPINNER_MESSAGE);
                    imageNum++;
                    $scope.showAction = false;
                    imageService.getVideo(function (item) {
                        $timeout(function () {
                            imageService.createThumb(item, function (i2) {
                                $scope.$apply(function () {
                                    i2.id = imageNum;
                                    $scope.items.push(i2);
                                    onlinePacket = [constanObject.FileUploadModuleId.FILE_UPLOAD.toString(),
                                        i2.id.toString(), constanObject.CREATE_INCIDEN_TEMP_ID.toString(),
                                        i2.src.toString(), "image", "0", item.id.toString(), globalService.getUserId().toString(), 
                                        "-1"];


                                    dataBaseObj.insertData(
                                            TABLE_CREATE_INCIDENT_REPORT_FILE,
                                            FILES_UPLOAD_KEY, onlinePacket
                                            );

                                });
                                window.plugins.spinnerDialog.hide();
                            });
                            window.plugins.spinnerDialog.hide();
                        }, 3000);
                    });

                    break;

                case 4:
                    // close
                    $scope.showAction = false;
                    window.plugins.spinnerDialog.hide();
                    break;

                default:
                    $scope.showAction = false;
                    window.plugins.spinnerDialog.hide();
                    break;
            }
        }
        var noOfPageMove = 1;
        $scope.init = function (_noOfPageMove) {
            noOfPageMove = _noOfPageMove;
          

            $scope.isOffenderInvolvedToolTipMessage = $scope.fieldData[100].question_hint;
        }

        $scope.back = function (callBack) {
            return callBack(true, noOfPageMove);
        }

    }]);

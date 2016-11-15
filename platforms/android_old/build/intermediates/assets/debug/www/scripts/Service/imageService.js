(function () {
    'use strict';
    function imageService($sce) {
    }
    var timestamp = imageService.prototype.hitCounter;
    imageService.prototype.hitCounter = 0;
    imageService.prototype.createThumb = function (item, callback) {

        //console.log(item);

        function thumbSuccess(tsd) {
            item.dSrc = tsd;
            return callback(item);
        }

        function thumbError(er) {
            //console.log('error from thumb create from video');
            //console.log(er.message);
            return callback(false);
        }

        //        vidPath = result;
        //        var imgParts = vidPath.split('/');
        //        vidName = imgParts[imgParts.length - 1];
        //        timestamp =imageService.prototype.hitCounter++;
        var thumbImg = "thumbImg_" + timestamp;

        VideoEditor.createThumbnail(
                thumbSuccess, // success cb
                thumbError, // error cb
                {
                    fileUri: item.src, // the path to the video on the device
                    outputFileName: thumbImg, // the file name for the JPEG image
                    quality: 30 // optional, quality of the thumbnail (between 1 and 100)
                }
        );
    }
    
    

    imageService.prototype.getVideoImage = function (callback) {
         showSpinner(true, true, SPINNER_MESSAGE);
        timestamp = imageService.prototype.hitCounter++;
        var thumbImg = "thumbImg_" + timestamp;
        var vidPath = "";
        var vidName = "";
        var thumbPath = "";

        var VideoEditorOptions = {
            OptimizeForNetworkUse: {
                NO: 0,
                YES: 1
            },
            OutputFileType: {
                M4V: 0,
                MPEG4: 1,
                M4A: 2,
                QUICK_TIME: 3
            }
        };

        function thumbSuccess(tsd) {

            window.plugins.spinnerDialog.hide();
            return callback({
                "id": timestamp,
                "src": vidPath,
                "dSrc": tsd,
                "title": vidName
            });
        }

        function thumbError(er) {
            window.plugins.spinnerDialog.hide();
            //console.log('error from thumb create from video');
            //console.log(er.message);
            return callback(false);
        }

        function videoTranscodeSuccess(result) {
            vidPath = result;
            var imgParts = vidPath.split('/');
            vidName = imgParts[imgParts.length - 1];

            opt = null;
            camHandler = null;

            //console.log(result, thumbImg);
            VideoEditor.createThumbnail(
                    thumbSuccess, // success cb
                    thumbError, // error cb
                    {
                        fileUri: result, // the path to the video on the device
                        outputFileName: thumbImg, // the file name for the JPEG image
                        atTime: 2, // optional, location in the video to create the thumbnail (in seconds)
                        width: 200, // optional, width of the thumbnail
                        height: 300, // optional, height of the thumbnail
                        quality: 50 // optional, quality of the thumbnail (between 1 and 100)
                    }
            );
            imgParts = null;
            result = null;
        }

        function videoTranscodeError(err) {
            //                $scope.showAction = false;
            window.plugins.spinnerDialog.hide();
            //console.log('videoTranscodeError, err: ' + err);
            return callback(false);
        }

        function captureSuccess(mediaFiles) {
            //                    debugger;
            var file = mediaFiles[0];
            var videoFileName = timestamp; // I suggest a uuid

            VideoEditor.transcodeVideo(
                    videoTranscodeSuccess,
                    videoTranscodeError, {
                        fileUri: file.fullPath,
                        outputFileName: videoFileName,
                        outputFileType: VideoEditorOptions.OutputFileType.MPEG4,
                        optimizeForNetworkUse: VideoEditorOptions.OptimizeForNetworkUse.YES,
                        saveToLibrary: true,
                        maintainAspectRatio: true,
                        width: 360,
                        height: 360,
                        videoBitrate: 1000000, // 1 megabit
                        audioChannels: 2,
                        audioSampleRate: 44100,
                        audioBitrate: 128000
                    }
            );

            file = null;
            videoFileName = null;
        }

        function captureError(error) {
            //                    debugger;
            //            alert('max file size / video length reached! Please retry');
            //console.log('error from camera video recorder');
            //console.log(error.message);
            return callback(false);
        }

        var opt = {
            limit: 1,
            destinationType: navigator.camera.DestinationType.FILE_URI,
            duration: constanObject.maxVideoLenght
        };

        var camHandler = navigator.device.capture.captureVideo(captureSuccess, captureError, opt);

        //            $scope.showAction = false;
    }

    imageService.prototype.getVideo = function (callback) {
       showSpinner(true, true, SPINNER_MESSAGE);
        timestamp = imageService.prototype.hitCounter++;
        var thumbImg = "thumbImg_" + timestamp;
        var vidPath = "";
        var vidName = "";
        var thumbPath = "";
        var VideoEditorOptions = {
            OptimizeForNetworkUse: {
                NO: 0,
                YES: 1
            },
            OutputFileType: {
                M4V: 0,
                MPEG4: 1,
                M4A: 2,
                QUICK_TIME: 3
            }
        };

        function videoTranscodeSuccess(result) {
            vidPath = result;
            var imgParts = vidPath.split('/');
            vidName = imgParts[imgParts.length - 1];

            var item1 = {
                "id": timestamp,
                "src": vidPath,
                "dSrc": vidPath,
                "title": vidName
            };
            return callback(item1);
        }

        function videoTranscodeError(err) {
            //                $scope.showAction = false;
            window.plugins.spinnerDialog.hide();
            //console.log('videoTranscodeError, err: ' + err);
            return callback(false);
        }

        function captureSuccess(mediaFiles) {
            //                    debugger;
            var file = mediaFiles[0];
            var videoFileName = timestamp; // I suggest a uuid

            //                var item1 = {
            //                    "id": timestamp,
            //                    "src": file,
            //                    "dSrc": file,
            //                    "title": file
            //                }
            //                returncallback(item1);

            VideoEditor.transcodeVideo(
                    videoTranscodeSuccess,
                    videoTranscodeError, {
                        fileUri: file.fullPath,
                        outputFileName: videoFileName,
                        outputFileType: VideoEditorOptions.OutputFileType.MPEG4,
                        optimizeForNetworkUse: VideoEditorOptions.OptimizeForNetworkUse.YES,
                        saveToLibrary: true,
                        maintainAspectRatio: true,
                        width: 360,
                        height: 360,
                        videoBitrate: 1000000, // 1 megabit
                        audioChannels: 2,
                        audioSampleRate: 44100,
                        audioBitrate: 128000, // 128 kilobits
                        progress: function (info) {
                            //                            //console.log('transcodeVideo progress callback, info: ' + info);
                        }
                    }
            );
        }

        function captureError(error) {
            //                    debugger;
            //            alert('max file size / video length reached! Please retry');
            window.plugins.spinnerDialog.hide();
            //console.log('error from camera video recorder');
            //console.log(error.message);
            return callback(false);
        }

        var opt = {
            limit: 1,
            destinationType: navigator.camera.DestinationType.FILE_URI,
            duration: constanObject.maxVideoLenght
        };

        navigator.device.capture.captureVideo(captureSuccess, captureError, opt);

        //            $scope.showAction = false;
    }

    imageService.prototype.getMediaImage = function (callback) {
        showSpinner(true, true, SPINNER_MESSAGE);
        timestamp = imageService.prototype.hitCounter++;
        //$scope.showAction = false;
        navigator.camera.getPicture(
                function (uri) {
                    var imgParts = uri.split('/');
                    var dImg = imgParts[imgParts.length - 1];
                    var item = {
                        "id": timestamp,
                        "src": uri,
                        "dSrc": uri,
                        "title": dImg
                    }
                    window.plugins.spinnerDialog.hide();
                    return callback(item);
                },
                function (e) {
                    //console.log('failed to get image');
                    //                    $scope.showAction = false;
                    window.plugins.spinnerDialog.hide();
                }, {
            quality: 50,
            destinationType: navigator.camera.DestinationType.FILE_URI,
            sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
        }
        );
    };

    imageService.prototype.getCameraImage = function (callback) {
      showSpinner(true, true, SPINNER_MESSAGE);
        timestamp = imageService.prototype.hitCounter++;
        navigator.camera.getPicture(
   function (uri) {
                var imgParts = uri.split('/');
                var dImg = imgParts[imgParts.length - 1];
                var item = {
                    "id": timestamp,
                    "src": uri,
                    "dSrc": uri,
                    "title": dImg
                }
                window.plugins.spinnerDialog.hide();
                return callback(item);
            },
            function (e) {
                //console.log("No Image Found");
                window.plugins.spinnerDialog.hide();
                return callback(false);
            }, {
                quality: 50,
                destinationType: navigator.camera.DestinationType.FILE_URI,
                correctOrientation: true,
                allowEdit: false
            }
        );
    };
    
    // push fiels to serve
      imageService.prototype.pushAll = function () {
          
     
          
      }
      
      
  
    
      

    imageService.prototype.test = "Test value from image service";

    BandQModule.filter('safeUrl', ['$sce',
        function ($sce) {
            return function (input) {
                return $sce.trustAsHtml(input);
            };
        }
    ]);

    BandQModule.service("imageService", imageService);



})();
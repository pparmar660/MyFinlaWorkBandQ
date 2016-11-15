           
BandQModule.service('dynamicQuestion', function () {

            this.action = function (n) {
                switch (n) {
                    case 1:
                        //gallary
                         showSpinner(true, true, SPINNER_MESSAGE);
                        navigator.camera.getPicture(
                                //        uploadPhoto,
                                        function (uri) {
                                            imageNum++;
                                            var imgParts = uri.split('/');
                                            var dImg = imgParts[imgParts.length - 1];
//                    var imgUri = "images/" + dImg + ".png";
//                    //console.log(imgUri);
                                            var item = {
                                                "id": imageNum,
                                                "src": uri,
                                                "dSrc": uri,
                                                "title": dImg
                                            }
                                            scope.showAction = false;
                                            scope.items.push(item);
                                            window.plugins.spinnerDialog.hide();
                                        },
                                        function (e) {
                                            //console.log('failed to get image');
                                            scope.showAction = false;
                                            window.plugins.spinnerDialog.hide();
                                        }, {
                                    quality: 50,
                                    destinationType: navigator.camera.DestinationType.FILE_URI,
                                    sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
                                }
                                );
                                break;

                            case 2:
                                // camera
                                 showSpinner(true, true, SPINNER_MESSAGE);
                                navigator.camera.getPicture(
                                        function (uri) {
                                            //                        alert(uri);
                                            imageNum++;
                                            var imgParts = uri.split('/');
                                            var dImg = imgParts[imgParts.length - 1];
//                    var imgUri = "images/" + dImg + ".png";
//                    //console.log(imgUri);
                                            var item = {
                                                "id": imageNum,
                                                "src": uri,
                                                "dSrc": uri,
                                                "title": dImg
                                            }
                                            scope.showAction = false;
                                            scope.items.push(item);
                                            window.plugins.spinnerDialog.hide();
                                        },
                                        function (e) {
                                            window.plugins.spinnerDialog.hide();
                                            //console.log("No Image Found");
                                            scope.showAction = false;
                                        }, {
                                    quality: 50,
                                    destinationType: navigator.camera.DestinationType.FILE_URI
                                }
                                );
                                break;

                            case 3:
                                // video
                                // start video capture
                               showSpinner(true, true, SPINNER_MESSAGE);
                                var timestamp = Number(new Date());
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
                                    //console.log('thumb details');
                                    //console.log(tsd);
                                    imageNum++;
//                var imgParts = uri.split('/');
//                var dImg = imgParts[imgParts.length - 1];
//                var imgUri = "images/" + dImg + ".png";
//                //console.log(imgUri);
                                    var item = {
                                        "id": imageNum,
                                        "src": vidPath,
                                        "dSrc": tsd,
                                        "title": vidName
                                    }
                                    scope.items.push(item);
                                    scope.showAction = false;
                                    window.plugins.spinnerDialog.hide();
                                }

                                function thumbError(er) {
                                    scope.showAction = false;
                                    window.plugins.spinnerDialog.hide();
                                    //console.log('error from thumb create from video');
                                    //console.log(er.message);
                                }

                                function videoTranscodeSuccess(result) {
                                    // result is the path to the transcoded video on the device
                                    //console.log('videoTranscodeSuccess, result: ' + result);
                                    vidPath = result;

                                    var imgParts = vidPath.split('/');
                                    vidName = imgParts[imgParts.length - 1];
//                    var imgUri = "images/" + dImg + ".png";
//                    //console.log(imgUri);

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
                                }

                                function videoTranscodeError(err) {
                                    scope.showAction = false;
                                    window.plugins.spinnerDialog.hide();
                                    //console.log('videoTranscodeError, err: ' + err);
                                }

                                function captureSuccess(mediaFiles) {
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
                                                audioBitrate: 128000, // 128 kilobits
                                                progress: function (info) {
                                                    //                            //console.log('transcodeVideo progress callback, info: ' + info);
                                                }
                                            }
                                    );
                                }

                                function captureError(error) {
                                    window.plugins.spinnerDialog.hide();
                                    //console.log('error from camera video recorder');
                                    //console.log(error.message);
                                }

                                var opt = {
                                    limit: 1,
                                    destinationType: navigator.camera.DestinationType.FILE_URI,
                                    duration: constanObject.maxVideoLenght
                                };

                                navigator.device.capture.captureVideo(captureSuccess, captureError, opt);

                                scope.showAction = false;
                                break;

                            case 4:
                                // close
                                scope.showAction = false;
                                break;

                            default:
                                scope.showAction = false;
                                break;
                        }

            }

});
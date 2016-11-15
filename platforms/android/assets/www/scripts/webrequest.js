

function  WebRequestApi() {
    // Common POST request to srver for entire application. Also send current lat and long with each request.
    this.postRequest = function (classObject, type, webUrl, parameters, requestType, showProgress, loderMessage) {
        if (parameters) {
            parameters.current_latitude = CURRENT_LATITUDE;
            parameters.current_longitude = CURRENT_LONGITUDE;
        }
        if (!checkNetworkConnection())
            return;
        $.ajax({
            url: webUrl,
            method: type,
            cache: false,
            data: parameters,
            beforeSend: function (xhr) {
                 window.plugins.spinnerDialog.hide();
                if (showProgress && loderMessage)
                      showSpinner(true, true, loderMessage);

                  else  if(showProgress) showSpinner(true, true, SPINNER_MESSAGE);
                var token = localStorage.getItem("token");
                if (token != null) {
                    xhr.setRequestHeader("Authorization", token);
                }
            },
            success: function (msg) {
                window.plugins.spinnerDialog.hide();
                classObject.webRequestResponse(requestType, constanObject.SUCCESS, msg);
            },
            error: function (error) {
                window.plugins.spinnerDialog.hide();
                if (error.status == 401) {
                    if (error.responseJSON.error == "token_expired") {
                        localStorage.setItem("isErrorLoginPrompt", true);
                        window.location.href = "index.html";
                    }
                }
                classObject.webRequestResponse(requestType, constanObject.ERROR, error);
            }
        });

    };

    this.postRequestSync = function (classObject, type, webUrl, parameters, requestType, showProgress,loderMessage) {
        //alert(requestType);
        ////console.log("webUrl: " + webUrl);
        ////console.log("Reqtype " + requestType + " request sent " + JSON.stringify(parameters));
        $.ajax({
            url: webUrl,
            method: type,
            cache: false,
            async: false,
            data: parameters,
            beforeSend: function (xhr) {
                if (showProgress) {
                if (loderMessage)
                      showSpinner(true, true, loderMessage);
                  else if(showProgress) showSpinner(true, true, SPINNER_MESSAGE);
                 
                }
                var token = localStorage.getItem("token");
                if (token != null) {
                    xhr.setRequestHeader("Authorization", token);
                }

            },
            success: function (msg) {
                ////console.log("Reqtype " + requestType + " response of sucess " + JSON.stringify(msg));
                window.plugins.spinnerDialog.hide();

//                if (document.getElementById("pageReadyLoder"))
//                    document.getElementById("pageReadyLoder").style.visibility = "hidden";
                classObject.webRequestResponse(requestType, constanObject.SUCCESS, msg);


            },
            error: function (error) {

                ////console.log("Reqtype " + requestType + " response of error " + JSON.stringify(error));
                window.plugins.spinnerDialog.hide();

                if (error.status == 401) {
                    if (error.responseJSON.error == "token_expired") {
                        localStorage.setItem("isErrorLoginPrompt", true);
                        window.location.href = "index.html";
                    }
                }
//                if (document.getElementById("pageReadyLoder"))
//                    document.getElementById("pageReadyLoder").style.visibility = "hidden";
                classObject.webRequestResponse(requestType, constanObject.ERROR, error);
            }
        });

    }


    this.postRequestJSON = function (classObject, type, webUrl, parameters, requestType, showProgress) {
        //alert(requestType);
        ////console.log("webUrl: " + webUrl);

         if (parameters) {
            parameters.current_latitude = CURRENT_LATITUDE;
            parameters.current_longitude = CURRENT_LONGITUDE;
        }
        $.ajax({
            url: webUrl,
            method: type,
            data: parameters,
            cache: false,
            beforeSend: function (xhr) {
                if (showProgress)
                    window.plugins.spinnerDialog.show();
                var token = localStorage.getItem("token");
                if (token != null) {
                    xhr.setRequestHeader("Authorization", token);
                }
                xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
            },
            success: function (msg) {
                if (showProgress)
                    window.plugins.spinnerDialog.hide();
                classObject.webRequestResponse(requestType, constanObject.SUCCESS, msg);

                // ////console.log(requestType+ " Response of success : "+JSON.stringify(msg));
            },
            error: function (error) {
                if (showProgress)
                    window.plugins.spinnerDialog.hide();
                // ////console.log(requestType+ " Response of error  : "+JSON.stringify(error));

                classObject.webRequestResponse(requestType, constanObject.ERROR, error);
            }
        });

    }







    this.fileUpload = function (classObject, imageURI, weburl, fileKey, requestType, showProgress) {

        if (!imageURI)
            return;

        ////console.log("imageURI : " + imageURI + "\n weburl: " + weburl + "\n requestType: " + requestType);
        var ft = new FileTransfer();
        var options = new FileUploadOptions();
        options.fileKey = fileKey;
        //options.vechileData = parameters;
        options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
        options.mimeType = "image/jpeg";
        options.headers = {"Authorization": localStorage.getItem("token")}
        showSpinner(true, true, SPINNER_MESSAGE);
        ft.upload(imageURI, weburl, onSuccess, onError, options);
        function onSuccess(msg) {
            window.plugins.spinnerDialog.hide();
            classObject.webRequestResponse(requestType, constanObject.SUCCESS, msg);
        }
        function onError(error) {
            window.plugins.spinnerDialog.hide();
            classObject.webRequestResponse(requestType, constanObject.ERROR, error);
        }
    }

    this.fileUploadForImages = function (classObject, imageURI, weburl, fileKey, requestType, optionData) {

        //////console.log("imageURI : " + imageURI + "\n weburl: " + weburl + "\n requestType: " + requestType);

        if (!imageURI)
            return;
        var ft = new FileTransfer();
        var options = new FileUploadOptions();
        options.fileKey = fileKey;
        options.isProfileImage = optionData.isProfileImage;
        options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
        options.mimeType = "image/jpeg";
        options.headers = {"Authorization": localStorage.getItem("token")}
        showSpinner(true, true, SPINNER_MESSAGE);
        ft.upload(imageURI, weburl, onSuccess, onError, options);
        function onSuccess(msg) {
            window.plugins.spinnerDialog.hide();
            classObject.webRequestResponse(requestType, constanObject.SUCCESS, msg);
        }
        function onError(error) {
            window.plugins.spinnerDialog.hide();
            classObject.webRequestResponse(requestType, constanObject.ERROR, error);
        }
    }


    this.fileUploadWithOption = function (classObject, imageURI, weburl, requestType, optionData, showProgress) {

        var ft = new FileTransfer();
        showSpinner(true, true, SPINNER_MESSAGE);


        var params = {};
        var options = new FileUploadOptions();

        params.moduleId = optionData.moduleId;
        params.tempId = optionData.tempId;
        params.type = optionData.type;
        options.params = params;

        options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
        options.mimeType = "image/jpeg";
        options.headers = {"Authorization": localStorage.getItem("token")}

        ft.upload(imageURI, weburl, onSuccess, onError, options);
        function onSuccess(msg) {
            window.plugins.spinnerDialog.hide();
            classObject.webRequestResponse(requestType, constanObject.SUCCESS, msg);
        }
        function onError(error) {
            window.plugins.spinnerDialog.hide();
            classObject.webRequestResponse(requestType, constanObject.ERROR, error);
        }
    }

    this.fileUploadPdfFile = function (classObject, imageURI, weburl) {

        var ft = new FileTransfer();
        var options = new FileUploadOptions();

        options.fileKey = "image_user";
        options.fileName = "file.pdf";// imageURI.substr(imageURI.lastIndexOf('/') + 1);
        options.mimeType = "text/plain";
        options.headers = {"Authorization": localStorage.getItem("token")}
        //  ////console.log(JSON.stringify(options));
        showSpinner(true, true, SPINNER_MESSAGE);
        ft.upload(imageURI, weburl, onSuccess, onError, options);
        function onSuccess(msg) {
            alert("sucess " + JSON.stringify(msg));
            window.plugins.spinnerDialog.hide();
            classObject.webRequestResponse("", constanObject.SUCCESS, msg);
        }
        function onError(error) {
            alert("error " + JSON.stringify(error));
            window.plugins.spinnerDialog.hide();
            classObject.webRequestResponse("", constanObject.ERROR, error);
        }
    }
}
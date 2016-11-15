BandQModule.service('compossMail', function ($rootScope, $timeout) {
    var self = this;
    var filesUploaded;
    var mailId = -1;
    $rootScope.isMessageSend = false;
    this.compossMailData = function (data, attachment, type, url) {
        $rootScope.attachFile = attachment;
        console.log(JSON.stringify(data));
        totalNoOfFiles = $rootScope.attachFile.length;
        filesUploaded = 0;
        mailId = -1;
        $rootScope.isDraftMessage = data.is_draft;
        webRequestObject.postRequest(self, "POST", url, data, type, true);

    };

    this.webRequestResponse = function (requestType, status, responseData) {

        if (status == constanObject.SUCCESS) {
            switch (requestType) {
                case constanObject.WebRequestType.COMPOSS_MAIL:
                    //  console.log(JSON.stringify(responseData));
                    window.scrollTo(0,0);
                    mailId = responseData.data.id;
                    filesUploaded = 0;
                    if (totalNoOfFiles > 0) {
                         window.plugins.spinnerDialog.show();
                        self.sendAttachmentToServer(filesUploaded, mailId);
                    }
                    else {
                        window.plugins.spinnerDialog.hide();
                        $rootScope.showCompose = false;
                        $rootScope.isMessageSend = true;
                        if ($rootScope.isDraftMessage == 0)
                            $rootScope.sentMessage = 'Your message has been sent.';
                        else
                            $rootScope.sentMessage = 'Your message has been saved.';


                        setTimeout(function () {
                            var scope = angular.element('#commsAndTask_34').scope();
                            scope.$apply(function () {
                                $rootScope.isMessageSend = false;
                            });

                        }, 10000);
                    }

                    break;

                case constanObject.WebRequestType.COMPOSS_MAIL_ATTACHMENT:
                    filesUploaded++;
                    if (filesUploaded < totalNoOfFiles) {
                        self.sendAttachmentToServer(filesUploaded, mailId);
                    }
                    else {
                        window.plugins.spinnerDialog.hide();
                        $rootScope.showCompose = false;
                        $rootScope.isMessageSend = true;
                        if ($rootScope.isDraftMessage == 0)
                            $rootScope.sentMessage = 'Your message has been sent.';
                        else
                            $rootScope.sentMessage = 'Your message has been saved.';

                        setTimeout(function () {
                            var scope = angular.element('#commsAndTask_34').scope();
                            scope.$apply(function () {
                                $rootScope.isMessageSend = false;
                            });

                        }, 10000);
                    }
                    break;

            }


        } else {
            showErrorAlert(requestType, responseData);
        }

    };

    var totalNoOfFiles;

    this.sendAttachmentToServer = function (no, mailId) {
        var webUrl = constanObject.COMPOSS_MAIL_ATTACHMENT + mailId;
        webRequestObject.fileUpload(self, $rootScope.attachFile[no].src, webUrl, "image_users", constanObject.WebRequestType.COMPOSS_MAIL_ATTACHMENT, false);

    };
});
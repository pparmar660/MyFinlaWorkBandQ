BandQModule.service('messageFilter', function () {

    var self = this;
    var messageCallBack;
    var messageCountCallBack;
    this.getMessage = function (pageno, url, parameters, callback) {
        var apiUrl = url + "?page=" + pageno;
        messageCallBack = callback;
        webRequestObject.postRequest(this, "GET", apiUrl, parameters, constanObject.WebRequestType.COMMS_AND_TASK, true);
    };
    this.getUnreadMessageCount = function (url, callback) {
        messageCountCallBack = callback;
        webRequestObject.postRequest(this, "GET", url, null, constanObject.WebRequestType.UNREAD_MESSAGE_COUNT, false);
    };

    this.webRequestResponse = function (requestType, status, response) {

        switch (requestType) {
            case constanObject.WebRequestType.COMMS_AND_TASK:
                if (status == constanObject.ERROR)
                    return messageCallBack(false, JSON.parse(response.responseText).error);
                else
                    messageCallBack(true, response);
                break;
            case constanObject.WebRequestType.UNREAD_MESSAGE_COUNT:
                if (status == constanObject.ERROR)
                    return messageCountCallBack(false, JSON.parse(response.responseText).error);
                else
                    messageCountCallBack(true, response);
                break;
              
        }
    };

});

BandQModule.service('MessageView', function () {

    this.getMessageDetail = function (messageId, url, callback) {
        var urll = url + "/" + messageId;
        webRequestObject.postRequest(this, "GET", urll, null, constanObject.WebRequestType.VIEW_MESSAGE, true);

        this.webRequestResponse = function (requestType, status, responseData) {
            if (status == constanObject.ERROR) {
                return callback(false, JSON.parse(responseData.responseText).error);
            }
            switch (requestType) {
                case constanObject.WebRequestType.VIEW_MESSAGE:
                    if (status) {
                        //console.log("messageDetail" + JSON.stringify(responseData));
                        return callback(true, responseData);

                    }
                    break;
            }
        };
    };

});

BandQModule.filter('strLimit', ['$filter', function ($filter) {
        return function (input, limit) {
            if (!input)
                return;
            if (input.length <= limit) {
                return input;
            }

            return $filter('limitTo')(input, limit);
        };
    }]);






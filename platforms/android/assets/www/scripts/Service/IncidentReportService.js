BandQModule.service('IncidentReport', function () {

    var self = this;
    var callBackIncidentStatus, callBackDetail, callBackList;

    this.getIncidentReportStatus = function (callback, type) {
        if (!type)
            type = "";
        callBackIncidentStatus = callback;
        webRequestObject.postRequest(self, "GET", constanObject.INCIDENT_STATUS + type, null, 1101, true);

    };
    this.getIncidentReportList = function (url, type, page, parameter, callback) {
        var url_ = url + "?page=" + page;
        if (type)
            if (type.length > 0)
                url_ = url + type + "&page=" + page;

        callBackList = callback;
        webRequestObject.postRequest(self, "GET", url_, parameter, 1102, true);

    };

    this.getIncidentReportDetail = function (incident_id, callback) {
        callBackDetail = callback;
        webRequestObject.postRequest(self, "GET", constanObject.INCIDENT_DETAIL + incident_id, null, 1103, true);

    }

    this.webRequestResponse = function (requestType, status, responseData) {

        switch (requestType) {
            case 1101:
                if (status == constanObject.ERROR)
                    return callBackIncidentStatus(false, JSON.parse(responseData.responseText).error);
                    return callBackIncidentStatus(true, responseData.data);
                break;

            case 1102:
                if (status == constanObject.ERROR)
                    return callBackList(false, JSON.parse(responseData.responseText).error);
                  return callBackList(true, responseData.data, responseData.count, responseData.last_page,responseData.list_type);
                  //  return callBackList(true, responseData.data);
                break;
            case 1103:
                if (status == constanObject.ERROR)
                    return callBackDetail(false, JSON.parse(responseData.responseText).error);
                    return callBackDetail(true, responseData.data);
                break;

        }
    }


});

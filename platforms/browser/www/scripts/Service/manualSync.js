BandQModule.service("manualSync", function (loadDynamicQuestionAndIncidentConfig,
        filterData, userConfig, toolTipDownload, getListIncidentReportFieldLabels, getAllFieldLabel,
        getVictimWitnessCategory, getLinkedStaffList, getCategoryOutcomeType, getAdvanceFilter,
        getCountryStateRegion,
        getPoliceList, getVenueList, getSwasAreaList) {
    this.isAfterLoginPageupdateData = false;

    this.updateData = function () {


        loadDynamicQuestionAndIncidentConfig.loadDataOnManualSync();
        filterData.downloadDataAsync();
        userConfig.getUserConfig();
        toolTipDownload.download();
        getListIncidentReportFieldLabels.download();
        getAllFieldLabel.download();
        getVictimWitnessCategory.download();
        getLinkedStaffList.download();
        getCategoryOutcomeType.download();
        getAdvanceFilter.download();
        getCountryStateRegion.download();
        getPoliceList.download();
        getVenueList.download();
        getSwasAreaList.download();



    }

    this.AfterLoginPageupdateData = function () {

        if (this.isAfterLoginPageupdateData)
            return;
        this.isAfterLoginPageupdateData = true;
        globalHideDowloadLoder = true;
        filterData.downLoadData();
        toolTipDownload.download();
        getListIncidentReportFieldLabels.download();
        getAllFieldLabel.download();
        getVictimWitnessCategory.download();
        getLinkedStaffList.download();
        getCategoryOutcomeType.download();
        getAdvanceFilter.download();
        getCountryStateRegion.download();
        getPoliceList.download();
        getVenueList.download();
        getSwasAreaList.download();
        setTimeout(function () {
            globalHideDowloadLoder = false;
        }, 1000);


    }




});
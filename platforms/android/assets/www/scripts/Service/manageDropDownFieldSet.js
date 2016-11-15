BandQModule.service('manageDropDownFieldSet', function (globalService) {

        this.setDropDownFieldSet = function (hildeFieldSetArray) {
        var scope = angular.element('#incidenctCreateMainId').scope();
        // set dron down of bread crum -----------------START-------------------
        if (globalService.getTypeId() > -1) {
            for (var t2 = 0; t2 < scope.breadCrumDropDownFielsSet.length; t2++)
            {
                var exit = false;
                for (var t1 = 0; t1 < hildeFieldSetArray.length; t1++)
                {
                    if (hildeFieldSetArray[t1] == scope.breadCrumDropDownFielsSet[t2].pk_incident_report_fieldset) {
                        scope.breadCrumDropDownFielsSet[t2].show = false;
                        exit = true;
                        break;
                    }
                }

                if (!exit)
                    scope.breadCrumDropDownFielsSet[t2].show = true;
            }
        }

        //----------------------------------------------END------------------------------------


    }



});
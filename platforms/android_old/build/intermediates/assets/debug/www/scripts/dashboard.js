BandQModule.config(['$routeProvider', function ($routeProvider) {

        $routeProvider.
                when('/dashboard', {templateUrl: 'views/dashboardView.html', controller: 'dashboardCtrl'}).
                when('/incidentView', {templateUrl: 'incidentMainDiv.html', controller: 'incidentListMainCnt'}).
                when('/createIncident', {templateUrl: 'main.html', controller: 'appMainController'}).
                when('/security', {templateUrl: 'views/security.html', controller: 'securityCtrl'}).
                when('/commsTasks', {templateUrl: 'views/commsTask/commsTaskHome.html', controller: 'commsTaskCtrl'}).
                when('/employmentHome', {templateUrl: 'employmentHome.html',controller:"employmentHomeController"}).
                when('/employmentMain', {templateUrl: 'views/Employment/employmentMain.html',controller:"employmentmainCtrl"}).
                when('/resources', {templateUrl: 'views/resources.html', controller: 'resourcesCtrl'}).
                when('/reporting', {templateUrl: 'views/reporting.html', controller: 'reportingCtrl'}).
                when('/offenderView', {templateUrl: 'views/security/offenderList.html'}).
                when('/vehicle', {templateUrl: 'views/security/vehicle.html'}).
                when('/securityVictimwitness', {templateUrl: 'views/security/victimWitness_security.html', controller: 'victimWitness_securityCtrl'}).
                when('/inboxView', {templateUrl: 'views/commsTask/inboxView.html', controller: 'commsInboxCtrl'}).
                when('/taskAndCheckList', {templateUrl: 'views/commsTask/tasksAndChecklist.html', controller: 'taskAndCheckList'}).
                otherwise({redirectTo: '/dashboard'});

    }]);


$(document).ready(function () {
    webRequestObject = new WebRequestApi();
    dataBaseObj = new LocalDataBase();
  
});


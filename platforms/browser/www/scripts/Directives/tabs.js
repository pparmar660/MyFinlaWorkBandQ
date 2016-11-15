BandQModule.directive('tabs', function ($rootScope) {
    return {
        restrict: 'E',
        transclude: true,
        scope: {},
        controller: ["$scope", function ($scope) {
                var panes = $scope.panes = [];

                $scope.select = function (pane) {
                    angular.forEach(panes, function (pane) {
                        pane.selected = false;
                    });
                    pane.selected = true;

                    $rootScope.$broadcast('myTabSelectEvent', {
                        pane: pane // send whatever you want
                    });

                }

                this.addPane = function (pane) {
                    if (panes.length == 0)
                        $scope.select(pane);
                    panes.push(pane);
                }

                this.selectTab = function (pane) {
                    angular.forEach(panes, function (pane) {
                        pane.selected = false;
                    });
                    pane.selected = true;


                }

            }],
        template:
                '<div class="tabbable">' +
                '<ul class="nav nav-tabs">' +
                '<li ng-repeat="pane in panes" ng-class="{active:pane.selected}">' +
                '<a href="" ng-click="select(pane)">{{pane.title}}</a>' +
                '</li>' +
                '</ul>' +
                '<div class="tab-content" ng-transclude></div>' +
                '</div>',
        replace: true
    };
}).
        directive('pane', function () {
            return {
                require: '^tabs',
                restrict: 'E',
                transclude: true,
                scope: {title: '@'},
                link: function (scope, element, attrs, tabsCtrl) {
                    tabsCtrl.addPane(scope);

                    scope.tabsCtrl = tabsCtrl;

                },
                controller: ["$scope", function ($scope) {

                        var thisObj = $scope;
                        $scope.test = function () {

                            thisObj.tabsCtrl.selectTab(thisObj);

                        }

                    }],
                template:
                        '<div class="tab-pane" ng-class="{active: selected}">' +
                        '<div class="responsiveTabTitle" ng-click="test();">{{title}}<span class="caret-icon"></span>' +
                        '</div>' +
                        '<div class="tab-pane" ng-class="{active: selected}" ng-transclude>' +
                        '</div>' +
                        '</div>',
                replace: true
            };
        })
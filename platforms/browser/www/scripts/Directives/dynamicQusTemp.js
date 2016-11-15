BandQModule.directive('toggleClass', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('click', function() {
                element.toggleClass(attrs.toggleClass);
            });
        }
    };
});

BandQModule.directive('ngTouch', function(){
    return {
        link: function($scope, element) {
           element.on('click', function(event){
                //console.log('testListenToClick#onClick; event:', event);
            });
        }
    };
});
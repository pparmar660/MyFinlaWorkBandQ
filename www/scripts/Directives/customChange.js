BandQModule.directive('customChange', function($parse, $rootScope) {
  return {
    compile: function(elem, attr) {
      var fn = $parse(attr.customChange);
      return function(scope, elem) {
        elem.on('change', function(e) {
          fn(scope, {$event: e});
          scope.$apply();
        });
      };
    }
  };
});


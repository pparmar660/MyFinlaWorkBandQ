//
//BandQModule.directive("productStockRow", ["$compile", "$http", function ($compile, $http) {
//    var templateArray = ["views/ProductStockDirectiveTemplate/AddEditRow.html", "views/ProductStockDirectiveTemplate/SavedItemRow.html"];
//    var getTemplate = function (id) {
//        var template = "";
//        
//        switch (id) {
//
//            case "add":
//                return templateArray[0];
//                break;
//            case "save":
//                return templateArray[1];
//                break;
//        }
//
//    }
//
//    var linker = function (scope, element, attrs) {
//
//        //console.log(scope.item + "--");
//
//          
//
//        $http.get(getTemplate(scope.item.rowType)).then(function (response) {
//            element.html(response.data);
//            $compile(element.contents())(scope);
//        });
//    }
//
//    return {
//        restrict: 'EA',
//        link: linker,
//        scope: true,
//        
//    };
//
//}]);
//
//
//
//BandQModule.directive('myDirective', [function () {
//    return {
//        restrict: 'A',
//        scope: true,
//        link: function (scope, element, attr, ctrl) {
//            scope.$watch(attr.ngModel, function (newValue) {
//                if (newValue > 7) {
//                    //alert("yes");
//                 //console.log("1yes "+newValue);
//                 //console.log("1yes 2 "+scope.item.incident_recoverd_quantity);
//                } else {
//                    //console.log("no");
//                }
//            })
//             scope.$watch('item.incident_recoverd_quantity', function (newValue) {
//                if (newValue > 7) {
//                    //alert("yes");
//                 //console.log("2yes "+newValue);
//                 //console.log("2yes 2 "+scope.item.incident_unitValue);
//                } else {
//                    //console.log("no");
//                }
//            })
///*scope.$watch('inputs', function (newValue, oldValue) {
//   for(var i = 0; i < newValue.length; i++) {
//      if(newValue[i].incident_recoverd_quantity != oldValue[i].incident_recoverd_quantity)
//        var indexOfChangedItem = i;
//      //console.log(indexOfChangedItem);
//      //console.log("cccc"+scope.inputs[indexOfChangedItem].incident_unitValue);
//      scope.inputs[indexOfChangedItem].incident_recoverd_quantity=scope.inputs[indexOfChangedItem].incident_unitValue;
//        //bla-bla-bla
//   }
//}, true);*/
//        }
//    };
//}]);

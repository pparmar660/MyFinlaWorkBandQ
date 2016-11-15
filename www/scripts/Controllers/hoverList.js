BandQModule.controller("hoverList", function($scope) {
                  $scope.os = [{
                    "id": 1
                  }, {
                    "id": 2
                  }, {
                    "id": 3
                  }, {
                    "id": 4
                  }, {
                    "id": 5
                  }, {
                    "id": 6
                  }, {
                    "id": 7
                  }, {
                    "id": 8
                  }];
                  var osStart = $scope.os;

                  var prevSelected = null;
                  var nextSelected = null;

                  function clearAll() {
                    $scope.os = osStart;
                  };

                  var innerHit = false;
                  $scope.select = function() {

                 //   //console.log(arguments);
                    if (innerHit) {
                      innerHit = false;
                      return;
                    } else {
                      if (arguments[1] == 3) {
                        innerHit = true;
                      }

                      if (prevSelected == null) {
                        prevSelected = arguments[0];
                        $scope.os[arguments[0]].showOne = true;
                      } else if (prevSelected == arguments[0]) {
                        nextSelected = prevSelected;
                        if ($scope.os[nextSelected].showOne == true & innerHit) {
                          if ($scope.os[nextSelected].showTwo == true) {
                            $scope.os[nextSelected].showTwo = false;
                            $scope.os[nextSelected].showOne = false;
                          } else {
                            $scope.os[arguments[0]].showTwo = true;
                          }
                        }else{
                        ////console.log('catch 1');
                         if($scope.os[nextSelected].showOne == true & !innerHit){
                            $scope.os[nextSelected].showOne = false;
                         }else{
                            $scope.os[nextSelected].showOne = true;
                         }
                        
                        }
                      } else if (prevSelected != arguments[0]) {
                        nextSelected = arguments[0];
                        if ($scope.os[prevSelected].showTwo != true) {
                          $scope.os[prevSelected].showOne = false;
                        //  //console.log('catch 2');
                        }
                        if (innerHit) {
                          $scope.os[nextSelected].showOne = false;
                          $scope.os[nextSelected].showTwo = false;
                        } else {
                          prevSelected = nextSelected;
                          $scope.os[prevSelected].showOne = true;
                        }
                      } else {
                        clearAll();
                        $scope.os[arguments[0]].showOne = true;
                      }
                    }
                  }
                });
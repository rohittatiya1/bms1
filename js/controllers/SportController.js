    mainApp.controller('SportController', function($scope, $location, SharedProperties) {
        

      /* default text of button */
      $scope.buttontxt = "Select Sport";
      $scope.sport = SharedProperties.getSport();
        
      
      var count = 0;
       
      //Get Previous Event //
      $scope.prevSport = function() {
          if (typeof $scope.sport === "undefined" || $scope.sport.length < 1) {
            return; //if sport is undefined
          } else {
            count--;
            if (count === -1) {
              count = $scope.sport.length - 1; //if user select previous button at start

            }
            $scope.buttontxt = $scope.sport[count].sport_name;
          }
        }
        //////////////////////////

      // Get Next Event //
      $scope.nextSport = function() {
          if (typeof $scope.sport === "undefined" || $scope.sport.length < 1) {
            return; //if sport is undefined
          } else {
            count++;
            if (count === $scope.sport.length) {
              count = 0; //if user select next at end
            }
            $scope.buttontxt = $scope.sport[count].sport_name;
          }
        }
    ///////////////////////////

      //go to next page page//
      $scope.eventClicked = function() {
          if (!($scope.buttontxt === "Select Sport")) {
            sessionStorage.setItem("sport", $scope.buttontxt);
            sessionStorage.setItem("s_id", $scope.sport[count].sport_id);
            $location.path('/event');
          }
        }
    ////////////////////////////
      
      
    });
    mainApp.controller('EventController', function($scope, $location, $firebaseArray) {
      var result = [];  
      //get sport Name & sport id from previous page and events and country
      $scope.sport = sessionStorage.getItem("sport");
      $scope.s_id = sessionStorage.getItem("s_id");
      $scope.event = JSON.parse(sessionStorage.getItem("eventArr"));
      $scope.country = JSON.parse(sessionStorage.getItem("countryArr"));
      //////////////////////////////////////////////////////////////////////////

      /* get Event which are valid */
      for (item = 0; item < $scope.event.length; item++) {
        if ($scope.s_id === $scope.event[item].sport_id) {
          //get system date for comparison
          var sysDate = new Date();

          var dt = $scope.event[item].event_datetime.substring(0, 10);
          $scope.time = $scope.event[item].event_datetime.substring(11);

          $scope.dt = new Date(dt);

          /*push Event based on valid date*/
          if (sysDate < $scope.dt)
            result.push($scope.event[item]); //push valid event in result
        }
      }
      if (typeof result === "undefined" || result.length < 1) {
        $scope.place = "No Tournament";
      }
      /*code ended here*/

      $scope.button1txt = "Select Match";
      var count = 0;

      //goto previous screen//
      $scope.gotoEvent = function() {
          $location.path('/');
        }
        ////////////////////////

      //select previous match
      $scope.prevMatch = function() {
          if (typeof result === "undefined" || result.length < 1) {
            return; //if no tournament
          }
          count--;
          if (count === -1) {
            count = result.length - 1; //if user select previous button at start
          }
          $scope.button1txt = result[count].event_type;
          $scope.date = result[count].event_datetime;
          item = 0;
          while (result[count].country_id != $scope.country[item].country_id) {
            item++; //match address details related to that event
          }
          $scope.place = $scope.country[item].adress_format;
          $scope.city = $scope.country[item].city_name;
        }
        /////////////////////////////////

      //select next match//
      $scope.nextMatch = function() {
          if (typeof result === "undefined" || result.length < 1) {
            return; //if no turnament
          }
          count++;
          if (count == result.length) {
            count = 0; //if user select next at end
          }
          $scope.button1txt = result[count].event_type;
          $scope.date = result[count].event_datetime;
          item = 0;
          while (result[count].country_id != $scope.country[item].country_id) {
            item++; //match address details related to that event
          }
          $scope.place = $scope.country[item].adress_format;
          $scope.city = $scope.country[item].city_name;
        }
        ///////////////////////////////////////////

      //select map page//
      $scope.gotoMap = function() {
          if (!($scope.button1txt === "Select Match")) {
            //alert(result[count].event_id);
            sessionStorage.setItem("e_id", result[count].event_id);
            $location.path('/seat_category');
          }
        }
        ////////////////////////////////////////////////////////
    });
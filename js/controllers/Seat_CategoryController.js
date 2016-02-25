   /* Category selection controller */
    mainApp.controller('Seat_CategoryController', function($scope, $uibModal, $log, $firebaseArray) {
      /* getting event id from match selection page */
      $scope.eventId = sessionStorage.getItem("e_id");
        
      /* setting event id to use on popup window */
      sessionStorage.setItem("popup",$scope.eventId);
              
      var seatResult = [];
      var seat = [];
      var backcolor = [];
      var i;
      /* Firebase URL to retrive all categories */
      var seatCatRef = new Firebase("https://sportsdataevent.firebaseio.com/seat_category");
      var list = $firebaseArray(seatCatRef);
      list.$loaded().then(function() {
          $scope.seatList = list;
          for (i = 0; i < $scope.seatList.length; i++) {
            if ($scope.eventId === $scope.seatList[i].event_id)
            /*Pushing data in seat array*/
              seat.push($scope.seatList[i]);
          }
        })
        .catch(function(error) {
          console.log("Error:", error);
        });
      $scope.animationsEnabled = true;
      /* Called function from categoryselection.html it passes sm and stand name that you clicked */
      $scope.open = function(size, name) {
        for (i = 0; i < seat.length; i++) {
          /* compared event_id of selected event with firebase event_id and selected category with firebase category */
          if (seat[i].seat_cat === name && $scope.eventId === seat[i].event_id) {
            if (parseInt(seat[i].Avai_seat) === 0) {
                sessionStorage.setItem("seat_cat_id",seat[i].seat_cat_id);
            } else {
              /*Popup window showing */
              var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'view/CategoryPopup.html',
                controller: 'CategoryPopupCtrl',
                size: size,
                resolve: {
                  /* passing stand name to category popup controller */
                  name: function() {
                    return name;
                  }
                }
              });


            }


          }


        }


      };
      /* Making popup window animation true or false */
      $scope.toggleAnimation = function() {
        $scope.animationsEnabled = !$scope.animationsEnabled;
      };
      /* Function gets call from categorySelection.html div structure */
      $scope.set_color = function(name1) {

        for (var i = 0; i < seat.length; i++) {
          /*if seats are not available apply red */
          if (parseInt(seat[i].Avai_seat) == 0 && seat[i].seat_cat == name1) {
            return {
              "background-color": "#FF0000"
            };
          }
          /* if seats are avilable apply green color*/
          if (parseInt(seat[i].Avai_seat) > 0 && seat[i].seat_cat == name1) {
            return {
              "background-color": "#228B22"
            };
          }
        }

      };

    });
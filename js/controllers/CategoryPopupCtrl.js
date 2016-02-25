    /*Popup controller*/
    mainApp.controller('CategoryPopupCtrl', function($scope, $uibModalInstance, $location, $firebaseArray, name) {
      /*Event name gets from category selection controller*/
      $scope.eventId = sessionStorage.getItem("popup");
      /*stand Name passed in resolve from Category Selection Controller */
      $scope.seatCat = name;
      /*Firebase URL to fetch data */
      var catref = new Firebase("https://sportsdataevent.firebaseio.com/seat_category");
      var catdata = $firebaseArray(catref);
      /*Loads all data in array */
      catdata.$loaded().then(function() {
          $scope.messages = catdata;
          for (var i = 0; i < catdata.length; i++) {
            /* Compared last page selected event_id and selected stand with firebase Event_id and stand */
            if ($scope.seatCat === catdata[i].seat_cat && $scope.eventId === catdata[i].event_id) {
              $scope.cat = catdata[i].seat_cat;
              $scope.price = catdata[i].price;
            }

          }

        })
        /* display error on console */
        .catch(function(error) {
          console.log("Error:", error);
        });


      /* iterating up to max seats and display total amount on popup window  */
      var count = 0;
      $scope.button2txt = "Seat";
        $scope.total;
      $scope.prevSeat = function() {
        count--;
        if (count <= -1 || count === 0) {
          count = 0;
          count = parseInt(catdata[count].max_seat_limit);
        }

        $scope.button2txt = count;
        $scope.total=parseInt($scope.price)*count;

      }
      $scope.nextSeat = function() {
        count++;
        if (parseInt(catdata[count].max_seat_limit) + 1 === count) {
          count = 1;
        }
        $scope.button2txt = count;
        $scope.total=parseInt($scope.price)*count;


      }

      /* Click on OK button to navigate to next page */

      $scope.ok = function(data) {
        /* validation to seat selection on popup */
        if ($scope.button2txt == "Seat") {
          document.getElementById("seatselection").innerHTML = "select seat";
        } else {
          for (var i = 0; i < catdata.length; i++) {

            /* validation for seat selection if user select more seats than available seats in firebase*/
            if (catdata[i].seat_cat === $scope.seatCat && $scope.eventId === catdata[i].event_id && catdata[i].Avai_seat < data) {


              document.getElementById("seatselection").innerHTML = "seats are not available";

            }
            /* updating data in firebase */
              
            if (catdata[i].seat_cat === $scope.seatCat && $scope.eventId === catdata[i].event_id && catdata[i].Avai_seat >= data) {
              /* substracting from available seats in firebase */
              var item = catdata.$getRecord(catdata[i].$id);
              item.Avai_seat = (parseInt(catdata[i].Avai_seat) - data);
              catdata.$save(item);
                
              /* adding in booked ticket in firebase */
              var item2 = catdata.$getRecord(catdata[i].$id);
              item2.booked_seat = (parseInt(catdata[i].booked_seat) + data);
              catdata.$save(item2);
                
                //url to get data of order firebase 
                var orderref=new Firebase("https://sportsdataevent.firebaseio.com/order");
                
                $scope.orderobj=$firebaseArray(orderref);
                //generate random id for order 
                var orderid=Math.round(Math.random()*100000000);
                console.log(orderid);
                var orderjson=
                    {
                        
                        "event_id":$scope.eventId,
                        "no_of_seat":data,
                        "order_id":orderid,
                        "order_status":"True",
                        "service_charge":"3.0",
                        "total":$scope.total
                        
                    };
                console.log(JSON.stringify(orderjson));
                //now push data into order ref 
             orderref.push(orderjson);
                
                //passing order_id and total amount to the customer detail page
                sessionStorage.setItem("order_id",orderjson.order_id);
                sessionStorage.setItem("total_amount",orderjson.total);
                sessionStorage.setItem("servicecharge",orderjson.service_charge);

              $uibModalInstance.dismiss('OK');

              $location.path('/customer');



            }



          }

        }

      };

      /* Click on Cancel to stay on same page */
      $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
      };

    });
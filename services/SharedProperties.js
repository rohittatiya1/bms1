    mainApp.factory('SharedProperties', function(FIREBASE_URI, $firebaseArray) {
      var ref = new Firebase(FIREBASE_URI);  //get firebase reference
      var sportRef = ref.child("sport");  //get sport reference
        
/*  $scope.delay = 0;
	$scope.minDuration = 0;
	$scope.message = 'Please Wait...';
	$scope.backdrop = true;
	$scope.promise = null;

    $scope.demo = function(){
alert("hi");
		$scope.promise = $http.get('sportRef');

	};
  */      
      var eventRef = ref.child("event");  //get event reference
      var countryRef = ref.child("country"); //get country reference
        
     /* get Event list */
      var elist = $firebaseArray(eventRef); 
      elist.$loaded(function() {
          sessionStorage.setItem("eventArr", JSON.stringify(elist));
        },
        function(error) {
          console.error("Error:", error);
        });
      /*code ended here*/
       
      /* get country list*/
      var clist = $firebaseArray(countryRef);
      clist.$loaded(function() {
          sessionStorage.setItem("countryArr", JSON.stringify(clist));
        },
        function(error) {
          console.error("Error:", error);
        });
        /*code ended here */
        
      return {
        getSport: function() {
          return $firebaseArray(sportRef);
           // return $scope.promise;
        }
      };
    });
mainApp.controller('InitialController',function($scope,$location,$firebaseArray) 
                   {
    var sportRef = new Firebase("https://sportsdataevent.firebaseio.com/sport");
    var list = $firebaseArray(sportRef);  
    list.$loaded().then(function() 
       {
            $scope.sport = list;
             sessionStorage.setItem("initialsprt",$scope.sport);
            console.log(JSON.stringify($scope.sport));
       })
      
    });
var mainApp = angular.module("BMS", ['firebase','ngRoute','ngAnimate', 'ui.bootstrap']);

mainApp.constant('FIREBASE_URI','https://sportsdataevent.firebaseio.com');

    mainApp.config(function($routeProvider) {
      $routeProvider
      
        .when('/', {
          templateUrl: 'view/sport.html',
          controller: 'SportController'  
        })
        .when('/event', {
          templateUrl: 'view/event.html',
          controller: 'EventController'
        })
          .when('/seat_category', {
          templateUrl: 'view/seat_category.html',
          controller: 'Seat_CategoryController'
        })
        .when('/customer', {
          templateUrl: 'view/customer.html',
          controller: 'CustomerDetailController'
        })
       .when('/Success', {
          templateUrl: 'view/Success.html',
          controller:'CustomerDetailController'
          
        })
        .otherwise({
          redirectTo: '/'
        });
    });



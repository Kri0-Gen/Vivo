define(['app','angular_router', 'controller/auth','controller/rooms','controller/room','controller/order', 'controller/waiters', 'controller/dishes', 'controller/roomsadmin', 'controller/admin', 'controller/reports'], function (app) {
   'use strict';
   return app.config(['$routeProvider', function ($routeProvider) {

      $routeProvider.when('/auth', {
         templateUrl: 'app/view/auth.html'
      });

      $routeProvider.when('/rooms', {
         templateUrl: 'app/view/rooms.html'
      });
      $routeProvider.when('/dishes', {
         templateUrl: 'app/view/dishes.html'
      });

      $routeProvider.when('/admin', {
         templateUrl: 'app/view/admin.html'
      });
      
      $routeProvider.when('/room/:id', {
         templateUrl: 'app/view/room.html'
      });

      $routeProvider.when('/waiters', {
          templateUrl: 'app/view/waiters.html'
      });

      $routeProvider.when('/order/:id', {
         templateUrl: 'app/view/order.html'
      });

      $routeProvider.when('/waiters', {
         templateUrl: 'app/view/waiters.html'
      });

      $routeProvider.when('/roomsadmin', {
         templateUrl: 'app/view/roomsadmin.html'
      });

      $routeProvider.when('/reports', {
         templateUrl: 'app/view/reports.html'
      });

      $routeProvider.otherwise({
         redirectTo: '/auth'
      });
   }]);
});
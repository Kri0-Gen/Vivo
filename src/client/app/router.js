define(['app','angular_router', 'controller/auth','controller/rooms','controller/room'], function (app) {
   'use strict';
   return app.config(['$routeProvider', function ($routeProvider) {

      $routeProvider.when('/auth', {
         templateUrl: 'app/view/auth.html'
      });

      $routeProvider.when('/rooms', {
         templateUrl: 'app/view/rooms.html'
      });
      
      $routeProvider.when('/room/:id', {
         templateUrl: 'app/view/room.html'
      });

      $routeProvider.otherwise({
         redirectTo: '/auth'
      });
   }]);
});
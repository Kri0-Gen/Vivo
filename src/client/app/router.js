define(['app','angular_router', 'controller/auth','controller/rooms'], function (app) {
   'use strict';
   return app.config(['$routeProvider', function ($routeProvider) {

      $routeProvider.when('/auth', {
         templateUrl: 'app/view/auth.html'
      });

      $routeProvider.when('/rooms', {
         templateUrl: 'app/view/rooms.html'
      });

      $routeProvider.otherwise({
         redirectTo: '/auth'
      });
   }]);
});
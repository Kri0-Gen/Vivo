define('controller/rooms', ['controller/main', 'service/rooms'], function(controllers, provider){
   controllers.controller('rooms', ['$scope',provider, function ($scope, roomSrv) {
      $scope.rooms = roomSrv.query();
   }]);
});

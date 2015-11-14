define('controller/rooms', ['controller/main', 'service/rooms'], function(controllers, provider){
   controllers.controller('rooms', ['$scope',provider, function ($scope, roomSrv) {
      $scope.rooms = roomSrv.query();
      $scope.fio = window.localStorage['userFirstName'] + ' ' + window.localStorage['userLastName'];
      $scope.onClick = function(room){
         window.location.hash = '/room/' + room.Id;
      }
   }]);
});

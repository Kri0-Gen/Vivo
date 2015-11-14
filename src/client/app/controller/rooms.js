define('controller/rooms', ['controller/main', 'service/rooms'], function(controllers, provider){
   controllers.controller('rooms', ['$scope',provider, function ($scope, roomSrv) {
       $scope.isAdmin=window.localStorage['userID']=='0';
      $scope.rooms = roomSrv.query();
       //$scope.filename = rooms.photo;
      $scope.fio = window.localStorage['userFirstName'] + ' ' + window.localStorage['userLastName'];
      $scope.onClick = function(room){
         window.localStorage['roomName'] = room['Name'];
         window.location.hash = '/room/' + room.Id;
      }
   }]);
});

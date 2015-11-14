define('controller/roomsadmin', ['controller/main', 'service/rooms'], function(controllers, provider){
   controllers.controller('roomsadmin', ['$scope',provider, function ($scope, roomsadminSrv) {
      $scope.roomsadmin = roomsadminSrv.query();
      $scope.formHidden = true;
      $scope.addNew = function(){
         $scope.formHidden = false;
         $scope.name = '';
         $scope.capacity = '';
         $scope.Id=0;
         $scope.photo = '';
      };
      $scope.onSubmit = function(){
         if ( $scope.name != '' && $scope.capacity != '' && $scope.photo != '' )
            roomsadminSrv.store({Id:$scope.Id, name: $scope.name, capacity:$scope.capacity,photo:$scope.photo});
         $scope.formHidden = true;
      };
      $scope.amendRoomsadmin = function(roomsadmin) {
         $scope.formHidden = false;
         $scope.name = roomsadmin.name;
         $scope.capacity = roomsadmin.capacity;
         $scope.Id = roomsadmin.Id;
         $scope.photo = roomsadmin.photo;
      };
      $scope.onCancel = function() {
         $scope.formHidden = true;
         $scope.name = '';
         $scope.capacity = '';
         $scope.Id = '';
         $scope.photo = '';
      };
      $scope.delRoomsadmin = function(roomsadmin) {
         if (confirm('Вы точно хотите удалить официанта?'))
            roomsadminSrv.delete({Id:roomsadmin.Id});
      }
   }]);
});

define('controller/roomsadmin', ['controller/main', 'service/rooms'], function(controllers, provider){
   controllers.controller('roomsadmin', ['$scope',provider, function ($scope, roomsadminSrv) {
      $scope.roomsadmin = roomsadminSrv.query();
      $scope.formHidden = true;
       $scope.isAdmin=window.localStorage['userID']=='0';
      $scope.addNew = function(){
         $scope.formHidden = false;
         $scope.Name = '';
         $scope.Id=0;
         $scope.Photo = '';
      };
      $scope.onSubmit = function(){
         if ( $scope.Name != '' )
            roomsadminSrv.store({Id: $scope.Id, Name: $scope.Name}).$promise.then(function(){
               $scope.roomsadmin = roomsadminSrv.query();
            });
         $scope.formHidden = true;
      };
      $scope.amendRoomsadmin = function(roomsadmin) {
         $scope.formHidden = false;
         $scope.Name = roomsadmin.Name;
         $scope.Id = roomsadmin.Id;
         $scope.Photo = roomsadmin.Photo;
      };
      $scope.onCancel = function() {
         $scope.formHidden = true;
         $scope.Name = '';
         $scope.Id = '';
         $scope.Photo = '';
      };
      $scope.delRoomsadmin = function (id){

         var promise;
         promise = roomsadminSrv.deleted({Id:id});
         promise.$promise.then(function(){
            $scope.roomsadmin = roomsadminSrv.query();
         });
      };
   }]);
});

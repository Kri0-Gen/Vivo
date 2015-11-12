define('controller/rooms', ['controller/main'], function(controllers){
   controllers.controller('rooms', ['$scope', function ($scope) {
      $scope.rooms = [{
         id: 1,
         name: 'Основной зал'
      },{
         id: 2,
         name: 'Летняя веранда'
      }];
   }]);
});
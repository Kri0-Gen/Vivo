define('controller/room', ['controller/main'], function(controllers){
   controllers.controller('room', ['$scope', '$routeParams', function ($scope, $routeParams) {
      // here pass params into controller
      console.log($routeParams.id);
      $scope.tables = [{id:1, x:100, y: 100}, {id:2, x:300, y: 100}, {id:3, x:300, y: 300}];
      $scope.captured = -1;
      $scope.startX = 0;
      $scope.startY = 0;
      $scope.capture = function(id, e){
         $scope.startX = e.clientX;
         $scope.startY = e.clientY;
         $scope.captured = id;
      };
      $scope.release = function(){
         $scope.captured = -1;
      };
      $scope.move = function(e){
         if ($scope.captured != -1){
            // (!important) id == index, todo search
            $scope.tables[$scope.captured - 1].x += e.clientX - $scope.startX;
            $scope.startX = e.clientX;
            $scope.tables[$scope.captured - 1].y += e.clientY - $scope.startY;
            $scope.startY = e.clientY;
         }
      }
   }]);
});
define('controller/waiters', ['controller/main', 'service/waiters'], function(controllers, provider){
   controllers.controller('waiters', ['$scope',provider, function ($scope, waitersSrv) {
      $scope.waiters = [{"name": "Вася"},{"name" : "Петя"},{"name" : "Коля"}];;
      //waitersSrv.query();
   }]);
});

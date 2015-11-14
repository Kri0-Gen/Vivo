define('controller/waiters', ['controller/main', 'service/waiters'], function(controllers, provider){
   controllers.controller('waiters', ['$scope',provider, function ($scope, waitersSrv) {
      $scope.waiters = waitersSrv.query();
      $scope.formHidden = true;
      $scope.addNew = function(){
         $scope.formHidden = false;
         $scope.FirstName = '';
         $scope.LastName = '';
         $scope.Id=0;
      };
      $scope.onSubmit = function(){
         waitersSrv.store({Id:$scope.Id, FirstName: $scope.FirstName, LastName:$scope.LastName});
         $scope.formHidden = true;
      };
   }]);
});

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
         if ( $scope.FirstName != '' && $scope.LastName != '' )
            waitersSrv.store({Id:$scope.Id, FirstName: $scope.FirstName, LastName:$scope.LastName}).$promise.then(function(){
               $scope.waiters = waitersSrv.query();
            });
         $scope.formHidden = true;
      };
      $scope.amendWaiters = function(waiter) {
         $scope.formHidden = false;
         $scope.FirstName = waiter.FirstName;
         $scope.LastName = waiter.LastName;
         $scope.Id = waiter.Id;
      };
      $scope.onCancel = function() {
         $scope.formHidden = true;
         $scope.FirstName = '';
         $scope.LastName = '';
         $scope.Id = '';
      };
      $scope.delWaiters = function(waiter) {
         if (confirm('Вы точно хотите удалить официанта?'))
            waitersSrv.delete({Id:waiter.Id}).$promise.then(function(){
               $scope.waiters = waitersSrv.query();
            });
      }
   }]);
});

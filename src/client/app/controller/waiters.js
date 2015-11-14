define('controller/waiters', ['controller/main', 'service/waiters'], function(controllers, provider){
   controllers.controller('waiters', ['$scope',provider, function ($scope, waitersSrv) {
      $scope.waiters = waitersSrv.query();
      $scope.formHidden = true;
      $scope.fio = window.localStorage['userFirstName'] + ' ' + window.localStorage['userLastName'];
      $scope.isAdmin=window.localStorage['userID']=='0';
      $scope.addNew = function(){
         $scope.formHidden = false;
          $scope.fio = window.localStorage['userFirstName'] + ' ' + window.localStorage['userLastName'];
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
      $scope.delWaiters = function (id){
          var promise;
          waitersSrv.deleted({Id:id}).$promise.then(function(){
              $scope.waiters = waitersSrv.query();
          });


      };
   }]);
});

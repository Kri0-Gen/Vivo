define('controller/auth', ['controller/main', 'service/waiters'], function(controllers, waitersSrv){
   controllers.controller('auth', ['$scope', waitersSrv, function ($scope, waitersSrv) {
      $scope.selectedUser = -1;
      $scope.waiters = waitersSrv.query();
      $scope.selectUser = function(id){
		 window.localStorage['userID'] = id;
         window.location.hash = '/rooms'
      };
   }]);
   return 'auth';
});
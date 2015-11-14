define('controller/auth', ['controller/main', 'service/waiters'], function(controllers, waitersSrv){
   controllers.controller('auth', ['$scope', waitersSrv, function ($scope, waitersSrv) {
      $scope.selectedUser = -1;
      $scope.waiters = waitersSrv.query();
      $scope.selectUser = function(waiter){
		   window.localStorage['userID'] = waiter.Id;
		   window.localStorage['userFirstName'] = waiter.FirstName;
		   window.localStorage['userLastName'] = waiter.LastName;
         if ( waiter.FirstName == 'Администратор' ) window.location.hash = '/roomsadmin'
         else window.location.hash = '/rooms'
      };
   }]);
   return 'auth';
});
define('controller/auth', ['controller/main'], function(controllers){
   controllers.controller('auth', ['$scope', function ($scope) {
      $scope.selectedUser = -1;
      $scope.users = [
         {
            id: 1,
            name: 'Вася'
         },
         {
            id: 2,
            name: 'Катя'
         },
         {
            id: 2,
            name: 'Катя'
         },
         {
            id: 2,
            name: 'Катя'
         },
         {
            id: 2,
            name: 'Катя'
         },
         {
            id: 2,
            name: 'Катя'
         },
         {
            id: 2,
            name: 'Катя'
         },
         {
            id: 2,
            name: 'Катя'
         },
         {
            id: 2,
            name: 'Катя'
         },
         {
            id: 2,
            name: 'Катя'
         },
         {
            id: 2,
            name: 'Катя'
         },
         {
            id: 2,
            name: 'Катя'
         },
         {
            id: 2,
            name: 'Катя'
         },
         {
            id: 2,
            name: 'Катя'
         },
         {
            id: 2,
            name: 'Катя'
         },
         {
            id: 2,
            name: 'Катя'
         },
         {
            id: 2,
            name: 'Катя'
         },
         {
            id: 2,
            name: 'Катя'
         },
         {
            id: 2,
            name: 'Катя'
         },
         {
            id: 2,
            name: 'Катя'
         },
         {
            id: 2,
            name: 'Катя'
         },
         {
            id: 2,
            name: 'Катя'
         },
         {
            id: 2,
            name: 'Катя'
         },
         {
            id: 2,
            name: 'Катя'
         },
         {
            id: 2,
            name: 'Катя'
         },
         {
            id: 2,
            name: 'Катя'
         },
         {
            id: 2,
            name: 'Катя'
         }
      ];
      $scope.selectUser = function(id){
		 window.localStorage['userID'] = id;
         window.location.hash = '/rooms'
      };
   }]);
   return 'auth';
});
define('controller/admin', ['controller/main'], function(controllers){
    controllers.controller('admin', ['$scope', function ($scope) {
        $scope.onClick = function(){
        };

        // ToDo: ������ � ������ ��� ���
        //$scope.userFirstName = window.localStorage['userFirstName'];
        //$scope.userLastName = window.localStorage['userLastName'];
    }]);
});

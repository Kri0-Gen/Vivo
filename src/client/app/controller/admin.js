define('controller/admin', ['controller/main'], function(controllers){
    controllers.controller('admin', ['$scope', function ($scope) {
        $scope.onClick = function(){
        };
        $scope.fio = window.localStorage['userFirstName'] + ' ' + window.localStorage['userLastName'];
        $scope.isAdmin=window.localStorage['userID']=='0';

        // ToDo: ������ � ������ ��� ���
        //$scope.userFirstName = window.localStorage['userFirstName'];
        //$scope.userLastName = window.localStorage['userLastName'];
    }]);
});

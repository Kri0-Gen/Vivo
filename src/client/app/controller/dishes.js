define('controller/dishes', ['controller/main', 'service/dishes'], function(controllers, provider){
    controllers.controller('dishes', ['$scope',provider, function ($scope, dishesSrv) {
        $scope.appendMode = false;
        $scope.dishes = [{
            Id: 0,
            Name: 'Борщ',
            Price: '100',
            Group: 1

        }, {
            Id: 1,
            Name: 'Цезарь',
            Price: '50',
            Group: 0

        }, {
            Id: 2,
            Name: 'test',
            Price: '100',
            Group: 2
        }];

        $scope.add = function(){
            alert('Отправляем: ' + $scope.form.name + ' ' + $scope.form.price + ' ' + $scope.form.group);
            $scope.appendMode = false;
        };

        $scope.setAppendMode = function(f){
            $scope.appendMode = f;
        };
    }]);
});

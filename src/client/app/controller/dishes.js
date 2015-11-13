define('controller/dishes', ['controller/main', 'service/dishes'], function(controllers, provider){
    controllers.controller('dishes', ['$scope',provider, function ($scope, dishesSrv) {
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

        $scope.addDish = function(){
            var
                name = $('#dish__name').val(),
                price = $('#dish__price').val(),
                group =  $('#dish__group').val();

            alert('Отправляем: ' + name + ' ' + price + ' ' + group);
        }
    }]);
});

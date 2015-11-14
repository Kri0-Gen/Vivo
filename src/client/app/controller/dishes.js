define('controller/dishes', ['controller/main', 'service/dishes'], function(controllers, provider){
    controllers.controller('dishes', ['$scope',provider, function ($scope, dishesSrv) {
        $scope.appendMode = false;
        $scope.form = {};
        $scope.dishes = [{
            Id: 0,
            Name: 'Борщ',
            Price: 100,
            Group: 1

        }, {
            Id: 1,
            Name: 'Цезарь',
            Price: 50,
            Group: 0

        }, {
            Id: 2,
            Name: 'test',
            Price: 100,
            Group: 2
        }];

        $scope.getDishById = function(id){
            for(var i = 0; i < $scope.dishes.length; i++){
                if($scope.dishes[i].Id === id){
                    return $scope.dishes[i];
                }
            }
        };

        $scope.setAppendMode = function(f, id){
            $scope.appendMode = f;
            if(f){
                if(id !== undefined){
                    var dish = $scope.getDishById(id);
                    $scope.form.id = dish.Id;
                    $scope.form.name = dish.Name;
                    $scope.form.price = dish.Price;
                    $scope.form.group = dish.Group;
                }
                else {
                    $scope.form.id = undefined;
                    $scope.form.name = null;
                    $scope.form.price = null;
                    $scope.form.group = null;
                }
            }

            $scope.check = function(){
                if ($scope.form.id===undefined){
                    $scope.dishes.push({
                        Id: Math.random(),
                        Name: $scope.form.name,
                        Price: $scope.form.price,
                        Group: $scope.form.group
                    })
                }
                else{
                    alert('Редактируем: ' +$scope.form.id+' '+ $scope.form.name + ' ' + $scope.form.price + ' ' + $scope.form.group);
                }

                $scope.appendMode = false;
            };
        };

        $scope.delete = function (id){
            alert ("Удаляем id: " + id);
        }
    }]);
});

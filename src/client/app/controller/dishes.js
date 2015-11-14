define('controller/dishes', ['controller/main', 'service/dishes'], function(controllers, provider){
    controllers.controller('dishes', ['$scope',provider, function ($scope, dishesSrv) {
        $scope.appendMode = false;
        $scope.form = {};
        $scope.dishes = dishesSrv.query();
        $scope.sortField = 'Name';
        $scope.fio = 'Name';

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
                    $scope.form.Cost = dish.Cost;
                    $scope.form.Category = dish.Category;
                }
                else {
                    $scope.form.id = undefined;
                    $scope.form.name = null;
                    $scope.form.Cost = null;
                    $scope.form.Category = null;
                }
            }

        };

        $scope.delete = function (id){

           var promise;
            promise = dishesSrv.deleted({Id:id});
            promise.$promise.then(function(){
                $scope.dishes = dishesSrv.query()
            });
        };
        $scope.check = function(){

            var promise;
            if ($scope.form.id===undefined){
                promise = dishesSrv.store({Name: $scope.form.name, Cost:$scope.form.Cost, Category:$scope.form.Category});
            }
            else{
                promise = dishesSrv.store({Id: $scope.form.id ,Name: $scope.form.name, Cost:$scope.form.Cost, Category:$scope.form.Category});
            }
            promise.$promise.then(function(){
                $scope.dishes = dishesSrv.query();
            });

            $scope.appendMode = false;
        };
    }]);
});

define('controller/order', ['controller/main', 'service/order'], function(controllers, orderProvider){
   // контроллер для блюд в заказе
   controllers.controller('order', ['$scope', '$routeParams', orderProvider, function ($scope, $routeParams, orderSrv) {
      var orderId = $routeParams.id;

      // список блюд по категориям для добавления в заказ
      $scope.categories = orderSrv.getCategories();
      $scope.currentCat = 1;
      $scope.dishes = orderSrv.getDishes();
      var dishHashMap={};
       for (var catId in $scope.dishes){
           if ($scope.dishes.hasOwnProperty(catId)){
               for (var i = 0; i < $scope.dishes[catId].length; i++){
                   dishHashMap[$scope.dishes[catId][i].Id] = $scope.dishes[catId][i];
               }
           }
       }
       $scope.SummCost=0;
      // список блюд в заказе с их состояниями (На кухне / Готово)
     // $scope.orderDishes = [{dishId:1, Name:'Борщ', State:'', Cost:100}, {dishId:1, Name:'Борщ', State:'На кухне', Cost:100}];
       $scope.orderDishes = [];
      $scope.selectCategory = function(id){
         $scope.currentCat = id;
      };
       //добавление блюда в заказ
       $scope.selectDish = function(id){
           $scope.orderDishes.push({dishId: id, Name: dishHashMap[id].Name, State: '', Cost: dishHashMap[id].Cost});
           $scope.SummCost+=dishHashMap[id].Cost;
       };
        $scope.SelectDishInOrder =function(ind){
            switch ($scope.orderDishes[ind].State){
                case '': $scope.SummCost-=$scope.orderDishes[ind].Cost;
                    $scope.orderDishes.splice(ind,1);break;
                case 'На кухне': $scope.orderDishes[ind].State='Выдан'; break;
            }
        };
       $scope.toKitchen =function(){
           for (var i in $scope.orderDishes)
           if ($scope.orderDishes[i].State==='')
           {
               $scope.orderDishes[i].State='На кухне';
           }
       };
       $scope.toPay =function(){};
   }]);
   return 'order';
});
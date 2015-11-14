define('controller/order', ['controller/main', 'service/order'], function(controllers, orderProvider){
   var NEW_DISH = 0,
       IN_KITCHEN = 1,
       READY = 2;
   // контроллер для блюд в заказе
   controllers.controller('order', ['$scope', '$routeParams', orderProvider, function ($scope, $routeParams, orderSrv) {
      var orderId = $routeParams.id;

      // список блюд по категориям для добавления в заказ
      $scope.categories = orderSrv.getCategories();
      $scope.currentCat = 1;
      $scope.dishes = orderSrv.getDishes();
      var dishHashMap={};
       $scope.dishes.$promise.then(function(data){
           for (var catId in data){
               if (data.hasOwnProperty(catId)){
                   for (var i = 0; i < data[catId].length; i++){
                       dishHashMap[data[catId][i].Id] = data[catId][i];
                   }
               }
           }
       });

       $scope.SummCost=0;
      // список блюд в заказе с их состояниями (На кухне / Готово)
     // $scope.orderDishes = [{dishId:1, Name:'Борщ', State:'', Cost:100}, {dishId:1, Name:'Борщ', State:'На кухне', Cost:100}];
       $scope.orderDishes = [];
      $scope.selectCategory = function(id){
         $scope.currentCat = id;
      };
       //добавление блюда в заказ
       $scope.selectDish = function(id){
           $scope.orderDishes.push({dishId: id, Name: dishHashMap[id].Name, State: '', Cost: dishHashMap[id].Cost, Category:dishHashMap[id].Category});
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
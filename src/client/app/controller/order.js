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
       $scope.orderDishes = orderSrv.getOrderDishes({ OrderId: orderId });
      $scope.selectCategory = function(id){
         $scope.currentCat = id;
      };
       //добавление блюда в заказ
       $scope.selectDish = function(id){
           $scope.orderDishes.push({Dish: id, Status: NEW_DISH, DishInfo: { Name: dishHashMap[id].Name, Cost: dishHashMap[id].Cost, Category:dishHashMap[id].Category }});
           $scope.SummCost+=dishHashMap[id].Cost;
       };
        $scope.SelectDishInOrder =function(ind){
            switch ($scope.orderDishes[ind].Status){
                case NEW_DISH:
                    $scope.SummCost -= $scope.orderDishes[ind].DishInfo.Cost;
                    $scope.orderDishes.splice(ind, 1);
                    break;
                case IN_KITCHEN:
                    var res = orderSrv.changeDishState({ OrderId: orderId, DishOrderId: $scope.orderDishes[ind].DishOrderId, Status: READY });
                    res.$promise.then(function(){
                        $scope.orderDishes[ind].Status = READY;
                    });
                    break;
            }
        };
       $scope.toKitchen =function(){
           var newDishes = [];
           for (var i in $scope.orderDishes) {
               if ($scope.orderDishes.hasOwnProperty(i) && $scope.orderDishes[i].Status === NEW_DISH) {
                  newDishes.push($scope.orderDishes[i].Dish);
               }
           }
           var res = orderSrv.appendDishesToOrder({ OrderId: orderId, dishes: newDishes });
           res.$promise.then(function(){
               $scope.orderDishes = orderSrv.getOrderDishes({ OrderId: orderId });
           });
       };
       $scope.toPay =function(){
           var res = orderSrv.closeOrder({OrderId:orderId, Status: 'close'});
           res.$promise.then(function(){
               window.location.hash='/room/'+$routeParams.roomId;
           });
       };
   }]);
   return 'order';
});
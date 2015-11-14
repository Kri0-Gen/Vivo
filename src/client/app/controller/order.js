define('controller/order', ['controller/main'], function(controllers){
   // контроллер для блюд в заказе
   controllers.controller('order', ['$scope', '$routeParams', function ($scope, $routeParams) {
      var orderId = $routeParams.id;

      // список блюд по категориям для добавления в заказ
      $scope.categories = [{ Id: 1, Name: 'Супы' },
         { Id: 2, Name: 'Салаты' }];
      $scope.currentCat = 1;
      $scope.dishes = { 1: [{ Id: 1, Name: 'Борщ', Cost: 100 }, { Id: 2, Name: 'Щи', Cost: 70 }],
         2: [{ Id: 3, Name: 'Цезарь', Cost: 130 }, { Id: 4, Name: 'Греческий', Cost: 110 }] };
      var dishHashMap={};
       for (var catId in $scope.dishes){
           if ($scope.dishes.hasOwnProperty(catId)){
               for (var i = 0; i < $scope.dishes[catId].length; i++){
                   dishHashMap[$scope.dishes[catId][i].Id] = $scope.dishes[catId][i];
               }
           }
       }
      // список блюд в заказе с их состояниями (На кухне / Готово)
      $scope.orderDishes = [{dishId:1, Name:'Борщ', State:'', Cost:100}, {dishId:1, Name:'Борщ', State:'На кухне', Cost:100}];
      $scope.selectCategory = function(id){
         $scope.currentCat = id;
      };
       //добавление блюда в заказ
       $scope.selectDish = function(id){
           $scope.orderDishes.push({dishId: id, Name: dishHashMap[id].Name, State: '', Cost: dishHashMap[id].Cost});
       };

   }]);
   return 'order';
});
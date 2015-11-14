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

      // список блюд в заказе с их состояниями (На кухне / Готово)
      $scope.orderDishes = []

      $scope.selectCategory = function(id){
         $scope.currentCat = id;
      };
   }]);
   return 'order';
});
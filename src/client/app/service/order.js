/* Список блюд по заказу конкретного столика. */
define('service/order',['service/main'], function(services){
   var providerName = 'Order';
   services.factory(providerName, ['$resource', function($resource){
      return $resource(':param1/:param2/', {orderId: '@orderId'}, {
         getCategories: {method:'GET', params:{ param1: 'dish_cats', param2: 'list' }, isArray:true},
         getDishes: {method:'GET', params:{ param1: 'dishes', param2: 'listByCat' }, isArray:false},
         newOrder: {method: 'POST', params: {param1: 'order', param2: 'new'}}
      });
   }]);
   return providerName;
});

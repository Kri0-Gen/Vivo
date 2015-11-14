/* Список блюд по заказу конкретного столика. */
define('service/order',['service/main'], function(services){
   var providerName = 'Order';
   services.factory(providerName, ['$resource', function($resource){
      return $resource(':param1/:param2/', {orderId: '@orderId'}, {
         getCategories: {method:'GET', params:{ param1: 'dish_cats', param2: 'list' }, isArray:true},
         getDishes: {method:'GET', params:{ param1: 'dishes', param2: 'listByCat' }},
         appendDishesToOrder: {method:'POST', params:{ param1: 'order', param2: 'appendToOrder' }},
         getOrderDishes: {method:'POST', params:{ param1: 'order', param2: 'readDishes' }, isArray:true},
         changeDishState: {method:'POST', params:{ param1: 'order', param2: 'changeDishStatus' }},
         newOrder: {method: 'POST', params: {param1: 'order', param2: 'new'}}
         closeOrder: {method: 'POST', params: {param1: 'order', param2:''}}
      });
   }]);
   return providerName;
});

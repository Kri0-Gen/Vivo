/* Список блюд по заказу конкретного столика. */
define('service/order',['service/main'], function(services){
   var providerName = 'Order';
   services.factory(providerName, ['$resource', function($resource){
      return $resource('room/order', {}, {
         query: {method:'POST', params:{ orderId: '' }, isArray:true}
      });
   }]);     
   return providerName;
});
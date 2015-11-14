/* Блюда с категориями. Запрос на БЛ должен возвращать список категорий, в каждой из которых будет список блюд по категории */
define('service/dishes',['service/main'], function(services){
   var providerName = 'Dish';
   services.factory(providerName, ['$resource', function($resource){
      return $resource('room/dishes', {}, {
         query: {method:'POST', params:{}, isArray:true}
      });
   }]);     
   return providerName;
});
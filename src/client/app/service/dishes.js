/* Блюда с категориями. Запрос на БЛ должен возвращать список категорий, в каждой из которых будет список блюд по категории */
define('service/dishes',['service/main'], function(services){
   var providerName = 'Dish';
   services.factory(providerName, ['$resource', function($resource){
      return $resource('dishes/:method', {}, {
         query: {method:'GET', params:{method:'list'}, isArray:true},
         store: {method: 'POST', params:{method:'store'}},
         deleted: {method: 'POST', params:{method:'delete'}}
      });
   }]);     
   return providerName;
});
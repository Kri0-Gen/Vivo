define('service/waiters',['service/main'], function(services){
   var providerName = 'Waiters'; //random unique name
   services.factory(providerName, ['$resource', function($resource){
      return $resource('officiants/:method', {}, {
         query: {method:'GET', params:{method:'list'}, isArray:true},
         store: {method: 'POST', params:{method:'store'}},
         delete: {method: 'POST', params:{method:'delete'}}
      });
   }]);     
   return providerName;
});
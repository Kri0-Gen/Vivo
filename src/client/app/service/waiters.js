define('service/waiters',['service/main'], function(services){
   var providerName = 'Waiters'; //random unique name
   services.factory(providerName, ['$resource', function($resource){
      return $resource('waiters/list', {}, {
         query: {method:'POST', params:{}, isArray:true}
      });
   }]);     
   return providerName;
});
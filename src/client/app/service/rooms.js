define('service/rooms',['service/main'], function(services){
   var providerName = 'Room'; //random unique name
   services.factory('Room', ['$resource', function($resource){
      return $resource('rooms/:method', {}, {
         query: {method:'GET', params:{method:'list'}, isArray:true},
         store: {method: 'POST', params:{method:'store'}},
         delete: {method: 'POST', params:{method:'delete'}}
      });
   }]);     
   return providerName;
});
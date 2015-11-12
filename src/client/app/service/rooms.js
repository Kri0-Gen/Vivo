define('service/rooms',['service/main'], function(services){
   var providerName = 'Room'; //random unique name
   services.factory('Room', ['$resource', function($resource){
      return $resource('room/list', {}, {
         query: {method:'POST', params:{}, isArray:true}
      });
   }]);     
   return providerName;
});
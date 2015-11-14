define('service/rooms',['service/main'], function(services){
   var providerName = 'Rooms'; //random unique name
   services.factory('Rooms', ['$resource', function($resource){
      return $resource('room/list', {}, {
         query: {method:'POST', params:{}, isArray:true}
      });
   }]);
   return providerName;
});

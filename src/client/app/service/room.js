define('service/room', ['service/main'], function(services){
   var providerName = 'Room'; //random unique name
   services.factory('Room', ['$resource', function($resource){
      return $resource('room/:roomId/', {roomId: '@roomId'}, {
         query: {method:'GET', params:{}, isArray:true},
         save: {method: 'POST', params: {}}
      });
   }]);
   return providerName;
});

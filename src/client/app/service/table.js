define('service/table', ['service/main'], function(services){
   var providerName = 'Table'; //random unique name
   services.factory('Table', ['$resource', function($resource){
      return $resource('table/:action', {action: '@action'}, {
         query: {method:'GET', params:{}, isArray:true},
         save: {method: 'POST', params: {}}
      });
   }]);
   return providerName;
});

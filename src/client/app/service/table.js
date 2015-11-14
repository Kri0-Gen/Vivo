define('service/table', ['service/main'], function(services){
   var providerName = 'Table'; //random unique name
   services.factory('Table', ['$resource', function($resource){
      return $resource('tables/:action', {id: '@id'}, {
         query: {method:'GET', params:{action: 'list'}, isArray: true},
         save: {method: 'POST', params: {action: 'store'}}
      });
   }]);
   return providerName;
});

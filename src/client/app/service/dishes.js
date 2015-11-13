define('service/dishes',['service/main'], function(services){
    var providerName = 'Dishes'; //random unique name
    services.factory(providerName, ['$resource', function($resource){
        return $resource('room/list', {}, {
            query: {method:'POST', params:{}, isArray:true}
        });
    }]);
    return providerName;
});
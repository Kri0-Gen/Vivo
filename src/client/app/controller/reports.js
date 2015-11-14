define('controller/reports', ['controller/main', 'service/waiters', 'service/rooms' ], function(controllers, waitersSrv, roomsSrv){
   controllers.controller('reports', ['$scope', waitersSrv, roomsSrv, function ($scope, waitersSrv, roomsSrv) {
      $scope.selectedUser = -1;
      $scope.waiters = waitersSrv.query();
      $scope.rooms = roomsSrv.query();

      $scope.selectUser = function(id){
         window.localStorage['userID'] = id;
         window.location.hash = '/rooms'
      };

      $scope.rooms.$promise.then(function(data) {
         var nameList = [];

         for ( var i in data ) {
            if (data[i].Name !== undefined)
               nameList.push( data[i].Name )
         }
      });

      $scope.playReport = function() {
         $('#container').highcharts({
            chart: {
               type: 'line'
            },
            title: {
               text: 'Monthly Average Temperature'
            },
            subtitle: {
               text: 'Source: WorldClimate.com'
            },
            xAxis: {
               categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },
            yAxis: {
               title: {
                  text: 'Temperature (°C)'
               }
            },
            plotOptions: {
               line: {
                  dataLabels: {
                     enabled: true
                  },
                  enableMouseTracking: false
               }
            },
            series: [{
               name: 'Tokyo',
               data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
            }, {
               name: 'London',
               data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
            }]
         });
      };
   }]);
   return 'reports';
});
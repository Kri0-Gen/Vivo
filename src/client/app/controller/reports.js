define('controller/reports', ['controller/main', 'service/waiters', 'service/rooms' ], function(controllers, waitersSrv, roomsSrv){
   controllers.controller('reports', ['$scope', waitersSrv, roomsSrv, function ($scope, waitersSrv, roomsSrv) {
      $scope.selectedUser = -1;
      $scope.waiters = waitersSrv.query();
      $scope.rooms = roomsSrv.query();
      $scope.fio = window.localStorage['userFirstName'] + ' ' + window.localStorage['userLastName'];
      $scope.isAdmin=window.localStorage['userID']=='0';

      $scope.selectUser = function(id){
         window.localStorage['userID'] = id;
         window.location.hash = '/rooms'
      };

      //$scope.rooms.$promise.then(function(data) {
      //   var nameList = [];
      //
      //   for ( var i in data ) {
      //      if (data[i].Name !== undefined)
      //         nameList.push( data[i].Name )
      //   }
      //});

      var BLResult = {
         //Дни, по которым строится отчет
         dates: ['1.10', '2.10', '3.10', '4.10', '5.10', '6.10', '7.10', '8.10', '9.10', '10.10', '11.10', '12.10'],
          //Информация о официантах
         data: [{
            //имя официанта
            name: 'Вова Г.',
             //Ежедневная выручка ( порядок соответствует BLResult.dates )
            data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
            //Количество заказов ( порядок соответствует BLResult.dates )
            orderCounter: [12, 12, 13, 14, 56, 12, 12, 13, 14, 56, 11, 10]
         }]
      };

      var getUniqInfoDataByName = function(name){
         for(var i = 0; i < BLResult.data.length; i++){
            if(BLResult.data[i].name === name){
               return {
                  chart: {
                     type: 'column'
                  },

                  title: {
                     text: 'Отчет по официанту "' + name + '"'
                  },

                  xAxis: {
                     categories: BLResult.dates
                  },

                  yAxis: {
                     allowDecimals: false,
                     min: 0
                  },

                  series: [{
                     name: 'Выручка',
                     data: BLResult.data[i].data
                  }, {
                     name: 'Кол-во заказов',
                     data: BLResult.data[i].orderCounter
                  }]
               }
            }
         }
      };

      $scope.playReport = function() {
         $('#container').highcharts({
            chart: {
               type: 'line'
            },
            title: {
               text: 'Отчет по выручке официантов'
            },
            xAxis: {
               categories: BLResult.dates
            },
            yAxis: {
               title: {
                  text: 'Выручка'
               }
            },
            plotOptions: {
               line: {
                  dataLabels: {
                     enabled: true
                  },
                  enableMouseTracking: true
               },

               series: {
                  events: {
                     click: function (e) {
                        $('#container').highcharts(getUniqInfoDataByName(e.currentTarget.name));
                     }
                  }
               }
            },
            series: BLResult.data
         });
      };
   }]);
   return 'reports';
});
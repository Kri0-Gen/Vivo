define('controller/room', ['controller/main', 'service/room'], function(controllers, roomProvider){
   controllers.controller('room', ['$scope', '$routeParams', roomProvider, function ($scope, $routeParams, roomSrv) {
      var ZOOM_STEP = 0.5;
      var ZOOM_MAX = 2.0, ZOOM_MIN = 0.5;
      var SCENE_HEIGHT = 750, SCENE_WIDTH = 1000;

      roomSrv.query({roomId: $routeParams.id});
      roomSrv.save({roomId: $routeParams.id, lala: 'test'});

      var TABLE_TYPE = [
         {class: "room__table room__table_circle", chairs: [
            {x: 10, y: -10}, {x: 10, y: 100}, {x: 0, y: 10, transform: "rotate(90deg)"}, {x: 110, y: 10, transform: "rotate(90deg)"}
         ]},
         {class: "room__table room__table_square", chairs: [
            {x: 10, y: -10}, {x: 10, y: 100}, {x: 0, y: 10, transform: "rotate(90deg)"}, {x: 110, y: 10, transform: "rotate(90deg)"}
         ]},
         {class: "room__table room__table_bar", chairs: [
            {x: 10, y: -10}, {x: 10, y: 100}, {x: 110, y: -10}, {x: 110, y: 100},
            {x: 0, y: 10, transform: "rotate(90deg)"}, {x: 210, y: 10, transform: "rotate(90deg)"}
         ]},
         {class: "room__table room__table_bar_up", chairs: [
            {x: 10, y: -10}, {x: 10, y: 200},
            {x: 110, y: 10, transform: "rotate(90deg)"}, {x: 110, y: 110, transform: "rotate(90deg)"},
            {x: 0, y: 10, transform: "rotate(90deg)"}, {x: 0, y: 110, transform: "rotate(90deg)"},
         ]}
      ];

      var PARAMS = [
         {id:1, x:100, y: 100, type: 0, angle: 0, chairs: 1},
         {id:2, x:300, y: 100, type: 1, angle: 0, chairs: 2},
         {id:3, x:300, y: 300, type: 2, angle: 50, chairs: 3},
         {id:4, x:300, y: 300, type: 3, angle: 20, chairs: 2}
      ];

      function set_class_type(tables) {
         for (var i = 0; i < tables.length; i++) tables[i].type = TABLE_TYPE[tables[i].type].class;
      }

      function set_chairs(tables) {
         for (var i = 0; i < tables.length; i++) {
            var length = tables[i].chairs;
            tables[i].chairs = [];
            for (var j = 0; j < length; j++)
               tables[i].chairs.push(TABLE_TYPE[tables[i].type].chairs[j]);
         }
      }

      set_chairs(PARAMS);
      set_class_type(PARAMS);
      $scope.tables = PARAMS;

      $scope.scene = {height: SCENE_HEIGHT, width: SCENE_WIDTH};
      $scope.scale = 1.0;
      $scope.captured = -1;
      $scope.startX = 0;
      $scope.startY = 0;

      $scope.capture = function(id, e){
         $scope.startX = e.clientX;
         $scope.startY = e.clientY;
         $scope.captured = id;
      };

      $scope.release = function(){
         $scope.captured = -1;
      };

      $scope.move = function(e){
         if ($scope.captured != -1){
            // (!important) id == index, todo search
            var x = $scope.tables[$scope.captured - 1].x;
            var y = $scope.tables[$scope.captured - 1].y;

            var style = $scope.tables[$scope.captured - 1].type;
            style = "." + style.replace(" ", ".");
            var width = +$(style).first().css("width").replace("px", "");
            var height = +$(style).first().css("height").replace("px", "");

            var maxx = $scope.scene.width - width;
            var maxy = $scope.scene.height - height;

            x = Math.min(x + (e.clientX - $scope.startX) / $scope.scale, maxx);
            y = Math.min(y + (e.clientY - $scope.startY) / $scope.scale, maxy);
            x = Math.max(x, 0); y = Math.max(y, 0);

            $scope.tables[$scope.captured - 1].x = x;
            $scope.tables[$scope.captured - 1].y = y;

            $scope.startX = e.clientX;
            $scope.startY = e.clientY;
         }
      };

      $scope.zoom_plus = function(e) {
         $scope.scale = Math.min($scope.scale+ZOOM_STEP, ZOOM_MAX);
      };

      $scope.zoom_minus = function(e) {
         $scope.scale = Math.max($scope.scale-ZOOM_STEP, ZOOM_MIN);
      }
   }]);
});

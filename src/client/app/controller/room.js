define('controller/room', ['controller/main'], function(controllers){
   controllers.controller('room', ['$scope', '$routeParams', function ($scope, $routeParams) {
      var ZOOM_STEP = 0.5;
      var ZOOM_MAX = 2.0, ZOOM_MIN = 0.5;
      var SCENE_HEIGHT = 750, SCENE_WIDTH = 1000;

      var TABLE_TYPE = [
         {class: "room__table room__table_circle", width: 50, height: 49, chairs: [
            {scale_width: 0.0, scale_height: 0.0, x: 13, y: -6},
            {scale_width: 0.0, scale_height: 1.0, x: 13, y: 0, transform: "rotate(180deg)"},
            {scale_width: 0.0, scale_height: 0.5, x: -16, y: -3, transform: "rotate(-90deg)"},
            {scale_width: 1.0, scale_height: 0.5, x: -8, y: -3, transform: "rotate(90deg)"}
         ]},
         {class: "room__table room__table_square", width: 49, height: 49, chairs: [
            {scale_width: 0.0, scale_height: 0.0, x: 13, y: -6},
            {scale_width: 0.0, scale_height: 1.0, x: 13, y: 0, transform: "rotate(180deg)"},
            {scale_width: 0.0, scale_height: 0.5, x: -16, y: -3, transform: "rotate(-90deg)"},
            {scale_width: 1.0, scale_height: 0.5, x: -8, y: -3, transform: "rotate(90deg)"}
         ]},
         {class: "room__table room__table_bar", width: 83, height: 49, chairs: [
            {scale_width: 0.0, scale_height: 0.0, x: 10, y: -6},
            {scale_width: 0.0, scale_height: 0.0, x: 45, y: -6},
            {scale_width: 0.0, scale_height: 1.0, x: 10, y: 0, transform: "rotate(180deg)"},
            {scale_width: 0.0, scale_height: 1.0, x: 45, y: 0, transform: "rotate(180deg)"},
            {scale_width: 0.0, scale_height: 0.5, x: -16, y: -3, transform: "rotate(-90deg)"},
            {scale_width: 1.0, scale_height: 0.5, x: -8, y: -3, transform: "rotate(90deg)"}
         ]}
      ];

      // here pass params into controller
      console.log($routeParams.id);

      var PARAMS = [
         {id:1, x:100, y: 100, type: 0, angle: 0, chairs: 4},
         {id:2, x:300, y: 100, type: 1, angle: 0, chairs: 4},
         {id:3, x:300, y: 300, type: 2, angle: 0, chairs: 6},
         {id:4, x:300, y: 300, type: 2, angle: 90, chairs: 4}
      ];

      function set_class_type(tables) {
         for (var i = 0; i < tables.length; i++) tables[i].type = TABLE_TYPE[tables[i].type].class;
      }

      function set_table_chairs_by_id(table, id) {
         var length = table.chairs;
         table.chairs = [];
         for (var j = 0; j < length; j++)
            table.chairs.push(TABLE_TYPE[id].chairs[j]);
      }

      function set_chairs(tables) {
         for (var i = 0; i < tables.length; i++) {
            set_table_chairs_by_id(tables[i], tables[i].type);
         }
      }

      function set_table_width_height_by_id(table, id) {
         table.width = TABLE_TYPE[id].width;
         table.height = TABLE_TYPE[id].height;
      }

      function set_tables_width_height(tables) {
         for (var i = 0; i < tables.length; i++)
            set_table_width_height_by_id(tables[i], tables[i].type);
      }

      function add_remove_attribute(object, attr, fBool) {
         if (!fBool)
            object.removeAttr(attr); else
            object.attr(attr, "true");
      }

      set_tables_width_height(PARAMS);
      set_chairs(PARAMS);
      set_class_type(PARAMS);
      $scope.tables = PARAMS;

      $scope.scene = {height: SCENE_HEIGHT, width: SCENE_WIDTH};
      $scope.scale = 1.0;
      $scope.captured = -1;
      $scope.startX = 0;
      $scope.startY = 0;

      $scope.rotating_table = null;
      $scope.TABLE_TYPE = TABLE_TYPE;

      $scope.capture = function(id, e){
         $scope.startX = e.clientX;
         $scope.startY = e.clientY;
         $scope.captured = id;
      };

      $scope.release = function(){
         $scope.captured = -1;
         $scope.rotating_table = null;
      };

      $scope.move = function(e){
         if ($scope.rotating_table != null) {
            var x = $scope.rotating_table.x + $scope.rotating_table.width*0.5;
            var y = $scope.rotating_table.y + $scope.rotating_table.height*0.5;
            x *= $scope.scale;
            y *= $scope.scale;

            var offsetX = -$("#room_background").offset().left;
            var offsetY = -$("#room_background").offset().top;
            var nx = e.pageX + offsetX;
            var ny = e.pageY + offsetY;

            var add_angle = -Math.atan2($scope.rotating_table.width*$scope, $scope.rotating_table.height);
            var angle = add_angle + Math.atan2(nx-x, ny-y);
            angle = angle / Math.PI * 180;
            $scope.rotating_table.angle = -angle;
            return;
         }

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

            $scope.startX = Math.min(maxx, Math.max(0, e.clientX));
            $scope.startY = Math.min(maxy, Math.max(0, e.clientY));
         }
      };

      $scope.zoom_plus = function(e) {
         $scope.scale = Math.min($scope.scale+ZOOM_STEP, ZOOM_MAX);
      };

      $scope.zoom_minus = function(e) {
         $scope.scale = Math.max($scope.scale-ZOOM_STEP, ZOOM_MIN);
      }

      $scope.new_table_prev_button = function(e) {
         $scope.new_table.id = ($scope.new_table.id + 1) % TABLE_TYPE.length;
         set_table_width_height_by_id($scope.new_table, $scope.new_table.id);
         $scope.new_table.type = TABLE_TYPE[$scope.new_table.id].class;
         $scope.ChairsSelector=$scope.new_table.chairs=TABLE_TYPE[$scope.new_table.id].chairs.length;
         set_table_chairs_by_id($scope.new_table, $scope.new_table.id);
      }

      $scope.new_table_next_button = function(e) {
         $scope.ChairsSelector=1;
         $scope.new_table.id = ($scope.new_table.id - 1 + TABLE_TYPE.length) % TABLE_TYPE.length;
         set_table_width_height_by_id($scope.new_table, $scope.new_table.id);
         $scope.new_table.type = TABLE_TYPE[$scope.new_table.id].class;
         $scope.ChairsSelector=$scope.new_table.chairs=TABLE_TYPE[$scope.new_table.id].chairs.length;
         set_table_chairs_by_id($scope.new_table, $scope.new_table.id);
      }

      $scope.range = function(min, max, step) {
         step = step || 1;
         var input = [];
         for (var i = min; i <= max; i += step)
            input.push(i);
         return input;
      }

      $scope.open_create_table_window = function(new_table, fCreate, fUpdate, fRemove) {
         if (new_table == null) {
            $scope.new_table = {type: TABLE_TYPE[0].class, id: 0, x: 0, y: 0, chairs: 0, angle: 0};
            set_table_width_height_by_id($scope.new_table, 0);

            $scope.ChairsSelector=$scope.new_table.chairs=TABLE_TYPE[$scope.new_table.id].chairs.length;
            set_table_chairs_by_id($scope.new_table, $scope.new_table.id);
         } else {
            $scope.new_table = Object.create(new_table);
            $scope.ChairsSelector=$scope.new_table.chairs.length;
            $scope.new_table.item_id = $scope.tables.indexOf(new_table);
            for (var i = 0; i < TABLE_TYPE.length; i++)
               if (TABLE_TYPE[i].class == new_table.type)
                  $scope.new_table.id = i;
         }

         $(".new_table_div").first().css("visibility", "visible");
         add_remove_attribute($("#create_table_button"), "disabled", !fCreate);
         add_remove_attribute($("#update_table_button"), "disabled", !fUpdate);
         add_remove_attribute($("#remove_table_button"), "disabled", !fRemove);
      }

      $scope.create_new_table = function() {
         $scope.new_table.id = $scope.tables.length+1;

         $scope.tables.push($scope.new_table);
         $scope.new_table = null;
         $(".new_table_div").first().css("visibility", "hidden");
      }

      $scope.update_table = function() {
         $scope.tables.splice($scope.new_table.item_id, 1);
         $scope.create_new_table();
      }

      $scope.remove_table = function() {
         for (var i = 0; i < $scope.tables.length; i++) {
            if ($scope.tables[i] != $scope.new_table) continue;
            $scope.tables.splice(i, 1); break;
         }
         $(".new_table_div").first().css("visibility", "hidden");
      }

      $scope.update_chairs_selector = function(e) {
         $scope.new_table.chairs = $scope.ChairsSelector;
         set_table_chairs_by_id($scope.new_table, $scope.new_table.id);
      }

      $scope.close_table = function() {
         $(".new_table_div").first().css("visibility", "hidden");
      }

      $scope.rotating_begin = function(table) {
         $scope.rotating_table = table;
      }

   }]);
});
define('controller/room', ['controller/main', 'service/table', 'service/order'], function(controllers, tableProvider, orderProvider) {
   controllers.controller('room', ['$scope', '$routeParams', tableProvider, orderProvider, function ($scope, $routeParams, tableSrv, orderSrv) {
      var ZOOM_STEP = 0.5;
      var ZOOM_MAX = 2.0, ZOOM_MIN = 0.5;
      var SCENE_HEIGHT = 750, SCENE_WIDTH = 1000;

      var PARAMS = [];
      var TABLE_TYPE = [
         {class: "table circle", width: 50, height: 49, chairs: [
            {scale_width: 0.0, scale_height: 0.0, x: 13, y: -6},
            {scale_width: 0.0, scale_height: 1.0, x: 13, y: 0, transform: "rotate(180deg)"},
            {scale_width: 0.0, scale_height: 0.5, x: -16, y: -3, transform: "rotate(-90deg)"},
            {scale_width: 1.0, scale_height: 0.5, x: -8, y: -3, transform: "rotate(90deg)"}
         ]},
         {class: "table cub", width: 49, height: 49, chairs: [
            {scale_width: 0.0, scale_height: 0.0, x: 13, y: -6},
            {scale_width: 0.0, scale_height: 1.0, x: 13, y: 0, transform: "rotate(180deg)"},
            {scale_width: 0.0, scale_height: 0.5, x: -16, y: -3, transform: "rotate(-90deg)"},
            {scale_width: 1.0, scale_height: 0.5, x: -8, y: -3, transform: "rotate(90deg)"}
         ]},
         {class: "table rectangle", width: 83, height: 49, chairs: [
            {scale_width: 0.0, scale_height: 0.0, x: 10, y: -6},
            {scale_width: 0.0, scale_height: 0.0, x: 45, y: -6},
            {scale_width: 0.0, scale_height: 1.0, x: 10, y: 0, transform: "rotate(180deg)"},
            {scale_width: 0.0, scale_height: 1.0, x: 45, y: 0, transform: "rotate(180deg)"},
            {scale_width: 0.0, scale_height: 0.5, x: -16, y: -3, transform: "rotate(-90deg)"},
            {scale_width: 1.0, scale_height: 0.5, x: -8, y: -3, transform: "rotate(90deg)"}
         ]}
      ];

      //tableSrv.save({tables: [{Id: 1, X: 10, Y: 10, Type: 1, Chairs: 3, RoomId: $routeParams.id, Angle: 0}]});
      $scope.captured = -1;
      $scope.rotating_table = null;
      $scope.fio = window.localStorage['userFirstName'] + ' ' + window.localStorage['userLastName'];
      $scope.room_name = window.localStorage['roomName'];

      function get_table_by_data(data) {
         return {dbID: data.Id, id: ++$scope.table_counter, x: data.X, y: data.Y,
            type: data.Type, chairs: data.Chairs, angle: data.Angle,
            order_id: data.OrderId};
      }

      function get_data_by_table(table) {
         var type = 0;
         for (var i = 0; i < TABLE_TYPE.length; i++)
            if (TABLE_TYPE[i].class == table.type)
               type = i;

         return {Id: (table.dbID ? table.dbID : undefined), X: table.x, Y: table.y,
            Type: type, Chairs: table.chairs.length, RoomId: $routeParams.id, Angle: table.angle}
      }

      function get_data_by_tables(tables) {
         var result = []
         for (var i = 0; i < tables.length; i++)
            result.push(get_data_by_table(tables[i]));
         return { tables: result, RoomId: $routeParams.id };
      }

      function send_data() {
         tableSrv.save(get_data_by_tables($scope.tables));
      }

      tableSrv.query({id: $routeParams.id}, function(tablesArray) {
         $scope.table_counter = 0;
         PARAMS = [];

         for (var i = 0; i < tablesArray.length; i++)
            PARAMS.push(get_table_by_data(tablesArray[i]));

         set_tables_width_height(PARAMS);
         set_chairs(PARAMS);
         set_class_type(PARAMS);

         $scope.tables = PARAMS;

         $scope.scene = {height: SCENE_HEIGHT, width: SCENE_WIDTH};
         $scope.scale = (document.getElementsByTagName('html')[0].clientWidth < 1020) ? ZOOM_MIN : 1.0;

         $scope.startX = 0;
         $scope.startY = 0;

         $scope.captured = -1;
         $scope.rotating_table = null;
         $scope.TABLE_TYPE = TABLE_TYPE;
         $scope.roomId = $routeParams.id;

         $scope.user_name = window.localStorage['userFirstName'] + ' ' + window.localStorage['userLastName'];
         $scope.isAdmin = window.localStorage['userId'] == 0;

         $scope.admin_display = ($routeParams.admin == 1 ? "" : "display: none");
         $scope.not_admin_display = ($routeParams.admin == 1 || !$scope.isAdmin ? "display: none" : "");
      });

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

      function add_or_remove_attribute(object, attr, fBool) {
         if (!fBool)
            object.removeAttr(attr); else
            object.attr(attr, "true");
      }

      $scope.capture = function(id, e){
         if ($scope.admin_display != "") return;
         var offsetX = -$("#room_background").offset().left;
         var offsetY = -$("#room_background").offset().top;
         var nx = e.pageX + offsetX, ny = e.pageY + offsetY;
         nx /= $scope.scale; ny /= $scope.scale;
         $scope.startX = nx; $scope.startY = ny;

         for (var i = 0; i < $scope.tables.length; i++)
            if ($scope.tables[i].id == id)
               $scope.captured = i;
      };

      $scope.release = function(){
         if ($scope.captured === -1 && !$scope.rotating_table) {
            return;
         }
         $scope.captured = -1;
         $scope.rotating_table = null;
         console.log('Release');
         send_data();
      };

      $scope.move = function(e){
         if ($scope.rotating_table != null) {
            var x = $scope.rotating_table.x + $scope.rotating_table.width*0.5;
            var y = $scope.rotating_table.y + $scope.rotating_table.height*0.5;
            x *= $scope.scale; y *= $scope.scale;

            var offsetX = -$("#room_background").offset().left;
            var offsetY = -$("#room_background").offset().top;
            var nx = e.pageX + offsetX;
            var ny = e.pageY + offsetY;

            var add_angle = -Math.atan2($scope.rotating_table.width, $scope.rotating_table.height);
            var angle = add_angle + Math.atan2(nx-x, ny-y);
            angle = angle / Math.PI * 180;
            $scope.rotating_table.angle = -angle;
            return;
         }

         if ($scope.captured != -1){
            // (!important) id == index, todo search
            var x = $scope.tables[$scope.captured].x;
            var y = $scope.tables[$scope.captured].y;

            var style = $scope.tables[$scope.captured].type;
            style = "." + style.replace(" ", ".");
            var width = +$(style).first().css("width").replace("px", "");
            var height = +$(style).first().css("height").replace("px", "");

            var offsetX = -$("#room_background").offset().left;
            var offsetY = -$("#room_background").offset().top;
            var nx = e.pageX + offsetX;
            var ny = e.pageY + offsetY;
            nx /= $scope.scale; ny /= $scope.scale;

            var maxx = $scope.scene.width - width;
            var maxy = $scope.scene.height - height;

            x = Math.min(x + (nx - $scope.startX), maxx);
            y = Math.min(y + (ny - $scope.startY), maxy);
            x = Math.max(x, 0); y = Math.max(y, 0);

            $scope.tables[$scope.captured].x = x;
            $scope.tables[$scope.captured].y = y;

            $scope.startX = Math.min(maxx, Math.max(0, nx));
            $scope.startY = Math.min(maxy, Math.max(0, ny));
         }
      };

      $scope.zoom_plus = function() {
         $scope.scale = Math.min($scope.scale+ZOOM_STEP, ZOOM_MAX);
      };

      $scope.zoom_minus = function() {
         $scope.scale = Math.max($scope.scale-ZOOM_STEP, ZOOM_MIN);
      }

      $scope.new_table_prev_button = function() {
         $scope.new_table.id = ($scope.new_table.id + 1) % TABLE_TYPE.length;
         set_table_width_height_by_id($scope.new_table, $scope.new_table.id);
         $scope.new_table.type = TABLE_TYPE[$scope.new_table.id].class;
         $scope.ChairsSelector=$scope.new_table.chairs=TABLE_TYPE[$scope.new_table.id].chairs.length;
         set_table_chairs_by_id($scope.new_table, $scope.new_table.id);
      }

      $scope.new_table_next_button = function(e) {
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

         $("#new_table_window").first().css("visibility", "visible");
         add_or_remove_attribute($("#create_table_button"), "hidden", !fCreate);
         add_or_remove_attribute($("#update_table_button"), "hidden", !fUpdate);
         add_or_remove_attribute($("#remove_table_button"), "hidden", !fRemove);
      }

      $scope.create_new_table = function() {
         $scope.new_table.id = ++$scope.table_counter;

         $scope.tables.push($scope.new_table);
         //$scope.new_table = null;
         $scope.close_table(null, true);
         send_data();
      }

      $scope.update_table = function() {
         $scope.tables.splice($scope.new_table.item_id, 1);
         $scope.create_new_table();
      }

      $scope.remove_table = function(table) {
         $scope.tables.splice(table.item_id, 1);
         $scope.close_table(null, true);
         send_data();
      }

      $scope.update_chairs_selector = function() {
         if (!$scope.ChairsSelector) return;
         $scope.new_table.chairs = $scope.ChairsSelector;
         set_table_chairs_by_id($scope.new_table, $scope.new_table.id);
      }

      $scope.close_table = function(e, flag) {
         if (!flag && e.target != $("#new_table_window").get(0)) return;
         $("#new_table_window").first().css("visibility", "hidden");
      }

      $scope.rotating_begin = function(table) {
         $scope.rotating_table = table;
      }

      $scope.on_table_click = function(table) {
         if ($scope.admin_display == "") return;
         window.localStorage["tableName"] = "Столик " + table.id;
         if (table.order_id == -1) {
            orderSrv.newOrder({Table: table.dbID, Officiant: window.localStorage['userID']}).$promise.then(function(data){
                window.location.hash = '/order/' + data.Id + '?roomId=' + $routeParams.id;
            });
         } else {
            window.location.hash = '/order/' + table.order_id + '?roomId=' + $routeParams.id;
         }
      }

      $scope.get_background_color = function(table) {
         return ($routeParams.admin != 1 && table.order_id >= 0) ? "#F26700" : "";
      }

      $scope.order_display = function(table) {
         return ($routeParams.admin != 1 && table.order_id >= 0) ?  "" : "display: none"
      }

   }]);
});

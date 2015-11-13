define('controller/roomsadmin', ['controller/main', 'service/rooms'], function(controllers, provider){
   controllers.controller('roomsadmin', ['$scope',provider, function ($scope, roomsSrv) {
      $scope.roomsadmin = roomsSrv.query();

      $scope.clickbutAdd = function() {
         $scope.showPrompt("Название стола");
      };

      $scope.showPrompt = function(text) {

         var form = document.getElementById('prompt-form');
         var container = document.getElementById('prompt-form-container');
         document.getElementById('prompt-message').innerHTML = text;
         form.elements.text.value = '';

         function complete(value) {
            container.style.display = 'none';
            document.onkeydown = null;
         }

         form.onsubmit = function() {
            var value = form.elements.text.value;
            if (value == '') return false; // игнорировать пустой submit

            complete(value);
            return false;
         };

         form.elements.cancel.onclick = function() {
            complete(null);
         };

         document.onkeydown = function(e) {
            if (e.keyCode == 27) { // escape
               complete(null);
            }
         };

         var lastElem = form.elements[form.elements.length - 1];
         var firstElem = form.elements[0];

         lastElem.onkeydown = function(e) {
            if (e.keyCode == 9 && !e.shiftKey) {
               firstElem.focus();
               return false;
            }
         };

         firstElem.onkeydown = function(e) {
            if (e.keyCode == 9 && e.shiftKey) {
               lastElem.focus();
               return false;
            }
         };


         container.style.display = 'block';
         form.elements.text.focus();
      }
   }]);
});

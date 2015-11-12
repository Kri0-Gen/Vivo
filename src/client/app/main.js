define('app', [ 'angular',
   'controller/main',
   'service/main',
   'directive/main'
], function(ng){
   return ng.module('app', [
      'app.services',
      'app.controllers','ngRoute','ui.bootstrap', 'ngResource',
      /*'app.filters',*/
      'app.directives'
   ]);
});
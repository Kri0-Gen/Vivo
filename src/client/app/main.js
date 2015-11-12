define('app', [ 'angular',
   'controller/main',
   'directive/main'
], function(ng){
   return ng.module('app', [
      //'app.services',
      'app.controllers','ngRoute','ui.bootstrap',
      /*'app.filters',*/
      'app.directives'
   ]);
});
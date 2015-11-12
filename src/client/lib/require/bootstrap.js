define([
   'require',
   'angular',
   'app'
], function (require, ng) {
   'use strict';

   require(['domReady!', 'bootstrap_ui', 'router', 'angular_resource'], function (document) {
      ng.bootstrap(document, ['app']);
   });
});
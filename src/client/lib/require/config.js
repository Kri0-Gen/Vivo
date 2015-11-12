require.config({
   //  псевдонимы и пути используемых библиотек и плагинов
   paths: {
      'domReady': 'domReady',
      'angular': '/lib/angular/angular',
      'angular_router': '/lib/angular/angular-route',
      'angular_resource': '/lib/angular/angular-resource.min',
      'bootstrap_ui': '/lib/angular/ui-bootstrap-tpls-0.14.3.min',
      'routes': 'routes',
      'app': '/app/main',
      'router': '/app/router',
      'service': '/app/service',
      'controller': '/app/controller',
      'directive': '/app/directive'
   },

   // angular не поддерживает AMD из коробки, поэтому экспортируем перменную angular в глобальную область
   shim: {
      'angular': {
         exports: 'angular'
      },
      'angular_router': {
         exports: 'angular'
      },
      // angulat - twitter bootstrap bindings
      'bootstrap_ui': {
         exports: 'bootstrap'
      }
	  
   },

   // запустить приложение
   deps: ['./bootstrap']
});


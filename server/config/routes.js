'use strict';

module.exports = function( server ){

  /* ASSETS */
  server.route({
    method: 'GET',
    path: '/assets/{param*}',
    handler: {
      directory: {
        path: '../public'
      }
    }
  });
  /* FAVICON */
  server.route({
    method: 'GET',
    path: '/favicon.ico',
    handler: {
      file: 'img/favicon.ico'
    }
  });

  /* HOME PAGE */
  server.route({
    method: 'GET',
    path: '/',
    handler: {
      file: '../public/static/home.html'
    }
  });

  /* OTHER PAGES */
  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: '../public/static',
        defaultExtension: 'html'
      }
    }
  });
};
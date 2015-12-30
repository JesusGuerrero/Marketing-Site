'use strict';

var Hapi = require('hapi'),
  Path = require('path');

var server = new Hapi.Server();

module.exports = function (config) {

  var options = {
    opsInterval: 1000,
    reporters: [{
      reporter: require('good-console'),
      events: { log: '*', response: '*' }
    }]
  };

  console.log( __dirname + '/../' );
  var serverConfig = {
    port: config.port,
    routes: {
      files: {
        relativeTo: Path.join( Path.normalize(__dirname + '/../') , 'public')
      }
    }
  };
  if( config.env !== 'production') {
    serverConfig.host = config.url;
  }
  server.connection( serverConfig );

  server.register({
      register: require('good'),
      options: options
    },
    function (err) {
      if (err) {
        console.error(err);
      }
      else {
        server.start(function () {
          console.info('Server started at ' + server.info.uri);
        });
      }
    }
  );

  server.views({
    engines: {
      jade: require('jade')
    },
    path: Path.join(__dirname, '../views')
  });

  return server;
};

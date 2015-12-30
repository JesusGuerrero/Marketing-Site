'use strict';

var config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 8140,
  url: process.env.NODE_URL || '127.0.0.1'
}, server = null;

if (config.env === 'development') {
  console.log('Running Development!');
}

server = require('./config/hapi.js')( config );

// setup routes
require('./config/routes.js')(server);

// don't start server when testing
if (!module.parent || config.env === 'production') {
  server.start(function () {
    console.log('Server running at:', server.info.uri);
  });
}

module.exports = server;

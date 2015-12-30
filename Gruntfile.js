'use strict';

module.exports = function (grunt) {

  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    newer: {
      options: {
        override: function(detail, include) {
          include( false );
        }
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        '*.js',
        'client/**/*.js',
        'server/**/*.js',
        'test/**/*.js',
        '!server/public/**/*.js'
      ]
    },

    less: {
      development: {
        options: {
          //compress: true  //minifying the result
        },
        files: {
          'server/public/css/application.css' : 'client/application.less'
        }
      }
    },

    jade: {
      static: {
        options: {
          client: false,
          pretty: true,
          data: {
            site: grunt.file.readJSON('site.json')
          }
        },
        files: [{
          cwd: 'client/static/',
          src: ['*.jade'],
          dest: 'server/public/static',
          expand: true,
          ext: '.html'
        }]
      }
    },

    concat: {
      options: {
        separator: '\n'
      },
      bower: {
        src: [
          'bower_components/jquery/dist/jquery.min.js',
          'bower_components/bootstrap/dist/js/bootstrap.min.js',
          'bower_components/OwlCarousel2/dist/owl.carousel.min.js',
          'bower_components/classie/classie.js'
        ],
        dest: 'server/public/js/bower.js'
      },
      application: {
        src: [
          'server/public/js/bower.js',
          'client/**/*.js'
        ],
        dest: 'server/public/js/application.js'
      }
    },

    copy: {
      build: {
        cwd: 'bower_components',
        src: [ 'fontawesome/fonts/*.{otf,eot,svg,ttf,woff,woff2}', 'bootstrap/fonts/*.{otf,eot,svg,ttf,woff,woff2}'],
        dest: 'server/public/fonts',
        expand: true,
        flatten: true
      },
      jade: {
        cwd: 'client/views',
        src: ['**/_*.jade'],
        dest: 'server/views',
        expand: true
      },
      dev: {
        cwd: 'client',
        src: ['**/*.js'],
        dest: 'server/public/js',
        expand: true
      }
    },

    watch: {
      less: {
        files: ['client/**/*.less'],
        tasks: ['less']
      },
      jade: {
        files:['client/**/*.jade'],
        tasks:['jade:static'],
        options: {
          interrupt: true
        }
      },
      scripts: {
        files: ['client/**/*.js'],
        tasks: ['concat:application','jshint:all'],
        options: {
          interrupt: true
        }
      },
      scriptsServer: {
        files: [
          'server/**/*.js',
          '!server/public/**/*.js',
          'test/**/*.js'
        ],
        tasks: ['newer:jshint:all']
      },
      scriptsGrunt: {
        files: [
          '*.js'
        ],
        tasks: ['newer:jshint:all']
      }
    },
    tags: {
      build: {
        options: {
          scriptTemplate: 'script( src="/assets/{{ path }}")',
          openTag: '<!-- start template tags -->',
          closeTag: '<!-- end template tags -->'
        },
        src: [
          'client/**/*.js',
          'client/application.js'
        ],
        dest: 'client/include-all-scripts.jade'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['watch']);
  grunt.registerTask('build', ['less', 'jade', 'copy', 'concat']);
  grunt.registerTask('build-dev', ['less', 'jade', 'tags', 'copy:dev']);
};

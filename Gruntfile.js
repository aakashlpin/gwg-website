// Generated on 2014-02-01 using generator-webapp 0.4.6
'use strict';

var path = require( 'path' );
var scssDir = 'public/stylesheets/scss';
var cssDir = 'public/stylesheets/css';
var scriptsDir = 'public/scripts';

module.exports = function ( grunt ) {

    // Load grunt tasks automatically
    require( 'load-grunt-tasks' )( grunt );

    // Time how long tasks take. Can help when optimizing build times
    require( 'time-grunt' )( grunt );

    // Define the configuration for all the tasks
    grunt.initConfig( {

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            js: {
                files: [ '<%= yeoman.app %>/**/*.js' ],
                tasks: [ 'browserify' ],
                options: {
                    interrupt: true
                }
            },
            gruntfile: {
                files: [ 'Gruntfile.js' ],
                options: {
                    interrupt: true
                }
            },
            compass: {
                files: [ scssDir + '/{,*/}*.scss' ],
                tasks: [ 'compass:server', 'autoprefixer' ],
                options: {
                    interrupt: true
                }
            }
        },

        nodemon: {
            dev: {
                script: 'index.js',
                options: {
                    nodeArgs: ['--debug'],
                    callback: function (nodemon) {
                        nodemon.on('log', function (event) {
                            console.log(event.colour);
                        });
                    },
                    env: {
                        PORT: '3030'
                    },
                    cwd: __dirname,
                    ignore: ['node_modules/**'],
                    ext: 'js',
                    watch: ['server', 'app'],
                    delay: 1,
                    legacyWatch: true
                }
            }
        },

        handlebars: {
            guru_schedule: {
                options: {
                    namespace: false,
                    commonjs: false,
                    processName: function ( filename ) {
                        return filename
                            .replace( 'views/client/guru/schedule/', '' )
                            .replace( '.handlebars', '' );
                    }
                },
                src: "views/client/guru/schedule/*.handlebars",
                dest: "public/guruScheduleTemplates.js"
            }
        },


        //browserify config
        browserify: {
            guru_schedule: {
                src: [scriptsDir + '/guru/schedule/*.js'],
                dest: 'public/guru_schedule.js',
                options: {
                    debug: true
                },
                shim: {
                    jquery: {
                        path: 'node_modules/jquery/dist/cdn/jquery-2.1.0.min.js',
                        exports: '$'
                    },
                    underscore: {
                        path: 'node_modules/underscore/underscore.js',
                        exports: '_'
                    },
                    bootstrap: {
                        path: 'public/bower_components/sass-bootstrap/dist/js/bootstrap.min.js',
                        exports: 'bootstrap',
                        depends: {
                            jquery: '$'
                        }
                    },
                    'bootstrap.timepicker': {
                        path: 'public/bower_components/bootstrap-formhelpers/dist/js/bootstrap-formhelpers.js',
                        exports: null,
                        depends: {
                            bootstrap: 'bootstrap'
                        }
                    }
                }
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [ {
                    src: [
                        cssDir + '/*.css'
                    ]
                } ]
            }
        },

        // Compiles Sass to CSS and generates necessary files if requested
        compass: {
            options: {
                sassDir: scssDir,
                cssDir: cssDir,
                relativeAssets: true,
                assetCacheBuster: false
            },
            dist: {
                options: {
                    debugInfo: false
                }
            },
            server: {
                options: {
                    debugInfo: true,
                    watch: true
                }
            }
        },

        // Add vendor prefixed styles
        autoprefixer: {
            dist: {
                files: [ {
                    expand: true,
                    cwd: cssDir + '/',
                    src: '{,*/}*.css',
                    dest: cssDir
                } ]
            }
        },

        cssmin: {
            dist: {
                files: {
                    'public/stylesheets/css/main.css': [
                        cssDir + '/{,*/}*.css'
                    ]
                }
            }
        },

        uglify: {
            dist: {
                files: {
                    'public/mergedAssets.js': [
                        'public/mergedAssets.js'
                    ]
                }
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [ {
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        'images/{,*/}*.webp',
                        '{,*/}*.{html,tpl}',
                        'styles/fonts/{,*/}*.*',
                        '*.js',
                        'bower_components/sass-bootstrap/fonts/*.*',
                        'bower_components/modernizr/modernizr.js'
                    ]
                } ]
            }
        },

        // Run some tasks in parallel to speed up build process
        concurrent: {
            server: {
                tasks: ['nodemon', 'watch'],
                options: { logConcurrentOutput: true }
            },
            test: [
                'copy:styles'
            ],
            dist: [
                'compass',
                'copy:styles',
                'imagemin',
                'svgmin'
            ]
        },

        forever: {
            options: {
                index: 'index.js',
                logDir: 'logs',
                command: 'node'
            }
        }
    } );

    grunt.registerTask( 'serve', function ( target ) {
        grunt.task.run( [
            'compass:server',
            'concurrent:server'
        ] );
    } );

    grunt.registerTask( 'build', [
        'clean:dist',
        'compass:dist',
        'autoprefixer',
        'cssmin',
        'forever:restart'
    ] );

    grunt.registerTask( 'default', [
        'build'
    ] );
};
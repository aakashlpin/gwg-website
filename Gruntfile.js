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
            coffee_to_js: {
                files: [ 'public/coffee/**/*.coffee', 'public/coffee/**/*.coffeex' ],
                tasks: [ 'coffee' ],
                options: {
                    interrupt: true
                }
            },
            ui_js: {
                files: [ 'public/scripts/**/*.jsx' ],
                tasks: [ 'react' ],
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
                tasks: [ 'compass:server' ],
                options: {
                    interrupt: true
                }
            }
        },

        imagemin: {                          // Task
            dynamic: {                         // Another target
                files: [{
                    expand: true,                  // Enable dynamic expansion
                    cwd: 'public/images/',                   // Src matches are relative to this path
                    src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
                    dest: 'public/images/'                  // Destination path prefix
                }]
            }
        },

        uglify: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'public/dist',
                    src: '**/*.js',
                    dest: 'public/dist'
                }]
            }
        },

        nodemon: {
            dev: {
                script: 'index.js',
                options: {
                    nodeArgs: ['--debug'],
                    cwd: __dirname,
                    ignore: ['node_modules/**'],
                    ext: 'js, handlebars',
                    watch: ['server', 'views'],
                    delay: 1,
                    legacyWatch: true
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
                    debugInfo: true
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

        // Run some tasks in parallel to speed up build process
        concurrent: {
            server: {
                tasks: ['nodemon', 'watch'],
                options: { logConcurrentOutput: true }
            },
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
        },

        react: {
            dynamic_mappings: {
                files: [
                    {
                        expand: true,
                        cwd: 'public/scripts',
                        src: ['**/*.jsx'],
                        dest: 'public/dist/scripts',
                        ext: '.js'
                    }
                ]
            }
        },

        coffee: {
            options: {
                bare: true
            },
            js: {
                expand: true,
                cwd: 'public/coffee/',
                src: ['**/*.coffee'],
                dest: 'public/scripts',
                ext: '.js'
            },
            jsx: {
                expand: true,
                cwd: 'public/coffee/',
                src: ['**/*.coffeex'],
                dest: 'public/scripts',
                ext: '.jsx'
            }
        },

        copy: {
            views: {
                files: [
                    {expand: true, src: ['views/**'], dest: 'dist', filter: 'isFile'}
                ]
            }
        },

        replace: {
            cache_busting: {
                options: {
                    patterns: [
                        {
                            match: 'timestamp',
                            replacement: '<%= new Date().getTime() %>'
                        }
                    ]
                },
                files: [{
                    expand: true,
                    cwd: 'dist/views/',
                    src: ['**/*.handlebars'],
                    dest: 'dist/views/'
                }]
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
        'copy:views',
        'replace:cache_busting',
        'imagemin',
        'react',
        'uglify:dist'
    ] );

    grunt.registerTask( 'default', [
        'build'
    ] );
};
// Generated on 2014-02-01 using generator-webapp 0.4.6
'use strict';

var path = require( 'path' );
var stylesheetsDir = 'assets/stylesheets';
var rendrDir = 'node_modules/rendr';
var rendrHandlebarsDir = 'node_modules/rendr-handlebars';
var rendrModulesDir = rendrDir + '/node_modules';

module.exports = function ( grunt ) {

    // Load grunt tasks automatically
    require( 'load-grunt-tasks' )( grunt );

    // Time how long tasks take. Can help when optimizing build times
    require( 'time-grunt' )( grunt );

    // Define the configuration for all the tasks
    grunt.initConfig( {

        // Project settings
        yeoman: {
            // Configurable paths
            app: 'app',
            dist: 'dist'
        },

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
                files: [ stylesheetsDir + '/{,*/}*.scss' ],
                tasks: [ 'compass:server', 'autoprefixer' ],
                options: {
                    interrupt: true
                }
            },
            styles: {
                files: [ 'public/*.css' ],
                tasks: [ 'newer:copy:styles', 'autoprefixer' ],
                options: {
                    interrupt: true
                }
            },
            templates: {
                files: [ '<%= yeoman.app %>/templates/**/*.hbs' ],
                tasks: [ 'handlebars', 'browserify' ],
                options: {
                    interrupt: true
                }
            }
        },

        handlebars: {
            compile: {
                options: {
                    namespace: false,
                    commonjs: true,
                    processName: function ( filename ) {
                        return filename.replace( 'app/templates/', '' ).replace( '.hbs', '' );
                    }
                },
                src: "<%= yeoman.app %>/templates/**/*.hbs",
                dest: "<%= yeoman.app %>/templates/compiledTemplates.js",
                filter: function ( filepath ) {
                    var filename = path.basename( filepath );
                    // Exclude files that begin with '__' from being sent to the client,
                    // i.e. __layout.hbs.
                    return filename.slice( 0, 2 ) !== '__';
                }
            }
        },


        //browserify config
        browserify: {
            basic: {
                src: [
                    'app/**/*.js'
                ],
                dest: 'public/mergedAssets.js',
                options: {
                    debug: true,
                    alias: [
                        'node_modules/rendr-handlebars/index.js:rendr-handlebars'
                    ],
                    aliasMappings: [ {
                        cwd: 'app/',
                        src: [ '**/*.js' ],
                        dest: 'app/'
                    }, {    //following 2 mappings are needed due to a bug in rendr
                    // https://github.com/airbnb/rendr/issues/257#issuecomment-32116673
                        cwd: 'node_modules/rendr/client/',
                        src: ['**/*.js'],
                        dest: 'rendr/client/'
                    }, {
                        cwd: 'node_modules/rendr/shared/',
                        src: ['**/*.js'],
                        dest: 'rendr/shared/'
                    } ],
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
                            path: 'assets/stylesheets/bower_components/sass-bootstrap/dist/js/bootstrap.min.js',
                            exports: 'bootstrap',
                            depends: {
                                jquery: '$'
                            }
                        },
                        'bootstrap.timepicker': {
                            path: 'assets/stylesheets/bower_components/bootstrap-formhelpers/dist/js/bootstrap-formhelpers.js',
                            exports: null,
                            depends: {
                                bootstrap: 'bootstrap'
                            }
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
                        'public/*.css'
                    ]
                } ]
            }
        },

        // Compiles Sass to CSS and generates necessary files if requested
        compass: {
            options: {
                sassDir: stylesheetsDir,
                cssDir: 'public',
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
            options: {

            },
            dist: {
                files: [ {
                    expand: true,
                    cwd: 'public/',
                    src: '{,*/}*.css',
                    dest: 'public/'
                } ]
            }
        },

        // Renames files for browser caching purposes
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= yeoman.dist %>/scripts/{,*/}*.js',
                        '<%= yeoman.dist %>/styles/{,*/}*.css',
                        '<%= yeoman.dist %>/images/{,*/}*.{gif,jpeg,jpg,png,webp}',
                        '<%= yeoman.dist %>/styles/fonts/{,*/}*.*'
                    ]
                }
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            options: {
                dest: '<%= yeoman.dist %>'
            },
            html: '<%= yeoman.app %>/index.html'
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            options: {
                assetsDirs: [ '<%= yeoman.dist %>' ]
            },
            html: [ '<%= yeoman.dist %>/{,*/}*.{html,tpl}' ],
            css: [ '<%= yeoman.dist %>/styles/{,*/}*.css' ]
        },

        // The following *-min tasks produce minified files in the dist folder
        imagemin: {
            dist: {
                files: [ {
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.{gif,jpeg,jpg,png}',
                    dest: '<%= yeoman.dist %>/images'
                } ]
            }
        },
        svgmin: {
            dist: {
                files: [ {
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.svg',
                    dest: '<%= yeoman.dist %>/images'
                } ]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeCommentsFromCDATA: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true
                },
                files: [ {
                    expand: true,
                    cwd: '<%= yeoman.dist %>',
                    src: '{,*/}*.{html,tpl}',
                    dest: '<%= yeoman.dist %>'
                } ]
            }
        },

        // By default, your `index.html`'s <!-- Usemin block --> will take care of
        // minification. These next options are pre-configured if you do not wish
        // to use the Usemin blocks.
        cssmin: {
            dist: {
                files: {
                    'public/main.css': [
                        'public/{,*/}*.css'
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


        // Generates a custom Modernizr build that includes only the tests you
        // reference in your app
        modernizr: {
            devFile: '<%= yeoman.app %>/bower_components/modernizr/modernizr.js',
            outputFile: '<%= yeoman.dist %>/bower_components/modernizr/modernizr.js',
            files: [
                '<%= yeoman.dist %>/scripts/{,*/}*.js',
                '<%= yeoman.dist %>/styles/{,*/}*.css',
                '!<%= yeoman.dist %>/scripts/vendor/*'
            ],
            uglify: true
        },

        // Run some tasks in parallel to speed up build process
        concurrent: {
            server: [
                'compass:server'
            ],
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


    grunt.registerTask( 'runNode', function () {
        grunt.util.spawn( {
            cmd: 'node',
            args: [ './node_modules/nodemon/bin/nodemon.js', 'index.js' ],
            opts: {
                stdio: 'inherit'
            }
        }, function () {
            grunt.fail.fatal( new Error( "nodemon quit" ) );
        } );
    } );

    grunt.registerTask( 'server', function () {
        grunt.task.run( [ 'serve' ] );
    } );

    grunt.registerTask( 'serve', function ( target ) {
        if ( target === 'dist' ) {
            return grunt.task.run( [ 'build', 'connect:dist:keepalive' ] );
        }

        grunt.task.run( [
            'runNode',
            'compass:server',
            'autoprefixer',
            'handlebars',
            'browserify',
            'watch'
        ] );
    } );

    grunt.registerTask( 'build', [
        'clean:dist',
        'compass:dist',
        'autoprefixer',
        'handlebars',
        'browserify',
        'uglify',
        'cssmin',
        'forever:restart'
    ] );

    grunt.registerTask( 'default', [
        'build'
    ] );
};
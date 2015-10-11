module.exports = function(grunt) {

    grunt.initConfig({
        // pkg: grunt.file.readJSON('package.json'),
        requirejs: {
            desktopJS: {
                options: {
                    baseUrl: 'public/js/app',
                    paths: {
                        'desktop': 'init/DesktopInit'
                    },
                    wrap: true,
                    preserveLicenseComments: false,
                    optimize: 'uglify',
                    mainConfigFile: 'public/js/app/config/config.js',
                    include: ['desktop'],
                    out: 'public/js/app/init/DesktopInit.min.js'
                }
            },
            desktopCSS: {
                options: {
                    optimizeCss: 'standard',
                    cssIn: './public/css/desktop.css',
                    out: './public/css/desktop.min.css'
                }
            }
        },
        jshint: {
            files: ['Gruntfile.js', 'public/js/app/**/*.js', '!public/js/app/**/*min.js'],
            options: {
                globals: {
                    jQuery: true,
                    console: false,
                    module: true,
                    document: true
                }
            }
        },
        plato: {
            your_task: {
                options: {
                    exclude: /\.min\.js$/ // excludes source files finishing with ".min.js"
                },
                files: {
                    'public/reports': ['public/js/app/**/*.js']
                }
            }
        },
        watch: {
            scss: {
                files: ["**/*.scss"],
                tasks: ["compass", "requirejs:desktopCSS"],
                options: {
                    cwd: "public"
                }
            },
            css: {
                files: ["**/*.css"],
                // tasks: ['copy'],
                options: {
                    cwd: "public",
                    livereload: true,
                    nospawn: true
                }
            },
            js: {
                files: ["**/*.js", "!**/*.min.js"],
                tasks: ["jshint", "requirejs:desktopJS"],
                options: {
                    cwd: "public"
                }
            },
            html: {
                files: ["**/*.html"],
                // tasks: ['copy'],
                options: {
                    cwd: "public"
                }
            }
        },
        compass: {
            dist: { // Target - can add another
                options: { // Target options
                    sassDir: 'public/css/scss',
                    cssDir: 'public/css',
                    outputStyle: 'compressed' // 'nested'
                }
            }
        },
        open: {
            def: {
                path: "http://localhost:3000"
            }
        }
    });

    grunt.registerTask('desktopBuild', function() {
        grunt.task.run(['requirejs:desktopJS', 'compass', 'requirejs:desktopCSS']);
    });


    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-plato');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-open');


    grunt.registerTask('test', ['jshint']);
    grunt.registerTask('minify', ['requirejs:desktopJS']);
    grunt.registerTask('complexity:report', 'plato');
    grunt.registerTask('build', ['desktopBuild']);
    grunt.registerTask('default', ['test', 'build', 'complexity:report', 'run']);

    grunt.registerTask('run', ['server', 'open', 'watch']);

    grunt.registerTask('server', function() {

        var express = require("express"),
            http = require("http"),
            path = require('path'),
            port = (process.env.PORT || 3000),
            server = express();

        /* Start our server and watch the desired port for changes */
        // SERVER CONFIGURATION
        // ====================

        var headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*"
        };

        // server.use(express.json()); // to support JSON-encoded bodies
        // server.use(express.urlencoded()); // to support URL-encoded bodies
        server.use(express.static(path.join(__dirname, 'public')));
        // server.use(server.router);
        // server.use(express.bodyParser());


        // Start Node.js Server
        http.createServer(server).listen(port);
        console.log('Server running at http://localhost:' + port + '/');

    });
};
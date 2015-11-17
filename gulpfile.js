var gulp = require('gulp'),
    watch = require('gulp-watch'),
    jshint = require('gulp-jshint')
    webpack = require('gulp-webpack'),
    minifyCss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass');


gulp.task('default', ['lint', 'server', 'webpack', 'sass']);


gulp.task('lint', function(){
    return gulp.src(['public/js/app/**/*.js', '!**/*.min.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('server', ['lint'], function(){

    var express = require("express"),
        http = require("http"),
        path = require('path'),
        port = (process.env.PORT || 3000),
        server = express();

    /* Start our server and watch the desired port for changes */
    // SERVER CONFIGURATION
    // ====================

    server.use(express.static(path.join(__dirname, 'public')));

    // Start Node.js Server
    http.createServer(server).listen(port);
    console.log('Server running at http://localhost:' + port + '/');

});

gulp.task('webpack', function(){
    return gulp.src('public/js/app/init/DesktopInit.js')
        .pipe(webpack({
            watch: true,
            module: {
              loaders: [
                { test: /\.css$/, loader: 'style!css' },
                // { test: /\.html$/, loader: "text-loader" },
                { test: /\.html$/, loader: "handlebars-loader" }
              ],
            },
            output: {
                filename: 'DesktopInit.min.js'
            }
        }))
        .pipe(gulp.dest('public/'));
});

gulp.task('sass', function () {
    gulp.src(['public/**/*.scss', 'public/css/lib/**/*.css'])
    .pipe(sass().on('error', sass.logError))
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(concat('desktop.min.css'))
    .pipe(gulp.dest('public/css'));

    gulp.watch('public/**/*.scss', ['sass']);
});
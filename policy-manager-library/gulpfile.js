var config = require('./config');

/*-----------------------------------------------------------------
 Plugins 
------------------------------------------------------------------*/
var gulp = require("gulp");
var ngAnnotate = require("gulp-ng-annotate");
var connect = require("gulp-connect");
var sequence = require("run-sequence");
var replace = require("gulp-replace");
var rimraf = require("gulp-rimraf");
var concat = require("gulp-concat");
var browserify = require("browserify");
var babelify = require("babelify");
var vinylSourceStream = require("vinyl-source-stream");
var vinylBuffer = require("vinyl-buffer");
var babelTypeCheck = require("babel-plugin-typecheck");
var minimist = require('minimist');
var fs = require("fs");
var rename = require("gulp-rename");

//-----------------------------------------------------------------

gulp.task('transpile', function () {
    //Optional 'dest' option will copy the transpiled file to the given directory
    var options = minimist(process.argv.slice(1), {
        string: 'dest'
    });

    var sources = browserify({
            entries: config.src_directory + config.policy_manager_lib,
            debug: true
        })
        .transform(babelify.configure());

    sources.bundle()
        .pipe(vinylSourceStream(config.policy_manager_lib_min))
        .pipe(vinylBuffer())
        .pipe(ngAnnotate())
        .pipe(gulp.dest(config.build_directory));

    if (options.dest !== undefined) {
        fs.access(options.dest, fs.R_OK, function (err) {
            if (!err) {
                gulp.src(config.build_directory + config.policy_manager_lib_min)
                    .pipe(gulp.dest(options.dest));
            } else {
                console.warn(">>> Given destination does not exist: ", options.dest);
            }
        });
    }
});

gulp.task('config-application-server', function () {
    var applicationServer = config.application_server;
    
    gulp.src(config.tmpl_directory + config.api_service_tmpl)
        .pipe(replace(config.api_service_tmpl_marker, applicationServer))
        .pipe(rename({
            extname: '.js'
        }))
        .pipe(gulp.dest(config.services_directory));
});

gulp.task('connect', function () {
    if (typeof config.server === 'object') {
        connect.server({
            host: config.server.host,
            port: config.server.port,
            livereload: true
        });
    } else {
        throw new Error('Connect is not configured');
    }
});

gulp.task('livereload', function () {
    gulp.src(['./' + config.main.html, './' + config.main.js])
        .pipe(connect.reload());
});

gulp.task('cleanDist', function () {
    return gulp.src(['./' + config.build_directory + '**/*', './' + config.build_directory + 'services/**/*'], {
            read: false
        })
        .pipe(rimraf());
});

gulp.task('rebuild', function(done) {
    sequence('config-application-server', 'transpile', 'injectDependencies', 'livereload', done);
});

gulp.task('watch', function () {
    gulp.watch(['./' + config.main.html, './' + config.main.js], ['livereload']);
    gulp.watch(['./' + config.src_directory + '**/*.js'], ['rebuild']);
});

gulp.task('injectDependencies', function () {
    return gulp.src(['./' + config.main.html])
        .pipe(replace('<!-- inject:angular -->', '<script src="' + config.angular + '"></script>'))
        .pipe(replace('<!-- inject:angular_material -->', '<script src="' + config.angular_material + '"></script>'))
        .pipe(replace('<!-- inject:angular_material_css -->', '<link rel="stylesheet" href="' + config.angular_material_css + '">'))
        .pipe(replace('<!-- inject:policy-manager-lib.min.js -->', '<script src="' + config.build_directory + config.policy_manager_lib_min + '"></script>'))
        .pipe(gulp.dest(config.dest));
});

gulp.task('configure', function (done) {
    sequence('config-application-server', 'transpile', done);
});

gulp.task('build', function (done) {
    sequence('cleanDist', 'config-application-server', 'transpile', 'injectDependencies', done);
});

gulp.task('default', function (done) {
    sequence('connect', 'cleanDist', 'config-application-server', 'transpile', 'injectDependencies', 'watch', done);
});

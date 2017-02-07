//Custom configurations
var config = require("./gulpconfig");

var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var streamqueue = require('streamqueue');
var ngFilesort = require('gulp-angular-filesort');
var sourcemaps = require('gulp-sourcemaps');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var templateCache = require('gulp-angular-templatecache');
var path = require('path');
var replace = require('gulp-replace');
var sequence = require('run-sequence');
var fs = require("fs");
var chug = require("gulp-chug");

var paths = config.ionicSassPaths;

// ----------------------------------------------------------
// ----------------------------------------------------------

// -------------------------------
// Default Ionic stuff
// -------------------------------
gulp.task('default', ['sass']);

gulp.task('sass', function (done) {
    gulp.src('./scss/ionic.app.scss')
        .pipe(sass())
        .on('error', sass.logError)
        .pipe(gulp.dest('./www/css/'))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(gulp.dest('./www/css/'))
        .on('end', done);
});

gulp.task('watch', function () {
    gulp.watch(paths.sass, ['sass']);
    gulp.watch(config.dev.js, ['buildDev']);
    gulp.watch(config.dev.html, ['buildDev']);
});

gulp.task('buildAll', function (done) {
    sequence('buildDev', 'buildPolicyManagerLib', 'copy-policy-manager-library', done);
});

gulp.task('copy-policy-manager-library', function () {
    fs.access(config.policy_manager_library, fs.R_OK, function (err) {
        if (err === null) {
            gulp.src(config.policy_manager_library)
                .pipe(gulp.dest(config.build_libs_dir));
        } else {
            console.error("Library was not found (nor confiugred). Please run 'npm install' inside 'policy-manager-library'");
        }
    });
});

gulp.task('buildDev', function () {
    streamqueue({
                objectMode: true
            },
            gulp.src(config.dev.js).pipe(ngFilesort()),
            gulp.src(config.dev.html).pipe(templateCache({
                module: config.moduleName
            }))
        )
        .pipe(sourcemaps.init())
        .pipe(concat(config.appName))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.join(config.dest, 'js')));
});

gulp.task('buildPolicyManagerLib', function () {
    gulp.src(config.policy_manager_library_gulpfile)
        .pipe(chug({
            tasks: ['build']
        }));
});

gulp.task('copy-fonts', function () {
    gulp.src(config.dev.fonts)
        .pipe(gulp.dest(path.join(config.dest, 'fonts')));
});

gulp.task('install', ['git-check'], function () {
    return bower.commands.install()
        .on('log', function (data) {
            gutil.log('bower', gutil.colors.cyan(data.id), data.message);
        });
});

gulp.task('git-check', function (done) {
    if (!sh.which('git')) {
        console.log(
            '  ' + gutil.colors.red('Git is not installed.'),
            '\n  Git, the version control system, is required to download Ionic.',
            '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
            '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
        );
        process.exit(1);
    }
    done();
});

gulp.on('error', function (e) {
    throw (e);
});

// --------------------------------------------------------------------------------------------------------

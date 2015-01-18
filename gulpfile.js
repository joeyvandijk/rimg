var gulp = require('gulp');

//----------------- LOAD MODULES -----------------
var uglify = require('gulp-uglify');
var notify = require('gulp-notify');
var jshint = require('gulp-jshint');
var rename = require("gulp-rename");
var gzip = require("gulp-gzip");
var gutil = require("gulp-util");
var del = require('del');
var debugging = false;

//------------------ CREATE TASKS: -----------------
gulp.task('lint', function(){
    //check jshint
    return gulp.src('rimg.js')
        .pipe(jshint())
        .pipe(jshint.reporter("jshint-stylish"));
});

gulp.task('scripts', function() {
    // Minify and copy all JavaScript (except vendor scripts)
    return gulp.src('rimg.js')
        .pipe(rename('rimg.min.js'))
        .pipe(debugging ? gutil.noop() : uglify())
        .pipe(gulp.dest('test/examples/js'))
        .pipe(gulp.dest('.'));
});

gulp.task('compress',['clean'], function() {
    gulp.src('rimg.min.js')
        .pipe(gzip())
        .pipe(gulp.dest('./'))
        .pipe(notify("Gulp: done with Rimg change."));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
    gulp.watch('rimg.js', ['default']);
});

gulp.task('clean', function(cb) {
    del([
        'test/examples/rimg.js'
    ], cb);
});

gulp.task('setDebug',function(){
    debugging = true;
});

gulp.task('default', ['lint','scripts','compress']);
gulp.task('test', ['setDebug','default','watch']);
var gulp = require('gulp');

//----------------- LOAD MODULES -----------------
var uglify = require('gulp-uglify');
var notify = require('gulp-notify');
var jshint = require('gulp-jshint');
var clean = require('gulp-clean');
var rename = require("gulp-rename");
var gzip = require("gulp-gzip");
var gutil = require("gulp-util");
var debugging = false;

//------------------ CREATE TASKS: -----------------
gulp.task('lint', function(){
    //check jshint
    return gulp.src('rimg.js')
        .pipe(jshint())
        .pipe(notify(function (file) {
            if (file.jshint.success) {
                // Don't show something if success
                return false;
            }

            var errors = file.jshint.results.map(function (data) {
                if (data.error) {
                    return "(" + data.error.line + ':' + data.error.character + ') ' + data.error.reason;
                }
            }).join("\n");
            return file.relative + " (" + file.jshint.results.length + " errors)\n" + errors;
        }));
});

gulp.task('scripts', function() {
    // Minify and copy all JavaScript (except vendor scripts)
    return gulp.src('rimg.js')
        .pipe(debugging ? gutil.noop() : uglify())
        .pipe(gulp.dest('./test/examples/'))
        .pipe(notify("Gulp: script is parsed and uglified."));
});

// Copy rimg.min.js to test-folder
gulp.task('copy-js', ['scripts'], function() {
    return gulp.src('./test/examples/rimg.js')
        .pipe(gulp.dest('./test/examples'))
        .pipe(notify("Gulp: rimg.js is copied."));
});

gulp.task('rename',['copy-js'],function(){
    gulp.src("./test/examples/rimg.js")
        .pipe(rename("./test/examples/rimg.min.js"))
        .pipe(gulp.dest("./"));
});

gulp.task('copy-min-js', ['rename'], function() {
    return gulp.src('./test/examples/rimg.min.js')
        .pipe(gulp.dest('.'))
        .pipe(notify("Gulp: rimg.min.js is copied."));
});

gulp.task('compress',['clean'], function() {
    gulp.src('./test/examples/rimg.min.js')
        .pipe(gzip())
        .pipe(gulp.dest('./'))
        .pipe(notify("Gulp: rimg.min.js gzipped."));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
    gulp.watch('rimg.js', ['default']);
});

gulp.task('clean',['copy-min-js'], function() {
    //clean all create assets
    return gulp.src('./test/examples/rimg.js')
        .pipe(clean({force:true}))
        .pipe(notify("Gulp: rimg.js is deleted."));
});

gulp.task('setDebug',function(){
    debugging = true;
});

gulp.task('default', ['lint','scripts','copy-js','rename','copy-min-js','clean','compress']);
gulp.task('test', ['setDebug','watch']);
var gulp       = require('gulp');
var concat     = require('gulp-concat');
var autoReload = require('gulp-auto-reload');
 
// some paths to build from 
var paths = {
  html: "src/**/*.html",
  css: "src/**/*.css"
};
 
// the output 
var outapp = "dist";
 
// this transformer is used to inject <script> 
// tags into the html when reloader is enabled 
var htmlInject = function() {
  return gutil.noop();
};
 
gulp.task('html', function() {
  gulp.src(paths.html)
    .pipe(htmlInject())      // inject <script> 
    .pipe(gulp.dest(outapp));
});
 
gulp.task('css', function() {
  gulp.src(paths.css)
    .pipe(concat('ui/app.css'))
    .pipe(gulp.dest(outapp));
});
 
gulp.task('reloader', function() {
  // start a server for reloading 
  var reloader = autoReload();
  // copy the auto-reload.js script to 
  // the output 
  reloader.script()
    .pipe(gulp.dest(outapp));
  // inject the script into html pages 
  htmlInject = reloader.inject;
  // start watching the output for changes 
  gulp.watch(outapp + "/**/*", reloader.onChange);
});
 
// building html/css causes no <script> injection 
gulp.task('default', ['html', 'css']);
 
// 'reloader' sets htmlInject, and 'html' task will 
// make injected html page 
gulp.task('watch', ['reloader', 'html'], function() {
  // watch all source for rebuild 
  gulp.watch('./src/**/*', ['default']);
});

gulp.task('server', (cb) => {
    exec('node ../index.js', err => err);
});
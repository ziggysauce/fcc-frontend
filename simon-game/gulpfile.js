const gulp = require('gulp');
const plumber = require('gulp-plumber'); // for error handling during 'watch' task
const browserSync = require('browser-sync'); // for automatic reloading of page in browser, and for viewing page on multiple devices
const reload = browserSync.reload; // see browserSync above

// also allows for viewing webiste on multiple devices
gulp.task('browser-sync', () => {
  browserSync({
    server: {
      baseDir: './',
    },
  });
});

// watch css changes
gulp.task('css', function() {
  return gulp.src('src/styles.css')
    .pipe(browserSync.stream());
});

// watch html changes
gulp.task('html', function() {
  return gulp.src('index.html')
    .pipe(browserSync.stream());
});

// watch js changes
gulp.task('js', function() {
  return gulp.src('src/main.js')
    .pipe(browserSync.stream());
});

// watches all folders for changes to files
gulp.task('watch', () => {
  gulp.watch('src/main.js', ['js']);
  gulp.watch('src/styles.css', ['css']);
  gulp.watch('index.html', ['html']);
});

// default task that runs when you type 'gulp' in command line
gulp.task('default', ['browser-sync', 'watch']);

const gulp = require('gulp');//подключаем
gulp.task('first', (cb) => {
    console.log('hello from 1 task');
    cb();
});
gulp.task('second', (cb) => {
    console.log('hello from 2 task');
    cb();
});
gulp.task('third', (cb) => {
    console.log('hello from 3 task');
    cb();
});
gulp.task('fourth', (cb) => {
    console.log('hello from 4 task');
    cb();
});
gulp.task('default', gulp.parallel('first', 'third', 'fourth'));

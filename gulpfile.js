const gulp = require('gulp'); // Подключаем Gulp
const browserSync = require('browser-sync').create();
const watch = require('gulp-watch');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const pug = require('gulp-pug');
// Таска pug 
gulp.task('pug', function () {
	return gulp.src('./app/pug/pages/**/*.pug')
		.pipe(plumber({
			errorHandler: notify.onError(function (err) {
				return {
					title: 'Pug',
					sound: false,
					message: err.message
				}
			})
		}))
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulp.dest('./app/'))
});
// Таск для компиляции SCSS в CSS
gulp.task('scss', function (callback) {
	return gulp.src('./app/scss/main.scss')
		.pipe(plumber({
			errorHandler: notify.onError(function (err) {
				return {
					title: 'Styles',
					sound: false,
					message: err.message
				}
			})
		}))
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(autoprefixer({
			overrideBrowserslist: ['last 4 versions']
		}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./app/css/'))
	callback();
});
// Слежение за HTML и CSS и обновление браузера
gulp.task('watch', function () {
	function reload(done) {
		browserSync.reload();
		done();
	}
	// Слежение за HTML и CSS и обновление браузера
	gulp.watch(['./app/*.html', './app/css/**/*.css'], gulp.parallel(reload));
	// Слежение за SCSS и компиляция в CSS - обычный способ
	// watch('./app/scss/**/*.scss', gulp.parallel('scss'));
	// Запуск слежения и компиляции SCSS с задержкой, для жесктих дисков HDD
	gulp.watch('./app/scss/**/*.scss', function () {
		setTimeout(gulp.parallel('scss'), 1000)
	})
	gulp.watch('./app/pug/**/*.pug', gulp.parallel('pug'));
});
// Задача для старта сервера из папки app
gulp.task('server', function () {
	browserSync.init({
		server: {
			baseDir: "./app/"
		}
	})
});
// Дефолтный таск (задача по умолчанию)
// Запускаем одновременно задачи server и watch
gulp.task('default', gulp.parallel('server', 'watch', 'scss', 'pug'));
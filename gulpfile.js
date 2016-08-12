/* Init */
var gulp = require('gulp');
// Utilidades: Beepbeep, Gulp-plumber
var beep = require('beepbeep');
var plumber = require('gulp-plumber');
// Sass/Pug
var sass = require('gulp-sass');
var pug = require('gulp-pug');
// Browsersync live reload
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var onError = function(err) {
	//notify.onError({
	//	title:    "Gulp error in " + err.plugin,
	//	message:  err.toString()
	//})(err);
	console.log(err.plugin)
	console.log(err.toString())
	beep(1);
	this.emit('end');
};

// Compilar Jade -> HTML
gulp.task('templates', function() {
	// Recuperar archivos fuente
	return gulp.src('./app/*.jade')
		// Enviamos los errores a Plumber
		.pipe(plumber({
			errorHandler: onError
		}))
		// Mandamos los archivos fuente a Pug
		.pipe(pug({
			pretty: true
		}))
		// Los archivos compilados a /dist
		.pipe(gulp.dest('./dist/'))
		// Actualizamos Browsersync
		//.pipe(reload({stream: true}));
});

gulp.task('jade-watch', ['templates'], reload);

// Compilar Sass -> Css
gulp.task('sass', function () {
	return gulp.src('./app/sass/*.sass')
		// Enviamos los errores a Plumber
		.pipe(plumber({
			errorHandler: onError
		}))
		// Ejecutamos Sass
		.pipe(sass())
		// Los archivos compilados a /dist/css
		.pipe(gulp.dest('./dist/css'))
		// Actualizamos Browsersync
		.pipe(reload({stream: true}));
});

gulp.task('default', ['sass', 'templates'], function() {
	browserSync({server: './dist'});
	gulp.watch('./app/sass/*.sass', ['sass']);
	gulp.watch('./app/*.jade', ['jade-watch']);
});
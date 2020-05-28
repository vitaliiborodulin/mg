// Подключения зависимостей
const { src, dest, watch, task, series,	parallel} = require("gulp");

const plumber = require('gulp-plumber');
const notify = require('gulp-notify');

const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

const less = require('gulp-less');
const cleanCss = require('gulp-clean-css');
const gcmq = require('gulp-group-css-media-queries');
const sourcemaps = require('gulp-sourcemaps');

const del = require('del');
const browserSync = require('browser-sync').create();
const gulpif = require('gulp-if');
const smartgrid = require('smart-grid');
const concat = require('gulp-concat');

const rigger = require("gulp-rigger");
const uglify = require('gulp-uglify-es').default;

const ghPages = require('gh-pages');
const pathDeploy = require('path');
const size = require('gulp-size');

const isDev = process.argv.includes('--dev');
const isProd = !isDev;

var processors = [
  autoprefixer
];

/* Paths */
var path = {
	src: {
		html: "src/*.html",
		js: "src/js/*.js",
		css: "src/less/styles.less",
		img: "src/img/**/*.{jpg,png,svg,gif,ico,webmanifest,xml}",
		fonts: "src/fonts/*.{woff2,woff,eot,ttf}"
	},
	build: {
		html: "build/",
		js: "build/js/",
		css: "build/css/",
		img: "build/img/",
		fonts: "build/fonts/"
	},
	watch: {
		html: "src/**/*.html",
		js: "src/js/**/*.js",
		css: "src/less/**/*.less",
		img: "src/img/**/*.{jpg,png,svg,gif,ico,webmanifest,xml}",
		fonts: "src/fonts/*.{woff2,woff,eot,ttf}"
	},
	clean: "./build/*"
}

/* Tasks */

// Сборка HTML
function html() {
	return src(path.src.html)
    .pipe(rigger())
    .pipe(size({showFiles: true, title: 'html'}))
		.pipe(dest(path.build.html))
		.pipe(browserSync.stream())
}

// Компиляция стилей
function styles() {
	return src(path.src.css)
		.pipe(plumber({
			errorHandler: function(err) {
			notify.onError({
				title: 'Styles compilation error',
				message: err.message
			})(err);
			this.emit('end');
			}
		}))
		.pipe(gulpif(isDev, sourcemaps.init()))
		.pipe(less())
		.pipe(gulpif(isDev,gcmq()))
    .pipe(gulpif(isProd, postcss(processors)))
		.pipe(gulpif(isProd, cleanCss({
			level: 2
		})))
    .pipe(gulpif(isDev, sourcemaps.write()))
    .pipe(size({title: 'css'}))
		.pipe(dest(path.build.css))
		.pipe(browserSync.stream())
}

// Конкатенация и углификация Javascript
function js() {
	return src(path.src.js, {
			base: './src/js/'
		})
		.pipe(plumber({
			errorHandler: function(err) {
			  notify.onError({
				title: 'Javascript error',
				message: err.message
			  })(err);
			  this.emit('end');
			}
		}))
		.pipe(rigger())
		.pipe(gulpif(isDev, sourcemaps.init()))
		.pipe(concat('script.js'))
		.pipe(gulpif(isProd, uglify({
			toplevel: true
		})))
    .pipe(gulpif(isDev, sourcemaps.write()))
    .pipe(size({title: 'js'}))
		.pipe(dest(path.build.js))
		.pipe(browserSync.stream())
}

// Копирование изображений
function img() {
	return src(path.src.img)
		.pipe(dest('./build/img'))
		.pipe(browserSync.stream())
}

// Копирование шрифтов
function fonts() {
	return src(path.src.fonts)
		.pipe(dest(path.build.fonts))
		.pipe(browserSync.stream())
}

// Очистка папки сборки
function clean() {
	return del(path.clean);
}

// Локальный сервер, слежение
function watchFiles() {
		browserSync.init({
			server: {
				baseDir: './build/'
			},
			open: false
			// online: false, // Work offline without internet connection
		})

	watch([path.watch.html], html);
	watch([path.watch.css], styles);
	watch([path.watch.js], js);
	watch([path.watch.img], img);
	watch([path.watch.fonts], fonts);
	watch('./smartgrid.js', grid);
}

// Перестроение сетки
function grid(done) {
	delete require.cache[require.resolve('./smartgrid.js')];

	let settings = require('./smartgrid.js');
	smartgrid('./src/less', settings);
	done();
}

// Отправка в GH pages (ветку gh-pages репозитория)
function deploy(cb) {
	ghPages.publish(pathDeploy.join(process.cwd(), './build'), cb);
}

/* Exports Tasks */
exports.clean = clean;
exports.html = html;
// exports.css = styles;
exports.js = js;
// exports.img = img;
// exports.fonts = fonts;
// exports.watch = watchFiles;

exports.deploy = deploy;

let build = series(clean, parallel(html, styles, js, img, fonts));
task('build', series(grid, build));
task('watch', series(build, watchFiles));
task('grid', grid);

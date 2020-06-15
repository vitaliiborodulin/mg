"use strict";

const gulp = require("gulp");
const webpack = require("webpack-stream");
const browsersync = require("browser-sync");

const size = require('gulp-size');
const ghPages = require('gh-pages');
const pathDeploy = require('path');
const del = require('del');

const rigger = require("gulp-rigger");

const smartgrid = require('smart-grid');
const sourcemaps = require('gulp-sourcemaps');
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const cleanCss = require('gulp-clean-css');
const gcmq = require('gulp-group-css-media-queries');

const dist = "./dist/";

// Компиляция html
gulp.task("build-html", () => {
    return gulp.src("./src/*.html")
        .pipe(rigger())
        .pipe(size({
            showFiles: true, 
            title: 'html'
        }))
        .pipe(gulp.dest(dist))
        .pipe(browsersync.stream());
});

// Компиляция стилей разработка
gulp.task("build-dev-css", () => {
    return gulp.src("./src/less/styles.less")
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(gcmq())//?
        .pipe(autoprefixer())
        .pipe(sourcemaps.write())
        .pipe(size({showFiles: true, title: 'css-dev'}))
        .pipe(gulp.dest(dist + "/css"))
        .pipe(browsersync.stream());
});

// Компиляция стилей продакшен
gulp.task("build-prod-css", () => {
    return gulp.src("./src/less/styles.less")
        .pipe(less())
        .pipe(autoprefixer())
        .pipe(cleanCss({
            level: 2
        }))
        .pipe(size({showFiles: true, title: 'css-prod'}))
        .pipe(gulp.dest(dist + "/css"))
        .pipe(browsersync.stream());
});

// Перестроение сетки
gulp.task("smartgrid", (done) => {
    delete require.cache[require.resolve('./smartgrid.js')];

	let settings = require('./smartgrid.js');
	smartgrid('./src/less', settings);
	done();
})

// Компиляция js разработка
gulp.task("build-dev-js", () => {
    return gulp.src("./src/js/main.js")
        .pipe(webpack({
            mode: 'development',
            output: {
                filename: 'script.js'
            },
            watch: false,
            devtool: "source-map",
            module: {
                rules: [{
                    test: /\.m?js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                        presets: [['@babel/preset-env', {
                            debug: true,
                            corejs: 3,
                            useBuiltIns: "usage"
                        }]]
                        }
                    }
                }]
            }
        }))
        .pipe(gulp.dest(dist + "js"))
        .on("end", browsersync.reload);
});

// Компиляция js продакшен
gulp.task("build-prod-js", () => {
    return gulp.src("./src/js/main.js")
        .pipe(webpack({
            mode: 'production',
            output: {
                filename: 'script.js'
            },
            module: {
                rules: [{
                    test: /\.m?js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                        presets: [['@babel/preset-env', {
                            corejs: 3,
                            useBuiltIns: "usage"
                        }]]
                        }
                    }
                }]
            }
        }))
        .pipe(gulp.dest(dist + "js"));
});

// Копирование изображений
gulp.task("copy-img", () => {
    return gulp.src("./src/img/**/*.{jpg,png,svg,gif,ico,webmanifest,xml}")
		.pipe(gulp.dest(dist + "img"))
		.on("end", browsersync.reload);
})

// Копирование шрифтов
gulp.task("copy-fonts", () => {
    return gulp.src("./src/fonts/*.{woff2,woff,eot,ttf}")
		.pipe(gulp.dest(dist + "fonts"))
		.on("end", browsersync.reload);
})

// Отправка в GH pages (ветку gh-pages репозитория)
gulp.task("deploy", (cb) => {
    ghPages.publish(pathDeploy.join(process.cwd(), dist), cb);
})

// Очистка папки сборки
gulp.task("clean", () => {
    return del(dist);
})

gulp.task("watch", () => {
    browsersync.init({
		server: "./dist/",
		port: 4000,
		notify: true
    });
    
    gulp.watch("./src/*.html", gulp.parallel("build-html"));
    gulp.watch("./src/less/**/*.less", gulp.parallel("build-dev-css"));
    gulp.watch("./src/js/**/*.js", gulp.parallel("build-dev-js"));
    gulp.watch("./src/img/**/*.{jpg,png,svg,gif,ico,webmanifest,xml}", gulp.parallel("copy-img"));
    gulp.watch("./src/fonts/*.{woff2,woff,eot,ttf}", gulp.parallel("copy-fonts"));
});

//конфиг для разработки
gulp.task("develop", gulp.series("clean", gulp.parallel("build-html", "build-dev-css", "build-dev-js", "copy-img", "copy-fonts"), "watch"));
//конфиг для сборки в продакшен
gulp.task("build", gulp.series("clean", gulp.parallel("build-html", "build-prod-css", "build-prod-js", "copy-img", "copy-fonts")));

// gulp.task("default", gulp.parallel("watch", "build"));
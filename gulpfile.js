const gulp = require('gulp');
const webpack = require('webpack-stream');
const sync = require('browser-sync');

const htmlmin = require('gulp-htmlmin');
const rigger = require('gulp-rigger');
const ghPages = require('gh-pages');
const pathDeploy = require('path');
const del = require('del');

const smartgrid = require('smart-grid');
const sourcemaps = require('gulp-sourcemaps');
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const cleanCss = require('gulp-clean-css');
const gcmq = require('gulp-group-css-media-queries');

const dist = "./dist/";

// HTML
const htmlDev = () => {
    return gulp.src("./src/*.html")
    .pipe(rigger())
    .pipe(gulp.dest(dist))
    .pipe(sync.stream());
}

exports.htmlDev = htmlDev;

const htmlProd = () => {
    return gulp.src("./src/*.html")
        .pipe(rigger())
        .pipe(htmlmin({
            removeComments: true,
            collapseWhitespace: true
        }))
        .pipe(gulp.dest(dist))
        .pipe(sync.stream());
}

exports.htmlProd = htmlProd;

// Styles 
const cssDev = () => {
    return gulp.src("./src/less/styles.less")
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(gcmq())//?
        .pipe(autoprefixer())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(dist + "/css"))
        .pipe(sync.stream());
}

exports.cssDev = cssDev;

const cssProd = () => {
    return gulp.src("./src/less/styles.less")
        .pipe(less())
        .pipe(autoprefixer())
        .pipe(cleanCss({
            level: 2
        }))
        .pipe(gulp.dest(dist + "/css"))
        .pipe(sync.stream());
}

exports.cssProd = cssProd;

// Smartgrid
const grid = (done) => {
    delete require.cache[require.resolve('./smartgrid.js')];

	let settings = require('./smartgrid.js');
	smartgrid('./src/less', settings);
	done();
}

exports.grid = grid;

// Scripts
const jsDev = () => {
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
        .on("end", sync.reload);
}

exports.jsDev = jsDev;

const jsProd = () => {
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
}

exports.jsProd = jsProd;

// Copy
const copy = () => {
    return gulp.src([
        "src/fonts/**/*",
        "src/img/**/*",
    ], {
        base: 'src'
    })
    .pipe(gulp.dest(dist))
    .pipe(sync.stream({
        once: true
    }));
}

exports.copy = copy;

// Gh-pages
const deploy = (cb) => {
    ghPages.publish(pathDeploy.join(process.cwd(), dist), cb);
}

exports.deploy = deploy;

// Clean
const clean = () => {
    return del(dist);
}

exports.clean = clean;

//Server
const server = () => {
    sync.init({
        server: dist,
        port: 4000,
        notify: false,
        ui: false
    });
}

exports.server = server;

//Watch
const watch = () => {
    gulp.watch("./src/*.html", gulp.series(htmlDev));
    gulp.watch("./src/less/**/*.less", gulp.series(cssDev));
    gulp.watch("./src/js/**/*.js", gulp.series(jsDev));
    gulp.watch([
        "src/fonts/**/*",
        "src/img/**/*",
    ], gulp.series("copy"));
}

exports.watch = watch;

//Dev config
exports.dev = gulp.series(
    clean,
    gulp.parallel(
        htmlDev,
        cssDev,
        jsDev,
        copy
    ),
    gulp.parallel(
        watch,
        server
    )
);

//Build config
exports.build = gulp.series(
    clean,
    gulp.parallel(
        htmlProd,
        cssProd,
        jsProd,
        copy
    )
);

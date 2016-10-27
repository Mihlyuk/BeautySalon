const path = require('path');
const del = require('del');
const gulp = require('gulp');
const gulplog = require('gulplog');
const debug = require('gulp-debug');
const sourcemaps = require('gulp-sourcemaps');
const stylus = require('gulp-stylus');
const browserSync = require('browser-sync').create();
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const resolver = require('stylus');

const webpackStream = require('webpack-stream');
const webpack = webpackStream.webpack;

gulp.task('styles', function () {

    return gulp.src('src/styles/index.styl')
        .pipe(plumber({
            errorHandler: notify.onError(err => ({
                title: 'Styles',
                message: err.message
            }))
        }))
        .pipe(sourcemaps.init())
        .pipe(stylus({
            define: {
                url: resolver()
            }
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/styles'))
});

gulp.task('assets', function () {
    return gulp.src('src/index.html', {since: gulp.lastRun('assets')})
        .pipe(gulp.dest('public'));
});

gulp.task('libs', function () {
    return gulp.src('src/libs/*.*')
        .pipe(gulp.dest('public/libs'));
});

gulp.task('json', function () {
    return gulp.src('src/js/**/*.json')
        .pipe(gulp.dest('public/json'));
});

gulp.task('styles:assets', function () {
    return gulp.src('src/styles/**/*.{svg,png}', {since: gulp.lastRun('styles:assets')})
        .pipe(gulp.dest('public/styles'));
});

gulp.task('webpack', function (callback) {
    let firstBuildReady = false;

    function done(err, stats) {
        firstBuildReady = true;

        if (err) { // hard error, see https://webpack.github.io/docs/node.js-api.html#error-handling
            return;  // emit('error', err) in webpack-stream
        }

        gulplog[stats.hasErrors() ? 'error' : 'info'](stats.toString({
            colors: true
        }));

    }

    let options = {
        output: {
            publicPath: '/js/',
            filename: 'bundle.js',
        },
        watch: true,
        devtool: 'source-map',
        module: {
            loaders: [{
                test: /\.js$/,
                include: path.join(__dirname, "src"),
                loader: 'babel-loader?presets[]=es2015'
            }]
        },
        plugins: [
            new webpack.ProvidePlugin({
                '$': 'jquery',
                '_': 'lodash'
            }),
            new webpack.NoErrorsPlugin()
        ]
    };

    return gulp.src('src/js/*.js')
        .pipe(plumber({
            errorHandler: notify.onError(err => ({
                title: 'Webpack',
                message: err.message
            }))
        }))
        .pipe(webpackStream(options, null, done))
        .pipe(gulp.dest('public/js'))
        .on('data', function () {
            if (firstBuildReady) {
                callback();
            }
        });
});

gulp.task('clean', () => del('public'));

gulp.task('build', gulp.series('clean', gulp.parallel('styles:assets', 'libs', 'styles', 'json'), 'webpack', 'assets'));

gulp.task('serve', function () {
    browserSync.init({
        server: 'public'
    });

    browserSync.watch('public/**/*.*').on('change', browserSync.reload);
});

gulp.task('default',
    gulp.series(
        'build',
        gulp.parallel(
            'serve',
            function () {
                gulp.watch('src/styles/**/*.styl', gulp.series('styles'));
                gulp.watch('src/index.html', gulp.series('assets'));
                gulp.watch('src/styles/**/*.{svg,png}', gulp.series('styles:assets'));
                gulp.watch('src/js/**/*.json', gulp.series('json'));
            }
        )
    )
);
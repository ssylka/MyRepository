'use strict';

const gulp = require('gulp');
//const gulpSimple = require('gulp-simple');
const runSequence = require('run-sequence');
const minimist = require('minimist');
const browserSync = require('browser-sync').create();
const clean = require('gulp-clean');
const autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');
var less = require('gulp-less');
const babel = require('gulp-babel');
var uglify = require('gulp-uglify');

const config = require('./gulp-config');

gulp.task('server', callback => {
    browserSync.init({
        server: 'www',
        snippetOptions: {
            rule: {
                match: /$/,
                fn: snippet => snippet,
            },
        },
        notify: false,
        logLevel: "silent",
        port: 8000,
    }, callback);

    gulp.watch("source/**/*.css", ['watch-css']);
    gulp.watch("source/**/*.less", ['watch-less']);
    gulp.watch("source/**/*.js", ['watch-js']);
    gulp.watch("www/*.html").on('change', browserSync.reload);
    //gulpSimple.pipes.forEach(pipe => pipe.pipe(browserSync.stream()));
    //gulpSimple.onWatch = browserSync.reload;
});

//gulpSimple.prefix = 'source_';
//gulpSimple.minify = minimist(process.argv.slice(2)).release;
//gulpSimple.init(config);

gulp.task('clean', function() {
    return gulp.src('www/static', {read: false})
        .pipe(clean());
    }
);

gulp.task('watch-css', function() {
        return gulp.src(['./source/**/*.css', '!node_modules/**/*'])
            .pipe(autoprefixer({browsers: ['last 2 versions']}))
            .pipe(cssnano())
            .pipe(gulp.dest('./www/static/'))
            .pipe(browserSync.stream());
    }
);

gulp.task('watch-less', function() {
        return gulp.src(['./source/**/*.less', '!node_modules/**/*'])
            .pipe(less())
            .pipe(autoprefixer({browsers: ['last 2 versions']}))
            .pipe(cssnano())
            .pipe(gulp.dest('./www/static/'))
            .pipe(browserSync.stream());
    }
);

gulp.task('watch-js', function() {
        return gulp.src('./source/**/*.js')
            .pipe(babel({
                presets: ['@babel/preset-env'],
                ignore: [ "source/vue/js/vue.js" ]
            }))
            .pipe(uglify())
            .pipe(gulp.dest('./www/static/'))
            .pipe(browserSync.stream());
    }
);

gulp.task('build-css', function() {
    return gulp.src(['./source/**/*.css', '!node_modules/**/*'])
        .pipe(autoprefixer({browsers: ['last 2 versions']}))
        .pipe(cssnano())
        .pipe(gulp.dest('./www/static/'));
    }
);

gulp.task('build-img', function() {
    return gulp.src(['./source/**/*.png', '!node_modules/**/*'])
        .pipe(gulp.dest('./www/static/'));
    }
);

gulp.task('build-less', function() {
    return gulp.src(['./source/**/*.less', '!node_modules/**/*'])
        .pipe(less())
        .pipe(autoprefixer({browsers: ['last 2 versions']}))
        .pipe(cssnano())
        .pipe(gulp.dest('./www/static/'));
    }
);

gulp.task('build-js', function() {
    return gulp.src('./source/**/*.js')
        .pipe(babel({
            presets: ['@babel/preset-env'],
            ignore: [ "source/vue/js/vue.js" ]
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./www/static/'));
    }
);

gulp.task('build', callback => runSequence(
    'build-css',
    'build-less',
    'build-js',
    'build-img',
    callback
));

gulp.task('default', callback => runSequence(
    'clean',
    'build',
    callback
));

gulp.task('watch', callback => runSequence(
    'clean',
    'build',
    'server',
    callback
));

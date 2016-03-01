/// <binding BeforeBuild='buildFindPage' />
var gulp = require('gulp');
var webpack = require('gulp-webpack');
var path = require('path');
var changed = require('gulp-changed');

var CONFIG_FILENAME = './webpack.config.js',
    CONFIG_FILENAME_PROD = './webpack.prod.config.js',
    SRC = './src/index.js',
    DEST = './dist/';

gulp.task('set-dev-node-env', function () {
    return process.env.NODE_ENV = 'development';
});

gulp.task('set-prod-node-env', function () {
    return process.env.NODE_ENV = 'production';
});

gulp.task('default',['set-dev-node-env'], function() {
        return gulp.src(SRC)
            .pipe(changed(DEST, { hasChanged: changed.compareSha1Digest }))
            .pipe(webpack(require(CONFIG_FILENAME)))
            .pipe(gulp.dest(DEST));
    }
);

gulp.task('prod',['set-prod-node-env'], function() {
        return gulp.src(SRC)
            .pipe(changed(DEST, { hasChanged: changed.compareSha1Digest }))
            .pipe(webpack(require(CONFIG_FILENAME_PROD)))
            .pipe(gulp.dest(DEST));
    }
);

import gulp from 'gulp';
import webpack from 'webpack';
import gutil from 'gulp-util';

//import webpackDevConf from './webpack/dev.config.js'


// clean assets
gulp.task('clean', () => {
    let clean = require('gulp-clean');
    return gulp.src('dist', {read: true}).pipe(clean())
});

// run webpack pack
gulp.task('webpack', ['clean'], (done) => {
    let webpackConf = require('./webpack/webpack.config');
    webpack(webpackConf, (err, stats) => {
        if (err) throw new gutil.PluginError('webpack', err);
        gutil.log('[webpack]', stats.toString({colors: true}));
        done()
    })
});




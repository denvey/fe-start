'use strict';

var path = require('path'),
    fs = require('fs'),
    webpack = require('webpack'),
    _ = require('lodash'),
    glob = require('glob');

let ExtractTextPlugin = require('extract-text-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');

let UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
let CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

const debug = process.env.NODE_ENV !== 'production';

let srcDir = path.resolve(process.cwd(), 'src'),
    assets = 'dist/',
    jsDir = path.resolve(srcDir, 'views'),
    publicPath = '';

let pathMap = require('../src/configs/pathMap.json');

let entries = (() => {
    var entry = {};
    glob.sync(srcDir + '/views/**/script.js').forEach(function (name) {
        var n = name.slice(name.lastIndexOf('views/') + 6, name.length - 3);
        entry[n] = [name,'webpack-hot-middleware/client'];
    });
    return entry;
})();
let chunks = Object.keys(entries);
let config = {
    entry: entries,

    output: {
        path: path.join(process.cwd(), assets),
        filename: debug ? '[name].js' : '[name]-[chunkhash:8].min.js',
        chunkFilename: debug ? '[chunkhash:8].chunk.js' : '[chunkhash:8].chunk.min.js',
        hotUpdateChunkFilename: debug ? '[id].js' : '[id].[chunkhash:8].min.js',
        publicPath: publicPath
    },

    resolve: {
        root: [srcDir, './node_modules'],
        alias: pathMap,
        extensions: ['', '.js', '.css', '.less', '.tpl', '.png', '.jpg']
    },

    resolveLoader: {
        root: path.join(__dirname, 'node_modules')
    },

    module: {
        loaders: [
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'image?{bypassOnDebug: true, progressive:true, \
                        optimizationLevel: 3, pngquant:{quality: "65-80", speed: 4}}',
                    // url-loader更好用，小于10KB的图片会自动转成dataUrl，
                    // 否则则调用file-loader，参数直接传入
                    'url?limit=10000&name=img/[name].[ext]'
                ]
            },
            {
                test: /\.(woff|eot|ttf)$/i,
                loader: 'url?limit=10000&name=fonts/[name].[ext]'
            },
            {test: /\.hbs/, loader: "handlebars-loader"},
            {test: /\.(tpl|ejs)$/, loader: 'ejs'},
            {test: /\.css$/, loader: 'style!css'},
            {test: /\.less$/, loader: 'style!css!less'},
            {test: /\.js?$/, exclude: /node_modules/, loader: 'babel?presets[]=es2015'}
        ]
    },

    plugins: [
        new CommonsChunkPlugin({
            name: 'vendor',
            chunks: chunks,
            minChunks: chunks.length // 提取所有entry共同依赖的模块
        }),
        new webpack.ProvidePlugin({
            jQuery: "jquery",
            $: "jquery"
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        /*new ExtractTextPlugin('[name].css', {
            // 当allChunks指定为false时，css loader必须指定怎么处理
            // additional chunk所依赖的css，即指定`ExtractTextPlugin.extract()`
            // 第一个参数`notExtractLoader`，一般是使用style-loader
            // @see https://github.com/webpack/extract-text-webpack-plugin
            allChunks: false
        })*/
    ],

    devServer: {
        hot: true,
        noInfo: false,
        inline: true,
        publicPath: publicPath,
        stats: {
            cached: false,
            colors: true
        }
    }
};

var pages = Object.keys(getEntry('src/views/**/*.html', 'src/views/'));
pages.forEach(function(pathname) {
    var conf = {
        filename: pathname + '.html', //生成的html存放路径，相对于path
        template: 'src/views/' + pathname + '.html', //html模板路径
        inject: false,	//js插入的位置，true/'head'/'body'/false
        minify: { //压缩HTML文件
            removeComments: true, //移除HTML中的注释
            collapseWhitespace: false //删除空白符与换行符
        }
    };
    if (pathname in config.entry) {
        conf.inject = 'body';
        conf.chunks = ['vendors', pathname];
        conf.hash = true;
    }
    config.plugins.push(new HtmlWebpackPlugin(conf));
});



module.exports = config;


function getEntry(globPath, pathDir) {
    var files = glob.sync(globPath);
    var entries = {},
        entry, dirname, basename, pathname, extname;

    for (var i = 0; i < files.length; i++) {
        entry = files[i];
        dirname = path.dirname(entry);
        extname = path.extname(entry);
        basename = path.basename(entry, extname);
        pathname = path.join(dirname, basename);
        pathname = pathDir ? pathname.replace(new RegExp('^' + pathDir), '') : pathname;
        entries[pathname] = './' + entry;
    }
    return entries;
}
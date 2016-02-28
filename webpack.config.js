const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const NpmInstallPlugin = require('npm-install-webpack-plugin');

const TARGET = process.env.npm_lifecycle_event;
process.env.BABEL_ENV = TARGET;

const PATHS = {
    app: path.join(__dirname, 'app'),
    node_modules: path.join(__dirname, 'node_modules'),
    build: path.join(__dirname, 'build')
};

var pathToBootstrap = PATHS.node_modules + '/bootstrap/dist/css/bootstrap.css';

const common = {


    entry: {
        app: PATHS.app,
        vendor: ['react', 'react-dom', 'react-router', 'bootstrap.css']
    },
    resolve: {
        alias: {
            'bootstrap.css': pathToBootstrap
        },
        extensions: ['', '.js', '.jsx']
    },
    output: {
        path: PATHS.build,
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loaders: ['style', 'css']
            },
            {
                // Test expects a RegExp! Note the slashes!
                test: /\.scss$/,
                loaders: ['style', 'css', 'sass'],
                // Include accepts either a path or an array of paths.
                include: PATHS.app
            },
            {
                test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
                loader: 'url?limit=15000'
            },
            {
                test: /\.jsx?$/,
                // Enable caching for improved performance during development
                // It uses default OS directory by default. If you need something
                // more custom, pass a path to it. I.e., babel?cacheDirectory=<path>
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                    cacheDirectory: true,
                    presets: ['react', 'es2015', 'survivejs-kanban']
                },
                // Parse only app files! Without this it will go through entire project.
                // In addition to being slow, that will most likely result in an error.
                include: PATHS.app
            }
        ]
    }
};


// Default configuration
if(TARGET === 'start' || !TARGET) {
    module.exports = merge(common, {
        devtool: 'eval',
        devServer: {
            contentBase: PATHS.build,

            // Enable history API fallback so HTML5 History API based
            // routing works. This is a good default that will come
            // in handy in more complicated setups.
            historyApiFallback: true,
            hot: true,
            inline: true,
            progress: true,
            colors: true,

            // Display only errors to reduce the amount of output.
            stats: 'errors-only',

            // Parse host and port from env so this is easy to customize.
            //
            // If you use Vagrant or Cloud9, set
            // host: process.env.HOST || '0.0.0.0';
            //
            // 0.0.0.0 is available to all network devices unlike default
            // localhost
            host: process.env.HOST,
            port: process.env.PORT || 3388
        },
        plugins: [
            new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js"),
            new webpack.HotModuleReplacementPlugin(),
            new NpmInstallPlugin({
                save: true // --save
            })
        ]
    });
}

if(TARGET === 'build') {
    module.exports = merge(common, {
        plugins: [
            new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js")
            //new webpack.optimize.UglifyJsPlugin({minimize: true})
        ]
    });
}

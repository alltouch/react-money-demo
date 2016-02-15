var path = require('path');
var node_modules = path.resolve(__dirname, 'node_modules');
var pathToReact = path.resolve(node_modules, 'react/dist/react.min.js');

module.exports = {
    entry: {
        /*reload: [
            'webpack/hot/dev-server',
            'webpack-dev-server/client?http://localhost:8080'
        ],*/
        main: [
            'webpack/hot/dev-server',
            'webpack-dev-server/client?http://localhost:8080',
            path.resolve(__dirname, 'app/main.js')
        ]
    },
    resolve: {
        alias: {
            'react': pathToReact
        }
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: "[name].js"
    },
    module: {
        loaders: [
            /*{
                test: /\.css$/,
                loader: "style!css"
            },*/
            {
                test: /\.scss$/,
                loader: 'style!css!sass'
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url?limit=15000'
            },
            {
                test: /\.jsx?$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ],
        noParse: [
            pathToReact
        ]
    }
};
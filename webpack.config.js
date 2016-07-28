'use strict';
var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: {
        app: './src/krpano-editor.js'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'krpano-editor.min.js'
    },
    devtool: 'source-map',
    module: {
        loaders: [{
            test: /\.vue$/,
            loader: 'vue'
        }, {
            test: /\.css$/,
            // loader: ExtractTextPlugin.extract('style-loader', 'css-loader')      // put required css resources into standalone .css file
            loader: "style-loader!css-loader"
        }, {
            test: /\.json$/,
            loader: 'json'
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loaders: [
                'url?limit=1&name=/image/[name].[ext]',
                'image-webpack'
            ]
        }, {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url',
            query: {
                limit: 1000,
                name: '/font/[name].[ext]'     // fonts will be put into app/assets/font/ folder
            }
        }]
    },
    imageWebpackLoader: {
        pngquant:{
            quality: "65-80",
            speed: 4
        }
    },
    plugins: [
        // all styles in separate css output file
        // new ExtractTextPlugin('[name].webpack.css', {allChunks: true}),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};
var path = require('path');
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebPackPlugin = require("clean-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
    entry: {
        index: path.resolve(__dirname, 'src/js/alipay.js')
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].[chunkhash:8].js',
    },
    module:{
        rules:[{
            test: /\.less/,
            loader: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [{
                    loader: 'css-loader',
                    options: {
                        minimize: true
                    }
                }, {
                    loader: 'less-loader'
                }]
            })
        }, {
            test: require.resolve('jquery'),
            use: [{
                loader: 'expose-loader',
                options: '$'
            }, {
                loader: 'expose-loader',
                options: 'jQuery'
            }]
        }, {
            test: /\.js/,
            exclude: /(node_modules|bower_components)/,
            use: 'babel-loader'
        }, {
            test: /\.(png|woff|woff2|eot|ttf|svg)$/,
            use: 'url-loader?limit=100000'
        }]
    },

    plugins: [
        new CleanWebPackPlugin(['build']),
        new UglifyJsPlugin({   // compress
            sourceMap: false,
            uglifyOptions: {
                compress: {
                    warnings: false
                }
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new ExtractTextPlugin({        // unique package，单独打包css文件
            filename: 'style.css',
            allChunks: false
        }),
    ],
}
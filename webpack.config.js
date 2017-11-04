var path = require('path');
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
	entry: {
        index: path.resolve(__dirname, 'src/js/alipay.js'),
        vendor: ['lodash'],
    },
	output: {
		path: path.resolve(__dirname, 'build'),   //location to store build file in disk
        publicPath: '/build',   //location for webpack-dev-server to store build file in memory
		filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js',// for lazy-load
	},
	module:{
		rules:[{
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
			test: /\.less/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: ['css-loader', 'less-loader', 'postcss-loader']
			})
		}, {
            test: /\.(png|woff|woff2|eot|ttf|svg)$/,
            use: 'url-loader?limit=100000'
        }]
	},

	plugins: [
        new BundleAnalyzerPlugin(),
        new UglifyJsPlugin({	// compress
            uglifyOptions: {
                compress: {
                    warnings: false
                },
            },
        	sourceMap: true
        }),
        new webpack.optimize.CommonsChunkPlugin({   // common chunk
            name: 'vendor',
            minChunks: Infinity,
        }),
	    new webpack.LoaderOptionsPlugin({		// debug mode
			debug: true
		}),
		new webpack.HotModuleReplacementPlugin(),	// hot module
		new ExtractTextPlugin('style.css'),	// unique package，单独打包css文件
    ],
	watch: true,
	devtool: "inline-source-map",
    devServer: {
        port: 8080,
        contentBase: '.',
        disableHostCheck: false,
    },
}
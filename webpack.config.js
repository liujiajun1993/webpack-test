var path = require('path');
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
	entry: path.resolve(__dirname, 'src/js/alipay.js'),
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: '[name].bundle.js'
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
        new UglifyJsPlugin({	// compress
            uglifyOptions: {
                compress: {
                    warnings: false
                }
            },
        	sourceMap: true
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
var path = require('path');
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	entry: path.resolve(__dirname, 'src/js/alipay.js'),
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'bundle.js'
	},
	module:{
		rules:[{
			test: /\.js/,
			exclude: /(node_modules|bower_components)/,
			use: 'babel-loader'
		}, {
			test: /\.less/,
			//use: ['style-loader','css-loader', 'less-loader', 'postcss-loader'],
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: ['css-loader', 'less-loader', 'postcss-loader']
			})
		}, {
            test: /\.(png|woff|woff2|eot|ttf|svg)$/,
            loader: 'url-loader?limit=100000'
        }]
	},

	plugins: [
        new webpack.optimize.UglifyJsPlugin({	// compress
            compress: {
                warnings: true,
            },
            output: {
                comments: false,
            },
        	sourceMap: true
        }),
	    new webpack.LoaderOptionsPlugin({		// debug mode
			debug: true
		}),
		new webpack.HotModuleReplacementPlugin(),	// hot module
		new ExtractTextPlugin('style.css', {		// unique package，单独打包css文件
  		    allChunks: false
  		}),
    ],
	watch: true,
	devtool: "inline-source-map",
    devServer: {
        port: 8080,
        contentBase: '.',
        disableHostCheck: false,
    },
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = 'source-map'
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
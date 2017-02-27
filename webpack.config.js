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
		},
		{
			test: /\.css/,
			use: ['style-loader','css-loader', 'postcss-loader']
		},
		{
			test: /\.less/,
			use: ['style-loader','css-loader', 'less-loader', 'postcss-loader'],
			// use: ExtractTextPlugin.extract({
			// 	fallback: 'style-loader',
			// 	use: ['css-loader', 'less-loader', 'postcss-loader']
			// })
		}]
	},

	plugins: [
        // new webpack.optimize.UglifyJsPlugin({	// compress
        //     compress: {
        //         warnings: false,
        //     },
        //     output: {
        //         comments: false,
        //     },
        // }),
     	// new webpack.DefinePlugin({			// define environment variable
	    //   'process.env.NODE_ENV': JSON.stringify('production')
	    // }),
	    new webpack.LoaderOptionsPlugin({		// debug mode
			debug: true
		}),
		new webpack.HotModuleReplacementPlugin(),	// hot module
		// new ExtractTextPlugin('style.css', {		// unique package，单独打包css文件
  		//     allChunks: true
  		// }),
  		// new ExtractTextPlugin('style.css'),
    ],
	watch: true,
	devtool: "inline-source-map"
}
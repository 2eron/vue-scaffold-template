var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  	entry: {
		lib: ['vue'],
    	app: './src/app.js'
  	},
  	output: {
    	path: path.resolve(__dirname, 'dist/assets'),
    	publicPath: '/assets/',
    	filename: '[name].js'
  	},
  	resolve: {
    	extensions: ['', '.js', '.vue'],
    	alias: {
      		'src': path.resolve(__dirname, './src')
    	}
  	},
  	resolveLoader: {
    	root: path.join(__dirname, 'node_modules')
  	},
  	module: {
    	loaders: [
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract('vue-style', 'css')
			},
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract('vue-style', 'css!sass')
			},
      		{
        		test: /\.vue$/,
        		loader: 'vue'
      		},
      		{
        		test: /\.js$/,
        		loader: 'babel',
        		exclude: /node_modules/
      		},
      		{
        		test: /\.json$/,
        		loader: 'json'
      		},
      		{
        		test: /\.(png|jpg|gif|svg)$/,
        		loader: 'url',
        		query: {
          			limit: 10000,
          			name: '[name].[hash:7].[ext]'
        		}
      		},
			{
				test: /\.(woff|ttf|eot|svg)/,
				loader: 'file',
				query: {
					name: 'fonts/[name].[ext]?[hash:7]'
				}
			}
    	]
  	},
	vue: {
		autoprefixer: {
			browsers: ['last 2 versions']
		},
		loaders: {
			css: ExtractTextPlugin.extract('css'),
			sass: ExtractTextPlugin.extract('css!sass')
		}
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: 'lib',
			minChunks: Infinity
		})
	]
}

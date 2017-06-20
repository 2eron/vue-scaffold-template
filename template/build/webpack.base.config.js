var path = require('path')
var webpack = require('webpack')
var autoprefixer = require('autoprefixer')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var utils = require('./utils')
var vendorEntries = require('./vendor-entries')
var entries = utils.getEntries()
Object.assign(vendorEntries, utils.getEntries())
module.exports = {
	entry: entries,
	output: {
    	path: path.resolve(__dirname, '../dist/assets'),
    	publicPath: '/assets/',
    	filename: '[name].js',
		chunkFilename: '[name].chunk.js'
  	},
  	resolve: {
    	extensions: ['.js', '.vue','.scss', '.css'],
    	alias: {
      		'src': path.resolve(__dirname, '../src'),
			'components': path.resolve(__dirname, '../src/components'),
			'views': path.resolve(__dirname, '../src/views'),
            'assets': path.resolve(__dirname, '../src/assets')
    	}
  	},
  	module: {
    	rules: [
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'postcss-loader']
				})
			},
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'postcss-loader', 'sass-loader']
				})
			},
      		{
        		test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					loaders: {
						css: ExtractTextPlugin.extract({
							use: ['css-loader', 'postcss-loader'],
							fallback: 'style-loader'
						}),
						sass: ExtractTextPlugin.extract({
							use: ['css-loader', 'postcss-loader', 'sass-loader'],
							fallback: 'style-loader'
						})
					}
				}
      		},
      		{
        		test: /\.js$/,
        		loader: 'babel-loader',
        		exclude: /node_modules/
      		},
      		{
        		test: /\.(png|jpg|gif)$/,
				loader: 'file-loader',
				options: {
					name: 'img/[name].[hash:7].[ext]'
				}
      		},
			{
				test: /fonts\/.*\.(woff|ttf|eot|svg)/,
				loader: 'file-loader',
				options: {
					name: 'fonts/[name].[hash:7].[ext]'
				}
			}
    	]
  	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: 'common',
			chunks: utils.getEntryNames()
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'framework',
			chunks: ['common', 'vue']
		})
	],
	devServer: {
		disableHostCheck: true
	}
}

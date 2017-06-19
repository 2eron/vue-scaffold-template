// denpendencies
var path = require('path')
var webpack = require('webpack')
var config = require('./webpack.base.config')
var utils = require('./utils')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

// do not specify --devtool on the command line
config.devtool = '#source-map'

config.output.publicPath = '/'

var hotMiddlewareScript = ['webpack-hot-middleware/client?reload=true&noInfo=true']

// add hot-reload related code to entry chunks
Object.keys(config.entry).forEach(function(name){
	config.entry[name] = hotMiddlewareScript.concat(config.entry[name])
})

// enable HMR when modify the style, must set disable option true
// https://stackoverflow.com/questions/43286977/how-to-hot-reload-sass-using-webpack-2
config.plugins = (config.plugins||[]).concat([
	new ExtractTextPlugin({
		filename: 'css/[name].css',
		disable: true
	}),
	new webpack.HotModuleReplacementPlugin(),
	new webpack.optimize.OccurrenceOrderPlugin(),
	new webpack.NoEmitOnErrorsPlugin()
])

var template = "src/templates/default.html"
var pages = utils.getPages()
// add HtmlWebpackPlugin to plugins
pages.forEach(function(page){
	config.plugins.push(new HtmlWebpackPlugin({
		title: page.title,
		filename: page.url,
		template: !!page.template?page.template:template,
		chunks: page.chunks,
		chunksSortMode: 'dependency'
	}))
})

module.exports = config

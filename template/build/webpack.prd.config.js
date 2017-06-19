// denpendencies
var webpack = require('webpack')
var config = require('./webpack.base.config')
var utils = require('./utils')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

// short-circuits all Vue.js warning code
var DefinePlugin = new webpack.DefinePlugin({
	'process.env': {
		NODE_ENV: '"production"'
	}
})

// var host = 'http://m.dejionline.com'

// relative path 
var host = ''

config.output.publicPath = host + config.output.publicPath

// minify with dead-code elimination
var UglifyJsPlugin = new webpack.optimize.UglifyJsPlugin({
	compress: {
		warnings: false
	}
})

config.output.filename = 'js/[name].[chunkhash].js'
config.output.chunkFilename = 'js/[id].[chunkhash].js'

config.plugins = (config.plugins||[]).concat([
	DefinePlugin,
	UglifyJsPlugin,
	new ExtractTextPlugin({
		filename: 'css/[name].[contenthash:7].css',
		allChunks: true
	}),
])

var template = "src/template/default.html"
var pages = utils.getPages()
// add HtmlWebpackPlugin to plugins
pages.forEach(function(page){
	config.plugins.push(new HtmlWebpackPlugin({
		title: page.title,
		filename: '../'+page.url,
		template: !!page.template?page.template:template,
		chunks: page.chunks,
		chunksSortMode: 'dependency'
	}))
})

module.exports = config

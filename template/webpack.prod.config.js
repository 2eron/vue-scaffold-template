// denpendencies
var webpack = require('webpack');
var config = require('./webpack.base.config');
var pageMap = require('./pagemap');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

// short-circuits all Vue.js warning code
var DefinePlugin = new webpack.DefinePlugin({
	'process.env': {
		NODE_ENV: '"prod"'
	}
});

var host = 'http://www.dejionline.com';

config.output.publicPath = host + config.output.publicPath;

// minify with dead-code elimination
var UglifyJsPlugin = new webpack.optimize.UglifyJsPlugin({
	compress: {
		warnings: false
	}
});

config.output.filename = 'js/[name].[chunkhash].js';
config.output.chunkFilename = 'js/[id].[chunkhash].js';

config.plugins = (config.plugins||[]).concat([
	DefinePlugin,
	UglifyJsPlugin,
	new ExtractTextPlugin('css/[name].[contenthash].css')
]);

// add HtmlWebpackPlugin to plugins
Object.keys(pageMap).forEach(function(key){
	var page = pageMap[key];
	config.plugins.push(new HtmlWebpackPlugin({
		filename: '../'+key,
		title: page.title,
		template: page.template,
		chunks: page.chunks
	}))
});

module.exports = config;

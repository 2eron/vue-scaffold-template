// denpendencies
var path = require('path')
var webpack = require('webpack');
var config = require('./webpack.base.config');
var pageMap = require('./pagemap');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

// do not specify --devtool on the command line
config.devtool = '#source-map';

config.output.publicPath = '/';

config.plugins = (config.plugins||[]).concat([
	new webpack.NoErrorsPlugin(),
	new ExtractTextPlugin('css/[name].css')
]);

// add HtmlWebpackPlugin to plugins
Object.keys(pageMap).forEach(function(key){
	var page = pageMap[key];
	config.plugins.push(new HtmlWebpackPlugin({
		filename: key,
		title: page.title,
		template: page.template,
		chunks: page.chunks
	}));
});

module.exports = config;

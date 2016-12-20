// denpendencies
var webpack = require('webpack');
var baseConfig = require('./webpack.base.config');
var pageMap = require('../pagemap');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

// short-circuits all Vue.js warning code
var DefinePlugin = new webpack.DefinePlugin({
	'process.env': {
		NODE_ENV: '"prod"'
	}
});

var host = '/';

baseConfig.output.publicPath = host + baseConfig.output.publicPath;

// minify with dead-code elimination
var UglifyJsPlugin = new webpack.optimize.UglifyJsPlugin({
	compress: {
		warnings: false
	}
});

baseConfig.output.filename = 'js/[name].[chunkhash].js';
baseConfig.output.chunkFilename = 'js/[id].[chunkhash].js';

baseConfig.plugins = (baseConfig.plugins||[]).concat([
	DefinePlugin,
	UglifyJsPlugin,
	new ExtractTextPlugin('css/[name].[contenthash].css')
]);

// add HtmlWebpackPlugin to plugins
baseConfig.plugins.push(new HtmlWebpackPlugin({
    filename: 'index.html',
    template: './src/index.html',
    chunks: ['common', 'lib', 'app'],
    inject: true,
    chunksSortMode: 'dependency'
}));

module.exports = baseConfig

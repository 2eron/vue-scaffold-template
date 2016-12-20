// denpendencies
var path = require('path')
var webpack = require('webpack');
var baseConfig = require('./webpack.base.config');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

// hot middleware client script
var hotMiddlewareScript = ['webpack-hot-middleware/client?reload=true&noInfo=true']

// do not specify --devtool on the command line
baseConfig.devtool = '#source-map';

baseConfig.output.publicPath = '/';

// add hot middleware client script to entry chunks
Object.keys(baseConfig.entry).forEach((function(key){
	baseConfig.entry[key] = hotMiddlewareScript.concat(baseConfig.entry[key])
}));

baseConfig.plugins = (baseConfig.plugins||[]).concat([
	new ExtractTextPlugin('css/[name].css'),
	// webpack-hot-middleware
	new webpack.optimize.OccurenceOrderPlugin(),
	new webpack.HotModuleReplacementPlugin(),
	new webpack.NoErrorsPlugin()
]);

// add HtmlWebpackPlugin to plugins
baseConfig.plugins.push(new HtmlWebpackPlugin({
    filename: 'index.html',
    template: './src/index.html',
    chunks: ['common', 'lib', 'app'],
    inject: true,
    chunksSortMode: 'dependency'
}));

module.exports = baseConfig;

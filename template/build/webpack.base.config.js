var path = require('path')
var webpack = require('webpack')
var autoprefixer = require('autoprefixer')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
	entry: {
        app: './src/app.js'
    },
	output: {
    	path: path.resolve(__dirname, '../dist/assets'),
    	publicPath: '/assets/',
    	filename: '[name].js',
		chunkFilename: '[name].chunk.js'
  	},
  	resolve: {
    	extensions: ['', '.js', '.vue','.scss', '.css'],
    	alias: {
      		'src': path.resolve(__dirname, '../src'),
			'components': path.resolve(__dirname, '../src/components'),
            'assets': path.resolve(__dirname, '../src/assets')
    	}
  	},
  	resolveLoader: {
    	root: path.join(__dirname, 'node_modules')
  	},
  	module: {
    	loaders: [
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract('vue-style', 'css!postcss')
			},
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract('vue-style', 'css!postcss!sass')
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
        		test: /\.(png|jpg|gif)$/,
        		loader: 'file',
        		query: {
          			name: 'img/[name].[hash:7].[ext]'
        		}
      		},
			{
				test: /\.(woff|ttf|eot|svg)/,
				loader: 'file',
				query: {
					name: 'fonts/[name].[hash:7].[ext]'
				}
			}
    	]
  	},
	vue: {
		loaders: {
			css: ExtractTextPlugin.extract('css!postcss'),
			sass: ExtractTextPlugin.extract('css!postcss!sass')
		}
	},
	postcss: [
		autoprefixer({
			browsers: ['last 2 versions']
		})
	],
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: 'lib',
            minChunks: function (module, count) {
                // any required modules inside node_modules are extracted to vendor
                return (
                    module.resource &&
                        /\.js$/.test(module.resource) &&
                        module.resource.indexOf(
                            path.join(__dirname, '../node_modules')
                        ) === 0
                    )
            }
		}),
		// manifest
		new webpack.optimize.CommonsChunkPlugin({
			name: 'common',
			chunks: ['lib']
		})
	]
}

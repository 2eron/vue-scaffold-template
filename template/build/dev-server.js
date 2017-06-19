var path = require('path');
var express = require('express');
var webpack = require('webpack');
var webpackDevConfig = require('./webpack.dev.config');
var devMiddleware = require('webpack-dev-middleware');
var hotMiddleware = require('webpack-hot-middleware');
var compiler = webpack(webpackDevConfig);
var pkg = require('../package.json')
var app = express();
var port = 9999;

// use webpack-dev-middleware
app.use(devMiddleware(compiler, {
    publicPath: webpackDevConfig.output.publicPath,
    quiet: false,
    stats: {
        colors: true
    }
}));
// use webpack-hot-middleware
// config heartbeat to solve an error in node v8
// https://github.com/glenjamin/webpack-hot-middleware/issues/210
app.use(hotMiddleware(compiler, {heartbeat: 5000}));

console.log(process.env.NODE_ENV)
// start server
app.listen(port, err=>{
    if(err){
        console.log(err);
        return;
    }
    console.log(`${pkg.name} listening on port ${port}`);
});

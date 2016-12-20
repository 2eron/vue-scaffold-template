var express = require('express');
var webpack = require('webpack');
var webpackDevConfig = require('./webpack.dev.config');
var devMiddleware = require('webpack-dev-middleware');
var hotMiddleware = require('webpack-hot-middleware');
var compiler = webpack(webpackDevConfig);

var port = process.env.PORT || 8090;
var app = express();

// use webpack-dev-middleware
app.use(devMiddleware(compiler, {
    publicPath: webpackDevConfig.output.publicPath,
    stats: {
        colors: true
    }
}));

// use webpack-hot-middleware
app.use(hotMiddleware(compiler));

app.listen(port, function(err){
    if(err){
        console.log(err);
        return;
    }
    console.log('Server is listening at ' + port);
})

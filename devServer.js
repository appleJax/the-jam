var webpack = require('webpack'),
    WebpackDevServer = require('webpack-dev-server'),
    config = require('./webpack.config'),
    port = 8080,
    compiler = webpack(config);

new WebpackDevServer(compiler, {
  hot: true,
  stats: {colors: true}
}).listen(port, 'localhost', function(err, result) {
    if (err) {
      console.log(err);
    }

    console.log("Listening at localhost:" + port);
});

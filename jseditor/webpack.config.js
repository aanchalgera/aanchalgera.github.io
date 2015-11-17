var webpack = require('webpack');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
module.exports = {
  entry: "./App.js",
  output: {
    filename: "public/bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel'
      },
      {
        include: /\.json$/,
        loaders: ["json-loader"]
      },
    ]
  },
  resolve: {
    extensions: ['', '.json', '.jsx', '.js']
  },
  plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|es/),
        new webpack.DefinePlugin({
            'process.env': {
                // This has effect on the react lib size
                'NODE_ENV': JSON.stringify('production'),
            }
        }),
        new webpack.optimize.UglifyJsPlugin()
    ]
};

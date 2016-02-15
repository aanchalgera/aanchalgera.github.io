var webpack = require('webpack');
var NODE_ENV = process.env.NODE_ENV;

var configs = {
  production: {
    host: 'http://admin.weblogssl.com',
    blogUrl: 'http://www.xataka.com/',
    firebaseUrl: 'https://brilliant-heat-3614.firebaseio.com/',
    cloudName: 'realarpit',
    uploadPreset: 'h2sbmprz',
    timezone: 'Europe/Madrid',
  },
  testing: {
    host: 'http://test.admin.weblogssl.com',
    blogUrl: 'http://testing.xataka.com/',
    firebaseUrl: 'https://dazzling-torch-3017.firebaseio.com/',
    cloudName: 'agilemediatest',
    uploadPreset: 'aras8ztr',
    timezone: 'Europe/Madrid',
  },
  development: {
    host: 'http://test.admin.weblogssl.com',
    blogUrl: 'http://dev.xataka.com/',
    firebaseUrl: 'https://flickering-fire-6653.firebaseio.com/',
    cloudName: 'agilemediatest',
    uploadPreset: 'aras8ztr',
    timezone: 'Europe/Madrid',
  },
};

if (typeof configs[NODE_ENV] == 'undefined') {
  var configParams = configs.development;
} else {
  var configParams = configs[NODE_ENV];
}

module.exports = {
  entry: './App.js',
  output: {
    filename: 'public/bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets:['es2015', 'stage-0', 'stage-2', 'react'],
        },
      },
      {
        include: /\.json$/,
        loader: 'json-loader',
      },
    ],
  },
  resolve: {
    extensions: ['', '.json', '.jsx', '.js'],
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|es/),
    new webpack.DefinePlugin({
      configParams: JSON.stringify(configParams),
      'process.env': {
        // This has effect on the react lib size
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin(),
  ],
};

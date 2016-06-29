var webpack = require('webpack');
var NODE_ENV = process.env.NODE_ENV;

var configs = {
  production: {
    host: 'http://admin.weblogssl.com',
    blogUrl: 'http://www.xataka.com/',
    firebaseUrl: 'https://brilliant-heat-3614.firebaseio.com/',
    cloudName: 'realarpit',
    uploadPreset: 'h2sbmprz',
    timezone: 'Europe/Madrid'
  },
  testing: {
    host: 'http://test.admin.weblogssl.com',
    blogUrl: 'http://testing.xataka.com/',
    firebaseUrl: 'https://dazzling-torch-3017.firebaseio.com/',
    cloudName: 'agilemediatest',
    uploadPreset: 'aras8ztr',
    timezone: 'Europe/Madrid'
  },
  development: {
    host: 'http://test.admin.weblogssl.com',
    blogUrl: 'http://dev.xataka.com/',
    firebaseUrl: 'https://flickering-fire-6653.firebaseio.com/',
    cloudName: 'agilemediatest',
    uploadPreset: 'aras8ztr',
    timezone: 'Europe/Madrid'
  }
};

var configParams;
if (typeof configs[NODE_ENV] == 'undefined') {
  configParams = configs.development;
} else {
  configParams = configs[NODE_ENV];
}

module.exports = {
  entry: './App.js',
  output: {
    filename: 'public/bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets:['es2015', 'stage-0', 'stage-2', 'react']
        }
      },
      {
        include: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['', '.json', '.jsx', '.js']
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|es/),
    new webpack.DefinePlugin({
      configParams: JSON.stringify(configParams),
      'process.env': {
        // This has effect on the react lib size
        NODE_ENV: JSON.stringify(NODE_ENV == 'development' ? 'development' : 'production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}})
  ]
};

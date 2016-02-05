var webpack = require('webpack');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

if ('production' == process.env.NODE_ENV) {
  var configParams = {
      'host' : 'http://admin.weblogssl.com',
      'blogUrl' : 'http://www.xataka.com/',
      'firebaseUrl': 'https://brilliant-heat-3614.firebaseio.com/',
      'cloudName' : 'realarpit',
      'uploadPreset' : 'h2sbmprz',
      'timezone' : 'Europe/Madrid'
  }
} else if ('testing' == process.env.NODE_ENV) {
  var configParams = {
      'host' : 'http://test.admin.weblogssl.com',
      'blogUrl' : 'http://testing.xataka.com/',
      'firebaseUrl': 'https://dazzling-torch-3017.firebaseio.com/',
      'cloudName' : 'agilemediatest',
      'uploadPreset' : 'aras8ztr',
      'timezone' : 'Europe/Madrid'
  }
} else if ('development' == process.env.NODE_ENV) {
  var configParams = {
      'host' : 'http://dev.code.com',
      'blogUrl' : 'http://dev.xataka.com:8282/',
      'firebaseUrl': 'https://dazzling-torch-3017.firebaseio.com/',
      'cloudName' : 'agilemediatest',
      'uploadPreset' : 'aras8ztr',
      'timezone' : 'Europe/Madrid'
  }
} else {
  console.log('NODE_ENV not defined');
  return false;
}

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
        loader: 'babel',
        query: {
          presets:['es2015', 'stage-0', 'stage-2', 'react']
        }
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
      'configParams': JSON.stringify(configParams),
      'process.env': {
        // This has effect on the react lib size
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin()
  ]
};

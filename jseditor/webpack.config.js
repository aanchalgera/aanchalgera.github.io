var webpack = require('webpack');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

if ('production' == process.env.NODE_ENV) {
  var configParams = {
      'host' : 'http://52.19.39.251',
      'blogUrl' : 'http://www.xataka.com/',
      'firebaseUrl': 'https://brilliant-heat-3614.firebaseio.com/',
      'cloudName' : 'realarpit',
      'uploadPreset' : 'h2sbmprz',
      'timezone' : 'Europe/Madrid'
    }
} else if ('testing' == process.env.NODE_ENV) {
  var configParams = {
      'host' : 'http://52.19.4.152',
      'blogUrl' : 'http://testing.xataka.com/',
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
        //new webpack.NoErrorsPlugin(),
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|es/),
        new webpack.DefinePlugin({
            'configParams': JSON.stringify(configParams),
            'process.env': {
                // This has effect on the react lib size
                'NODE_ENV': JSON.stringify('testing'),
            }
        }),
      //  new webpack.optimize.UglifyJsPlugin()
    ]
};

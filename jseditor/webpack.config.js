var webpack = require('webpack');
var path = require('path');
var NODE_ENV = process.env.NODE_ENV || 'development';

var configs = {
  production: {
    apiKey: process.env.FIREBASE_KEY || 'YJsHk9nHLb0MNnwFCqCFIDH6CCCHUvkOxP9FhX06',
    host: 'http://admin.weblogssl.com',
    blogUrl: 'http://www.xataka.com/',
    firebaseUrl: process.env.FIREBASE_URL || 'https://brilliant-heat-3614.firebaseio.com/',
    cloudName: 'weblogssl',
    uploadPreset: 'h2sbmprz',
    timezone: 'Europe/Madrid',
    cssPath: 'https://img.weblogssl.com/css/papelenblanco/admin-contenfoundry/main.css'
  },
  testing: {
    apiKey: process.env.FIREBASE_KEY || 'JCIDuff5nTLMU6zfXXtcVjIzmvkvgruL573ldNdC',
    host: 'http://test.admin.weblogssl.com',
    blogUrl: 'http://testing.xataka.com/',
    firebaseUrl: process.env.FIREBASE_URL || 'https://dazzling-torch-3017.firebaseio.com/',
    cloudName: 'weblogssl',
    uploadPreset: 'h2sbmprz',
    timezone: 'Europe/Madrid',
    cssPath: 'http://testblogwp.weblogssl.com/temp/devel/2011-template/editor/css/admin.css'
  },
  development: {
    apiKey: process.env.FIREBASE_KEY || 'ReUUQjcoOpIFc9rJiJ7z5iFp1PrB5PsuslH0gFiL',
    host: 'http://test.admin.weblogssl.com',
    blogUrl: 'http://dev.xataka.com/',
    firebaseUrl: process.env.FIREBASE_URL || 'https://flickering-fire-6653.firebaseio.com/',
    cloudName: 'weblogssl',
    uploadPreset: 'h2sbmprz',
    timezone: 'Europe/Madrid',
    cssPath: 'http://testblogwp.weblogssl.com/temp/devel/2011-template/editor/css/admin.css'
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
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public/')
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: {
          presets:['es2015', 'stage-0', 'stage-2', 'react']
        }
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.json', '.jsx', '.js']
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|es/),
    new webpack.DefinePlugin({
      configParams: JSON.stringify(configParams),
      'process.env': {
        // This has effect on the react lib size
        NODE_ENV: JSON.stringify(NODE_ENV == 'development' ? 'development' : 'production')
      }
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devtool: "inline-source-map",
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    historyApiFallback: true,
    disableHostCheck: true,
    hot: true
  }
};

if (NODE_ENV != 'development') {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin({ minimize: true })
  );
}

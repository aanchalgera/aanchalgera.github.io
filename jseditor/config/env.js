'use strict';

const fs = require('fs');
const path = require('path');
const paths = require('./paths');

// Make sure that including paths.js after env.js will read .env variables.
delete require.cache[require.resolve('./paths')];

const NODE_ENV = process.env.NODE_ENV;
if (!NODE_ENV) {
  throw new Error(
    'The NODE_ENV environment variable is required but was not specified.'
  );
}

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


// https://github.com/bkeepers/dotenv#what-other-env-files-can-i-use
var dotenvFiles = [
  `${paths.dotenv}.${NODE_ENV}.local`,
  `${paths.dotenv}.${NODE_ENV}`,
  // Don't include `.env.local` for `test` environment
  // since normally you expect tests to produce the same
  // results for everyone
  NODE_ENV !== 'test' && `${paths.dotenv}.local`,
  paths.dotenv,
].filter(Boolean);

// Load environment variables from .env* files. Suppress warnings using silent
// if this file is missing. dotenv will never modify any environment variables
// that have already been set.
// https://github.com/motdotla/dotenv
dotenvFiles.forEach(dotenvFile => {
  if (fs.existsSync(dotenvFile)) {
    require('dotenv').config({
      path: dotenvFile,
    });
  }
});

// We support resolving modules according to `NODE_PATH`.
// This lets you use absolute paths in imports inside large monorepos:
// https://github.com/facebookincubator/create-react-app/issues/253.
// It works similar to `NODE_PATH` in Node itself:
// https://nodejs.org/api/modules.html#modules_loading_from_the_global_folders
// Note that unlike in Node, only *relative* paths from `NODE_PATH` are honored.
// Otherwise, we risk importing Node.js core modules into an app instead of Webpack shims.
// https://github.com/facebookincubator/create-react-app/issues/1023#issuecomment-265344421
// We also resolve them to make sure all tools using them work consistently.
const appDirectory = fs.realpathSync(process.cwd());
process.env.NODE_PATH = (process.env.NODE_PATH || '')
  .split(path.delimiter)
  .filter(folder => folder && !path.isAbsolute(folder))
  .map(folder => path.resolve(appDirectory, folder))
  .join(path.delimiter);

// Grab NODE_ENV and REACT_APP_* environment variables and prepare them to be
// injected into the application via DefinePlugin in Webpack configuration.
const REACT_APP = /^REACT_APP_/i;

function getClientEnvironment(publicUrl) {
  const raw = Object.keys(process.env)
    .filter(key => REACT_APP.test(key))
    .reduce(
      (env, key) => {
        env[key] = process.env[key];
        return env;
      },
      {
        // Useful for determining whether we’re running in production mode.
        // Most importantly, it switches React into the correct mode.
        NODE_ENV: process.env.NODE_ENV || 'development',
        // Useful for resolving the correct path to static assets in `public`.
        // For example, <img src={process.env.PUBLIC_URL + '/img/logo.png'} />.
        // This should only be used as an escape hatch. Normally you would put
        // images into the `src` and `import` them in code to get their paths.
        PUBLIC_URL: publicUrl,
      }
    );
  // Stringify all values so we can feed into Webpack DefinePlugin
  const stringified = {
    configParams: JSON.stringify(configParams),
    'process.env': Object.keys(raw).reduce((env, key) => {
      env[key] = JSON.stringify(raw[key]);
      return env;
    },
     {}),
  };

  return { raw, stringified };
}

module.exports = getClientEnvironment;

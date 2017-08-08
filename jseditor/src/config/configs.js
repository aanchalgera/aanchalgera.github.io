let configParams = {};

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

configParams = configs[process.env.REACT_APP_ENV];

export default configParams;

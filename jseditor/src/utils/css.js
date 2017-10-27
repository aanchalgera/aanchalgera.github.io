import configParams from '../config/configs.js';

export default class CSS {
  static addCSS(path) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = path;
    document.head.appendChild(link);
  }

  static prepare() {
    const cssPath =
      'https://img.weblogssl.com/css/diariodelviajero/skin-admin-writeboard/main.css';
    let extraParameters = '';
    if (process.env.NODE_ENV === 'production') {
      const date = new Date();
      extraParameters =
        '?v=' +
        date.getFullYear() +
        date.getMonth() +
        date.getDate() +
        date.getHours();
    }
    this.addCSS(configParams.cssPath + extraParameters);
    this.addCSS(cssPath + extraParameters);
  }
}

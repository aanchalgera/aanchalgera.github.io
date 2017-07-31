export default class CSS {
  static prepare() {
    let extraParameters = '';
    if (process.env.NODE_ENV == 'production') {
      const date = new Date;
      extraParameters = '?v=' + date.getFullYear() + date.getMonth() + date.getDate() + date.getHours();
    }
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = configParams.cssPath + extraParameters;
    document.head.appendChild(link);
  }
}

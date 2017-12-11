const React = require('react');

if (process.env.NODE_ENV === 'development') {
  module.exports = require('./DevTools');
} else {
  module.exports = () => (<span></span>);
}

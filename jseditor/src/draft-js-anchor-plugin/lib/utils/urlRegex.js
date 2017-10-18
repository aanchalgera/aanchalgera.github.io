'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _ipRegex = require('ip-regex');

var _ipRegex2 = _interopRequireDefault(_ipRegex);

var _tlds = require('tlds');

var _tlds2 = _interopRequireDefault(_tlds);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = function(_opts) {
  var opts = Object.assign({ strict: true }, _opts);
  var protocol = '(?:(?:[a-z]+:)?//)' + (opts.strict ? '' : '?');
  var auth = '(?:\\S+(?::\\S*)?@)?';
  var ip = _ipRegex2.default.v4().source;
  var host = '(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)';
  var domain = '(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*';
  var tld =
    '(?:\\.' +
    (opts.strict
      ? '(?:[a-z\\u00a1-\\uffff]{2,})'
      : '(?:' +
        _tlds2.default
          .sort(function(a, b) {
            return b.length - a.length;
          })
          .join('|') +
        ')') +
    ')\\.?';
  var port = '(?::\\d{2,5})?';
  var path = '(?:[/?#][^\\s"]*)?';
  var regex =
    '(?:' +
    protocol +
    '|www\\.)' +
    auth +
    '(?:localhost|' +
    ip +
    '|' +
    host +
    domain +
    tld +
    ')' +
    port +
    path;

  return opts.exact
    ? new RegExp('(?:^' + regex + '$)', 'i')
    : new RegExp(regex, 'ig');
};

import React from 'react';

export default class ChartScript extends React.Component {
  infogram(e=document, t='script', n="infogram-async", s="//e.infogr.am/js/dist/embed-loader-min.js") {
    var i = "InfogramEmbeds",
      o = e.getElementsByTagName(t),
      d = o[0],
      a = /^http:/.test(e.location) ? "http:" : "https:";
    if (/^\/{2}/.test(s) && (s = a + s), window[i] && window[i].initialized) window[i].process && window[i].process();
    else if (!e.getElementById(n)) {
      var r = e.createElement(t);
      r.async = 1, r.id = n, r.src = s, d.parentNode.insertBefore(r, d);
    }
  }

  componentDidMount() {
    this.infogram();
  }

  render () {
    return (
      <div
        className="infogram-embed"
        data-id={this.props.infogramId}
        data-type="interactive"
        data-title="Untitled chart">
      </div>
    );
  }
}

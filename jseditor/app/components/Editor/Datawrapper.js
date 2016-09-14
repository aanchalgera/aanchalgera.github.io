import React from 'react';

export default class Datawrapper extends React.Component {
  componentDidMount() {
    var embedDeltas = {
        '100': 427,
        '200': 400,
        '300': 400,
        '400': 400,
        '500': 400,
        '600': 400,
        '700': 400,
        '800': 400,
        '900': 400,
        '1000': 400
      },
      chart = document.getElementById('datawrapper-chart-' + this.props.graphId),
      chartWidth=chart.offsetWidth,
      applyDelta = embedDeltas[Math.min(1000, Math.max(100*(Math.floor(chartWidth/100)), 100))]||0,
      newHeight=applyDelta;
    chart.style.height=newHeight+'px';
  }

  render() {
    let graphId = this.props.graphId;
    return (
      <iframe
        id={'datawrapper-chart-' + graphId}
        src={this.props.url}
        frameBorder="0"
        allowTransparency="true"
        allowFullScreen="allowFullScreen"
        width="100%"
        height="400"
      >
      </iframe>
    );
  }
}

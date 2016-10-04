import React from 'react';

export default class Video extends React.Component {
  focus() {
    this.refs.field.focus();
  }

  render() {
    if ('' == this.props.data.url) {
      return (
        <div>
          <label className="ptitle">
            URL of video
            {this.props.showHints === false ? null : <span className="hint">(Please add video url from youtube share tab.)</span>}
          </label>
          <input
            type="text"
            ref="field"
            className="form-control"
            defaultValue={this.props.data.url}
            onBlur={() => this.props.updateVideo(this.props.dataId, this.refs.field.value)}
            placeholder="https://www.youtube.com/embed/azxoVRTwlNg"
          />
        </div>
      );
    }

    return (
      <div className={'fluid-width-video-wrapper' + (this.props.data.layout ? ' asset-size-' + this.props.data.layout : '')}>
        <iframe src={this.props.data.url}></iframe>
      </div>
    );
  }
}
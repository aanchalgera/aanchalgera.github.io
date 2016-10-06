import React from 'react';

export default class Video extends React.Component {
  constructor(props) {
    super(props);
    this.updateVideo = this.updateVideo.bind(this);
  }

  focus() {
    this.refs.field.focus();
  }

  updateVideo() {
    clearTimeout(this._timeout);
    this._timeout = setTimeout(() => {
      this.props.updateResource(this.props.dataId, 'video', this.refs.field.value);
    }, 1000);
  }

  render() {
    if ('' == this.props.data.url) {
      return (
        <div>
          <label className="ptitle">
            URL of video <span className="hint">(Please add video url from youtube share tab.)</span>
          </label>
          <input
            type="text"
            ref="field"
            className="form-control"
            defaultValue={this.props.data.url}
            onChange={this.updateVideo}
            placeholder="https://www.youtube.com/embed/azxoVRTwlNg"
          />
        </div>
      );
    }

    return (
      <div className={'fluid-width-video-wrapper asset-size-' + this.props.data.layout}>
        <iframe src={this.props.data.url}></iframe>
      </div>
    );
  }
}
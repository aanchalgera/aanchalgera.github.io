import React from 'react';
import ImageCaption from './ImageCaption';

export default class Chart extends React.Component {
  componentDidMount() {
    const field = this.refs.field;
    if (field) {
      field.focus();
    }
  }

  render () {
    let chart='';
    var imageCaption = this.props.data.description != undefined ? this.props.data.description : '';

    if('' == this.props.data.url) {
      chart = (
        <input
          type="text"
          ref="field"
          className="form-control"
          defaultValue={this.props.data.url}
          onBlur={this.props.updateResource.bind(this, {type: 'chart', currentIndex: this.props.dataId})}
          placeholder="https://infogr.am/top_earners-73544">
        </input>
      );
    } else {
      chart = (
        <iframe
          src={this.props.data.url}
          width="700"
          height="580"
          scrolling="no"
          frameBorder="0"
        >
        </iframe>
      );
    }

    return (
      <div>
        <label className="ptitle">
          Graphs <span className="hint">(You can use infogram eg. "https://infogr.am/top_earners-73544" or Datawrapper eg. "//datawrapper.dwcdn.net/Qpc9c/1/")</span>
        </label>
        <div className={'asset-size-' + this.props.data.layout}>
          {chart}
          <ImageCaption
            type={this.props.data.type}
            addImageCaption={this.props.addImageCaption.bind(this)}
            fieldId={this.props.dataId}
            imageCaption={imageCaption}
          />
        </div>
      </div>
    );
  }
}

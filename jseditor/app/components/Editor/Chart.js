import React from 'react';
import ImageCaption from './ImageCaption';
import ChartScript from './ChartScript';

export default class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.updateResource = this.props.updateResource.bind(this);
    this.addImageCaption = this.props.addImageCaption.bind(this);
  }

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
          onBlur={this.updateResource(this, {type: 'infogram', currentIndex: this.props.dataId})}
          placeholder="https://infogr.am/be7b47aa-3d58-44da-a246-c015889c0459">
        </input>
      );
    } else {
      chart = <ChartScript
        infogramId = {this.props.data.infogramId}
      />;
    }

    return (
      <div>
        <label className="ptitle">
          Graphs <span className="hint">(You can use infogram eg. "https://infogr.am/be7b47aa-3d58-44da-a246-c015889c0459" or Datawrapper eg. "//datawrapper.dwcdn.net/Qpc9c/1/")</span>
        </label>
        <div className={'asset-size-' + this.props.data.layout}>
          {chart}
          <ImageCaption
            type={this.props.data.type}
            addImageCaption={this.addImageCaption()}
            fieldId={this.props.dataId}
            imageCaption={imageCaption}
          />
        </div>
      </div>
    );
  }
}

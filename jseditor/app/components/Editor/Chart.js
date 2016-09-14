import React from 'react';
import ImageCaption from './ImageCaption';
import Infogram from './Infogram';

export default class Chart extends React.Component {
  focus() {
    this.refs.field.focus();

  componentDidMount() {
    const field = this.refs.field;
    if (field) {
      field.focus();
    }

  render () {
    let chart='';
    if('' == this.props.data.url) {
      chart = (
        <input
          type="text"
          ref="field"
          className="form-control"
          defaultValue={this.props.data.url}
          onBlur={() => this.props.updateResource({type: 'graph', currentIndex: this.props.dataId})}
          placeholder="https://infogr.am/be7b47aa-3d58-44da-a246-c015889c0459">
        </input>
      );
    } else if(this.props.data.type == 'infogram') {
      chart = <Infogram
        graphId = {this.props.data.graphId}
      />;
    } else if (this.props.data.type == 'datawrapper') {
      chart = (
        <img
          data-id={this.props.dataId}
          src={'http://s3.eu-central-1.amazonaws.com/datawrapper-charts/static/'+this.props.data.graphId+'/m.png'}
        />
      );
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
            addImageCaption={this.props.addImageCaption}
            fieldId={this.props.dataId}
            imageCaption={this.props.data.description}
          />
        </div>
      </div>
    );
  }
}

import React from 'react';
import DraftJSEditor from './DraftJSEditor/DraftJSEditor';

export default class Summary extends React.Component {
  focus() {
    this.refs.field.focus();
  }

  render() {
    return (
      <div className={this.props.data.layout ? 'asset-size-' + this.props.data.layout : ''}>
        <label className="ptitle">Summary</label>
        <DraftJSEditor
          ref="field"
          minimal={true}
          className="form-control blockquote"
          value={this.props.data.text}
          updateResource={this.props.updateResource}
          dataId={this.props.dataId}
        />
      </div>
    );
  }
}

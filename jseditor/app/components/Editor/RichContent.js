import React from 'react';

export default class RichContent extends React.Component {
  focus() {
    this.refs.field.focus();
  }

  render() {
    return (
      <div>
        <label className="ptitle">
          Rich content snippet
          {this.props.showHints === false ? null : <span className="hint">(You can use HTML, CSS and Javascript here)</span>}
        </label>
        <div
          className="form-control"
          ref="field"
          contentEditable="true"
          onBlur={() => this.props.updateText(this.props.dataId, this.refs.field.textContent)}
        >
          {this.props.data.text}
        </div>
      </div>
    );
  }
}

/* eslint-disable */
import React from 'react';
import ImageCaption from './ImageCaption';

export default class Giphy extends React.Component {
  focus() {
    const field = this.refs.field;
    if (field) {
      field.focus();
    }
  }

  render() {
    let giphy = '';
    var imageCaption =
      this.props.data.description != undefined
        ? this.props.data.description
        : '';

    if (
      '' == this.props.data.url ||
      undefined == this.props.data.url ||
      this.props.edit
    ) {
      giphy = (
        <input
          type="text"
          ref="field"
          className="form-control"
          defaultValue={this.props.data.url}
          onBlur={() =>
            this.props.updateResource(
              this.props.dataId,
              'giphy',
              this.refs.field.value
            )}
          placeholder="http://giphy.com/gifs/blackgirlmagic-3o72Fdwj7RQ4654q0E"
        />
      );
    } else {
      let giphyId = this.props.data.giphyId;
      giphy = (
        <img
          data-id={this.props.dataId}
          src={'https://media.giphy.com/media/' + giphyId + '/giphy.gif'}
        />
      );
    }

    return (
      <div>
        <label className="ptitle">
          GIF <span className="hint">(Please, add Giphy URL)</span>
        </label>
        <div className={'asset-size-' + this.props.data.layout}>
          {giphy}
          <ImageCaption
            type={this.props.data.type}
            addImageCaption={this.props.addImageCaption}
            fieldId={this.props.dataId}
            imageCaption={imageCaption}
          />
        </div>
      </div>
    );
  }
}

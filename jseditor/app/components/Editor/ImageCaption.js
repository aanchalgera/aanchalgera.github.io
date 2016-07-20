import React from 'react';
import ImageCaptionPropertyButton from './ImageCaptionPropertyButton';

export default class ImageCaption extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.imageCaption,
      showCaptionForm: false
    };
  }

  toggleCaptionForm() {
    this.setState({ showCaptionForm: !this.state.showCaptionForm });
  }

  closeCaptionForm() {
    this.setState({ showCaptionForm: false });
  }

  componentWillReceiveProps(nextProps) {
    this.state = {
      value: nextProps.imageCaption
    };
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      value: e.currentTarget.value
    });
  }

  handleBlur(e) {
    e.preventDefault();
    var data = e.currentTarget.value.trim();
    var imageId = e.currentTarget.id;
    this.setState({
      value: data
    }, this.props.addImageCaption.bind(this, imageId, data, this.props.fieldId));
  }

  render () {
    let textField = '';
    let captionForm = '';

    if (this.props.type == 'image') {
      textField = (
        <div className="input-group">
          <input
            type="text"
            id={this.props.id}
            className="caption"
            value={this.state.value}
            placeholder="Add caption"
            onChange={this.handleChange.bind(this)}
            onBlur={this.handleBlur.bind(this)}
          />
          <a className="input-group-addon"><span onClick={this.toggleCaptionForm.bind(this)} className="glyphicon glyphicon-cog"></span></a>
        </div>
      );
      if (this.state.showCaptionForm) {
        captionForm = (
          <ImageCaptionPropertyButton
            closeCaptionForm={this.closeCaptionForm.bind(this)}
            {...this.props}
          />
        );
      }
    } else {
      textField = (
        <input
          type="text"
          id={this.props.id}
          className="caption"
          value={this.state.value}
          placeholder="Add caption"
          onChange={this.handleChange.bind(this)}
          onBlur={this.handleBlur.bind(this)}
        />
      );
    }

    return (
      <div className="caption-container">
      {textField}
      {captionForm}
    </div>
    );
  }
}

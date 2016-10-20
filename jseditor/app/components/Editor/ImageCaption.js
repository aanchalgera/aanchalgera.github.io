import React from 'react';
import ImageCaptionPropertyButton from './ImageCaptionPropertyButton';

export default class ImageCaption extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.imageCaption,
      showCaptionForm: false
    };
    this.props.addImageCaption.bind(this);
  }

  toggleCaptionForm() {
    this.setState({ showCaptionForm: !this.state.showCaptionForm });
  }

  closeCaptionForm(e) {
    if (e.target.tagName.toLowerCase() != 'select') {
      this.setState({ showCaptionForm: false });
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.imageCaption
    });
  }

  handleChange(e) {
    e.preventDefault();

    let {id, value} = e.currentTarget;

    // To prevent rapid saving on firebase
    clearTimeout(this._timeout);
    this._timeout = setTimeout(() => {
      this.props.addImageCaption(id, value, this.props.fieldId);
    }, 1000);

    this.setState({
      value: e.currentTarget.value
    });
  }

  render () {
    let textField = (
      <input
        id={this.props.imageId}
        type="text"
        className="caption"
        defaultValue={this.state.value}
        placeholder="Add caption"
        onChange={this.handleChange.bind(this)}
      />
    );
    let propertyButton = '';
    let captionForm = '';

    if (this.props.type == 'image') {
      propertyButton = (
        <div className="input-group">
          {textField}
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
      propertyButton = textField;
    }

    return (
      <div className="caption-container">
      {propertyButton}
      {captionForm}
    </div>
    );
  }
}

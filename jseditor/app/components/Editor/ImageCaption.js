import React from 'react';
import ImageCaptionPropertyButton from './ImageCaptionPropertyButton';

class ImageCaption extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.imageCaption,
      box: 'close'
    };
  }

  toggleBox() {
    this.setState({ box: this.state.box == 'open' ? 'close' : 'open' });
  }

  closeBox() {
    this.setState({ box:'close' });
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
    var expandStyle = '';
    var selected = '';
    if (this.state.box == 'open') {
      expandStyle = { display: 'block' };
      selected = 'selected';
    } else {
      expandStyle = { display: 'none' };
    }

    var propertyButton = '';
    var captionForm = '';

    if (this.props.type == 'image') {
      propertyButton = (
        <a className="input-group-addon"><span onClick={this.toggleBox.bind(this)} className={'glyphicon glyphicon-cog ' + selected}></span></a>
      );
      captionForm = (
        <ImageCaptionPropertyButton
          closeBox={this.closeBox.bind(this)}
          expandStyle={expandStyle}
          {...this.props}
        />
      )
    }

    return (
      <div className="caption-container">
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
          {propertyButton}
        </div>
      {captionForm}
    </div>
    );
  }
}

export default ImageCaption;

import React, { PropTypes } from 'react'

class ImageCaption extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      value: this.props.imageCaption
    };
  }
  handleChange(e) {
    e.preventDefault()
    this.setState({
      value: e.currentTarget.value,
    });
  }
  handleBlur(e) {
    e.preventDefault()
    var data = e.currentTarget.value.trim();
    var imageId = e.currentTarget.id;
    this.setState({
      value: data,
    }, this.props.addImageCaption.bind(this, imageId, data, this.props.fieldId));
  }
  render () {
    return (
      <input
        type="text"
        id={this.props.id}
        maxLength={this.props.limit}
        className="caption"
        value={this.state.value}
        placeholder="Add caption"
        onChange={this.handleChange.bind(this)}
        onBlur={this.handleBlur.bind(this)}
      />
    )
  }
}

export default ImageCaption;

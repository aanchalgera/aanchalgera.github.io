import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';

class TextArea extends Component
{
  handleChange = (e, newValue) => {
    this.props.setValue(newValue);
  }

  render() {
    return (
      <TextField
        defaultValue={this.props.savedValue}
        hintText={this.props.hintText}
        floatingLabelText={this.props.floatingLabel}
        floatingLabelFixed={true}
        onChange={this.handleChange}
        fullWidth={true}
      />
    );
  }
}

TextArea.propTypes = {
  floatingLabel: PropTypes.string.isRequired,
  hintText: PropTypes.string.isRequired,
  savedValue: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired
}

export default TextArea;
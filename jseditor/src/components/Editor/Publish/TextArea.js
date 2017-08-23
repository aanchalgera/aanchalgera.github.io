/* @flow */
import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

type Props = {
  floatingLabel: string,
  hintText: string,
  savedValue: string,
  setValue: Function
};

class TextArea extends Component {
  props: Props;
  handleChange = (e: SyntheticEvent, newValue: string) => {
    this.props.setValue(newValue);
  };

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

export default TextArea;

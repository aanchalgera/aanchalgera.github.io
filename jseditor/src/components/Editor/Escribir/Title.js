//@flow
import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import { InputEvent } from '../../../lib/flowTypes';

type Props = {
  title: string
};

const styles = {
  containerStyle: {
    lineHeight: '40px',
    height: '200px'
  },
  hintStyle: { fontSize: '33px' },
  textareaStyle: {
    fontWeight: 'bold',
    fontFamily: '"Roboto", sans-serif',
    fontSize: '33px'
  },
  underlineStyle: {}
};

export class Title extends Component<Props> {
  handleChange = (e: InputEvent, newValue: string) => {};

  render() {
    return (
      <TextField
        hintText="Título..."
        fullWidth={true}
        value={this.props.title}
        onChange={this.handleChange}
        style={styles.containerStyle}
        textareaStyle={styles.textareaStyle}
        hintStyle={styles.hintStyle}
        multiLine={true}
        rowsMax={3}
        underlineStyle={styles.underlineStyle}
      />
    );
  }
}

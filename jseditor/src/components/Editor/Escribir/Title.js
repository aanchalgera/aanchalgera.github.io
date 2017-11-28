//@flow
import React from 'react';
import TextField from 'material-ui/TextField';
import { InputEvent } from 'lib/flowTypes';

type Props = {
  title: string,
  handleBlur: (ev: InputEvent) => void,
  handleChange: (ev: InputEvent) => void
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
    fontSize: '33px',
    overflowY: 'hidden'
  },
  underlineStyle: {}
};

export const Title = (props: Props) => {
  const { handleChange, title, handleBlur } = props;

  return (
    <div className="col-sm-12">
      <TextField
        hintText="Título..."
        fullWidth={true}
        value={title}
        onChange={handleChange}
        onBlur={handleBlur}
        style={styles.containerStyle}
        textareaStyle={styles.textareaStyle}
        hintStyle={styles.hintStyle}
        multiLine={true}
        underlineStyle={styles.underlineStyle}
      />
    </div>
  );
};

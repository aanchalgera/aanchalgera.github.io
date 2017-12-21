//@flow
import React from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import { InputEvent } from 'lib/flowTypes';
import { changeTitle } from 'actions/post';

type Props = {
  text: string,
  changeTitle: (title: string) => void
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

const Title = (props: Props) => {
  const handleChange = (event: InputEvent) => {
    const title = event.currentTarget.value;
    props.changeTitle(title);
  };

  return (
    <div>
      <TextField
        hintText="Título..."
        fullWidth
        value={props.text}
        onChange={handleChange}
        style={styles.containerStyle}
        textareaStyle={styles.textareaStyle}
        hintStyle={styles.hintStyle}
        multiLine
        underlineStyle={styles.underlineStyle}
      />
    </div>
  );
};

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, { changeTitle })(Title);

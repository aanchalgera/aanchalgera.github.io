//@flow
import React from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import { InputEvent } from 'lib/flowTypes';
import { changeTitle } from 'actions/post';

type Props = {
  text: string,
  changeTitle: (title: string) => void,
  handleBlur: () => void
};

const styles = {
  containerStyle: {
    lineHeight: '40px',
    height: '200px'
  },
  hintStyle: { fontSize: '33px', color: 'rgba(0,0,0,0.3)', fontFamily: 'Noto Serif' },
  textareaStyle: {
    fontWeight: 'bold',
    fontSize: '33px',
    fontFamily: 'Noto Serif',
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
        onBlur={props.handleBlur}
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

//@flow
import React from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import { InputEvent } from 'lib/flowTypes';
import { changeTitle } from 'actions/post';

type Props = {
  text: string,
  saveData: () => void,
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
  console.log(props);
  const handleBlur = () => {
    props.saveData();
  };

  const handleChange = (event: InputEvent) => {
    const title = event.currentTarget.value;
    props.changeTitle(title);
  };

  return (
    <div className="col-sm-12">
      <TextField
        hintText="Título..."
        fullWidth={true}
        value={props.text}
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

const mapDispatchToProps = dispatch => {
  return {
    changeTitle: title => {
      dispatch(changeTitle(title));
    }
  };
};

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Title);

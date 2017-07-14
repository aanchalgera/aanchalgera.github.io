import React from 'react';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';

const propValidate = {
  facebook: React.PropTypes.string.isRequired,
  updateSocialFacebookText: React.PropTypes.func.isRequired
};

const styles = {
  hintStyle:{
    bottom: '60px'
  }
};
  
const Facebook = (props) => (
  <div>
    <TextField
      hintText="..."
      hintStyle={styles.hintStyle}
      floatingLabelFixed={true}
      multiLine={true}
      rows={3}
      rowsMax={3}
      underlineShow={false}
      fullWidth={true}
      value={props.facebook}
      onChange={props.updateSocialFacebookText.bind(this)}
      floatingLabelText='Texto para facebook'
    />
    <Divider />
  </div>
);

Facebook.propTypes = propValidate;

export default Facebook;

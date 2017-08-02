import PropTypes from 'prop-types';
import React from 'react';
import { TextField, Divider } from 'material-ui';

const TWITTER_CHAR_LIMIT = 116;

const propValidate = {
  twitter: PropTypes.string.isRequired,
  updateSocialTwitterText: PropTypes.func.isRequired,
};

const styles = {
  hintStyle:{
    bottom: '60px'
  }
};

const Twitter = (props) => (
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
      value={props.twitter}
      maxLength={TWITTER_CHAR_LIMIT}
      onChange={props.updateSocialTwitterText.bind(this)}
      floatingLabelText={<span>Texto para Twitter {TWITTER_CHAR_LIMIT - props.twitter.length}</span>}
    />
    <Divider/>
  </div>
);

Twitter.propTypes = propValidate;

export default Twitter;

import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';

const TWITTER_CHAR_LIMIT = 116;

const styles = {
  hintStyle:{
    bottom: '60px'
  }
};
  
const Social = (props) => (
  <Row>
    <Col xs={6}>
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
    </Col>
    <Col xs={6}>
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
    </Col>
  </Row>
);

Social.propTypes = {
  twitter: React.PropTypes.string.isRequired,
  facebook: React.PropTypes.string.isRequired,
  updateSocialTwitterText: React.PropTypes.func.isRequired,
  updateSocialFacebookText: React.PropTypes.func.isRequired
};

export default Social;

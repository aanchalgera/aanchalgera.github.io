/*@flow*/
import React from 'react';
import { TextField, Divider } from 'material-ui';

const TWITTER_CHAR_LIMIT = 116;

type Props = {
  twitter: PropTypes.string.isRequired,
  updateSocialTwitterText: PropTypes.func.isRequired
};

const floatingLabelText = length => {
  return 'Texto para Twitter ' + (TWITTER_CHAR_LIMIT - length);
};

export const Twitter = (props: Props) => (
  <div>
    <TextField
      className="caption-default label-editor"
      hintText="..."
      floatingLabelFixed={true}
      multiLine={true}
      rows={3}
      underlineShow={false}
      fullWidth={true}
      value={props.twitter}
      maxLength={TWITTER_CHAR_LIMIT}
      onChange={props.updateSocialTwitterText.bind(this)}
      floatingLabelText={floatingLabelText(props.twitter.length)}
    />
    <Divider />
  </div>
);

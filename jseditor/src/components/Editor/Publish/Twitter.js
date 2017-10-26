/*@flow*/
import React from 'react';
import { TextField, Divider } from 'material-ui';

const TWITTER_CHAR_LIMIT = 116;

type Props = {
  twitter: PropTypes.string.isRequired,
  updateSocialTwitterText: PropTypes.func.isRequired
};

export const Twitter = (props: Props) => (
  <div>
    <TextField
      hintText="..."
      floatingLabelFixed={true}
      multiLine={true}
      rowsMax={3}
      underlineShow={false}
      fullWidth={true}
      value={props.twitter}
      maxLength={TWITTER_CHAR_LIMIT}
      onChange={props.updateSocialTwitterText.bind(this)}
      floatingLabelText={
        <span>
          Texto para Twitter (disponible:{' '}
          {TWITTER_CHAR_LIMIT - props.twitter.length})
        </span>
      }
    />
    <Divider />
  </div>
);

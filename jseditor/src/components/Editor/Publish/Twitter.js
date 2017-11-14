/*@flow*/
import React from 'react';
import { TextField, Divider } from 'material-ui';

const TWITTER_CHAR_LIMIT = 256;

type Props = {
  twitter: string,
  updateSocialTwitterText: (data: Object) => void
};

const floatingLabelText = length => {
  return (
    'Texto para Twitter (disponible: ' + (TWITTER_CHAR_LIMIT - length) + ')'
  );
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
      onChange={props.updateSocialTwitterText}
      floatingLabelText={floatingLabelText(props.twitter.length)}
    />
    <Divider />
  </div>
);

//@flow
import * as React from 'react';
import { TextField, Divider } from 'material-ui';

type Props = {
  facebook: string,
  updateSocialFacebookText: Function
};

export const Facebook = (props: Props) => (
  <div>
    <TextField
      hintText="..."
      floatingLabelFixed
      multiLine
      rows={3}
      underlineShow={false}
      fullWidth
      value={props.facebook}
      onChange={props.updateSocialFacebookText.bind(this)}
      floatingLabelText="Texto para Facebook"
    />
    <Divider />
  </div>
);

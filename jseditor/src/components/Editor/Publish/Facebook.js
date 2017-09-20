//@flow
import React from 'react';
import { TextField, Divider } from 'material-ui';

type Props = {
  facebook: string,
  updateSocialFacebookText: Function
};

export const Facebook = (props: Props) =>
  <div>
    <TextField
      hintText="..."
      floatingLabelFixed={true}
      multiLine={true}
      rows={3}
      rowsMax={3}
      underlineShow={false}
      fullWidth={true}
      value={props.facebook}
      onChange={props.updateSocialFacebookText.bind(this)}
      floatingLabelText="Texto para facebook"
    />
    <Divider />
  </div>;

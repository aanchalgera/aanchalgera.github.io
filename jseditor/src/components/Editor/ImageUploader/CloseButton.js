import React, { PureComponent } from 'react';
import { IconButton } from 'material-ui';
import Close from 'material-ui/svg-icons/navigation/close';

type Props = {
  handleClose: () => void
};

export function CloseButton(props: Props) {
  return (
    <IconButton
      onClick={props.handleClose}
      iconStyle={{ height: '20px', width: '20px' }}
    >
      <Close className="btn-close" color="gray" />
    </IconButton>
  );
}

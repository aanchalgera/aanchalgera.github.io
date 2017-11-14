import React, { PureComponent } from 'react';
import { IconButton } from 'material-ui';
import Close from 'material-ui/svg-icons/navigation/close';

type Props = {
  handleClose: () => void
};

export class CloseButton extends PureComponent {
  props: Props;

  render() {
    return (
      <IconButton onClick={this.props.handleClose}>
        <Close className="btn-close" color="black" />
      </IconButton>
    );
  }
}

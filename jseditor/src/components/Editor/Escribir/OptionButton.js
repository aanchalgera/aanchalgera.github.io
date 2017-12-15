//@flow
import React from 'react';
import { IconButton } from 'material-ui';

type Props = {
  Icon: Object,
  title?: string,
  handleClick: () => void
};

export function OptionButton(props: Props) {
  const { Icon, title = '', handleClick } = props;

  return (
    <span className="btn-option">
      <IconButton tooltip={title} onClick={handleClick} style={{ padding: '5px', height: '36px', width: '46px' }}>
        <Icon color="black" />
      </IconButton>
    </span>
  );
}

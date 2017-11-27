//@flow
import React from 'react';
import { IconButton } from 'material-ui';

type Props = {
  Icon: Object,
  title: string,
  handleClick: () => void
};

export function OptionButton(props: Props) {
  const { Icon, title, handleClick } = props;

  return (
    <IconButton className="btn-option" tooltip={title} onClick={handleClick}>
      <Icon color="black" />
    </IconButton>
  );
}

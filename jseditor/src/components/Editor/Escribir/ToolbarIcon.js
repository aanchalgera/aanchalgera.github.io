// @flow
import * as React from 'react';
import IconButton from 'material-ui/IconButton';

type Props = {
  ActionIcon: React.Node,
  handleClick: () => void
};

export const ToolbarIcon = ({ ActionIcon, handleClick }: Props) => (
  <IconButton touch onClick={handleClick}>
    {ActionIcon}
  </IconButton>
);

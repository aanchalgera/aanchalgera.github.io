// @flow
import * as React from 'react';
import IconButton from 'material-ui/IconButton';

type Props = {
  ActionIcon: React.Node,
  handleClick: () => void,
  tooltip: string
};

export const ToolbarIcon = ({ ActionIcon, handleClick, tooltip }: Props) => (
  <IconButton
    touch
    onClick={handleClick}
    className="media-layout"
    tooltip={tooltip}
  >
    {ActionIcon}
  </IconButton>
);

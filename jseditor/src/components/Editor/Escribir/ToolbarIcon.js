// @flow
import * as React from 'react';
import IconButton from 'material-ui/IconButton';

type Props = {
  ActionIcon: React.Node,
  handleClick: () => void,
  tooltip: string,
  className: string
};

export const ToolbarIcon = ({
  ActionIcon,
  handleClick,
  className,
  tooltip
}: Props) => (
  <IconButton className={`media-layout ${className}`} tooltip={tooltip}>
    <span onClick={handleClick}>{ActionIcon}</span>
  </IconButton>
);

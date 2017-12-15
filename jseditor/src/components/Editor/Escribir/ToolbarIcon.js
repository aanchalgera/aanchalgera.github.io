// @flow
import * as React from 'react';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';

type Props = {
  ActionIcon: React.Node
};

export const ToolbarIcon = ({ ActionIcon }: Props) => (
  <IconMenu iconButtonElement={<IconButton touch>{ActionIcon}</IconButton>} />
);

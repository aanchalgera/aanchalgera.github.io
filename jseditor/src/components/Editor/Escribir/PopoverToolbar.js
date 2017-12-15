// @flow
import * as React from 'react';
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import { white } from 'material-ui/styles/colors';

type Props = {
  closeImageToolbar: () => void,
  handleDelete: () => void,
  handleEdit: () => void,
  imageEl: SyntheticEvent<HTMLImageElement>,
  open: boolean,
  toolbarIcons: Array<React.Node>
};

export const PopoverToolbar = ({
  closeImageToolbar,
  imageEl,
  handleDelete,
  handleEdit,
  open,
  toolbarIcons
}: Props) => (
  <Popover
    open={open}
    anchorEl={imageEl}
    anchorOrigin={{ horizontal: 'middle', vertical: 'top' }}
    targetOrigin={{ horizontal: 'left', vertical: 'bottom' }}
    animation={PopoverAnimationVertical}
    onRequestClose={closeImageToolbar}
  >
    <Toolbar style={{ backgroundColor: white }}>
      <ToolbarGroup>{toolbarIcons}</ToolbarGroup>
    </Toolbar>
  </Popover>
);

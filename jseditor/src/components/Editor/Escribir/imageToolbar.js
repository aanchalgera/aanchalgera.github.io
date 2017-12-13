import * as React from 'react';
import { ActionDelete, EditorModeEdit } from 'material-ui/svg-icons';
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

type Props = {
  handleDelete: () => {},
  handleEdit: () => {},
  open: boolean,
  imageEl: SyntheticEvent<HTMLImageElement>,
  closeImageToolbar: () => void
};

export const ImageToolbar = ({
  handleDelete,
  handleEdit,
  open,
  imageEl,
  closeImageToolbar
}: Props) => (
  <Popover
    open={open}
    anchorEl={imageEl}
    anchorOrigin={{ horizontal: 'middle', vertical: 'top' }}
    targetOrigin={{ horizontal: 'left', vertical: 'top' }}
    animation={PopoverAnimationVertical}
    onRequestClose={closeImageToolbar}
  >
    <Menu>
      <MenuItem leftIcon={<ActionDelete />} />
      <MenuItem leftIcon={<EditorModeEdit />} />
    </Menu>
  </Popover>
);

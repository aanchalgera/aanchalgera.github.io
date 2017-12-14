import * as React from 'react';
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover';
import { Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui/Toolbar';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import {
  ActionDelete,
  EditorModeEdit,
  ActionViewDay
} from 'material-ui/svg-icons';

type Props = {
  closeImageToolbar: () => void,
  handleDelete: () => void,
  handleEdit: () => void,
  imageEl: SyntheticEvent<HTMLImageElement>,
  open: boolean
};

export const ImageToolbar = ({
  closeImageToolbar,
  imageEl,
  handleDelete,
  handleEdit,
  open
}: Props) => (
  <Popover
    open={open}
    anchorEl={imageEl}
    anchorOrigin={{ horizontal: 'middle', vertical: 'top' }}
    targetOrigin={{ horizontal: 'left', vertical: 'top' }}
    animation={PopoverAnimationVertical}
    onRequestClose={closeImageToolbar}
  >
    <Toolbar>
      <ToolbarGroup>
        <IconMenu
          iconButtonElement={
            <IconButton touch>
              <ActionViewDay />
            </IconButton>
          }
        />
        <ToolbarSeparator />
        <IconMenu
          iconButtonElement={
            <IconButton onClick={handleEdit} touch>
              <EditorModeEdit />
            </IconButton>
          }
        />
        <IconMenu
          iconButtonElement={
            <IconButton onClick={handleDelete} touch>
              <ActionDelete />
            </IconButton>
          }
        />
      </ToolbarGroup>
    </Toolbar>
  </Popover>
);

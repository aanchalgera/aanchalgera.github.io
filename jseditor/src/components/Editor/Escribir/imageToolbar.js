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
  handleDelete: () => {},
  open: boolean,
  imageEl: SyntheticEvent<HTMLImageElement>,
  closeImageToolbar: () => void
};

export const ImageToolbar = ({
  handleDelete,
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
            <IconButton touch>
              <EditorModeEdit />
            </IconButton>
          }
        />
        <IconMenu
          iconButtonElement={
            <IconButton touch>
              <ActionDelete />
            </IconButton>
          }
        />
      </ToolbarGroup>
    </Toolbar>
  </Popover>
);

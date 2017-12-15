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

import { white, grey600, grey500, red500 } from 'material-ui/styles/colors';

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
    targetOrigin={{ horizontal: 'left', vertical: 'bottom' }}
    animation={PopoverAnimationVertical}
    onRequestClose={closeImageToolbar}
  >
    <Toolbar style={{ backgroundColor: white }}>
      <ToolbarGroup>
        <IconMenu
          iconButtonElement={
            <IconButton touch>
              <ActionViewDay color={grey600} />
            </IconButton>
          }
        />
        <ToolbarSeparator style={{ backgroundColor: grey500 }} />
        <IconMenu
          iconButtonElement={
            <IconButton onClick={handleEdit} touch>
              <EditorModeEdit color={grey600} />
            </IconButton>
          }
        />
        <IconMenu
          iconButtonElement={
            <IconButton onClick={handleDelete}>
              <ActionDelete color={red500} />
            </IconButton>
          }
        />
      </ToolbarGroup>
    </Toolbar>
  </Popover>
);

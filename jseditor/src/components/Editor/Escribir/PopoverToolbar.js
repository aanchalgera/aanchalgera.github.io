// @flow
import * as React from 'react';
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import { white } from 'material-ui/styles/colors';

type Props = {
  closeToolbar: () => void,
  imageEl: SyntheticEvent<HTMLImageElement>,
  open: boolean,
  toolbarIcons: Array<React.Node>
};

const style = {
  popover: {
    overFlowY: 'visible'
  }
};

export const PopoverToolbar = ({
  closeToolbar,
  imageEl,
  open,
  toolbarIcons
}: Props) => (
  <Popover
    open={open}
    anchorEl={imageEl}
    anchorOrigin={{ horizontal: 'middle', vertical: 'top' }}
    targetOrigin={{ horizontal: 'middle', vertical: 'bottom' }}
    animation={PopoverAnimationVertical}
    onRequestClose={closeToolbar}
    canAutoPosition={false}
    className="tooltip"
    style={style.popover}
  >
    <Toolbar className="tooltip-inner" style={{ backgroundColor: white }}>
      <ToolbarGroup>{toolbarIcons}</ToolbarGroup>
    </Toolbar>
  </Popover>
);

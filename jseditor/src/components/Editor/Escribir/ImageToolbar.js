// @flow
import * as React from 'react';
import { ToolbarSeparator } from 'material-ui/Toolbar';
import { ActionDelete, EditorModeEdit } from 'material-ui/svg-icons';
import { grey600, grey500, red500 } from 'material-ui/styles/colors';

import {
  SmallLeftIcon,
  SmallCenterIcon,
  SmallRightIcon,
  NormalIcon,
  BigIcon
} from './lib/svgIcons';
import { ToolbarIcon } from '.';
import { withKeyHandler } from './WithKeyHandler';

type Props = {
  handleDelete: () => void,
  closeToolbar: () => void,
  openImagePanel: (actionName: string) => void,
  getClassName: (layout: string, align: string) => void,
  changeLayout: (layout: string, align: string) => void,
  index: number,
  selectedKey: string,
  maxId: number
};

const ImageToolbar = (props: Props) => {
  const handleEdit = () => {
    props.openImagePanel('edit');
    props.closeToolbar();
  };

  const { handleDelete, changeLayout, getClassName } = props;
  return (
    <React.Fragment>
      <ToolbarIcon
        ActionIcon={SmallLeftIcon}
        handleClick={() => changeLayout('small', 'left')}
        className={getClassName('small', 'left')}
        tooltip="Pequeño, a la izquierda"
      />
      <ToolbarIcon
        ActionIcon={SmallCenterIcon}
        handleClick={() => changeLayout('small', 'small_center')}
        className={getClassName('small', 'small_center')}
        tooltip="Pequeño, centrado"
      />
      <ToolbarIcon
        ActionIcon={SmallRightIcon}
        handleClick={() => changeLayout('small', 'right')}
        className={getClassName('small', 'right')}
        tooltip="Pequeño, a la derecha"
      />
      <ToolbarIcon
        ActionIcon={NormalIcon}
        handleClick={() => changeLayout('normal', 'center')}
        className={getClassName('normal', 'center')}
        tooltip="Normal"
      />
      <ToolbarIcon
        ActionIcon={BigIcon}
        handleClick={() => changeLayout('large', 'center')}
        className={getClassName('large', 'center')}
        tooltip="Grande"
      />
      <ToolbarSeparator style={{ backgroundColor: grey500 }} key="seprator" />
      <ToolbarIcon
        ActionIcon={<EditorModeEdit color={grey600} />}
        handleClick={handleEdit}
        className=""
        tooltip="Editar"
      />
      <ToolbarIcon
        ActionIcon={<ActionDelete color={red500} />}
        handleClick={handleDelete}
        className=""
        tooltip="Quitar"
      />
    </React.Fragment>
  );
};

export default withKeyHandler(ImageToolbar);

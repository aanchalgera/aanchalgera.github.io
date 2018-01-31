// @flow
import * as React from 'react';
import { ToolbarSeparator } from 'material-ui/Toolbar';
import { ActionDelete, EditorModeEdit } from 'material-ui/svg-icons';
import { grey600, grey500, red500 } from 'material-ui/styles/colors';
import { SmallLeftIcon, SmallCenterIcon, SmallRightIcon } from './lib/svgIcons';

import { ToolbarIcon } from '.';
import { withKeyHandler } from './WithKeyHandler';

type Props = {
  handleDelete: () => void,
  handleEdit: () => void,
  closeToolbar: () => void,
  changeLayout: (layout: string, align: string) => void,
  getClassName: (layout: string, align: string) => void,
  index: number,
  selectedKey: string,
  maxId: number
};

const SummaryToolbar = (props: Props) => {
  const handleEdit = () => {
    // open summary panel
    // close toolbar
  };

  const { handleDelete, changeLayout, getClassName } = props;

  return (
    <React.Fragment>
      <ToolbarIcon
        ActionIcon={SmallLeftIcon}
        handleClick={() => changeLayout('small', 'left')}
        className={getClassName('small', 'sumario_izquierda')}
        tooltip="Pequeño, a la izquierda"
      />
      <ToolbarIcon
        ActionIcon={SmallCenterIcon}
        handleClick={() => changeLayout('normal', 'center')}
        className={getClassName('normal', 'sumario')}
        tooltip="Pequeño, centrado"
      />
      <ToolbarIcon
        ActionIcon={SmallRightIcon}
        handleClick={() => changeLayout('small', 'right')}
        className={getClassName('small', 'sumario_derecha')}
        tooltip="Pequeño, a la derecha"
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

export default withKeyHandler(SummaryToolbar);

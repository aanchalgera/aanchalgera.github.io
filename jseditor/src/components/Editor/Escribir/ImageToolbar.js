// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { ToolbarSeparator } from 'material-ui/Toolbar';
import { deleteSection, openImagePanel, changeLayout } from 'actions/post';
import { ActionDelete, EditorModeEdit } from 'material-ui/svg-icons';
import { ToolbarIcon } from '.';
import { grey600, grey500, red500 } from 'material-ui/styles/colors';
import {
  smallLeftIcon,
  smallCenterIcon,
  smallRightIcon,
  normalIcon,
  bigIcon
} from './lib/svgIcons';

type Props = {
  handleDelete: () => void,
  handleEdit: () => void,
  openImagePanel: (actionName: string) => void,
  closeImageToolbar: () => void,
  deleteSection: (index: number, id: number) => void,
  changeLayout: (index: number, layout: string, align: string) => void,
  index: number,
  selectedKey: string,
  maxId: number
};

const ImageToolbar = (props: Props) => {
  const handleDelete = () => {
    props.deleteSection(props.index, props.maxId);
  };

  const handleEdit = () => {
    props.openImagePanel('edit');
    props.closeImageToolbar();
  };

  const changeLayout = (layout, align = 'center') => {
    props.changeLayout(props.index, layout, align);
  };

  const getClassName = (layout, align = 'center') => {
    if (props.selectedKey === `${layout}-${align}`) {
      return 'active';
    }
    return '';
  };

  return (
    <React.Fragment>
      <ToolbarIcon
        ActionIcon={smallLeftIcon()}
        handleClick={() => changeLayout('small', 'left')}
        className={getClassName('small', 'left')}
        tooltip="Pequeño, a la izquierda"
      />
      <ToolbarIcon
        ActionIcon={smallCenterIcon()}
        handleClick={() => changeLayout('small', 'small_center')}
        className={getClassName('small', 'small_center')}
        tooltip="Pequeño, centrado"
      />
      <ToolbarIcon
        ActionIcon={smallRightIcon()}
        handleClick={() => changeLayout('small', 'right')}
        className={getClassName('small', 'right')}
        tooltip="Pequeño, a la derecha"
      />
      <ToolbarIcon
        ActionIcon={normalIcon()}
        handleClick={() => changeLayout('normal')}
        className={getClassName('normal')}
        tooltip="Normal"
      />
      <ToolbarIcon
        ActionIcon={bigIcon()}
        handleClick={() => changeLayout('large')}
        className={getClassName('large')}
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

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, {
  deleteSection,
  openImagePanel,
  changeLayout
})(ImageToolbar);

// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { ToolbarSeparator } from 'material-ui/Toolbar';
import { deleteSection, openImagePanel, changeLayout } from 'actions/post';
import { ActionDelete, EditorModeEdit } from 'material-ui/svg-icons';
import ReactSVG from 'react-svg';
import { ToolbarIcon } from '.';
import { grey600, grey500, red500 } from 'material-ui/styles/colors';
import SvgIcon from 'material-ui/SvgIcon';

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

// const iconStyles = {
//   width: 28,
//   height: 16,
// };

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

  const smallLeftIcon = () => {
    return (
      <SvgIcon style={{ width: 2400, height: 16 }} viewBox="0 0 24 16">
        <path d="M15,32 L33,32 L33,30.2222222 L15,30.2222222 L15,32 L15,32 Z M22,20 L22,21.7777778 L38,21.7777778 L38,20 L22,20 L22,20 Z M22,23 L22,24.7777778 L38,24.7777778 L38,23 L22,23 L22,23 Z M22,26 L22,27.7777778 L38,27.7777778 L38,26 L22,26 L22,26 Z M10,28.4455559 L20,28.4455559 L20,19.5555556 L10,19.5555556 L10,28.4455559 L10,28.4455559 Z M15,16 L15,17.7777778 L33,17.7777778 L33,16 L15,16 L15,16 Z" />
      </SvgIcon>
    );
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
        ActionIcon={<ReactSVG path="/svgs/small.svg" />}
        handleClick={() => changeLayout('small', 'small_center')}
        className={getClassName('small', 'small_center')}
        tooltip="Pequeño, centrado"
      />
      <ToolbarIcon
        ActionIcon={<ReactSVG path="/svgs/smallRight.svg" />}
        handleClick={() => changeLayout('small', 'right')}
        className={getClassName('small', 'right')}
        tooltip="Pequeño, a la derecha"
      />
      <ToolbarIcon
        ActionIcon={<ReactSVG path="/svgs/normal.svg" />}
        handleClick={() => changeLayout('normal')}
        className={getClassName('normal')}
        tooltip="Normal"
      />
      <ToolbarIcon
        ActionIcon={<ReactSVG path="/svgs/big.svg" />}
        handleClick={() => changeLayout('large')}
        className={getClassName('large')}
        tooltip="Grande"
      />
      {/*  <ToolbarIcon
        ActionIcon={<ReactSVG path="/svgs/edge.svg" />}
        handleClick={() => changeLayout('cover')}
        className={getClassName('cover')}
        tooltip="Anchura completa"
      />*/}
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

// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { ToolbarSeparator } from 'material-ui/Toolbar';
import { deleteSection, openImagePanel, changeLayout } from 'actions/post';
import { ActionDelete, EditorModeEdit } from 'material-ui/svg-icons';
import ReactSVG from 'react-svg';
import { ToolbarIcon } from '.';
import { grey600, grey500, red500 } from 'material-ui/styles/colors';

type Props = {
  handleDelete: () => void,
  handleEdit: () => void,
  openImagePanel: (actionName: string) => void,
  closeImageToolbar: () => void,
  deleteSection: (index: number) => void,
  changeLayout: (index: number, layout: string, align: string) => void,
  index: number
};

const ImageToolbar = (props: Props) => {
  const handleDelete = () => {
    props.deleteSection(props.index);
  };

  const handleEdit = () => {
    props.openImagePanel('edit');
    props.closeImageToolbar();
  };

  const changeLayout = (layout, align = 'center') => {
    props.changeLayout(props.index, layout, align);
  };

  return [
    <ToolbarIcon
      key="smallLeft"
      ActionIcon={<ReactSVG path="/svgs/smallLeft.svg" />}
      handleClick={() => changeLayout('small', 'left')}
      tooltip="Pequeño, a la izquierda"
    />,
    <ToolbarIcon
      key="small"
      ActionIcon={<ReactSVG path="/svgs/small.svg" />}
      handleClick={() => changeLayout('small', 'small_center')}
      tooltip="Pequeño, centrado"
    />,
    <ToolbarIcon
      key="smallRight"
      ActionIcon={<ReactSVG path="/svgs/smallRight.svg" />}
      handleClick={() => changeLayout('small', 'right')}
      tooltip="Pequeño, a la derecha"
    />,
    <ToolbarIcon
      key="normal"
      ActionIcon={<ReactSVG path="/svgs/normal.svg" />}
      handleClick={() => changeLayout('normal')}
      tooltip="Normal"
    />,
    <ToolbarIcon
      key="big"
      ActionIcon={<ReactSVG path="/svgs/big.svg" />}
      handleClick={() => changeLayout('normal')}
      tooltip="Grande"
    />,
    <ToolbarIcon
      key="edge"
      ActionIcon={<ReactSVG path="/svgs/edge.svg" />}
      handleClick={() => changeLayout('large')}
      tooltip="Anchura completa"
    />,
    <ToolbarSeparator style={{ backgroundColor: grey500 }} key="seprator" />,
    <ToolbarIcon
      key="edit"
      ActionIcon={<EditorModeEdit color={grey600} />}
      handleClick={handleEdit}
      tooltip="Editar"
    />,
    <ToolbarIcon
      key="delete"
      ActionIcon={<ActionDelete color={red500} />}
      handleClick={handleDelete}
      tooltip="Quitar"
    />
  ];
};

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, {
  deleteSection,
  openImagePanel,
  changeLayout
})(ImageToolbar);

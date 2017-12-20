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
        ActionIcon={<ReactSVG path="/svgs/smallLeft.svg" />}
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
      <ToolbarIcon
        ActionIcon={<ReactSVG path="/svgs/edge.svg" />}
        handleClick={() => changeLayout('cover')}
        tooltip="Anchura completa"
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

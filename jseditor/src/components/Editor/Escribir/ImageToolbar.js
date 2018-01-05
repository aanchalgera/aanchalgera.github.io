// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { ToolbarSeparator } from 'material-ui/Toolbar';
import { deleteSection, openImagePanel, changeLayout } from 'actions/post';
import { ActionDelete, EditorModeEdit } from 'material-ui/svg-icons';
import ReactSVG from 'react-svg';
import { ToolbarIcon } from '.';
import { grey600, grey500, red500, grey700 } from 'material-ui/styles/colors';
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

  const smallCenterIcon = () => {
    return (
      <SvgIcon viewBox="0 0 18 16" color={grey700}>
        <path
          d="m0.000034,16.000038l18,0l0,-1.77778l-18,0l0,1.77778l0,0zm4,-3.55444l10,0l0,-8.89l-10,0l0,8.89l0,0zm-4,-12.44556l0,1.77778l18,0l0,-1.77778l-18,0l0,0z"
          id="icon-column-small-a"
        />
      </SvgIcon>
    );
  };

  const smallLeftIcon = () => {
    return (
      <SvgIcon viewBox="0 0 28 16" color={grey700}>
        <path
          d="m5.000023,16.000037l18,0l0,-1.77778l-18,0l0,1.77778l0,0zm7,-12l0,1.77778l16,0l0,-1.77778l-16,0l0,0zm0,3l0,1.77778l16,0l0,-1.77778l-16,0l0,0zm0,3l0,1.77778l16,0l0,-1.77778l-16,0l0,0zm-12,2.44556l10,0l0,-8.89l-10,0l0,8.89l0,0zm5,-12.44556l0,1.77778l18,0l0,-1.77778l-18,0l0,0z"
          id="icon-column-small-left-a"
        />
      </SvgIcon>
    );
  };

  const smallRightIcon = () => {
    return (
      <SvgIcon viewBox="0 0 24 16" color={grey700}>
        <path
          d="m5.000023,16.000037l18,0l0,-1.77778l-18,0l0,1.77778l0,0zm7,-12l0,1.77778l16,0l0,-1.77778l-16,0l0,0zm0,3l0,1.77778l16,0l0,-1.77778l-16,0l0,0zm0,3l0,1.77778l16,0l0,-1.77778l-16,0l0,0zm-12,2.44556l10,0l0,-8.89l-10,0l0,8.89l0,0zm5,-12.44556l0,1.77778l18,0l0,-1.77778l-18,0l0,0z"
          id="icon-column-small-left-a"
        />
      </SvgIcon>
    );
  };

  const normalIcon = () => {
    return (
      <SvgIcon
        viewBox="0 0 18 16"
        color={grey700}
        style={{ height: '18px', width: '16px' }}
      >
        <path
          d="m0,16.000002l18,0l0,-1.77778l-18,0l0,1.77778l0,0zm0,-3.55444l18,0l0,-8.89l-18,0l0,8.89l0,0zm0,-12.44556l0,1.77778l18,0l0,-1.77778l-18,0l0,0z"
          id="icon-column-normal-a"
        />
      </SvgIcon>
    );
  };

  const bigIcon = () => {
    return (
      <SvgIcon viewBox="0 0 35 16" color={grey700}>
        <path
          d="m9.000003,16l18,0l0,-1.77778l-18,0l0,1.77778l0,0zm-9,-3.55444l35,0l0,-8.89l-35,0l0,8.89l0,0zm9,-12.44556l0,1.77778l18,0l0,-1.77778l-18,0l0,0z"
          id="icon-column-edge-a"
        />
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
        ActionIcon={smallCenterIcon()}
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

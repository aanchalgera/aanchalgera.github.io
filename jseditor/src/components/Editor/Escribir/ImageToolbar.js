// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { ToolbarSeparator } from 'material-ui/Toolbar';
import { deleteSection, openImagePanel, changeAlign } from 'actions/post';
import { ActionDelete, EditorModeEdit } from 'material-ui/svg-icons';
import ReactSVG from 'react-svg';
import { ToolbarIcon } from '.';
import { grey600, grey500, red500 } from 'material-ui/styles/colors';

type Props = {
  handleDelete: () => void,
  handleEdit: () => void,
  openImagePanel: (actionName: string) => void,
  closeImageToolbar: () => void,
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

  const changeAlign = align => {
    props.changeAlign(props.index, align);
  };

  return [
    <ToolbarIcon
      key="smallLeft"
      className="media-layout-left"
      ActionIcon={<ReactSVG path="/svgs/smallLeft.svg" />}
      handleClick={() => changeAlign('left')}
    />,
    <ToolbarIcon
      key="small"
      className="media-layout-center"
      ActionIcon={<ReactSVG path="/svgs/small.svg" />}
      handleClick={() => changeAlign('small_center')}
    />,
    <ToolbarIcon
      key="smallRight"
      className="media-layout-right"
      ActionIcon={<ReactSVG path="/svgs/smallRight.svg" />}
      handleClick={() => changeAlign('right')}
    />,
    <ToolbarIcon
      key="normal"
      className="media-layout-boxed"
      ActionIcon={<ReactSVG path="/svgs/normal.svg" />}
      handleClick={() => changeAlign('none')}
    />,
    <ToolbarIcon
      key="big"
      className="media-layout-container"
      ActionIcon={<ReactSVG path="/svgs/big.svg" />}
      handleClick={() => changeAlign('center')}
    />,
    <ToolbarIcon
      key="edge"
      className="media-layout-fullwidth"
      ActionIcon={<ReactSVG path="/svgs/edge.svg" />}
      handleClick={() => changeAlign('cover')}
    />,
    <ToolbarSeparator style={{ backgroundColor: grey500 }} key="seprator" />,
    <ToolbarIcon
      key="edit"
      className="media-edit"
      ActionIcon={<EditorModeEdit color={grey600} />}
      handleClick={handleEdit}
    />,
    <ToolbarIcon
      key="delete"
      className="media-delete"
      ActionIcon={<ActionDelete color={red500} />}
      handleClick={handleDelete}
    />
  ];
};

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, {
  deleteSection,
  openImagePanel,
  changeAlign
})(ImageToolbar);

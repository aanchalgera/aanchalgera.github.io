// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { ToolbarSeparator } from 'material-ui/Toolbar';
import {
  deleteSection,
  changeCurrentIndex,
  openImagePanel
} from 'actions/post';
import {
  ActionDelete,
  EditorModeEdit,
  ActionViewDay
} from 'material-ui/svg-icons';
import { ToolbarIcon } from '.';
import { grey600, grey500, red500 } from 'material-ui/styles/colors';

type Props = {
  handleDelete: () => void,
  handleEdit: () => void,
  changeCurrentIndex: (index: number) => void,
  openImagePanel: (actionName: string) => void,
  index: number
};

const ImageToolbar = (props: Props) => {
  const handleDelete = () => {
    props.deleteSection(props.index);
  };

  const handleEdit = () => {
    props.changeCurrentIndex(props.index);
    props.openImagePanel('edit');
  };

  return [
    <ToolbarIcon key="view" ActionIcon={<ActionViewDay color={red500} />} />,
    <ToolbarSeparator style={{ backgroundColor: grey500 }} key="seprator" />,
    <ToolbarIcon
      key="edit"
      ActionIcon={<EditorModeEdit color={grey600} onClick={handleEdit} />}
    />,
    <ToolbarIcon
      key="delete"
      ActionIcon={<ActionDelete color={red500} onClick={handleDelete} />}
    />
  ];
};

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, {
  deleteSection,
  changeCurrentIndex,
  openImagePanel
})(ImageToolbar);

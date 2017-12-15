// @flow
import * as React from 'react';
import { ToolbarSeparator } from 'material-ui/Toolbar';
import {
  ActionDelete,
  EditorModeEdit,
  ActionViewDay
} from 'material-ui/svg-icons';
import { ToolbarIcon } from '.';
import { grey600, grey500, red500 } from 'material-ui/styles/colors';

type Props = {
  handleDelete: () => void,
  handleEdit: () => void
};

export const ImageToolbar = ({ handleDelete, handleEdit }: Props) => [
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
